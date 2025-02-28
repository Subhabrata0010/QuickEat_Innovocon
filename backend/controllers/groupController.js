import Group from "../models/group.model.js";
import User from "../models/user.model.js"; // Assuming a User model exists
import mongoose from "mongoose";

// Create a new group (only creator added initially)
export const createGroup = async (req, res) => {
  try {
    let { creatorId } = req.body;
    console.log("🔍 Received creatorId:", creatorId); // ✅ Log incoming request

    if (!creatorId) {
      return res.status(400).json({ message: "creatorId is required" });
    }

    if (!mongoose.Types.ObjectId.isValid(creatorId)) {
      console.error("❌ Invalid ObjectId format:", creatorId);
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const creator = await User.findById(creatorId);
    if (!creator) {
      console.error("❌ Creator not found in database:", creatorId);
      return res.status(404).json({ message: "Creator not found in database" });
    }

    const newGroup = new Group({ members: [creatorId] });
    await newGroup.save();

    console.log("✅ Group created successfully:", newGroup);
    res.status(201).json({ message: "Group created successfully", groupId: newGroup._id });
  } catch (error) {
    console.error("❌ FULL SERVER ERROR:", error); // ✅ Print full error to debug
    res.status(500).json({ message: "Internal server error. Please try again." });
  }
};


// Join a group manually using groupId
export const joinGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;

    // Validate user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find group and add user
    const group = await Group.findByIdAndUpdate(
      groupId,
      { $addToSet: { members: userId } }, // Prevents duplicates
      { new: true }
    ).populate("members", "name email");

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    res.status(200).json({ message: "Joined group successfully", group });
  } catch (error) {
    console.error("Error joining group:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUserGroups = async (req, res) => {
  try {
    const { userId } = req.params;
    const groups = await Group.find({ members: userId }).populate("members", "name email");
    res.status(200).json({ groups });
  } catch (error) {
    console.error("Error fetching user groups:", error);
    res.status(500).json({ message: "Server error" });
  }
};