import { useState, useEffect } from "react";
import "./App.css";
import dummy from "./assets/dummy.png";

const CLIENT_ID = "d52e8a8b41b44ffea058928c8be6c1b9";
const CLIENT_SECRET = "c0e58df4c5b34fc58e39396d85544062";

const App = () => {
  const [accessToken, setAccessToken] = useState();
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    var authParameters = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
    };

    fetch('https://accounts.spotify.com/api/token', authParameters)
      .then(result => result.json())
      .then(data => setAccessToken(data.access_token));
  }, []);

  useEffect(() => {
    const findTopTrack = async () => {
      if (accessToken) {
        var trackParameters = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + accessToken
          }
        };

        var returnTopTrack = await fetch('https://api.spotify.com/v1/artists/6EIUY852nN8YhRsqqZHJtU/top-tracks?market=ID', trackParameters)
          .then(response => response.json())
          .then(data => {
            setTracks(data.tracks);
          });
      }
    };

    findTopTrack()
      .catch(console.error);
  }, [accessToken]);

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
      <div id="discography" className="py-28 bg-base-100">
        <div className="relative text-4xl text-center font-bold font-sans uppercase z-10 mb-20">
          Discography
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-5xl text-center font-extrabold font-sans uppercase opacity-10">
            Discography
          </div>
        </div>

        <div className="container px-4 md:px-0">
          <h1 className="text-start text-lg font-bold font-sans mb-5">
            Populer
          </h1>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
            {tracks.map((track, i) => {
              return (
                <div key={track.id} className="relative">
                  <a href={track.external_urls.spotify} target="_blank">
                    <img className="w-full h-full shadow-lg" src={track.album.images[0].url} alt={track.name} />
                    <div className="bg-black absolute top-0 w-full h-full p-2 text-center text-white flex justify-center items-center flex-col opacity-0 transition-all duration-500 hover:opacity-100">
                      <div className="text-sm">{track.album.release_date}</div>
                      <div className="font-bold uppercase mt-1">{track.name}</div>
                    </div>
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div id="video" className="py-28 bg-primary text-white">
        <div className="relative text-4xl text-center font-bold font-sans uppercase z-10 mb-20">
          Video
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-5xl text-center font-extrabold font-sans uppercase opacity-10">
            Video
          </div>
        </div>
      </div>

      <div id="follow" className="py-28 bg-base-100 text-primary">
        <div className="relative text-4xl text-center font-bold font-sans uppercase z-10 mb-20">
          Follow
          <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-5xl text-center font-extrabold font-sans uppercase opacity-10">
            Follow
          </div>
        </div>
      </div>

      <footer className="footer footer-center p-10 bg-primary text-white">
        <aside>
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
            className="inline-block fill-current"
          >
            <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
          </svg>
          <p className="font-bold">
            Develop by <a href="https://linktr.ee/oortsky/" target="_blank" className="tracking-tighter italic">BayuAprio.</a>
          </p>
          <p>Copyright © 2023 - All right reserved</p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
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
            <a>
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
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
};

export default App;
