const express = require("express");
const { home } = require("../controllers/campuscare");
const upload = require("../middlewares/upload");
const tokenVerify = require("../middlewares/recaptcha");
const {submitIssue, getIssueDetail, getAllIssues} = require("../controllers/issue.controller");
const adminAuth = require("../middlewares/adminAuth");

const router = express.Router();

router
  .post("/", (req, res) => {
    res.status(200).json({
      status: true,
    });
  })
  .post("/submit", upload.single("image"), tokenVerify, submitIssue)
  .get("/issues/:reportId",getIssueDetail)
  .get("/admin/allissues",adminAuth,getAllIssues)

module.exports = router;
