import { useState } from "react";
import { ShieldCheck, ImagePlus } from "lucide-react";
import addData from "../../utils/addData";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Captcha from "../../utils/Captcha";
import { generateToken } from "../../utils/generateToken";

const categories = [
  "Hostel",
  "Hygiene",
  "Electricity",
  "WiFi",
  "Faculty",
  "Ragging",
  "Harassment",
  "Classrooms",
];

const SubmitIssue = () => {
  const [anonymous, setAnonymous] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [captchaToken, setCaptchaToken] = useState(null);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    contact: "",
    category: "",
    location: "",
    description: "",
    reportId :generateToken(),
    image: null,
  });

  const categories = [
    'Hostel Issues',
    'Hygiene & Sanitation',
    'WiFi & Internet',
    'Electricity & Power',
    'Harassment',
    'Ragging',
    'Faculty Concerns',
    'Infrastructure',
    'Food & Mess',
    'Library',
    'Other'
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({ ...form, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      toast.error("Please verify captcha first");
      return;
    }

    if (!anonymous && (!form.name || !form.contact)) {
      toast.error("Name and contact are required");
      return;
    }

    const toastId = toast.loading("Submitting report...");

    const report = await addData({
      ...form,
      anonymous,
      captchaToken,
    });

    if (report) {
      toast.success("Report submitted successfully", { id: toastId });
      navigate("/");
    } else {
      toast.error("Failed to submit report", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">

        {/* Header */}
        <div className="bg-emerald-700 text-white px-8 py-6">
          <div className="flex items-center gap-2">
            <ShieldCheck />
            <h1 className="text-2xl font-bold">
              Campus<span className="text-emerald-300">Care</span>
            </h1>
          </div>
          <p className="text-emerald-100 mt-1">
            Report a campus issue safely and anonymously
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8">

          {/* Anonymous Toggle */}
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-xl p-5">
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
              className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition ${
                anonymous ? "bg-emerald-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full cursor-pointer shadow transform transition ${
                  anonymous ? "translate-x-7" : ""
                }`}
              />
            </button>
          </div>

          {/* Identity */}
          {!anonymous && (
            <div className="grid md:grid-cols-2 gap-5">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                className="input"
                required
              />
              <input
                name="contact"
                value={form.contact}
                onChange={handleChange}
                placeholder="Email or phone"
                className="input"
                required
              />
            </div>
          )}

          {/* Issue Details */}
          <div className="grid md:grid-cols-2 gap-5">
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="input"
              required
            >
              <option value="">Select issue category</option>
              {categories.map((cat, i) => (
                <option key={i}>{cat}</option>
              ))}
            </select>

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location (Block / Room / Area)"
              className="input"
              required
            />
          </div>

          {/* Description */}
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Describe the issue in detail"
            className="input"
            required
          />

          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Upload Image (optional)
            </label>
            <div className="border-2 border-dashed border-emerald-200 rounded-xl p-6 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="imageUpload"
              />
              <label
                htmlFor="imageUpload"
                className="inline-flex items-center gap-2 cursor-pointer text-emerald-700 font-medium"
              >
                <ImagePlus />
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

          {/* Captcha */}
          <Captcha onVerify={setCaptchaToken} />

          {/* Submit */}

          { !anonymous ? (<button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-semibold text-lg transition"
          >
            Submit Issue Securely
          </button>
        </form>
      </div>

      {/* Input utility */}
      <style>
        {`
          .input {
            width: 100%;
            padding: 12px 14px;
            border-radius: 12px;
            border: 1px solid #e5e7eb;
            outline: none;
          }
          .input:focus {
            border-color: #059669;
            box-shadow: 0 0 0 2px rgba(5,150,105,0.2);
          }
        `}
      </style>
    </div>
  );
};

export default SubmitIssue;
