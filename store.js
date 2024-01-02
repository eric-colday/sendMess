import axios from "axios";
import { create } from "zustand";

export const postsStore = create((set) => ({
  posts: [],
  likes: [],
  getPosts: async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/posts");
      const sortedPosts = res.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      set({ posts: sortedPosts });

      // Obtenez les likes
      const likesRes = await axios.get("http://localhost:8800/api/likes");
      set({ likes: likesRes.data });
    } catch (error) {
      console.log(error);
    }
  },
}));

export const usersStore = create((set) => ({
  users: [],
  getUsers: async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/users");
      set({ users: res.data });
    } catch (error) {
      console.log(error);
    }
  },
}));

export const followingsStore = create((set) => ({
  followings: [],
  getFollowings: async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/relationships");
      set({ followings: res.data });
    } catch (error) {
      console.log(error);
    }
  },
}));
