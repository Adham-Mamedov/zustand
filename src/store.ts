import create from "zustand";
import {devtools, persist, subscribeWithSelector} from "zustand/middleware";

interface IUser {
  id: string;
  name: string;
}

export interface ISettingsStore {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export interface IUserStore {
  users: Array<IUser>;
  addUser: (user: IUser) => void;
  fetchUsers: () => void;
  removeUser: (id: string) => void;
}

let settingsStore: any = (set: any) => ({
  darkMode: false,
  toggleDarkMode: () => set((state: ISettingsStore) => ({darkMode: !state.darkMode}))
});

settingsStore = devtools(settingsStore);

let userStore: any = (set: any): IUserStore => ({
  users: [],
  addUser: (user: IUser) => set((state: IUserStore) => ({users: [...state.users, user]})),
  fetchUsers: async () => {
    const users = await fetch('https://jsonplaceholder.typicode.com/users?_limit=5').then(response => response.json());
    set((state: IUserStore) => ({users: [...state.users, ...users]}))
  },
  removeUser: id => set((state: IUserStore) => ({users: state.users.filter(user => user.id !== id)}))
});

userStore = devtools(userStore);
userStore = persist(userStore, {name: 'user_settings'});

export const useSettingsStore = create<ISettingsStore>()(settingsStore);
export const useUserStore = create<IUserStore>()(subscribeWithSelector(userStore));
useUserStore.subscribe(state => state.users, console.log)
