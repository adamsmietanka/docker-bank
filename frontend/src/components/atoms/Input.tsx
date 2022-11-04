import React, { useState } from "react";

interface Props {
  label: string;
  max?: number;
  user: string;
  to?: string;
  callback: (person: string, amount: number) => void;
}

const Input = ({ label, max, user, to, callback }: Props) => {
  const [value, setValue] = useState(0);
  return (
    <div className="input-group">
      <input
        type="number"
        placeholder="Enter amount"
        className="input input-bordered"
        value={value}
        onChange={(e) => setValue(() => parseInt(e.target.value))}
        max={max}
        min={0}
      />
      <button className="btn" onClick={() => callback(user, value)}>
        {label}
      </button>
    </div>
  );
};

export default Input;
