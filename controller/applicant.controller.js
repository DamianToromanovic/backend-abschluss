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
  const { title } = req.query;

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

export const applyForJob = async (req, res) => {
  const userId = req.user.userId;
  const jobId = req.params.id;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      res.status(404).json({ message: "Job not found" });
      return;
    }

    if (job.applicants.includes(userId)) {
      res
        .status(400)
        .json({ message: "You have already applied for this job" });
      return;
    }

    job.applicants.push(userId);
    await job.save();

    res.status(200).json({ message: "Application successful" });
  } catch (error) {
    console.log("apply for job failed", error);
    res.status(500).json({ message: "Applying for job failed" });
  }
};
