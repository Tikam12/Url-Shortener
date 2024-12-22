const jwtBlacklist = require("../middlewares/jwtBlackList");
const User = require("../models/user");
const { setUser } = require("../service/auth");
const bcrypt = require("bcrypt");

async function handleUserSignup(req, res) {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            name,
            email,
            password: hashedPassword,
        });

        return res.redirect("/login");
    } catch (error) {
        console.error("Error in handleUserSignup:", error);
        return res.status(500).render("signup", {
            error: "An error occurred during signup. Please try again.",
        });
    }
}

async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.render("login", {
                error: "Invalid username or password!",
            });
        }

        const token = setUser(user);
        res.cookie("uid", token, { httpOnly: true });
        res.locals.user = user.id;
        return res.redirect("/");
    } catch (error) {
        console.error("Error in handleUserLogin:", error);
        return res.status(500).render("login", {
            error: "An error occurred during login. Please try again.",
        });
    }
}

async function handleUserLogout(req, res) {
    try {
        const token = req.cookies?.uid;
        if (token) {
            jwtBlacklist.add(token);
        }

        res.clearCookie("uid");
        return res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in handleUserLogout:", error);
        return res.status(500).json({ message: "An error occurred during logout. Please try again." });
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
    handleUserLogout,
};
