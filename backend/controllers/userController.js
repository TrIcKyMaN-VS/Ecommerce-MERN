const userModel = require("../models/userModel");

exports.addUser = async (req, res, next) => {
  const userDetails = req.body;

  try {
    // Check if the user already exists based on email
    const existingUser = await userModel.findOne({ email: userDetails.email });

    if (existingUser) {
      console.log("User already exists in DB:", existingUser);
      // Handle the case where the user already exists
      return res.status(400).json({ message: "User already exists" });
    } else {
      console.log("No user found in DB");
      // Create a new user with userDetails
      const newUser = new userModel(userDetails);
      await newUser.save();
      console.log("User saved:", newUser);
      // Return a success response
      return res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    }
  } catch (error) {
    console.log("Error:", error);
    // Handle any errors
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.addUser = async (req, res, next) => {
  const userLoginDetails = req.body;
  console.log(userLoginDetails);
};
