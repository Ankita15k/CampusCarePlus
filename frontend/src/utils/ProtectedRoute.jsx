import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";


const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white border rounded-xl shadow-sm px-8 py-6 flex flex-col items-center gap-4">
        
        <div className="relative">
          <div className="w-14 h-14 border-4 border-blue-200 rounded-full animate-spin"></div>
          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>

        <div className="text-center">
          <h2 className="text-lg text-gray-900">Authenticating</h2>
          <p className="text-sm text-gray-600">
            Verifying access and permissions…
          </p>
        </div>

      </div>
    </div>
  );
}

  return user ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
