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

module.exports = submitIssue;
