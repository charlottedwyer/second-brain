import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [dailySummary, setDailySummary] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // currently no theme switching, placeholder
  const [autoBackup, setAutoBackup] = useState(true);

  return (
    <div className="p-6 font-serif text-black bg-white min-h-screen">
      <h2 className="text-3xl font-bold mb-4">Settings</h2>
      <p className="mb-6 text-sm">Adjust your preferences and app configurations here.</p>

      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 border rounded-lg">
          <span>Enable Notifications</span>
          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
          />
        </div>

        <div className="flex justify-between items-center p-4 border rounded-lg">
          <span>Daily Summary Email</span>
          <input
            type="checkbox"
            checked={dailySummary}
            onChange={() => setDailySummary(!dailySummary)}
          />
        </div>

        <div className="flex justify-between items-center p-4 border rounded-lg">
          <span>Dark Mode (placeholder)</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>

        <div className="flex justify-between items-center p-4 border rounded-lg">
          <span>Automatic Backup</span>
          <input
            type="checkbox"
            checked={autoBackup}
            onChange={() => setAutoBackup(!autoBackup)}
          />
        </div>
      </div>
    </div>
  );
}

