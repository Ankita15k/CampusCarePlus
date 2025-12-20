const { db, admin } = require("../config/firebase");
const generateIssueMeta = require("../utils/geminiSummary");
const uploadToCloudinary = require("../utils/uploadImage");


const submitIssue = async (req, res) => {
  try {
    const { name, description, category, anonymous, contact, location, id } = req.body;

    if (!description || !category) {
      return res.status(400).json({ message: "Description and category are required" });
    }

  
    const [aiData, imageResult] = await Promise.all([
      generateIssueMeta({ category, location, description }),
      req.file
        ? uploadToCloudinary(req.file.buffer)
        : Promise.resolve(null),
    ]);

    const issueData = {
      id:id,
      name: anonymous === "true" ? null : name,
      contact: anonymous === "true" ? null : contact,
      description,
      category,
      location: location || null,
      anonymous: anonymous === "true",
      status:"pending",
    
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

const getIssueDetail = async (req,res)=>{
 const { reportId } = req.params;
 console.log(reportId)

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
    title: issue.summary,
    category:issue.category,
    attachment:issue.imageUrl,
    description: issue.description,
    status: issue.status,
    createdAt:issue.createdAt
  ? issue.createdAt.toDate().toISOString()
  : null,
    submittedBy: issue.anonymous ? "anonymous": issue.name
  });

}

const getAllIssues = async (req, res) => {
  try {
    const snapshot = await db
      .collection("issues")
      .orderBy("createdAt", "desc") // newest first
      .get();

    const issues = snapshot.docs.map(doc => {
      const data = doc.data();

      return {
        id: data.id || doc.id, // use your custom reportId if present
        category: data.category || null,
        location: data.location || null,
        status: data.status || null,
        date: data.createdAt
          ? data.createdAt.toDate().toISOString()
          : null,
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


module.exports = { getIssueDetail,submitIssue,getAllIssues
};
