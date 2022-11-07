import { useBankStore } from "../../utils/useBank";
import InputTransfer from "../atoms/InputTransfer";

const Table = () => {

    const people = useBankStore((state) => state.people)
    const user = useBankStore((state) => state.user)
    const data = useBankStore((state) => state.data)
    const transfer = useBankStore((state) => state.transfer)
  return (
    <>
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
                    <InputTransfer
                      label="Transfer"
                      to={person}
                      callback={transfer}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
