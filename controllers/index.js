export const showHome = async (req, res, next) => {
    res.render("home", { title: "Home" });
}

export const showSignup = async (req, res, next) => {
    res.render("signup");
};

export const showLogin = async (req, res, next) => {
    res.render("login");
}