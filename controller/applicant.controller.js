import Job from "../models/jobSchema.js";

export const getJobs = async (req, res) => {
  const userId = req.user.userId;

  if (!userId) {
    res.status(401).json({ message: "unauthorized" });
  }

  try {
    const allJobs = await Job.find();
    if (!allJobs) {
      res.status(404).json({ message: "No jobs found" });
    }
    res.status(201).json(allJobs);
  } catch (error) {
    res.status(500).json({ message: "getting jobs failed" });
  }
};

export const getAllFiltered = async (req, res) => {
  const userId = req.user.userId;
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const filteredJobs = await Job.find({
      title: { $regex: title, $options: "i" },
    });

    if (!filteredJobs) {
      res.status(404).json({ message: "Go and learn C#" });
      return;
    }

    res.status(201).json(filteredJobs);
  } catch (error) {
    console.log("find filtered jobs failed", error);
    res.status(500).json({ message: "find filtered jobs failed" });
  }
};
