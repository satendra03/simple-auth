// Description: All user related functions are implemented here
import Users from "../models/users.js";
import { v4 as uuidv4 } from 'uuid';
import { setUser } from "../services/auth.js";

// create a new user
export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const newUser = await Users.create({
      name,
      email,
      password,
    });
    return res.redirect(
      `/users/${newUser.email}?name=${encodeURIComponent(newUser.name)}`
    );
  } catch (error) {
    let errorMessage = error.message;
    if (error.code === 11000) {
      errorMessage = `${Object.keys(error.keyValue)
        .join(", ")
        .toUpperCase()} already exists.`;
    }
    return res.status(400).render("signup", {
      message: errorMessage,
    });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).render("login", {
      error: "Missing required fields",
    });
  }
  try {
    const user = await Users.findOne({ email, password });
    if (!user) {
      return res
        .status(400)
        .render("login", { message: "Invalid credentials" });
    }
    const sessionId = uuidv4(); 
    setUser(sessionId, user);
    res.cookie("sessionId", sessionId);
    return res.redirect(
      `/users/${user.email}?name=${encodeURIComponent(user.name)}`
    );
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

export const getUserProfile = async (req, res) => {
  const { email } = req.params;
  const { name } = req.query;

  // Validate or process the parameters
  if (!email || !name) {
    return res
      .status(400)
      .render("error", { message: "Missing required parameters" });
  }

  // Render the user profile with the extracted data
  return res.render("home", {
    title: name,
    user: { email, name },
  });
};
