const URL = require("../models/url");
const short_id = require("short-id");

async function handleGenerateNewShortURL(req, res) {
    try {
        const { input } = req.body;

        if (!input) {
            return res.status(400).json({ error: "URL is required" });
        }

        if (!req.user) {
            return res.redirect("/login");
        }

        const id = short_id.generate();

        const newUrl = await URL.create({
            ShortId: id,
            redirectURL: input,
            visitHistory: [],
            createdBy: req.user.id,
        });

        return res.render("showShortUrl", {
            url: newUrl,
            shortUrl: `https://urlshortener/${id}`,
        });
    } catch (error) {
        console.error("Error generating short URL:", error);
        return res.status(500).render("error", { message: "Internal Server Error" });
    }
}

async function handleGetWebPageFromShortId(req, res) {
    try {
        const { ShortId } = req.params;

        const entry = await URL.findOneAndUpdate(
            { ShortId },
            {
                $push: {
                    visitHistory: { timestamp: Date.now() },
                },
            },
            { new: true } // Return the updated document
        );

        if (entry) {
            return res.redirect(entry.redirectURL);
        }

        return res.status(404).render("error", { message: "Short URL not found" });
    } catch (error) {
        console.error("Error resolving short URL:", error);
        return res.status(500).render("error", { message: "Internal Server Error" });
    }
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetWebPageFromShortId,
};
