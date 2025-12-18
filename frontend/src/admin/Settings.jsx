import { useState } from 'react';
import { User, Bell, Shield, LogOut, Save, SaveIcon } from 'lucide-react';

export default function Settings() {
  const [profile, setProfile] = useState({
    name: 'Admin User',
    email: 'admin@campuscare.edu',
    role: 'Administrator'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true
  });

  const [preferences, setPreferences] = useState({
    theme: 'Light',
    defaultView: 'Dashboard'
  });

  const handleSave = () => {
    console.log('Profile:', profile);
    console.log('Notifications:', notifications);
    console.log('Preferences:', preferences);
    alert('Settings saved successfully');
  };

  return (
    <div className="space-y-6 max-w-4xl p-8">

      <Section title="Profile Settings" icon={<User />}>
        <Input
          label="Full Name"
          value={profile.name}
          onChange={e => setProfile({ ...profile, name: e.target.value })}
        />
        <Input
          label="Email Address"
          value={profile.email}
          onChange={e => setProfile({ ...profile, email: e.target.value })}
        />
        <Input label="Role" value={profile.role} disabled />
      </Section>

      <Section title="Notification Preferences" icon={<Bell />}>
        <Toggle
          label="Email Notifications"
          checked={notifications.email}
          onChange={() =>
            setNotifications({ ...notifications, email: !notifications.email })
          }
        />
        <Toggle
          label="Push Notifications"
          checked={notifications.push}
          onChange={() =>
            setNotifications({ ...notifications, push: !notifications.push })
          }
        />
        <Toggle
          label="Weekly Report Summary"
          checked={notifications.weekly}
          onChange={() =>
            setNotifications({ ...notifications, weekly: !notifications.weekly })
          }
        />
      </Section>

      <Section title="System Preferences" icon={<Shield />}>
        <Select
          label="Theme"
          value={preferences.theme}
          options={['Light', 'Dark']}
          onChange={e =>
            setPreferences({ ...preferences, theme: e.target.value })
          }
        />
        <Select
          label="Default View"
          value={preferences.defaultView}
          options={['Dashboard', 'Issues', 'Analytics']}
          onChange={e =>
            setPreferences({ ...preferences, defaultView: e.target.value })
          }
        />
      </Section>

      <div className="flex justify-between items-center">
        <button className="flex items-center gap-2 text-red-600 cursor-pointer hover:underline">
          <LogOut size={18} />
          Logout
        </button>

        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 cursor-pointer rounded hover:bg-emerald-700"
        >
          <SaveIcon size={18} />
          Save Settings
        </button>
      </div>
    </div>
  );
}

function Section({ title, icon, children }) {
  return (
    <div className="bg-white border rounded-lg p-6 space-y-4">
      <div className="flex items-center gap-2 text-gray-900">
        {icon}
        <h3 className="text-lg">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Input({ label, value, onChange, disabled }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <input
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full border rounded px-3 py-2 disabled:bg-gray-100"
      />
    </div>
  );
}

function Toggle({ label, checked, onChange }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-700">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4"
      />
    </div>
  );
}

function Select({ label, value, options, onChange }) {
  return (
    <div>
      <label className="block text-sm text-gray-600 mb-1">{label}</label>
      <select
        value={value}
        onChange={onChange}
        className="w-full border rounded px-3 py-2"
      >
        {options.map(opt => (
          <option key={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
