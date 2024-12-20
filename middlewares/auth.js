import { getUser } from "../services/auth.js";

export const restrictUser = (req, res, next) => {
    const sessionId = req.cookies.sessionId;
    if (!sessionId) {
        return res.redirect("/login");
    }
    const user = getUser(sessionId);
    if (!user) {
        return res.redirect("/login");
    }
    res.user = user;
    next();
}