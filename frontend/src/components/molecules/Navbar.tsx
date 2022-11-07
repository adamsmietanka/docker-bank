import React from "react";
import { useBankStore } from "../../utils/useBank";

const Navbar = () => {
    const people = useBankStore((state) => state.people)
    const user = useBankStore((state) => state.user)
    const setUser = useBankStore((state) => state.setUser)
    
  return (
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
                  <a onClick={() => setUser(p)}>{p}</a>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
