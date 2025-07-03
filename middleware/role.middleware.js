export const isCompany = async (req, res, next) => {
  console.log("req.user", req.user);
  if (req.user?.role !== "company" || !req.user) {
    res.status(403).json({ message: "only for companies" });
    return;
  }
  next();
};
