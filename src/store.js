import { create } from 'zustand'

export const useBearStore = create((set) => ({
  bears: 0,
  increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}))

export const useUserData = create((set) => ({
  users: [],

  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  
  updateUser: (index, updatedUser) => {
    let newUsers = [...users];
    newUsers[index] = updatedUser;
    set({ users: newUsers });
  },
  deleteUser: (index) => {
    let newUsers = [...users.slice(0, index), ...users.slice(index + 1)];
    set({ users: newUsers });
  },
}));

export const useUsername = create((set) => ({
  username: "",
  setUsername: (newUsername) => set((state) => ({ username: newUsername })),

}));


