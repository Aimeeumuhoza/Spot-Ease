import { create } from "zustand";
const ParkStore = create((set) => ({
  parks: [
    {
      pricePerHour: 0,
      slodId: null,
      CarId: null,
      date: null,
      startTime: null,
      endtime: null,
      duration: 0,
      TotalPrice: 0,
    },
  ],
  setParks: (parks) => set(() => ({ parks })),
}));

export { ParkStore };
