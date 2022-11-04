import create from "zustand";

interface BankState {
  user: string;
  people: string[];
  data: Record<string, string>;
  setUser: (user: string) => void;
  setPeople: (people: string[]) => void;
  setData: (data: Record<string, string>) => void;
}

export const useBankStore = create<BankState>()((set) => ({
  user: "",
  people: [],
  data: {},
  setUser: (user) => set((state) => ({ user })),
  setPeople: (people) => set((state) => ({ people })),
  setData: (data) => set((state) => ({ data })),
}));
