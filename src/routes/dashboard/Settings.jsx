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
import { Separator } from "@/components/ui/separator";

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

  const sectionStyles = "mb-6 pb-4";

  return (
    <div className="min-h-screen p-6 ">
      <header className="mb-8">
        <h1 className="text-xl font-medium dark:text-white animate-fadeIn">
          Settings and Preferences
        </h1>
        <p className="text-muted-foreground text-[13px] dark:text-white/50 animate-fadeIn">
          Customize your application settings and preferences to enhance your
          experience.
        </p>
      </header>
      <div className="flex flex-col lg:flex-row">
        <nav className="lg:w-54 p-4 h-full lg:mr-10 mb-6 lg:mb-0">
          <ul className="space-y-2/2 text-sm">
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
                    ? " dark:text-white text-black font-medium dark:hover:bg-black/50 hover:bg-gray-100"
                    : "dark:text-white/30 text-black/30 dark:hover:bg-black/50 hover:bg-gray-100"
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
            <section className={sectionStyles}>
              <div className="dark:border-[#383838]  dark:bg-black/40 border rounded mb-4">
                <div className="p-4">
                  <h2 className="text-md font-semibold dark:text-white mb-5">
                    Display Preferences
                  </h2>
                  <div className="mb-4">
                    <Select
                      value={theme}
                      onValueChange={(value) => setTheme(value)}
                      className="dark:bg-black "
                    >
                      <SelectTrigger className="w-[180px]  dark:text-white dark:border-white/20 text-[12px]">
                        <SelectValue
                          placeholder="Select Theme"
                          className="text-[12px]"
                        />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-[#141414] bg-white dark:text-white border-white/20">
                        <SelectItem value="light" className="text-[12px]">
                          Light
                        </SelectItem>
                        <SelectItem value="dark" className="text-[12px]">
                          Dark
                        </SelectItem>
                        <SelectItem value="system" className="text-[12px]">
                          System
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />
                <div className="text-[13px] p-2 py-4 dark:bg-black/50 bg-gray-100 dark:text-white/40">
                  Select your preferred display mode from the options
                </div>
              </div>
              <div className="dark:border-[#383838] dark:bg-black/40 border rounded mb-4">
                <div className="p-4">
                  <h2 className="text-md font-semibold dark:text-white mb-5">
                    Language selection
                  </h2>
                  <div className="mb-4">
                    <Select
                      className="border p-1 dark:bg-black dark:text-white"
                      value={language}
                      onValueChange={(value) => setLanguage(value)}
                    >
                      <SelectTrigger className="w-[180px]  dark:text-white dark:border-white/20 text-[12px]">
                        <SelectValue
                          placeholder="Select Language"
                          className="dark:text-white"
                        />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-[#141414] bg-white dark:text-white border-white/20">
                        {["English", "Chinese", "Spanish", "German"].map(
                          (lang) => (
                            <SelectItem
                              key={lang}
                              value={lang}
                              className="dark:text-white text-[12px]"
                            >
                              {lang}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />
                <div className="text-[13px] p-2 py-4 dark:bg-black/50 bg-gray-100 dark:text-white/40">
                  Select your preferred language from the options
                </div>
              </div>
              <Update />
            </section>
          )}

          {activeSection === "Notification" && (
            <section className={`${sectionStyles} p-4 md:p-6 lg:p-8`}>
              <div className="dark:border-[#383838] dark:bg-black/40 border rounded mb-4">
                <div className="p-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <h2 className="text-md font-semibold dark:text-white mb-5">
                      Email Notifications
                    </h2>
                    {emailNotifications && (
                      <div className="mb-4 md:mb-0">
                        <Select
                          className="border p-1 dark:bg-black dark:text-white"
                          value={emailFrequency}
                          onValueChange={(value) => setEmailFrequency(value)}
                        >
                          <SelectTrigger className="w-full md:w-[180px] dark:text-white dark:border-white/20 text-[12px]">
                            <SelectValue
                              placeholder="Frequency"
                              className="dark:text-white"
                            />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-[#141414] bg-white dark:text-white border-white/20">
                            {["Instant", "Daily", "Weekly"].map((freq) => (
                              <SelectItem
                                key={freq}
                                value={freq}
                                className="dark:text-white text-[12px]"
                              >
                                {freq}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  <div className="mb-4 flex items-center">
                    <Checkbox
                      checked={emailNotifications}
                      onCheckedChange={(value) => setEmailNotifications(value)}
                      id="email-notifications"
                    />
                    <label
                      htmlFor="email-notifications"
                      className="ml-2 dark:text-white"
                    >
                      Enable Email Notifications
                    </label>
                  </div>
                  {emailNotifications && (
                    <div className="mb-4">
                      <h4 className="text-md font-semibold mb-2 dark:text-white">
                        Alerts
                      </h4>
                      {["budgetAlerts", "goalMilestones", "accountIssues"].map(
                        (alert) => (
                          <div key={alert} className="mb-2 flex items-center">
                            <label className="mr-4 dark:text-white capitalize">
                              {alert.replace(/([A-Z])/g, " $1").trim()}
                            </label>
                            <Checkbox
                              checked={emailAlerts[alert]}
                              onCheckedChange={(checked) =>
                                setEmailAlerts({
                                  ...emailAlerts,
                                  [alert]: checked,
                                })
                              }
                            />
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
                <Separator />
                <div className="text-[13px] p-2 py-4 dark:bg-black/50 bg-gray-100 dark:text-white/40">
                  Manage your email notifications and frequency
                </div>
              </div>

              <div className="dark:border-[#383838] dark:bg-black/40 border rounded mb-4">
                <div className="p-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <h2 className="text-md font-semibold dark:text-white mb-5">
                      Mobile Notifications
                    </h2>
                    {mobileNotifications && (
                      <div className="mb-4 md:mb-0">
                        <Select
                          className="border p-1 dark:bg-black dark:text-white"
                          value={mobileFrequency}
                          onValueChange={(value) => setMobileFrequency(value)}
                        >
                          <SelectTrigger className="w-full md:w-[180px] dark:text-white dark:border-white/20 text-[12px]">
                            <SelectValue
                              placeholder="Frequency"
                              className="dark:text-white"
                            />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-[#141414] bg-white dark:text-white border-white/20">
                            {["Instant", "Daily", "Weekly"].map((freq) => (
                              <SelectItem
                                key={freq}
                                value={freq}
                                className="dark:text-white text-[12px]"
                              >
                                {freq}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  <div className="mb-4 flex items-center">
                    <Checkbox
                      checked={mobileNotifications}
                      onCheckedChange={(value) => setMobileNotifications(value)}
                      id="mobile-notifications"
                    />
                    <label
                      htmlFor="mobile-notifications"
                      className="ml-2 dark:text-white"
                    >
                      Enable Mobile Notifications
                    </label>
                  </div>
                  {mobileNotifications && (
                    <div className="mb-4">
                      <h4 className="text-md font-semibold mb-2 dark:text-white">
                        Alerts
                      </h4>
                      {["budgetAlerts", "goalMilestones", "accountIssues"].map(
                        (alert) => (
                          <div key={alert} className="mb-2 flex items-center">
                            <label className="mr-4 dark:text-white capitalize">
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
                  )}
                </div>
                <Separator />
                <div className="text-[13px] p-2 py-4 dark:bg-black/50 bg-gray-100 dark:text-white/40">
                  Manage your mobile notifications and frequency
                </div>
              </div>

              <div className="dark:border-[#383838] dark:bg-black/40 border rounded mb-4">
                <div className="p-4">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                    <h2 className="text-md font-semibold dark:text-white mb-5">
                      Push Notifications
                    </h2>
                    {pushNotifications && (
                      <div className="mb-4 md:mb-0">
                        <Select
                          className="border p-1 dark:bg-black dark:text-white"
                          value={pushFrequency}
                          onValueChange={(value) => setPushFrequency(value)}
                        >
                          <SelectTrigger className="w-full md:w-[180px] dark:text-white dark:border-white/20 text-[12px]">
                            <SelectValue
                              placeholder="Frequency"
                              className="dark:text-white"
                            />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-[#141414] bg-white dark:text-white border-white/20">
                            {["Instant", "Daily", "Weekly"].map((freq) => (
                              <SelectItem
                                key={freq}
                                value={freq}
                                className="dark:text-white text-[12px]"
                              >
                                {freq}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                  <div className="mb-4 flex items-center">
                    <Checkbox
                      checked={pushNotifications}
                      onCheckedChange={(value) => setPushNotifications(value)}
                      id="push-notifications"
                    />
                    <label
                      htmlFor="push-notifications"
                      className="ml-2 dark:text-white"
                    >
                      Enable Push Notifications
                    </label>
                  </div>
                  {pushNotifications && (
                    <div className="mb-4">
                      <h4 className="text-md font-semibold mb-2 dark:text-white">
                        Alerts
                      </h4>
                      {["budgetAlerts", "goalMilestones", "accountIssues"].map(
                        (alert) => (
                          <div key={alert} className="mb-2 flex items-center">
                            <label className="mr-4 dark:text-white capitalize">
                              {alert.replace(/([A-Z])/g, " $1").trim()}
                            </label>
                            <Checkbox
                              checked={pushAlerts[alert]}
                              onCheckedChange={(checked) =>
                                setPushAlerts({
                                  ...pushAlerts,
                                  [alert]: checked,
                                })
                              }
                            />
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
                <Separator />
                <div className="text-[13px] p-2 py-4 dark:bg-black/50 bg-gray-100 dark:text-white/40">
                  Manage your push notifications and frequency
                </div>
              </div>
              <Update />
            </section>
          )}

          {activeSection === "Transaction Review" && (
            <section className={`${sectionStyles} p-4 md:p-6 lg:p-8`}>
              <div className="dark:border-[#383838] dark:bg-black/40 border rounded mb-4">
                <div className="p-4">
                  <h2 className="text-md font-semibold dark:text-white mb-5">
                    Transaction Review
                  </h2>
                  <div className="mb-4 flex items-center">
                    <Checkbox
                      checked={notifyUnreviewedTransactions}
                      onCheckedChange={(value) =>
                        setNotifyUnreviewedTransactions(value)
                      }
                      id="unreviewed-transactions"
                    />
                    <label
                      htmlFor="unreviewed-transactions"
                      className="ml-2 dark:text-white"
                    >
                      Notify me of unreviewed transactions
                    </label>
                  </div>
                </div>
                <Separator />
                <div className="text-[13px] p-2 py-4 dark:bg-black/50 bg-gray-100 dark:text-white/40">
                  Manage transaction review notifications
                </div>
              </div>
              <Update />
            </section>
          )}

          {activeSection === "Account Management" && (
            <section className={`${sectionStyles} p-4 md:p-6 lg:p-8`}>
              <div className="dark:border-[#383838] dark:bg-black/40 border rounded mb-4">
                <div className="p-4">
                  <h2 className="text-md font-semibold dark:text-white mb-5">
                    Account Management
                  </h2>
                  <div className="mb-4">
                    <div className="flex flex-col md:flex-row items-center">
                      <label className="mr-4 dark:text-white">Email</label>
                      <Input
                        type="email"
                        className="border p-1 rounded-md dark:bg-black dark:text-white md:ml-8 w-full md:w-64"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex flex-col md:flex-row items-center">
                      <label className="mr-4 dark:text-white">Password</label>
                      <div className="relative flex items-center w-full md:w-64">
                        <Input
                          type={passwordVisible ? "text" : "password"}
                          className="border p-1 rounded-md dark:bg-black dark:text-white w-full"
                        />
                        <button
                          type="button"
                          className="absolute right-2"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                        >
                          {passwordVisible ? (
                            <FaEyeSlash className="h-5 w-5 dark:text-white" />
                          ) : (
                            <FaEye className="h-5 w-5 dark:text-white" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center">
                    <label className="mr-4 mt-4 dark:text-white">
                      Two-Factor Authentication
                    </label>
                    <Checkbox
                      checked={twoFactorAuth}
                      className="mt-4"
                      onCheckedChange={(checked) => setTwoFactorAuth(checked)}
                    />
                  </div>
                </div>
                <Separator />
                <div className="text-[13px] p-2 py-4 dark:bg-black/50 bg-gray-100 dark:text-white/40">
                  Manage your account settings
                </div>
              </div>
              <Update />
            </section>
          )}

          {activeSection === "User Profile" && (
            <section className={`${sectionStyles} p-4 md:p-6 lg:p-8`}>
              <div className="dark:border-[#383838] dark:bg-black/40 border rounded mb-4">
                <div className="p-4">
                  <h2 className="text-md font-semibold dark:text-white mb-5">
                    User Profile
                  </h2>
                  <div className="mb-4 flex flex-col space-y-4">
                    <div className="flex flex-col md:flex-row items-center">
                      <label className="mr-4 dark:text-white">Picture</label>
                      <input
                        type="file"
                        className="border p-1 rounded-md dark:bg-black dark:text-white md:ml-6 w-full md:w-64"
                      />
                    </div>
                    <div className="flex flex-col md:flex-row items-center">
                      <label className="mr-4 dark:text-white">Full Name</label>
                      <Input
                        type="text"
                        className="border p-1 rounded-md dark:bg-black dark:text-white md:ml-1 w-full md:w-64"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row items-center">
                      <label className="mr-4 dark:text-white">Birthday</label>
                      <Input
                        type="date"
                        className="border p-1 rounded-md dark:bg-black dark:text-white md:ml-3 w-full md:w-35"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col md:flex-row items-center">
                      <label className="mr-4 dark:text-white">Timezone</label>
                      <Select
                        className="border p-1 rounded-md dark:bg-black dark:text-white w-full md:w-auto"
                        value={timezone}
                        onValueChange={(value) => setTimezone(value)}
                      >
                        <SelectTrigger className="w-full md:w-[180px] dark:text-white dark:border-white/20 text-[12px]">
                          <SelectValue placeholder="Select Timezone" />
                        </SelectTrigger>
                        <SelectContent className="dark:bg-[#141414] bg-white dark:text-white border-white/20">
                          {["IST", "GMT", "EST", "PST"].map((tz) => (
                            <SelectItem
                              key={tz}
                              value={tz}
                              className="text-[12px]"
                            >
                              {tz}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="text-[13px] p-2 py-4 dark:bg-black/50 bg-gray-100 dark:text-white/40">
                  Manage your profile information
                </div>
              </div>
              <Update />
            </section>
          )}

          {activeSection === "Privacy Settings" && (
            <section className={sectionStyles}>
              <div className="dark:border-[#383838] dark:bg-black/40 border rounded mb-4">
                <div className="p-4">
                  <h2 className="text-md font-semibold dark:text-white mb-5">
                    Privacy Settings
                  </h2>
                  <div className="mb-4 flex items-center">
                    <label className="mr-4 dark:text-white">Data Sharing</label>
                    <Checkbox
                      checked={dataSharing}
                      onCheckedChange={(checked) => setDataSharing(checked)}
                    />
                  </div>
                </div>
                <Separator />
                <div className="text-[13px] p-2 py-4 dark:bg-black/50 bg-gray-100 dark:text-white/40">
                  Manage your privacy settings
                </div>
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
