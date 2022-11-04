import React, { useState } from "react";

interface Props {
  label: string;
  max?: number;
  from: string;
  to: string;
  callback: (from: string, to: string, amount: number) => void;
}

const InputTransfer = ({ label, max, from, to, callback }: Props) => {
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
      <button className="btn" onClick={() => callback(from, to, value)}>
        {label}
      </button>
    </div>
  );
};

export default InputTransfer;
