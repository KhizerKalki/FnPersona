import { useState, useEffect } from "react";
import { useTheme } from "@/components/theme/theme-provider";
import { ChevronDown, ChevronUp } from "lucide-react";

const UserSettings = () => {
  const { setTheme } = useTheme();
  const [mode, setMode] = useState(localStorage.getItem("mode") || "light");
  setTheme(mode);
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
    localStorage.setItem("mode", mode);
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
    mode,
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

  return (
    <div
      className={`min-h-screen p-6 ${
        mode === "dark" ? "bg-black text-white" : "bg-white text-black"
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
              <label className="mr-4">Light Mode</label>
              <input
                type="checkbox"
                checked={mode === "light"}
                onChange={() => setMode("light")}
              />
            </div>
            <div className="mb-4 flex items-center">
              <label className="mr-4">Dark Mode</label>
              <input
                type="checkbox"
                checked={mode === "dark"}
                onChange={() => setMode("dark")}
              />
            </div>
            <div className="flex items-center">
              <label className="mr-4">Language</label>
              <select
                className="border p-1 text-black"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
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
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={() => setEmailNotifications(!emailNotifications)}
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="mr-4">Frequency</label>
                <select
                  className="border p-1 text-black"
                  value={emailFrequency}
                  onChange={(e) => setEmailFrequency(e.target.value)}
                >
                  <option>Instant</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                </select>
              </div>
              <div className="mb-4 flex items-center">
                <label className="mr-4">Budget Alerts</label>
                <input
                  type="checkbox"
                  checked={emailAlerts.budgetAlerts}
                  onChange={() =>
                    setEmailAlerts((prev) => ({
                      ...prev,
                      budgetAlerts: !prev.budgetAlerts,
                    }))
                  }
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="mr-4">Goal Milestones</label>
                <input
                  type="checkbox"
                  checked={emailAlerts.goalMilestones}
                  onChange={() =>
                    setEmailAlerts((prev) => ({
                      ...prev,
                      goalMilestones: !prev.goalMilestones,
                    }))
                  }
                />
              </div>
              <div className="flex items-center">
                <label className="mr-4">Account Issues</label>
                <input
                  type="checkbox"
                  checked={emailAlerts.accountIssues}
                  onChange={() =>
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
                <input
                  type="checkbox"
                  checked={mobileNotifications}
                  onChange={() => setMobileNotifications(!mobileNotifications)}
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="mr-4">Frequency</label>
                <select
                  className="border p-1 text-black"
                  value={mobileFrequency}
                  onChange={(e) => setMobileFrequency(e.target.value)}
                >
                  <option>Instant</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                </select>
              </div>
              <div className="mb-4 flex items-center">
                <label className="mr-4">Budget Alerts</label>
                <input
                  type="checkbox"
                  checked={mobileAlerts.budgetAlerts}
                  onChange={() =>
                    setMobileAlerts((prev) => ({
                      ...prev,
                      budgetAlerts: !prev.budgetAlerts,
                    }))
                  }
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="mr-4">Goal Milestones</label>
                <input
                  type="checkbox"
                  checked={mobileAlerts.goalMilestones}
                  onChange={() =>
                    setMobileAlerts((prev) => ({
                      ...prev,
                      goalMilestones: !prev.goalMilestones,
                    }))
                  }
                />
              </div>
              <div className="flex items-center">
                <label className="mr-4">Account Issues</label>
                <input
                  type="checkbox"
                  checked={mobileAlerts.accountIssues}
                  onChange={() =>
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
                <input
                  type="checkbox"
                  checked={pushNotifications}
                  onChange={() => setPushNotifications(!pushNotifications)}
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="mr-4">Frequency</label>
                <select
                  className="border p-1 text-black"
                  value={pushFrequency}
                  onChange={(e) => setPushFrequency(e.target.value)}
                >
                  <option>Instant</option>
                  <option>Daily</option>
                  <option>Weekly</option>
                </select>
              </div>
              <div className="mb-4 flex items-center">
                <label className="mr-4">Budget Alerts</label>
                <input
                  type="checkbox"
                  checked={pushAlerts.budgetAlerts}
                  onChange={() =>
                    setPushAlerts((prev) => ({
                      ...prev,
                      budgetAlerts: !prev.budgetAlerts,
                    }))
                  }
                />
              </div>
              <div className="mb-4 flex items-center">
                <label className="mr-4">Goal Milestones</label>
                <input
                  type="checkbox"
                  checked={pushAlerts.goalMilestones}
                  onChange={() =>
                    setPushAlerts((prev) => ({
                      ...prev,
                      goalMilestones: !prev.goalMilestones,
                    }))
                  }
                />
              </div>
              <div className="flex items-center">
                <label className="mr-4">Account Issues</label>
                <input
                  type="checkbox"
                  checked={pushAlerts.accountIssues}
                  onChange={() =>
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
              <input
                type="checkbox"
                checked={notifyUnreviewedTransactions}
                onChange={() =>
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
            <div className="flex items-center">
              <label className="mr-4">Two-Factor Authentication</label>
              <input
                type="checkbox"
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
              <label className="mr-4">Full Name</label>
              <input
                type="text"
                className="border p-1 text-black"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div className="mb-4 flex items-center">
              <label className="mr-4">Birthday</label>
              <input
                type="date"
                className="border p-1 text-black"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
            <div className="flex items-center">
              <label className="mr-4">Timezone</label>
              <select
                className="border p-1 text-black"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              >
                <option value="IST">IST</option>
                <option value="EST">EST</option>
                <option value="PST">PST</option>
              </select>
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
              <input
                type="checkbox"
                checked={dataSharing}
                onChange={() => setDataSharing(!dataSharing)}
              />
            </div>
          </>
        )}
      </section>

      <div className="flex justify-center">
        <button
          className="px-4 py-2 bg-white text-black rounded"
          onClick={() => alert("Settings Updated!")}
        >
          Update
        </button>
      </div>
    </div>
  );
};

export default UserSettings;
