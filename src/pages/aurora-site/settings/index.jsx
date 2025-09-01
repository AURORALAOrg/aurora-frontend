import {
  Bell,
  Database,
  Globe,
  Lock,
  Mail,
  Moon,
  Network,
  Shield,
} from "lucide-react";
import { useState } from "react";
import logger from "@/lib/logger";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("english");
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [autoBackup, setAutoBackup] = useState(false);
  const [apiAccess, setApiAccess] = useState(false);
  const [encryption, setEncryption] = useState("aes-256");

  const settingsSections = [
    {
      title: "Account Settings",
      description: "Manage your account information and preferences",
      items: [
        {
          icon: <Globe className="w-5 h-5" />,
          title: "Language",
          description: "Choose your preferred language",
          control: (
            <select
              className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border bg-blue-700 text-white border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="english">English</option>
              <option value="spanish">Spanish</option>
              <option value="french">French</option>
            </select>
          ),
        },
        {
          icon: <Moon className="w-5 h-5" />,
          title: "Dark Mode",
          description: "Toggle dark mode on or off",
          control: (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          ),
        },
      ],
    },
    {
      title: "Notifications",
      description: "Customize how you receive notifications",
      items: [
        {
          icon: <Bell className="w-5 h-5" />,
          title: "Push Notifications",
          description: "Receive push notifications for important updates",
          control: (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          ),
        },
        {
          icon: <Mail className="w-5 h-5" />,
          title: "Email Updates",
          description: "Receive email notifications for important updates",
          control: (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={emailUpdates}
                onChange={(e) => setEmailUpdates(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          ),
        },
      ],
    },
    {
      title: "Privacy & Security",
      description: "Manage your privacy and security settings",
      items: [
        {
          icon: <Shield className="w-5 h-5" />,
          title: "Two-Factor Authentication",
          description: "Add an extra layer of security to your account",
          control: (
            <button
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => logger.info("Setup 2FA clicked")}
            >
              Setup
            </button>
          ),
        },
      ],
    },
    {
      title: "Advanced Options",
      description: "Configure advanced settings and features",
      items: [
        {
          icon: <Database className="w-5 h-5" />,
          title: "Automatic Backup",
          description: "Enable automatic backup of your data",
          control: (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={autoBackup}
                onChange={(e) => setAutoBackup(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          ),
        },
        {
          icon: <Network className="w-5 h-5" />,
          title: "API Access",
          description: "Enable API access for third-party integrations",
          control: (
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={apiAccess}
                onChange={(e) => setApiAccess(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          ),
        },
        {
          icon: <Lock className="w-5 h-5" />,
          title: "Encryption Level",
          description: "Choose the encryption level for your data",
          control: (
            <select
              className="mt-1 block w-48 pl-3 pr-10 py-2 text-base border bg-blue-700 text-white border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
              value={encryption}
              onChange={(e) => setEncryption(e.target.value)}
            >
              <option value="aes-256">AES-256</option>
              <option value="aes-192">AES-192</option>
              <option value="aes-128">AES-128</option>
            </select>
          ),
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 flex flex-col items-center">
        <div className="w-full max-w-4xl px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage your account settings and preferences
            </p>
          </div>

          <div className="space-y-8">
            {settingsSections.map((section, index) => (
              <div
                key={index}
                className="bg-white shadow rounded-lg overflow-hidden"
              >
                <div className="px-6 py-5">
                  <h2 className="text-lg font-medium text-gray-900">
                    {section.title}
                  </h2>
                  <p className="mt-1 text-sm text-gray-600">
                    {section.description}
                  </p>

                  <div className="mt-6 space-y-6">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0 text-gray-500">
                            {item.icon}
                          </div>
                          <div className="ml-3">
                            <p className="text-sm font-medium text-gray-900">
                              {item.title}
                            </p>
                            <p className="text-sm text-gray-500">
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <div className="ml-4">{item.control}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
