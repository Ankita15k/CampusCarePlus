const { admin } = require("../config/firebase");

const sendNotification = async ({
  token,
  title = "CampusCare Notification",
  body = "",
  data = {},
}) => {
  if (!token) {
    console.warn("⚠️ No FCM token provided");
    return false;
  }


  const safeData = {};
  for (const key in data) {
    if (data[key] !== undefined && data[key] !== null) {
      safeData[key] = String(data[key]);
    }
  }

  const message = {
    token,
    notification: {
      title,
      body,
    
    },
    data: safeData,
  };

  try {
    const response = await admin.messaging().send(message);
    // console.log("Notification sent:", response);
    return true;
  } catch (error) {
    console.error(" Notification error:", error.code, error.message);
    return false;
  }
};

module.exports = sendNotification;
