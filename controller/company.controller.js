import User from "../models/userSchema.js";

export const addJob = async (req, res) => {
  const userId = req.user.userId;

  const { title, shortDescription, longDescription, skills, offers } = req.body;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const data = {
    title,
    shortDescription,
    companyId: userId,
  };
  if (skills !== undefined) data.skills = skills;
  if (longDescription !== undefined) data.longDescription = longDescription;
  if (offers !== undefined) data.offers = offers;

  try {
    await User.create(data);
  } catch (error) {}
};
