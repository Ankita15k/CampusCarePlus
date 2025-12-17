import { ShieldCheck, Mail, FileText } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* Top */}
        <div className="flex flex-col md:flex-row justify-between gap-12">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 text-white mb-4">
              <ShieldCheck className="text-emerald-500" />
              <span className="text-lg font-semibold">
                Campus<span className="text-emerald-500">Care</span>
              </span>
            </div>
            <p className="max-w-sm text-sm text-gray-400 leading-relaxed">
              A secure and anonymous platform designed to help students and
              institutions address campus issues responsibly and transparently.
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="text-gray-300 font-semibold mb-3">Platform</p>
              <ul className="space-y-2">
                <li className="hover:text-white cursor-pointer">How It Works</li>
                <li className="hover:text-white cursor-pointer">Categories</li>
                <li className="hover:text-white cursor-pointer">Report Issue</li>
              </ul>
            </div>

            <div>
              <p className="text-gray-300 font-semibold mb-3">Legal</p>
              <ul className="space-y-2">
                <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer">Terms of Service</li>
                <li className="hover:text-white cursor-pointer">Security</li>
              </ul>
            </div>

            <div>
              <p className="text-gray-300 font-semibold mb-3">Support</p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 hover:text-white cursor-pointer">
                  <Mail size={16} /> Contact
                </li>
                <li className="flex items-center gap-2 hover:text-white cursor-pointer">
                  <FileText size={16} /> Documentation
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-10" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Campus Care. All rights reserved.
          </p>
          <p className="mt-4 md:mt-0">
            Built with privacy-first architecture
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
