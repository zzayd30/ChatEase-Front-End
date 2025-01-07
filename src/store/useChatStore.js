import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  messages: [],
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
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    console.log(messageData);
    const { selectedUser, messages = [] } = get();
    const currentMessages = Array.isArray(messages) ? messages : [];
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
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to send message.";
      toast.error(errorMessage);
    }
  },
  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    // const socket = useAuthStore.getState().socket;

    // socket.on("newMessage", (newMessage) => {
    //   const isMessageSentFromSelectedUser =
    //     newMessage.senderId === selectedUser._id;
    //   if (!isMessageSentFromSelectedUser) return;

    //   set({
    //     messages: [...get().messages, newMessage],
    //   });
    // });
  },

  unsubscribeFromMessages: () => {
    // const socket = useAuthStore.getState().socket;
    // socket.off("newMessage");
  },
  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
