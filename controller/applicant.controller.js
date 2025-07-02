import Job from "../models/jobSchema.js";

export const getJobs = async (req, res) => {
  const userId = req.user.userId;

  if (!userId) {
    res.status(401).json({ message: "unauthorized" });
  }

  try {
    const allJobs = await Job.find();
    res.status(201).json(allJobs);
  } catch (error) {
    res.status(500).json({ message: "getting jobs failed" });
  }
};

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
    const newJob = await Job.create(data);
    res.status(201).json(newJob);
  } catch (error) {
    console.log("addJOb failed", error);
    res.status(500).json({ message: "Adding Job Failed" });
  }
};
