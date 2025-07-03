import Job from "../models/jobSchema.js";

export const getJobs = async (req, res) => {
  const userId = req.user.userId;

  if (!userId) {
    res.status(401).json({ message: "unauthorized" });
  }

  try {
    const allJobs = await Job.find({ companyId: userId });
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

export const updateJob = async (req, res) => {
  const userId = req.user.userId;
  const jobId = req.params.id;

  const { title, shortDescription, longDescription, skills, offers } = req.body;

  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const dataToUpdate = {};
  if (skills !== undefined) dataToUpdate.skills = skills;
  if (longDescription !== undefined)
    dataToUpdate.longDescription = longDescription;
  if (offers !== undefined) dataToUpdate.offers = offers;
  if (title !== undefined) dataToUpdate.title = title;
  if (shortDescription !== undefined)
    dataToUpdate.shortDescription = shortDescription;

  try {
    const updatedJob = await Job.findByIdAndUpdate(
      { companyId: userId },
      dataToUpdate,
      { new: true }
    );
    res.status(201).json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "updating job failed" });
  }
};

export const deleteJob = async (req, res) => {
  const userId = req.user.userId;
  const jobId = req.params.id;
  if (!userId) {
    res.status(401).json({ message: "unauthorized" });
  }
  try {
    const deletedJob = await Job.findByIdAndDelete(jobId);
    res.status(201).json(deletedJob);
  } catch (error) {
    res.status(500).json({ message: "deleting job failed" });
  }
};
