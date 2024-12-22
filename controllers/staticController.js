const URL = require("../models/url");

async function handleHomePage(req, res) {
    try {
        const user = req.user;
        if (!user) {
            return res.render("home", {
                user: null,
            });
        }
        res.render("home", {
            user: user,
        });
    } catch (error) {
        console.error("Error in handleHomePage:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function handleShowResponsePage(req, res) {
    try {
        const user = req.user;
        if (!user) {
            return res.redirect("/");
        }
        const urls = await URL.find({ createdBy: req.user.id });
        return res.render("showShortUrl", {
            shortUrl: null,
            urls: urls,
        });
    } catch (error) {
        console.error("Error in handleShowResponsePage:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function handleShowAllUrls(req, res) {
    try {
        const user = req.user;
        if (!user) {
            return res.redirect("/");
        }

        const urls = await URL.find({ createdBy: req.user.id });
        return res.render("showAllUrls", {
            urls: urls,
        });
    } catch (error) {
        console.error("Error in handleShowAllUrls:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function handleSingUp(req, res) {
    try {
        return res.render("signup");
    } catch (error) {
        console.error("Error in handleSingUp:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function handleLogin(req, res) {
    try {
        return res.render("login");
    } catch (error) {
        console.error("Error in handleLogin:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = {
    handleHomePage,
    handleShowResponsePage,
    handleShowAllUrls,
    handleSingUp,
    handleLogin,
};
