const express = require("express");
const upload = require("../middlewares/upload");
const tokenVerify = require("../middlewares/recaptcha");
const {submitIssue, getIssueDetail, getAllIssues, getIssueDetailAdmin , markResolved, markInProgress, markRejected, getIssueStats} = require("../controllers/issue.controller");
const adminAuth = require("../middlewares/adminAuth");


const router = express.Router();

router
  .get("/", (req, res) => {
    res.status(200).json({
      status: true,
    });
  })
  .post("/submit", upload.single("image"), tokenVerify, submitIssue)
  .get("/issues/:reportId",getIssueDetail)
  .get("/admin/allissues",adminAuth,getAllIssues)
  .get("/admin/issues/:reportId",adminAuth,getIssueDetailAdmin)


  // update issues
  .put("/admin/issues/resolve/:reportId", adminAuth, markResolved)
  .put("/admin/issues/progress/:reportId", adminAuth, markInProgress)
  .put("/admin/issues/reject/:reportId", adminAuth, markRejected)
  .get("/admin/issues/data/all", adminAuth, getIssueStats)
module.exports = router;
