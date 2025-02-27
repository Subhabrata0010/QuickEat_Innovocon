import Group from "../models/group.model.js";
import User from "../models/user.model.js"; // Assuming a User model exists

// Create a new group (only creator added initially)
export const createGroup = async (req, res) => {
  try {
    const { creatorId } = req.body;

    // Ensure creator exists
    const creator = await User.findById(creatorId);
    if (!creator) {
      return res.status(404).json({ message: "Creator not found" });
    }

    // Create group with creator as first member
    const newGroup = new Group({
      members: [creatorId],
    });

    await newGroup.save();
    res.status(201).json({ message: "Group created", groupId: newGroup._id });
  } catch (error) {
    console.error("Error creating group:", error);
    res.status(500).json({ message: "Server error" });
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
