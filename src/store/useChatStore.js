import { create } from "zustand";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../lib/axios.js";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create((set, get) => ({
  messages: [], // Ensure this is an empty array by default
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data || [] });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const currentMessages = get().getValidMessages({ messages });
    if (!selectedUser || !selectedUser._id) {
      toast.error("No recipient selected.");
      return;
    }
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      console.log("Message sent successfully:", res.data);
      if (!res.data) throw new Error("Invalid response from server");
      set({ messages: [...currentMessages, res.data] });
      toast.success("Message sent successfully");
      get().getMessages(selectedUser._id);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to send message.";
      toast.error(errorMessage);
    }
  },
  subscribeToMessages: () => {
    get().unsubscribeFromMessages();
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;
      get().getMessages(selectedUser._id);
      set((state) => {
        const currentMessages = Array.isArray(state.messages)
          ? state.messages
          : [];
        return { messages: [...currentMessages, newMessage] };
      });
    });
  },
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket || !socket.connected) {
      console.warn("Socket is not connected or not available.");
      return;
    }
    socket.off("newMessage");
    console.log("Unsubscribed from newMessage event.");
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  getValidMessages: (state) => Array.isArray(state.messages) ? state.messages : [],
}));
