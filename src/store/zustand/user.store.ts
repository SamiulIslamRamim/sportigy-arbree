import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserState {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  fetchUser: (id: string) => Promise<void>;
  clearUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  isLoading: false,
  setUser: (user) => set({ user }),
  fetchUser: async (id: string) => {
    set({ isLoading: true });
    try {
      const res = await fetch(`/api/users/${id}`);
      const user = await res.json();
      set({ user, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },
  clearUser: () => set({ user: null }),
}));
