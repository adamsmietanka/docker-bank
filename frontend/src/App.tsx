import React, { useEffect } from "react";
import "./App.css";
import Input from "./components/atoms/Input";
import { useBankStore } from "./utils/useBank";
import Navbar from "./components/molecules/Navbar";
import Table from "./components/molecules/Table";

function App() {

  const user = useBankStore((state) => state.user)
  const data = useBankStore((state) => state.data)
  const withdraw = useBankStore((state) => state.withdraw)
  const topUp = useBankStore((state) => state.topUp)
  const fetchPeople = useBankStore((state) => state.fetchPeople)
  const fetchData = useBankStore((state) => state.fetchData)
  const resetData = useBankStore((state) => state.resetData)

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
          <Input label="Top up" callback={topUp} />
          <Input label="Withdraw"  callback={withdraw} max={parseInt(data[user]) || 1000} />
          <button className="btn" onClick={() => resetData()}>Reset Funds</button>
        </div>
      </div>
    </div>
  );
}

export default App;
