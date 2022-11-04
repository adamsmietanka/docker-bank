import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [people, setPeople] = useState([]);
  const [user, setUser] = useState("");

  const fetchData = async () => {
    let response = await axios.get("http://0.0.0.0:8000");
    console.log(response.data);
  };
  const fetchPeople = async () => {
    let response = await axios.get("http://0.0.0.0:8000/people");
    setPeople(() => response.data);
    setUser(() => response.data[0]);
  };
  const resetData = async () => {
    let response = await axios.post("http://0.0.0.0:8000/reset/");
    console.log(response.data);
  };

  useEffect(() => {
    resetData();
    fetchPeople();
  }, []);
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">DockerBank</a>
      </div>
      <div className="flex-none">
        <p>Hi</p>
        <ul className="menu menu-horizontal p-0">
          <li tabIndex={0}>
            <a>
              {user}
              <svg
                className="fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
              >
                <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
              </svg>
            </a>
            <ul className="p-2 bg-base-100">
              {people
                .filter((u) => u !== user)
                .map((p) => (
                  <li>
                    <a onClick={() => setUser(() => p)}>{p}</a>
                  </li>
                ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;
