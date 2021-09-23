const { Router } = require("express");
const UserProfile = require("../../models/UserProfile");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const UserProfiles = await UserProfile.find();
    if (!UserProfiles) throw new Error("No UserProfiles");
    res.status(200).json(UserProfiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const newUserProfile = new UserProfile(req.body);
  console.log(newUserProfile);
  try {
    const UserProfile = await newUserProfile.save();
    if (!UserProfile)
      throw new Error("Something went wrong saving the UserProfile");
    res.status(200).json(UserProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const response = await UserProfile.findByIdAndUpdate(id, req.body);
    if (!response) throw Error("Something went wrong ");
    const updated = { ...response._doc, ...req.body };
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const removed = await UserProfile.findByIdAndDelete(id);

    if (!removed) throw Error("Something went wrong ");

    res.status(200).json(removed);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
