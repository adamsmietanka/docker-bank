import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [people, setPeople] = useState([]);
  const [user, setUser] = useState("");
  const [data, setData] = useState({});

  const fetchData = async () => {
    let response = await axios.get("http://0.0.0.0:8000");
    setData(() => response.data);
  };
  const fetchPeople = async () => {
    let response = await axios.get("http://0.0.0.0:8000/people");
    setPeople(() => response.data);
    setUser(() => response.data[0]);
  };
  const resetData = async () => {
    let response = await axios.post("http://0.0.0.0:8000/reset/");
    setData(() => response.data);
  };

  useEffect(() => {
    fetchPeople();
    fetchData();
  }, []);
  return (
    <div>
      <div className="navbar bg-base-200">
        <div className="flex-1">
          <a href="/" className="btn btn-ghost normal-case text-xl">
            DockerBank
          </a>
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
              <ul className="p-2 bg-base-100 z-10">
                {people.map((p) => (
                  <li key={p} className={`${p === user && "disabled"}`}>
                    <a onClick={() => setUser(() => p)}>{p}</a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <div className="m-4">
        <div className="text-xl font-bold">Funds</div>
        <div className="overflow-x-auto m-4">
          <table className="table table-zebra w-full z-1">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Balance</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {people.map((person, id) => (
                <tr key={person}>
                  <th>{id + 1}</th>
                  <td>{person}</td>
                  <td>{data[person]}</td>
                  <td>
                    {person !== user && (
                      <div className="form-control">
                        <div className="input-group">
                          <input
                            type="text"
                            placeholder="Enter amount"
                            className="input input-bordered"
                          />
                          <button className="btn">Transfer</button>
                        </div>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
