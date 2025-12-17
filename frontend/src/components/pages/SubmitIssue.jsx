import { useState } from "react";
import addData from "../../utils/addData";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Captcha from "../../utils/Captcha";

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

    // console.log({ anonymous, ...form });

  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden">
        
        {/* Header */}
        <div className="bg-blue-900 text-white px-8 py-6">
          <h1 className="text-2xl font-bold">
            CampusCare<span className="text-emerald-400">+</span>
          </h1>
          <p className="text-blue-100 mt-1">
            Report a campus issue safely and responsibly
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">

          {/* Anonymous Toggle */}
          <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg p-4">
            <div>
              <h3 className="font-semibold text-blue-900">
                Submit Anonymously
              </h3>
              <p className="text-sm text-gray-600">
                Your identity will not be stored or shared
              </p>
            </div>

            <button
              type="button"
              onClick={() => setAnonymous(!anonymous)}
              className={`w-14 h-7 flex items-center rounded-full p-1 transition ${
                anonymous ? "bg-emerald-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-5 h-5 rounded-full shadow transform transition ${
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
                  Your Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-900"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contact (Email / Phone)
                </label>
                <input
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-900"
                  required
                />
              </div>
            </div>
          )}

          {/* Issue Info */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issue Category
              </label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-900"
                required
              >
                <option value="">Select category</option>
                <option>Hostel</option>
                <option>WiFi</option>
                <option>Hygiene</option>
                <option>Electricity</option>
                <option>Faculty</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Block / Room / Area"
                className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-900"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Issue Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-900"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image (Optional)
            </label>

            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="imageUpload"
              />
              <label
                htmlFor="imageUpload"
                className="cursor-pointer text-blue-700 font-medium"
              >
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
            className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-xl font-semibold text-lg"
          >
            Submit Issue
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitIssue;
