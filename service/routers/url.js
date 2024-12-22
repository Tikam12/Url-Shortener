const express = require("express");
const router  = express.Router();

const{
    handleGenerateNewShortURL,
    handleGetWebPageFromShortId,
} = require("../controllers/url")


router.route("/").post( handleGenerateNewShortURL );
router.route("/:ShortId").get(handleGetWebPageFromShortId)

module.exports = router;