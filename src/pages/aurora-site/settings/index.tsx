"use client";

import type React from "react";
import { useState } from "react";
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

interface SettingItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  control: React.ReactNode;
}

interface SettingSection {
  title: string;
  description: string;
  items: SettingItem[];
}

const SettingsPage: React.FC = () => {
  const [notifications, setNotifications] = useState<boolean>(true);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [language, setLanguage] = useState<string>("english");
  const [emailUpdates, setEmailUpdates] = useState<boolean>(true);
  const [autoBackup, setAutoBackup] = useState<boolean>(false);
  const [apiAccess, setApiAccess] = useState<boolean>(false);
  const [encryption, setEncryption] = useState<string>("aes-256");

  const settingsSections: SettingSection[] = [
    {
      title: "Account Settings",
      description: "Manage your account information and preferences",
      items: [
        {
          icon: <Globe className="w-5 h-5" />,
          title: "Language",
          description: "Choose your preferred language",
          control: (
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
              </SelectContent>
            </Select>
          ),
        },
        {
          icon: <Moon className="w-5 h-5" />,
          title: "Dark Mode",
          description: "Toggle dark mode on or off",
          control: <Switch checked={darkMode} onCheckedChange={setDarkMode} />,
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
            <Switch
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          ),
        },
        {
          icon: <Mail className="w-5 h-5" />,
          title: "Email Updates",
          description: "Receive email notifications for important updates",
          control: (
            <Switch checked={emailUpdates} onCheckedChange={setEmailUpdates} />
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
            <Button onClick={() => console.log("Setup 2FA")}>Setup</Button>
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
            <Switch checked={autoBackup} onCheckedChange={setAutoBackup} />
          ),
        },
        {
          icon: <Network className="w-5 h-5" />,
          title: "API Access",
          description: "Enable API access for third-party integrations",
          control: (
            <Switch checked={apiAccess} onCheckedChange={setApiAccess} />
          ),
        },
        {
          icon: <Lock className="w-5 h-5" />,
          title: "Encryption Level",
          description: "Choose the encryption level for your data",
          control: (
            <Select value={encryption} onValueChange={setEncryption}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select encryption" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aes-256">AES-256</SelectItem>
                <SelectItem value="aes-192">AES-192</SelectItem>
                <SelectItem value="aes-128">AES-128</SelectItem>
              </SelectContent>
            </Select>
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
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
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
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
