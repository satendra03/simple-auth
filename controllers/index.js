import { getUser } from "../services/auth.js";

export const showHome = async (req, res, next) => {
    const token = req.cookies.sessionId;
    const user = getUser(token);
    if (user) {
      return res.redirect(
        `/users/${user._doc.email}?name=${encodeURIComponent(user._doc.name)}`
      );
    }
    res.render("home", { title: "Home" });
}

export const showSignup = async (req, res, next) => {
    res.render("signup");
};

export const showLogin = async (req, res, next) => {
    res.render("login");
}

export const logoutUser = async (req, res, next) => {
    res.clearCookie("sessionId");
    res.redirect("/");
}