import { useState, useEffect } from "react";
import "./App.css";
import dummy from "./assets/dummy.png";
import Youtube from "react-youtube";

const CLIENT_ID = "d52e8a8b41b44ffea058928c8be6c1b9";
const CLIENT_SECRET = "c0e58df4c5b34fc58e39396d85544062";

const App = () => {
  const [accessToken, setAccessToken] = useState();
  const [tracks, setTracks] = useState([]);
  const [videos, setVideos] = useState([]);
  const [datas, setDatas] = useState([]);

  const opts = {
    width: "300",
    height: "168"
  };

  const onReady = event => {
    const player = event.target;
    player.pauseVideo();
  };

  useEffect(() => {
    var authParameters = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body:
        "grant_type=client_credentials&client_id=" +
        CLIENT_ID +
        "&client_secret=" +
        CLIENT_SECRET
    };

    fetch("https://accounts.spotify.com/api/token", authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token));
  }, []);

  useEffect(() => {
    const findTopTrack = async () => {
      if (accessToken) {
        var trackParameters = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken
          }
        };

        var returnTopTrack = await fetch(
          "https://api.spotify.com/v1/artists/6EIUY852nN8YhRsqqZHJtU/top-tracks?market=ID",
          trackParameters
        )
          .then(response => response.json())
          .then(data => {
            setTracks(data.tracks);
          });
      }
    };

    findTopTrack().catch(console.error);
  }, [accessToken]);

  const findTopVideo = async () => {
    var videoParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };

    var returnTopVideo = await fetch(
      "https://www.googleapis.com/youtube/v3/search?channelId=UCHF0NFFfBeyBWKBFpJQsAqQ&order=viewCount&maxResults=6&key=AIzaSyCmFHBZT8KT1nWsmoAZNyTc92ISYLPs-1U",
      videoParameters
    )
      .then(response => response.json())
      .then(data => {
        setVideos(data.items);
      });
  };
  findTopVideo().catch(console.error);

  const findDataYoutube = async () => {
    var dataParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    };

    var returnDataYoutube = await fetch(
      "https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=UCHF0NFFfBeyBWKBFpJQsAqQ&key=AIzaSyCmFHBZT8KT1nWsmoAZNyTc92ISYLPs-1U",
      dataParameters
    )
      .then(response => response.json())
      .then(data => {
        setDatas(data);
      });
  };
  findDataYoutube().catch(console.error);

  const useScript = url => {
    useEffect(() => {
      const script = document.createElement("script");
      script.src = url;
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }, [url]);
  };

  return (
    <>
      <div id="home" className="relative hero min-h-screen">
        <div className="hero-overlay bg-opacity-20"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-full">
            <h1 className="mb-5 text-8xl uppercase font-black font-sans tracking-wide drop-shadow-2xl">
              Mill West
            </h1>
            <p className="italic">Hi, Helo!</p>
          </div>
        </div>
        <a
          href="#discography"
          className="absolute bottom-0 btn btn-circle btn-ghost animate-bounce"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 512 512"
            className="w-4 h-4 fill-white"
          >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
          </svg>
        </a>
      </div>
      <div className="navbar sticky top-0 border-b bg-base-100 justify-center z-50">
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 md:gap-16">
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#discography">Discography</a>
            </li>
            <li>
              <a href="#video">Video</a>
            </li>
            <li>
              <a href="#follow">Follow</a>
            </li>
          </ul>
        </div>
      </div>
      <div
        id="discography"
        className="bg-base-100 py-20 flex justify-center items-center"
      >
        <div>
          <div className="relative text-4xl text-center font-bold font-sans uppercase z-10 mb-20">
            Discography
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-5xl text-center font-extrabold font-sans uppercase opacity-10">
              Discography
            </div>
          </div>

          <div className="container px-4 lg:px-0">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
              {tracks.map((track, i) => {
                return (
                  <div key={track.id} className="relative">
                    <a href={track.external_urls.spotify} target="_blank">
                      <img
                        className="w-full h-full shadow-lg"
                        src={track.album.images[0].url}
                        alt={track.name}
                      />
                      <div className="bg-black absolute top-0 w-full h-full p-2 text-center text-white flex justify-center items-center flex-col opacity-0 transition-all duration-500 hover:opacity-100">
                        <div className="text-sm">
                          {track.album.release_date}
                        </div>
                        <div className="font-bold uppercase mt-1">
                          {track.name}
                        </div>
                      </div>
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        id="video"
        className="bg-primary text-white py-20 flex justify-center items-center"
      >
        <div>
          <div className="relative text-4xl text-center font-bold font-sans uppercase z-10 mb-20">
            Video
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-5xl text-center font-extrabold font-sans uppercase opacity-10">
              Video
            </div>
          </div>
          <div className="container mb-10">
            <div className="w-full flex justify-center items-center overflow-x-auto">
              <div className="stats shadow">
                <div className="stat place-items-center">
                  <div className="hidden">
                    {useScript("https://apis.google.com/js/platform.js")}
                  </div>
                  <div
                    className="g-ytsubscribe"
                    data-channelid="UCHF0NFFfBeyBWKBFpJQsAqQ"
                    data-layout="full"
                    data-count="hidden"
                  ></div>
                </div>
                <div className="stat place-items-center">
                  <div className="stat-title">Subscriber</div>
                  <div className="stat-value text-secondary">
                    {datas &&
                    datas.items &&
                    datas.items[0] &&
                    datas.items[0].statistics.subscriberCount
                      ? datas.items[0].statistics.subscriberCount
                      : "•••"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container flex items-center justify-center px-4 lg:px-0">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {videos.map((video, i) => {
                return (
                  <Youtube
                    key={video.id.videoId}
                    videoId={video.id.videoId}
                    opts={opts}
                    onReady={onReady}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        id="follow"
        className="bg-base-100 text-primary py-20 flex justify-center items-center"
      >
        <div>
          <div className="relative text-4xl text-center font-bold font-sans uppercase z-10 mb-20">
            Follow
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-5xl text-center font-extrabold font-sans uppercase opacity-10">
              Follow
            </div>
          </div>
          <div className="container inline-flex gap-5 px-4 lg:px-0">
            <div className="tooltip tooltip-info" data-tip="Instagram">
              <a
                href="https://www.instagram.com/ilhamw26"
                target="_blank"
                className="btn btn-md btn-circle hover:btn-info hover:fill-neutral-content"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                  className="w-6 h-6"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </a>
            </div>
            <div className="tooltip tooltip-error" data-tip="YouTube">
              <a
                href="https://www.youtube.com/@ilhamw26"
                target="_blank"
                className="btn btn-md btn-circle hover:btn-error hover:fill-neutral-content"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 576 512"
                  className="w-6 h-6"
                >
                  <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
                </svg>
              </a>
            </div>
            <div className="tooltip tooltip-success" data-tip="Spotify">
              <a
                href="https://open.spotify.com/artist/6EIUY852nN8YhRsqqZHJtU?si=DSZuuQRbT-Spyy9cfq2oHQ"
                target="_blank"
                className="btn btn-md btn-circle hover:btn-success hover:fill-neutral-content"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 496 512"
                  className="w-6 h-6"
                >
                  <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z" />
                </svg>
              </a>
            </div>
            <div className="tooltip" data-tip="TikTok">
              <a
                href="https://www.tiktok.com/@mill.west"
                target="_blank"
                className="btn btn-md btn-circle hover:btn-primary hover:fill-neutral-content"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 448 512"
                  className="w-6 h-6"
                >
                  <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer footer-center p-10 bg-primary text-white">
        <aside>
          <p className="font-bold">
            Develop by{" "}
            <a
              href="https://linktr.ee/oortsky/"
              target="_blank"
              className="tracking-tighter italic"
            >
              BayuAprio.
            </a>
          </p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a href="https://www.x.com/Oortsky" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a href="https://www.youtube.com/@oortsky" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a href="https://www.instagram.com/oortsky" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 448 512"
                className="fill-current"
              >
                <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
};

export default App;
