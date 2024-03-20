import { create } from "zustand";

const AppStore = create((set) => ({
  showRealApp: false,
  SetshowRealApp: (showRealApp) => set(() => ({ showRealApp })),
}));

export { AppStore };
