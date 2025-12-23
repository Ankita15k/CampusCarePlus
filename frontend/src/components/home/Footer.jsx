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

          <div className="flex flex-col items-center justify-center gap-6 py-10 bg-gray-900 text-white">
  {/* Attribution Text */}
  <div className="text-center space-y-1">
    <h4 className="text-lg font-medium tracking-wide">A Joint Student Collaboration Initiative</h4>
    <p className="text-sm text-gray-400">
      Designed and developed by Team <span className="text-emerald-400 ml-1">DivineDevs</span>
    </p>
  </div>

  {/* Logos Container */}
  <div className="flex items-center justify-center gap-10 sm:gap-16">
    <div className="text-center space-y-2 text-sm text-gray-400">
      <img 
      src=".\images\sec.png" 
      alt="SEC Sasaram" 
      className="h-16 sm:h-20 w-auto filter drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]" 
      />
      <p>SEC, Sasaram</p>
    </div>

    <img 
      src=".\images\logo.png" 
      alt="Website Logo" 
      className="h-16 sm:h-20 w-auto filter drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]" 
    />

    <div className="text-center items-center space-y-2 text-sm text-gray-400">
      <img 
      src=".\images\img.png" 
      alt="GSSSIETW" 
      className="h-16 sm:h-20 w-auto ml-7 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]" 
    />
      <p>GSSSIETW, Mysore</p>
    </div>
    
  </div>
</div>


            {/* <div className="flex items-center justify-center gap-8 py-6">
              
              <img src=".\images\sec.png" alt="Shershah Engineering College" className="h-20 w-auto transition filter drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
              
              <img src=".\images\logo.png" alt="Website logo" className="h-20 w-auto transition" />
              
              <img src=".\images\img.png" alt="College Logo" className="h-20 w-auto transition filter drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]" />
            </div> */}


          <p className="mt-4 md:mt-0">
            Built with privacy-first architecture
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
