const express = require("express");
const router  = express.Router();
const { checkForAuthentication } = require("../middlewares/auth");

const { 
    handleHomePage, 
    handleShowResponsePage,
    handleShowAllUrls,
    handleSingUp,
    handleLogin
} = require("../controllers/staticController");

// this all route are use the Method GET bcz we only fetch the frontend pages
router.get("/", checkForAuthentication,handleHomePage );
router.get("/showShortUrl", checkForAuthentication, handleShowResponsePage );
router.get("/showAllUrls",checkForAuthentication, handleShowAllUrls);
router.get("/signup", handleSingUp );
router.get("/login", handleLogin );

module.exports = router;