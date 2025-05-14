import { ref } from "vue";
import axios from "axios";
import { useAuthStore } from "@/store/auth";
import { User } from "../models/User";

export function useUsers() {
  const auth = useAuthStore();
  const users = ref<User[]>([]);
  const loadingUser = ref(false);

  // Fetch all users
  const fetchUsers = async (): Promise<User[]> => {
    loadingUser.value = true;
    try {
      const response = await axios.get("auth/api/users/", {
        headers: { Authorization: `TOKEN ${auth.token}` },
      });
      users.value = response.data;
      return users.value;
    } finally {
      loadingUser.value = false;
    }
  };

  // Create a new user
  const createUser = async (user: User): Promise<User> => {
    const response = await axios.post("auth/api/users/", user, {
      headers: { Authorization: `TOKEN ${auth.token}` },
    });
    return response.data;
  };

  // Update an existing user
  const updateUser = async (user: User): Promise<User> => {
    const response = await axios.put(`auth/api/users/${user.id}/`, user, {
      headers: { Authorization: `TOKEN ${auth.token}` },
    });
    return response.data;
  };

  // Delete a user by ID
  const deleteUserById = async (userId: number): Promise<void> => {
    await axios.delete(`auth/api/users/${userId}/`, {
      headers: { Authorization: `TOKEN ${auth.token}` },
    });
  };

  return { fetchUsers, createUser, updateUser, deleteUserById, users, loadingUser };
}
