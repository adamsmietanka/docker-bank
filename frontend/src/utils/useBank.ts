import axios from "axios";
import create from "zustand";

interface BankState {
  user: string;
  people: string[];
  data: Record<string, string>;
  setUser: (user: string) => void;
  fetchPeople: () => void;
  fetchData: () => void;
  resetData: () => void;
  withdraw: (amount: number) => void;
  topUp: (amount: number) => void;
  transfer: (to: string, amount: number) => void;
}

axios.defaults.baseURL = 'http://0.0.0.0:8000/';

export const useBankStore = create<BankState>()((set, get) => ({
  user: "",
  people: [],
  data: {},
  setUser: (user) => set((state) => ({ user })),
  fetchPeople: async () => {
    let response = await axios.get("people/");
    set((state) => ({ people: response.data, user: response.data[0] }));
  },
  fetchData: async () => {
    let response = await axios.get("");
    set((state) => ({ data: response.data }));
  },
  resetData: async () => {
    let response = await axios.post("reset/");
    set((state) => ({ data: response.data }));
  },
  withdraw: async (amount) => {
    let response = await axios.post("withdraw/", {
      user: get().user,
      amount,
    });
    set((state) => ({ data: response.data }));
  },
  topUp: async (amount) => {
    let response = await axios.post("topup/", {
      user: get().user,
      amount,
    });
    set((state) => ({ data: response.data }));
  },
  transfer: async (to, amount) => {
    let response = await axios.post("transfer/", {
      from: get().user,
      to,
      amount,
    });
    set((state) => ({ data: response.data }));
  },
}));
