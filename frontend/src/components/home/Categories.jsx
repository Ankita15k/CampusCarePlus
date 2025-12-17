import {
  Home,
  Droplets,
  Zap,
  Wifi,
  User,
  AlertOctagon,
  ShieldAlert,
  School,
} from "lucide-react";

const categories = [
  { name: "Hostel", icon: Home },
  { name: "Hygiene", icon: Droplets },
  { name: "Electricity", icon: Zap },
  { name: "WiFi", icon: Wifi },
  { name: "Faculty", icon: User },
  { name: "Ragging", icon: AlertOctagon },
  { name: "Harassment", icon: ShieldAlert },
  { name: "Classrooms", icon: School },
];

const Categories = () => {
  return (
    <section className="py-28 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-emerald-600 font-semibold tracking-wide mb-3">
            COVERAGE
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Reportable Issue Categories
          </h2>
          <p className="mt-5 text-gray-600 text-lg">
            Campus Care supports a wide range of campus-related concerns —
            ensuring no issue goes unheard.
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={i}
                className="group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition">
                  <Icon size={28} />
                </div>

                <h3 className="font-semibold text-gray-900">
                  {cat.name}
                </h3>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-20 text-center max-w-2xl mx-auto">
          <p className="text-gray-700 text-lg">
            And more — Campus Care is designed to adapt to the unique needs of
            every institution.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Categories;
