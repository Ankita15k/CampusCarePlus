import { useState } from "react";
import { Send, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Captcha from "../../utils/Captcha";
import { Upload } from "lucide-react";
import { generateReportId } from "../../utils/generateReportId";
import submitIssue from "../../utils/submitissue";
import IssuePreview from "./IssuePreview";
import { requestNotificationPermission } from "../../utils/requestNotificationPermission";

const SubmitIssue = () => {
  const [anonymous, setAnonymous] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [captchaToken, SetcaptchaToken] = useState(null);
  const [isSubmitting, setisSubmitting] = useState(false);
  const [imageFile, setimageFile] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    contact: "",
    category: "",
    location: "",
    description: "",
    image: null,
    reportId: generateReportId(),
  });

  const categories = [
    "Hostel Issues",
    "Hygiene & Sanitation",
    "WiFi & Internet",
    "Electricity & Power",
    "Harassment",
    "Ragging",
    "Faculty Concerns",
    "Infrastructure",
    "Food & Mess",
    "Library",
    "Other",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image size must be less than 2 MB");
      e.target.value = "";
      return;
    }
    setimageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!captchaToken) {
    toast.error("verify captcha first");
    return;
  }

  if (!anonymous && (!form.name || !form.contact)) {
    toast.error("Name and contact are required");
    return;
  }

  setisSubmitting(true);
  const toastId = toast.loading("Reporting");

  try {
    // notification permission
    const fcmToken = await requestNotificationPermission();

    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("contact", form.contact);
    formData.append("description", form.description);
    formData.append("category", form.category);
    formData.append("anonymous", anonymous);
    formData.append("location", form.location);
    formData.append("token", captchaToken);
    formData.append("image", imageFile);
    formData.append("id", form.reportId);

    
    if (fcmToken) {
      formData.append("fcmToken", fcmToken);
    }

    const form_data = await submitIssue(formData);

    if (form_data) {
      toast.success("Report submitted", { id: toastId });
      setShowOverlay(true);
    } else {
      toast.error("failed to submit", { id: toastId });
    }

  } catch (err) {
    console.error(err);
    toast.error("Something went wrong", { id: toastId });
  } finally {
    setisSubmitting(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-700 text-white px-8 py-6">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <ShieldCheck className="text-white-600 w-7 h-7" />
            <span className="text-xl font-bold text-white-900">
              Campus<span className="text-emerald-200">Care</span>
            </span>
          </div>
          <p className="text-emerald-100 mt-1">
            Report a campus issue safely and responsibly
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Anonymous Toggle */}
          <div className="flex items-center justify-between bg-blue-50 border border-emerald-100 rounded-lg p-4">
            <div>
              <h3 className="font-semibold text-emerald-900">
                Submit Anonymously
              </h3>
              <p className="text-sm text-gray-600">
                Your identity will not be stored or shared
              </p>
            </div>

            <button
              type="button"
              onClick={() => setAnonymous(!anonymous)}
              className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition ${anonymous ? "bg-emerald-500" : "bg-gray-300"
                }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full cursor-pointer shadow transform transition ${anonymous ? "translate-x-7" : ""
                  }`}
              />
            </button>
          </div>

          {/* Identity Section */}
          {!anonymous && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-emerald-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact (Email / Phone) *
                </label>
                <input
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-emerald-900"
                  required
                />
              </div>
            </div>
          )}

          {/* Issue Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issue Category *
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-emerald-900"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location *
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Block / Room / Area"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-emerald-900"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issue Description *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-emerald-900"
              placeholder="Describe your issue here...."
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label
              htmlFor="imageUpload"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload Image (Optional)
            </label>

            <div className="border-2 border-dashed rounded-lg p-4 text-center hover:border-emerald-600 transition-colors">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="imageUpload"
              />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer text-emerald-700 font-medium flex items-center justify-center gap-2"
              >
                <Upload />
                Click to upload image
              </label>

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-4 max-h-48 mx-auto rounded-lg border"
                />
              )}
            </div>
          </div>

          <Captcha onVerify={SetcaptchaToken} />

          {/* Submit */}

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-colors
              ${isSubmitting
                ? "bg-gray-400 cursor-not-allowed text-gray-200"
                : "bg-emerald-900 hover:bg-emerald-800 text-white cursor-pointer"
              }`}
          >
            <Send />
            {anonymous ? "Submit Issue Anonymously" : "Submit Issue"}
          </button>
        </form>
      </div>

      {showOverlay && (
        <IssuePreview
          form={form}
          anonymous={anonymous}
          onClose={() => {
            setShowOverlay(false);
            navigate("/");
          }}
        />
      )}


    </div>
  );
};

export default SubmitIssue;
