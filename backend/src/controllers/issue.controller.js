const { db, admin } = require("../config/firebase");
const generateIssueMeta = require("../utils/geminiSummary");
const uploadToCloudinary = require("../utils/uploadImage");

const submitIssue = async (req, res) => {
  try {
    const { name, description, category, anonymous, contact, location, id } =
      req.body;

    if (!description || !category) {
      return res
        .status(400)
        .json({ message: "Description and category are required" });
    }

    const [aiData, imageResult] = await Promise.all([
      generateIssueMeta({ category, location, description }),
      req.file ? uploadToCloudinary(req.file.buffer) : Promise.resolve(null),
    ]);

    const issueData = {
      id: id,
      name: anonymous === "true" ? null : name,
      contact: anonymous === "true" ? null : contact,
      description,
      category,
      location: location || null,
      anonymous: anonymous === "true",
      status: "pending",

      summary: aiData.summary,
      priority: aiData.priority,
      aiReason: aiData.reason,

      imageUrl: imageResult?.secure_url || null,
      imagePublicId: imageResult?.public_id || null,

      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    };

    const docRef = await db.collection("issues").add(issueData);

    return res.status(201).json({
      success: true,
      issueId: docRef.id,
      summary: aiData.summary,
      priority: aiData.priority,
      imageUrl: issueData.imageUrl,
    });
  } catch (error) {
    console.error("Submit Issue Error:", error);
    return res.status(500).json({ message: "Issue submission failed" });
  }
};

const getIssueDetail = async (req, res) => {
  const { reportId } = req.params;
  // console.log(reportId);

  const snapshot = await db
    .collection("issues")
    .where("id", "==", reportId)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return res.status(404).json({ message: "Issue not found" });
  }

  const issue = snapshot.docs[0].data();

  // console.log(issue);
  res.json({
    reportId: issue.id,
    title: issue.summary,
    category: issue.category,
    attachment: issue.imageUrl,
    description: issue.description,
    status: issue.status,
    location: issue.location,
    resolvingRemark: issue.resolvingRemark ? issue.resolvingRemark : null,
    resolvedAt:issue.resolvedAt ? issue.resolvedAt.toDate().toISOString() : null,
    processingRemark: issue.processingRemark ? issue.processingRemark : null,
    inProgressAt:issue.inProgressAt ? issue.inProgressAt.toDate().toISOString() : null,
    rejectionemark: issue.rejectionemark ? issue.rejectionemark : null,
    rejectedAt:issue.rejectedAt ? issue.rejectedAt.toDate().toISOString():null,
    createdAt: issue.createdAt ? issue.createdAt.toDate().toISOString() : null,
    submittedBy: issue.anonymous ? "anonymous" : issue.name,
  });
};

const getAllIssues = async (req, res) => {
  try {
    const snapshot = await db
      .collection("issues")
      .orderBy("createdAt", "desc") // newest first
      .get();

    const issues = snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: data.id || doc.id,
        category: data.category || null,
        location: data.location || null,
        status: data.status || null,
        priority: data.priority || null,
        date: data.createdAt ? data.createdAt.toDate().toISOString() : null,
      };
    });

    return res.status(200).json({
      success: true,
      count: issues.length,
      issues,
    });
  } catch (error) {
    console.error("Get All Issues Error:", error);
    return res.status(500).json({ message: "Failed to fetch issues" });
  }
};

const getIssueDetailAdmin = async (req, res) => {
  const { reportId } = req.params;
  //  console.log(reportId)

  const snapshot = await db
    .collection("issues")
    .where("id", "==", reportId)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return res.status(404).json({ message: "Issue not found" });
  }

  const issue = snapshot.docs[0].data();

  res.json({
    reportId: issue.id,
    aiSummary: issue.aiReason,
    contact: issue.contact,
    title: issue.summary,
    category: issue.category,
    attachment: issue.imageUrl,
    description: issue.description,
    location: issue.location,
    status: issue.status,
    priority: issue.priority,
    resolvingRemark: issue.resolvingRemark,
    resolvedAt:issue.resolvedAt && issue.resolvedAt.toDate().toISOString(),
    processingRemark: issue.processingRemark,
    inProgressAt:issue.inProgressAt && issue.inProgressAt.toDate().toISOString(),
    rejectionemark: issue.rejectionemark,
    rejectedAt:issue.rejectedAt && issue.rejectedAt.toDate().toISOString(),
    createdAt: issue.createdAt ? issue.createdAt.toDate().toISOString() : null,
    submittedBy: issue.anonymous ? "anonymous" : issue.name,
  });
};

const markResolved = async (req, res) => {
  const { reportId } = req.params;
  const { remark } = req.body;

  if (!reportId || !remark) {
    return res.status(400).json({
      message: "Report ID and remark are required",
    });
  }

  try {
    const snapshot = await db
      .collection("issues")
      .where("id", "==", reportId)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({
        message: "Issue not found",
      });
    }

    const issueDoc = snapshot.docs[0];
    const issueRef = db.collection("issues").doc(issueDoc.id);

    await issueRef.update({
      status: "Resolved",
      resolvingRemark: remark,
      resolvedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({
      message: "Issue marked as resolved successfully",
      reportId,
    });
  } catch (error) {
    console.error("Mark resolved error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const markInProgress = async (req, res) => {
  const { reportId } = req.params;
  const { remark } = req.body;

  if (!reportId || !remark) {
    return res.status(400).json({
      message: "Report ID and remark are required",
    });
  }

  try {
    const snapshot = await db
      .collection("issues")
      .where("id", "==", reportId)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({
        message: "Issue not found",
      });
    }

    const issueDoc = snapshot.docs[0];
    const issueRef = db.collection("issues").doc(issueDoc.id);
    const issueData = issueDoc.data();

    if (issueData.status === "Resolved") {
      return res.status(400).json({
        message: "Resolved issue cannot be moved back to In Progress",
      });
    }

    await issueRef.update({
      status: "In Progress",
      processingRemark: remark,
      inProgressAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({
      message: "Issue marked as In Progress successfully",
      reportId,
    });
  } catch (error) {
    console.error("Mark In Progress error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const markRejected = async (req, res) => {
  const { reportId } = req.params;
  const { remark } = req.body;

  if (!reportId || !remark) {
    return res.status(400).json({
      message: "Report ID and remark are required",
    });
  }

  try {
    const snapshot = await db
      .collection("issues")
      .where("id", "==", reportId)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({
        message: "Issue not found",
      });
    }

    const issueDoc = snapshot.docs[0];
    const issueRef = db.collection("issues").doc(issueDoc.id);
    const issueData = issueDoc.data();

    if (issueData.status === "Resolved") {
      return res.status(400).json({
        message: "Resolved issue cannot be rejected",
      });
    }

    if (issueData.status === "Rejected") {
      return res.status(400).json({
        message: "Issue is already rejected",
      });
    }

    await issueRef.update({
      status: "Rejected",
      rejectionemark: remark,
      rejectedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({
      message: "Issue marked as rejected successfully",
      reportId,
    });
  } catch (error) {
    console.error("Mark rejected error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


module.exports = {
  getIssueDetail,
  submitIssue,
  getAllIssues,
  getIssueDetailAdmin,
  markResolved,
  markInProgress,
  markRejected,
};
