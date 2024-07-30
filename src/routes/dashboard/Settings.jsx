import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Update from "@/components/buttons/Update";

const UserSettings = () => {
  const { setTheme, theme } = useTheme();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );
  const [activeSection, setActiveSection] = useState("Display Preferences");
  const [emailNotifications, setEmailNotifications] = useState(
    JSON.parse(localStorage.getItem("emailNotifications")) || false
  );
  const [emailFrequency, setEmailFrequency] = useState(
    localStorage.getItem("emailFrequency") || "Instant"
  );
  const [emailAlerts, setEmailAlerts] = useState(
    JSON.parse(localStorage.getItem("emailAlerts")) || {
      budgetAlerts: false,
      goalMilestones: false,
      accountIssues: false,
    }
  );
  const [mobileNotifications, setMobileNotifications] = useState(
    JSON.parse(localStorage.getItem("mobileNotifications")) || false
  );
  const [mobileFrequency, setMobileFrequency] = useState(
    localStorage.getItem("mobileFrequency") || "Instant"
  );
  const [mobileAlerts, setMobileAlerts] = useState(
    JSON.parse(localStorage.getItem("mobileAlerts")) || {
      budgetAlerts: false,
      goalMilestones: false,
      accountIssues: false,
    }
  );
  const [pushNotifications, setPushNotifications] = useState(
    JSON.parse(localStorage.getItem("pushNotifications")) || false
  );
  const [pushFrequency, setPushFrequency] = useState(
    localStorage.getItem("pushFrequency") || "Instant"
  );
  const [pushAlerts, setPushAlerts] = useState(
    JSON.parse(localStorage.getItem("pushAlerts")) || {
      budgetAlerts: false,
      goalMilestones: false,
      accountIssues: false,
    }
  );
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notifyUnreviewedTransactions, setNotifyUnreviewedTransactions] =
    useState(
      JSON.parse(localStorage.getItem("notifyUnreviewedTransactions")) || false
    );
  const [twoFactorAuth, setTwoFactorAuth] = useState(
    JSON.parse(localStorage.getItem("twoFactorAuth")) || false
  );
  const [fullName, setFullName] = useState(
    localStorage.getItem("fullName") || ""
  );
  const [birthday, setBirthday] = useState(
    localStorage.getItem("birthday") || ""
  );
  const [timezone, setTimezone] = useState(
    localStorage.getItem("timezone") || "IST"
  );
  const [dataSharing, setDataSharing] = useState(
    JSON.parse(localStorage.getItem("dataSharing")) || false
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("language", language);
    localStorage.setItem(
      "emailNotifications",
      JSON.stringify(emailNotifications)
    );
    localStorage.setItem("emailFrequency", emailFrequency);
    localStorage.setItem("emailAlerts", JSON.stringify(emailAlerts));
    localStorage.setItem(
      "mobileNotifications",
      JSON.stringify(mobileNotifications)
    );
    localStorage.setItem("mobileFrequency", mobileFrequency);
    localStorage.setItem("mobileAlerts", JSON.stringify(mobileAlerts));
    localStorage.setItem(
      "pushNotifications",
      JSON.stringify(pushNotifications)
    );
    localStorage.setItem("pushFrequency", pushFrequency);
    localStorage.setItem("pushAlerts", JSON.stringify(pushAlerts));
    localStorage.setItem(
      "notifyUnreviewedTransactions",
      JSON.stringify(notifyUnreviewedTransactions)
    );
    localStorage.setItem("twoFactorAuth", JSON.stringify(twoFactorAuth));
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("birthday", birthday);
    localStorage.setItem("timezone", timezone);
    localStorage.setItem("dataSharing", JSON.stringify(dataSharing));
  }, [
    theme,
    language,
    emailNotifications,
    emailFrequency,
    emailAlerts,
    mobileNotifications,
    mobileFrequency,
    mobileAlerts,
    pushNotifications,
    pushFrequency,
    pushAlerts,
    notifyUnreviewedTransactions,
    twoFactorAuth,
    fullName,
    birthday,
    timezone,
    dataSharing,
  ]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const isSystemTheme = theme === "system";
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  return (
    <div
      className={`min-h-screen p-6 ${
        theme === "dark" || (isSystemTheme && systemTheme === "dark")
          ? "bg-black text-white"
          : "bg-white text-black"
      }`}
    >
      <h1 className="text-2xl font-bold mb-6">Settings and Preferences</h1>
      <div className="flex">
        <nav className="w-64 bg-gray-100 dark:bg-[#151518] p-4 h-full">
          <ul className="space-y-2">
            {[
              "Display Preferences",
              "Notification",
              "Transaction Review",
              "Account Management",
              "User Profile",
              "Privacy Settings",
            ].map((section) => (
              <li
                key={section}
                className={`cursor-pointer py-2 px-4 rounded ${
                  activeSection === section
                    ? "bg-gray-500 text-white"
                    : "text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => handleSectionChange(section)}
              >
                {section}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex-1 p-6">
          {activeSection === "Display Preferences" && (
            <section className="mb-6 pb-4 border-b border-gray-300">
              <h2 className="text-xl font-semibold mb-6">
                Display Preferences
              </h2>
              <div className="mb-4 flex items-center">
                <label className="mr-4" htmlFor="light">
                  Light Mode
                </label>
                <Checkbox
                  id="light"
                  checked={theme === "light"}
                  onCheckedChange={() => setTheme("light")}
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="mr-4" htmlFor="dark">
                  Dark Mode
                </label>
                <Checkbox
                  id="dark"
                  checked={theme === "dark"}
                  onCheckedChange={() => setTheme("dark")}
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="mr-4" htmlFor="system">
                  System
                </label>
                <Checkbox
                  id="system"
                  checked={theme === "system"}
                  onCheckedChange={() => setTheme("system")}
                />
              </div>
              <div className="flex items-center">
                <label className="mr-4">Language</label>
                <Select
                  className="border p-1 text-black"
                  value={language}
                  onValueChange={(value) => setLanguage(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent className="w-32">
                    <SelectItem
                      value="English"
                      className={`${
                        theme === "dark" || theme === "system"
                          ? "text-white bg-black"
                          : "text-black bg-white"
                      }`}
                    >
                      English
                    </SelectItem>
                    <SelectItem
                      value="Chinese"
                      className={`${
                        theme === "dark" || theme === "system"
                          ? "text-white bg-black"
                          : "text-black bg-white"
                      }`}
                    >
                      Chinese
                    </SelectItem>
                    <SelectItem
                      value="Spanish"
                      className={`${
                        theme === "dark" || theme === "system"
                          ? "text-white bg-black"
                          : "text-black bg-white"
                      }`}
                    >
                      Spanish
                    </SelectItem>
                    <SelectItem
                      value="German"
                      className={`${
                        theme === "dark" || theme === "system"
                          ? "text-white bg-black"
                          : "text-black bg-white"
                      }`}
                    >
                      German
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Update />
            </section>
          )}

          {activeSection === "Notification" && (
            <section className="mb-6 pb-4 border-b border-gray-300">
              <h2 className="text-xl font-semibold mb-6">
                Notification Settings
              </h2>
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">
                  Email Notifications
                </h3>
                <div className="mb-4 flex items-center">
                  <label className="mr-4">Enable</label>
                  <Checkbox
                    checked={emailNotifications}
                    onCheckedChange={(checked) =>
                      setEmailNotifications(checked)
                    }
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <label className="mr-4">Frequency</label>
                  <Select
                    className="border p-1 text-black"
                    value={emailFrequency}
                    onValueChange={(value) => setEmailFrequency(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Frequency" />
                    </SelectTrigger>
                    <SelectContent className="w-32">
                      <SelectItem
                        value="Instant"
                        className={`${
                          theme === "dark" || theme === "system"
                            ? "text-white bg-black"
                            : "text-black bg-white"
                        }`}
                      >
                        Instant
                      </SelectItem>
                      <SelectItem
                        value="Daily"
                        className={`${
                          theme === "dark" || theme === "system"
                            ? "text-white bg-black"
                            : "text-black bg-white"
                        }`}
                      >
                        Daily
                      </SelectItem>
                      <SelectItem
                        value="Weekly"
                        className={`${
                          theme === "dark" || theme === "system"
                            ? "text-white bg-black"
                            : "text-black bg-white"
                        }`}
                      >
                        Weekly
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-4">
                  <h4 className="text-md font-semibold mb-2">Alerts</h4>
                  {["budgetAlerts", "goalMilestones", "accountIssues"].map(
                    (alert) => (
                      <div key={alert} className="mb-2 flex items-center">
                        <label className="mr-4 capitalize">
                          {alert.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                        <Checkbox
                          checked={emailAlerts[alert]}
                          onCheckedChange={(checked) =>
                            setEmailAlerts({ ...emailAlerts, [alert]: checked })
                          }
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">
                  Mobile Notifications
                </h3>
                <div className="mb-4 flex items-center">
                  <label className="mr-4">Enable</label>
                  <Checkbox
                    checked={mobileNotifications}
                    onCheckedChange={(checked) =>
                      setMobileNotifications(checked)
                    }
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <label className="mr-4">Frequency</label>
                  <Select
                    className="border p-1 text-black"
                    value={mobileFrequency}
                    onValueChange={(value) => setMobileFrequency(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Frequency" />
                    </SelectTrigger>
                    <SelectContent className="w-32">
                      <SelectItem
                        value="Instant"
                        className={`${
                          theme === "dark" || theme === "system"
                            ? "text-white bg-black"
                            : "text-black bg-white"
                        }`}
                      >
                        Instant
                      </SelectItem>
                      <SelectItem
                        value="Daily"
                        className={`${
                          theme === "dark" || theme === "system"
                            ? "text-white bg-black"
                            : "text-black bg-white"
                        }`}
                      >
                        Daily
                      </SelectItem>
                      <SelectItem
                        value="Weekly"
                        className={`${
                          theme === "dark" || theme === "system"
                            ? "text-white bg-black"
                            : "text-black bg-white"
                        }`}
                      >
                        Weekly
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-4">
                  <h4 className="text-md font-semibold mb-2">Alerts</h4>
                  {["budgetAlerts", "goalMilestones", "accountIssues"].map(
                    (alert) => (
                      <div key={alert} className="mb-2 flex items-center">
                        <label className="mr-4 capitalize">
                          {alert.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                        <Checkbox
                          checked={mobileAlerts[alert]}
                          onCheckedChange={(checked) =>
                            setMobileAlerts({
                              ...mobileAlerts,
                              [alert]: checked,
                            })
                          }
                        />
                      </div>
                    )
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Push Notifications
                </h3>
                <div className="mb-4 flex items-center">
                  <label className="mr-4">Enable</label>
                  <Checkbox
                    checked={pushNotifications}
                    onCheckedChange={(checked) => setPushNotifications(checked)}
                  />
                </div>
                <div className="mb-4 flex items-center">
                  <label className="mr-4">Frequency</label>
                  <Select
                    className="border p-1 text-black"
                    value={pushFrequency}
                    onValueChange={(value) => setPushFrequency(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Frequency" />
                    </SelectTrigger>
                    <SelectContent className="w-32">
                      <SelectItem
                        value="Instant"
                        className={`${
                          theme === "dark" || theme === "system"
                            ? "text-white bg-black"
                            : "text-black bg-white"
                        }`}
                      >
                        Instant
                      </SelectItem>
                      <SelectItem
                        value="Daily"
                        className={`${
                          theme === "dark" || theme === "system"
                            ? "text-white bg-black"
                            : "text-black bg-white"
                        }`}
                      >
                        Daily
                      </SelectItem>
                      <SelectItem
                        value="Weekly"
                        className={`${
                          theme === "dark" || theme === "system"
                            ? "text-white bg-black"
                            : "text-black bg-white"
                        }`}
                      >
                        Weekly
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="mb-4">
                  <h4 className="text-md font-semibold mb-2">Alerts</h4>
                  {["budgetAlerts", "goalMilestones", "accountIssues"].map(
                    (alert) => (
                      <div key={alert} className="mb-2 flex items-center">
                        <label className="mr-4 capitalize">
                          {alert.replace(/([A-Z])/g, " $1").trim()}
                        </label>
                        <Checkbox
                          checked={pushAlerts[alert]}
                          onCheckedChange={(checked) =>
                            setPushAlerts({ ...pushAlerts, [alert]: checked })
                          }
                        />
                      </div>
                    )
                  )}
                </div>
              </div>
              <Update />
            </section>
          )}

          {activeSection === "Transaction Review" && (
            <section className="mb-6 pb-4 border-b border-gray-300">
              <h2 className="text-xl font-semibold mb-6">Transaction Review</h2>
              <div className="mb-4 flex items-center">
                <label className="mr-4">
                  Notify for Unreviewed Transactions
                </label>
                <Checkbox
                  checked={notifyUnreviewedTransactions}
                  onCheckedChange={(checked) =>
                    setNotifyUnreviewedTransactions(checked)
                  }
                />
              </div>
              <Update />
            </section>
          )}

          {activeSection === "Account Management" && (
            <section className="mb-6 pb-4 border-b border-gray-300">
              <h2 className="text-xl font-semibold mb-6">Account Management</h2>
              <div className="mb-4 flex items-center">
                <label className="mr-4">Email</label>
                <Input
                  type="email"
                  className={`border p-1 ${
                    theme === "dark" || theme === "system"
                      ? "bg-black text-white border-white"
                      : "bg-white text-black border-black"
                  } ml-8`}
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="mr-4">Password</label>
                <div className="relative flex items-center">
                  <Input
                    type={passwordVisible ? "text" : "password"}
                    className={`border p-1 ${
                      theme === "dark" || theme === "system"
                        ? "bg-black text-white border-white"
                        : "bg-white text-black border-black"
                    }`}
                  />
                  <button
                    type="button"
                    className="absolute right-2"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <FaEyeSlash
                        className={`h-5 w-5 ${
                          theme === "dark" ? "text-white" : "text-black"
                        }`}
                      />
                    ) : (
                      <FaEye
                        className={`h-5 w-5 ${
                          theme === "dark" ? "text-white" : "text-black"
                        }`}
                      />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex items-center">
                <label className="mr-4 mt-4">Two-Factor Authentication</label>
                <Checkbox
                  checked={twoFactorAuth}
                  className="mt-4"
                  onCheckedChange={(checked) => setTwoFactorAuth(checked)}
                />
              </div>
              <Update />
            </section>
          )}

          {activeSection === "User Profile" && (
            <section className="mb-6 pb-4 border-b border-gray-300">
              <h2 className="text-xl font-semibold mb-6">User Profile</h2>
              <div className="mb-4 flex flex-col space-y-4">
                <div className="mb-4 flex items-center">
                  <label className="mr-4">Picture</label>
                  <input
                    type="file"
                    className={`border p-1 ${
                      theme === "dark" || theme === "system"
                        ? "bg-black text-white border-white"
                        : "bg-white text-black border-black"
                    } ml-6`}
                  />
                </div>
                <div className="flex items-center">
                  <label className="mr-4">Full Name</label>
                  <Input
                    type="text"
                    className={`border p-1 ${
                      theme === "dark" || theme === "system"
                        ? "bg-black text-white border-white ml-1"
                        : "bg-white text-black border-black ml-1"
                    }`}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="flex items-center">
                  <label className="mr-4">Birthday</label>
                  <Input
                    type="date"
                    className={`border p-1 ${
                      theme === "dark" || theme === "system"
                        ? "bg-black text-white border-white placeholder-gray-400"
                        : "bg-white text-black border-black placeholder-gray-500"
                    } ml-3`}
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </div>
                <div className="flex items-center">
                  <label className="mr-4">Timezone</label>
                  <Select
                    className="border p-1 text-black"
                    value={timezone}
                    onValueChange={(value) => setTimezone(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Timezone" />
                    </SelectTrigger>
                    <SelectContent className="w-32">
                      <SelectItem
                        value="IST"
                        className={`${
                          theme === "dark" || theme === "system"
                            ? "text-white bg-black"
                            : "text-black bg-white"
                        }`}
                      >
                        IST
                      </SelectItem>
                      <SelectItem
                        value="GMT"
                        className={`${
                          theme === "dark" || theme === "system"
                            ? "text-white bg-black"
                            : "text-black bg-white"
                        }`}
                      >
                        GMT
                      </SelectItem>
                      <SelectItem
                        value="EST"
                        className={`${
                          theme === "dark" || theme === "system"
                            ? "text-white bg-black"
                            : "text-black bg-white"
                        }`}
                      >
                        EST
                      </SelectItem>
                      <SelectItem
                        value="PST"
                        className={`${
                          theme === "dark" || theme === "system"
                            ? "text-white bg-black"
                            : "text-black bg-white"
                        }`}
                      >
                        PST
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Update />
            </section>
          )}

          {activeSection === "Privacy Settings" && (
            <section className="mb-6 pb-4 border-b border-gray-300">
              <h2 className="text-xl font-semibold mb-6">Privacy Settings</h2>
              <div className="mb-4 flex items-center">
                <label className="mr-4">Data Sharing</label>
                <Checkbox
                  checked={dataSharing}
                  onCheckedChange={(checked) => setDataSharing(checked)}
                />
              </div>
              <Update />
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
