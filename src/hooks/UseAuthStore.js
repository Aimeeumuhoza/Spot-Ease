import { create } from "zustand";

const useAuthStore = create((set) => ({
  AuthStatus: false,
  AuthToken: null,
  AuthProfile: {},
  setAuthStatus: (status) => set({ AuthStatus: status }),
  setAuthToken: (token) => set({ AuthToken: token }),
  setAuthProfile: (profile) => set({ AuthProfile: profile }),
}));

export default useAuthStore;
