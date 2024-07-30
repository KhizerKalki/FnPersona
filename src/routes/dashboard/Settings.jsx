import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import { ChevronDown, ChevronUp } from "lucide-react";
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

const UserSettings = () => {
  const { setTheme, theme } = useTheme();
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "English"
  );

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

  const [sections, setSections] = useState({
    displayPreferences: false,
    notificationSettings: false,
    transactionReviewSettings: false,
    accountManagement: false,
    userProfile: false,
    privacySettings: false,
  });

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

  const toggleSection = (section) => {
    setSections((prev) => ({ ...prev, [section]: !prev[section] }));
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

      <section className="mb-6 pb-4 border-b border-gray-300">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("displayPreferences")}
        >
          <h2 className="text-xl font-semibold">Display Preferences</h2>
          {sections.displayPreferences ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
        {sections.displayPreferences && (
          <>
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
                      theme === "dark"
                        ? "text-white bg-black"
                        : "text-black bg-white"
                    }`}
                  >
                    English
                  </SelectItem>
                  <SelectItem
                    value="Chinese"
                    className={`${
                      theme === "dark"
                        ? "text-white bg-black"
                        : "text-black bg-white"
                    }`}
                  >
                    Chinese
                  </SelectItem>
                  <SelectItem
                    value="Spanish"
                    className={`${
                      theme === "dark"
                        ? "text-white bg-black"
                        : "text-black bg-white"
                    }`}
                  >
                    Spanish
                  </SelectItem>
                  <SelectItem
                    value="German"
                    className={`${
                      theme === "dark"
                        ? "text-white bg-black"
                        : "text-black bg-white"
                    }`}
                  >
                    German
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </section>

      <section className="mb-6 pb-4 border-b border-gray-300">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("notificationSettings")}
        >
          <h2 className="text-xl font-semibold">Notification Settings</h2>
          {sections.notificationSettings ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
        {sections.notificationSettings && (
          <>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                Email Notifications
              </h3>
              <div className="mb-4 flex items-center">
                <label className="mr-4">Enable Email Notifications</label>
                <Checkbox
                  type="checkbox"
                  checked={emailNotifications}
                  onCheckedChange={() =>
                    setEmailNotifications(!emailNotifications)
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
                        theme === "dark"
                          ? "text-white bg-black"
                          : "text-black bg-white"
                      }`}
                    >
                      Instant
                    </SelectItem>
                    <SelectItem
                      value="Daily"
                      className={`${
                        theme === "dark"
                          ? "text-white bg-black"
                          : "text-black bg-white"
                      }`}
                    >
                      Daily
                    </SelectItem>
                    <SelectItem
                      value="Weekly"
                      className={`${
                        theme === "dark"
                          ? "text-white bg-black"
                          : "text-black bg-white"
                      }`}
                    >
                      Weekly
                    </SelectItem>
                    <SelectItem
                      value="Monthly"
                      className={`${
                        theme === "dark"
                          ? "text-white bg-black"
                          : "text-black bg-white"
                      }`}
                    >
                      Monthly
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-4 flex items-center">
                <label className="mr-4">Budget Alerts</label>
                <Checkbox
                  id="budgetAlertsEmail"
                  checked={emailAlerts.budgetAlerts}
                  onCheckedChange={() =>
                    setEmailAlerts((prev) => ({
                      ...prev,
                      budgetAlerts: !prev.budgetAlerts,
                    }))
                  }
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="mr-4">Goal Milestones</label>
                <Checkbox
                  id="goalMilestonesEmail"
                  checked={emailAlerts.goalMilestones}
                  onCheckedChange={() =>
                    setEmailAlerts((prev) => ({
                      ...prev,
                      goalMilestones: !prev.goalMilestones,
                    }))
                  }
                />
              </div>
              <div className="flex items-center">
                <label className="mr-4">Account Issues</label>
                <Checkbox
                  id="accountIssuesEmail"
                  checked={emailAlerts.accountIssues}
                  onCheckedChange={() =>
                    setEmailAlerts((prev) => ({
                      ...prev,
                      accountIssues: !prev.accountIssues,
                    }))
                  }
                />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">
                Mobile Notifications
              </h3>
              <div className="mb-4 flex items-center">
                <label className="mr-4">Enable Mobile Notifications</label>
                <Checkbox
                  id="mobileNotifications"
                  checked={mobileNotifications}
                  onCheckedChange={() =>
                    setMobileNotifications(!mobileNotifications)
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
                        theme === "dark"
                          ? "text-white bg-black"
                          : "text-black bg-white"
                      }`}
                    >
                      Instant
                    </SelectItem>
                    <SelectItem
                      value="Daily"
                      className={`${
                        theme === "dark"
                          ? "text-white bg-black"
                          : "text-black bg-white"
                      }`}
                    >
                      Daily
                    </SelectItem>
                    <SelectItem
                      value="Weekly"
                      className={`${
                        theme === "dark"
                          ? "text-white bg-black"
                          : "text-black bg-white"
                      }`}
                    >
                      Weekly
                    </SelectItem>
                    <SelectItem
                      value="Monthly"
                      className={`${
                        theme === "dark"
                          ? "text-white bg-black"
                          : "text-black bg-white"
                      }`}
                    >
                      Monthly
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-4 flex items-center">
                <label className="mr-4">Budget Alerts</label>
                <Checkbox
                  id="budgetAlertsMobile"
                  checked={mobileAlerts.budgetAlerts}
                  onCheckedChange={() =>
                    setMobileAlerts((prev) => ({
                      ...prev,
                      budgetAlerts: !prev.budgetAlerts,
                    }))
                  }
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="mr-4">Goal Milestones</label>
                <Checkbox
                  id="goalMilestonesMobile"
                  checked={mobileAlerts.goalMilestones}
                  onCheckedChange={() =>
                    setMobileAlerts((prev) => ({
                      ...prev,
                      goalMilestones: !prev.goalMilestones,
                    }))
                  }
                />
              </div>
              <div className="flex items-center">
                <label className="mr-4">Account Issues</label>
                <Checkbox
                  id="accountIssuesMobile"
                  checked={mobileAlerts.accountIssues}
                  onCheckedChange={() =>
                    setMobileAlerts((prev) => ({
                      ...prev,
                      accountIssues: !prev.accountIssues,
                    }))
                  }
                />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Push Notifications</h3>
              <div className="mb-4 flex items-center">
                <label className="mr-4">Enable Push Notifications</label>
                <Checkbox
                  id="pushNotifications"
                  checked={pushNotifications}
                  onCheckedChange={() =>
                    setPushNotifications(!pushNotifications)
                  }
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
                        theme === "dark"
                          ? "text-white bg-black"
                          : "text-black bg-white"
                      }`}
                    >
                      Instant
                    </SelectItem>
                    <SelectItem
                      value="Daily"
                      className={`${
                        theme === "dark"
                          ? "text-white bg-black"
                          : "text-black bg-white"
                      }`}
                    >
                      Daily
                    </SelectItem>
                    <SelectItem
                      value="Weekly"
                      className={`${
                        theme === "dark"
                          ? "text-white bg-black"
                          : "text-black bg-white"
                      }`}
                    >
                      Weekly
                    </SelectItem>
                    <SelectItem
                      value="Monthly"
                      className={`${
                        theme === "dark"
                          ? "text-white bg-black"
                          : "text-black bg-white"
                      }`}
                    >
                      Monthly
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-4 flex items-center">
                <label className="mr-4">Budget Alerts</label>
                <Checkbox
                  id="budgetAlertsPush"
                  checked={pushAlerts.budgetAlerts}
                  onCheckedChange={() =>
                    setPushAlerts((prev) => ({
                      ...prev,
                      budgetAlerts: !prev.budgetAlerts,
                    }))
                  }
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="mr-4">Goal Milestones</label>
                <Checkbox
                  id="goalMilestonesPush"
                  checked={pushAlerts.goalMilestones}
                  onCheckedChange={() =>
                    setPushAlerts((prev) => ({
                      ...prev,
                      goalMilestones: !prev.goalMilestones,
                    }))
                  }
                />
              </div>
              <div className="flex items-center">
                <label className="mr-4">Account Issues</label>
                <Checkbox
                  id="accountIssuesPush"
                  checked={pushAlerts.accountIssues}
                  onCheckedChange={() =>
                    setPushAlerts((prev) => ({
                      ...prev,
                      accountIssues: !prev.accountIssues,
                    }))
                  }
                />
              </div>
            </div>
          </>
        )}
      </section>

      <section className="mb-6 pb-4 border-b border-gray-300">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("transactionReviewSettings")}
        >
          <h2 className="text-xl font-semibold">Transaction Review Settings</h2>
          {sections.transactionReviewSettings ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
        {sections.transactionReviewSettings && (
          <>
            <div className="flex items-center">
              <label className="mr-4">Notify of Unreviewed Transactions</label>
              <Checkbox
                type="checkbox"
                checked={notifyUnreviewedTransactions}
                onCheckedChange={() =>
                  setNotifyUnreviewedTransactions(!notifyUnreviewedTransactions)
                }
              />
            </div>
          </>
        )}
      </section>

      <section className="mb-6 pb-4 border-b border-gray-300">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("accountManagement")}
        >
          <h2 className="text-xl font-semibold">Account Management</h2>
          {sections.accountManagement ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
        {sections.accountManagement && (
          <>
            <div className="mb-4 flex items-center">
              <label className="mr-4">Email</label>
              <Input
                type="email"
                className={`border p-1 ${
                  theme === "dark"
                    ? "bg-black text-white border-white"
                    : "bg-white text-black border-black"
                } ml-9`}
              />
            </div>
            <div className="mb-4 flex items-center">
              <label className="mr-4">Password</label>
              <div className="relative flex items-center">
                <Input
                  type={passwordVisible ? "text" : "password"}
                  className={`border p-1 ${
                    theme === "dark"
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
              <label className="mr-4">Two-Factor Authentication</label>
              <Checkbox
                checked={twoFactorAuth}
                onChange={() => setTwoFactorAuth(!twoFactorAuth)}
              />
            </div>
          </>
        )}
      </section>

      <section className="mb-6 pb-4 border-b border-gray-300">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("userProfile")}
        >
          <h2 className="text-xl font-semibold">User Profile</h2>
          {sections.userProfile ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
        {sections.userProfile && (
          <>
            <div className="mb-4 flex items-center">
              <label className="mr-4">Picture</label>
              <input
                type="file"
                className={`border p-1 ${
                  theme === "dark"
                    ? "bg-black text-white border-white"
                    : "bg-white text-black border-black"
                } ml-6`}
              />
            </div>
            <div className="mb-4 flex items-center">
              <label className="mr-4">Full Name</label>
              <Input
                type="text"
                className={`border p-1 ${
                  theme === "dark"
                    ? "bg-black text-white border-white"
                    : "bg-white text-black border-black"
                }`}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-4 flex items-center">
              <label className="mr-4">Birthday</label>
              <Input
                type="date"
                className={`border p-1 ${
                  theme === "dark"
                    ? "bg-black text-white border-white"
                    : "bg-white text-black border-black"
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
                <SelectContent>
                  <SelectItem
                    value="IST"
                    className={`${
                      theme === "dark"
                        ? "text-white bg-black"
                        : "text-black bg-white"
                    }`}
                  >
                    IST
                  </SelectItem>
                  <SelectItem
                    value="EST"
                    className={`${
                      theme === "dark"
                        ? "text-white bg-black"
                        : "text-black bg-white"
                    }`}
                  >
                    EST
                  </SelectItem>
                  <SelectItem
                    value="PST"
                    className={`${
                      theme === "dark"
                        ? "text-white bg-black"
                        : "text-black bg-white"
                    }`}
                  >
                    PST
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </section>

      <section className="mb-6 pb-4 border-b border-gray-300">
        <div
          className="flex justify-between items-center mb-4 cursor-pointer"
          onClick={() => toggleSection("privacySettings")}
        >
          <h2 className="text-xl font-semibold">Privacy Settings</h2>
          {sections.privacySettings ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
        {sections.privacySettings && (
          <>
            <div className="flex items-center">
              <label className="mr-4">Enable Data Sharing</label>
              <Checkbox
                checked={dataSharing}
                onChange={() => setDataSharing(!dataSharing)}
              />
            </div>
          </>
        )}
      </section>

      <div className="flex justify-center">
        <button
          className={`px-4 py-2 rounded ${
            theme === "light"
              ? "bg-white text-black border-black border"
              : "bg-black text-white border-white border"
          } `}
          onClick={() => alert("Settings Updated!")}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UserSettings;
