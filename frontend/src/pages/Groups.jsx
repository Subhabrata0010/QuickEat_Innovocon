import React, { useState, useEffect } from "react";
import { createGroup, joinGroup, fetchUserGroups } from "../api/groupAPI";
import { useSelector } from "react-redux";

const Groups = () => {
  const { user } = useSelector((state) => state.auth);

  console.log("Logged-in user:", user);

  const [groupId, setGroupId] = useState("");
  const [groups, setGroups] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && user._id) {
      loadUserGroups();
    }
  }, [user]);

  const loadUserGroups = async () => {
    setLoading(true);
    const result = await fetchUserGroups(user._id);
    setLoading(false);

    if (!result.error) {
      setGroups(result.groups);
    } else {
      setMessage(result.error);
    }
  };

  const handleCreateGroup = async () => {
    if (!user || !user._id) return alert("You need to sign in first.");

    console.log("Sending creatorId:", user._id);
    setLoading(true);

    const result = await createGroup(user._id);
    setLoading(false);

    if (result.groupId) {
      alert(`Group Created! Share this ID: ${result.groupId}`);
      loadUserGroups(); // Refresh groups
    } else {
      alert(result.error);
    }
  };

  const handleJoinGroup = async () => {
    if (!user) return alert("You need to sign in first.");
    if (!groupId) return alert("Enter a Group ID to join.");

    setLoading(true);
    const result = await joinGroup(groupId, user._id);
    setLoading(false);

    if (!result.error) {
      alert("Successfully joined the group!");
      loadUserGroups(); // Refresh groups
    } else {
      setMessage(result.error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Manage Your Groups
      </h1>

      {/* Group Actions (Mobile & Desktop Friendly) */}
      <div className="flex flex-col md:flex-row items-center justify-center mb-6 space-y-3 md:space-y-0 md:space-x-4">
        <button
          onClick={handleCreateGroup}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 w-full md:w-auto"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Group"}
        </button>
        <div className="flex space-x-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Enter Group ID"
            className="border p-2 rounded-md w-full md:w-64"
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
          />
          <button
            onClick={handleJoinGroup}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full md:w-auto"
            disabled={loading}
          >
            {loading ? "Joining..." : "Join Group"}
          </button>
        </div>
      </div>

      {/* Display Groups */}
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Groups You Have Joined
        </h2>
        {loading ? (
          <p className="text-gray-500 text-center">Loading groups...</p>
        ) : groups.length > 0 ? (
          <ul className="space-y-3">
            {groups.map((group) => (
              <li
                key={group._id}
                className="p-4 border rounded-lg shadow-sm bg-gray-50 hover:bg-gray-100 transition"
              >
                <p className="text-lg font-bold text-gray-800">
                  Group ID: {group._id}
                </p>
                <p className="text-gray-700">
                  Members: {group.members.length}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-center">
            You haven't joined any groups yet.
          </p>
        )}
      </div>

      {message && (
        <p className="mt-4 text-red-500 text-center font-semibold">{message}</p>
      )}
    </div>
  );
};

export default Groups;
