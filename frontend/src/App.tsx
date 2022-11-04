import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Input from "./components/atoms/Input";
import InputTransfer from "./components/atoms/InputTransfer";
import { useBankStore } from "./utils/useBank";
import Navbar from "./components/molecules/Navbar";
import Table from "./components/molecules/Table";

function App() {

  const people = useBankStore((state) => state.people)
  const setPeople = useBankStore((state) => state.setPeople)
  const user = useBankStore((state) => state.user)
  const setUser = useBankStore((state) => state.setUser)
  const data = useBankStore((state) => state.data)
  const setData = useBankStore((state) => state.setData)

  const fetchData = async () => {
    let response = await axios.get("http://0.0.0.0:8000");
    setData(response.data);
  };
  const fetchPeople = async () => {
    let response = await axios.get("http://0.0.0.0:8000/people");
    setPeople(response.data);
    setUser(response.data[0]);
  };
  const resetData = async () => {
    let response = await axios.post("http://0.0.0.0:8000/reset/");
    setData(response.data);
  };

  const topUp = async (person: string, amount: number) => {
    let response = await axios.post("http://0.0.0.0:8000/topup/", {person, amount});
    setData(response.data);
  };

  const withdraw = async (person: string, amount: number) => {
    let response = await axios.post("http://0.0.0.0:8000/withdraw/", {person, amount});
    setData(response.data);
  };

  useEffect(() => {
    fetchPeople();
    fetchData();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="m-4">
        <Table />
        <div className="text-xl font-bold">Your actions</div>
        <div className="form-control space-y-4">
          <Input label="Top up" user={user} callback={topUp} />
          <Input label="Withdraw"  user={user} max={parseInt(data[user]) || 1000} callback={withdraw} />
          <button className="btn" onClick={() => resetData()}>Reset Funds</button>
        </div>
      </div>
    </div>
  );
}

export default App;
