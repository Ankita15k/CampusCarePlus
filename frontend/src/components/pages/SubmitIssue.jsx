import { useState } from "react";
import addData from "../../utils/addData";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Captcha from "../../utils/Captcha";
import { Send, Upload } from "lucide-react";

const SubmitIssue = () => {
  const [anonymous, setAnonymous] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [captchaToken , SetcaptchaToken] = useState(null)
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    contact: "",
    category: "",
    location: "",
    description: "",
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

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!anonymous && (!form.name || !form.contact)) {
      alert("Name and contact are required when anonymous mode is off.");
      return;
    }
   const toastId  = toast.loading("Reporting")
  const report = await addData(form)
  
  if(report){
    
    toast.success("Report submitted..", {id:toastId});
    navigate("/")
    

  
  }

  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-emerald-700 text-white px-8 py-6">
          <h1 className="text-2xl font-bold">
            CampusCare
          </h1>
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
                  <option key={cat} value={cat}>{cat}</option>
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
            <label htmlFor="imageUpload" className="block text-sm font-medium text-gray-700 mb-2">
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
                <Upload/>
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

          { !anonymous ? (<button
            type="submit"
            className="cursor-pointer w-full bg-emerald-900 hover:bg-emerald-800 text-white py-3 rounded-xl font-semibold text-lg flex items-center justify-center gap-2"
          >
            <Send />
            Submit Issue
          </button>) : (<button
            type="submit"
            className="cursor-pointer w-full bg-emerald-900 hover:bg-emerald-800 text-white py-3 rounded-xl font-semibold text-lg flex items-center justify-center gap-2"
          >
            <Send />
            Submit Issue Anonymously
          </button>)}
        </form>
      </div>
    </div>
  );
};

export default SubmitIssue;
