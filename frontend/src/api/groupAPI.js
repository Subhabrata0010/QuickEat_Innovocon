import axios from "axios";

const API_BASE_URL = "http://localhost:8000/groups";

export const createGroup = async (creatorId) => {
  if (!creatorId) return { error: "User ID is missing" };

  try {
    console.log("📤 Sending creatorId to backend:", creatorId); // ✅ Debug API request

    const response = await axios.post(
      "http://localhost:8000/groups/create",
      { creatorId },
      { withCredentials: true }
    );

    console.log("✅ API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ API ERROR:", error.response?.data || error);
    return { error: error.response?.data?.message || "Server error. Please try again." };
  }
};


export const joinGroup = async (groupId, userId) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${groupId}/join`, { userId });
    return response.data;
  } catch (error) {
    console.error("Error joining group:", error);
    return { error: error.response?.data?.message || "Something went wrong" };
  }
};

export const fetchUserGroups = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching groups:", error);
    return { error: error.response?.data?.message || "Something went wrong" };
  }
};
