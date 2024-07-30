import { useState, useEffect } from 'react';
import { useTheme } from '@/components/theme/theme-provider';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Update from '@/components/buttons/Update';
import { Separator } from '@/components/ui/separator';

const UserSettings = () => {
  const { setTheme, theme } = useTheme();
  const [language, setLanguage] = useState(
    localStorage.getItem('language') || 'English'
  );
  const [activeSection, setActiveSection] = useState('Display Preferences');
  const [emailNotifications, setEmailNotifications] = useState(
    JSON.parse(localStorage.getItem('emailNotifications')) || false
  );
  const [emailFrequency, setEmailFrequency] = useState(
    localStorage.getItem('emailFrequency') || 'Instant'
  );
  const [emailAlerts, setEmailAlerts] = useState(
    JSON.parse(localStorage.getItem('emailAlerts')) || {
      budgetAlerts: false,
      goalMilestones: false,
      accountIssues: false,
    }
  );
  const [mobileNotifications, setMobileNotifications] = useState(
    JSON.parse(localStorage.getItem('mobileNotifications')) || false
  );
  const [mobileFrequency, setMobileFrequency] = useState(
    localStorage.getItem('mobileFrequency') || 'Instant'
  );
  const [mobileAlerts, setMobileAlerts] = useState(
    JSON.parse(localStorage.getItem('mobileAlerts')) || {
      budgetAlerts: false,
      goalMilestones: false,
      accountIssues: false,
    }
  );
  const [pushNotifications, setPushNotifications] = useState(
    JSON.parse(localStorage.getItem('pushNotifications')) || false
  );
  const [pushFrequency, setPushFrequency] = useState(
    localStorage.getItem('pushFrequency') || 'Instant'
  );
  const [pushAlerts, setPushAlerts] = useState(
    JSON.parse(localStorage.getItem('pushAlerts')) || {
      budgetAlerts: false,
      goalMilestones: false,
      accountIssues: false,
    }
  );
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [notifyUnreviewedTransactions, setNotifyUnreviewedTransactions] =
    useState(
      JSON.parse(localStorage.getItem('notifyUnreviewedTransactions')) || false
    );
  const [twoFactorAuth, setTwoFactorAuth] = useState(
    JSON.parse(localStorage.getItem('twoFactorAuth')) || false
  );
  const [fullName, setFullName] = useState(
    localStorage.getItem('fullName') || ''
  );
  const [birthday, setBirthday] = useState(
    localStorage.getItem('birthday') || ''
  );
  const [timezone, setTimezone] = useState(
    localStorage.getItem('timezone') || 'IST'
  );
  const [dataSharing, setDataSharing] = useState(
    JSON.parse(localStorage.getItem('dataSharing')) || false
  );

  useEffect(() => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('language', language);
    localStorage.setItem(
      'emailNotifications',
      JSON.stringify(emailNotifications)
    );
    localStorage.setItem('emailFrequency', emailFrequency);
    localStorage.setItem('emailAlerts', JSON.stringify(emailAlerts));
    localStorage.setItem(
      'mobileNotifications',
      JSON.stringify(mobileNotifications)
    );
    localStorage.setItem('mobileFrequency', mobileFrequency);
    localStorage.setItem('mobileAlerts', JSON.stringify(mobileAlerts));
    localStorage.setItem(
      'pushNotifications',
      JSON.stringify(pushNotifications)
    );
    localStorage.setItem('pushFrequency', pushFrequency);
    localStorage.setItem('pushAlerts', JSON.stringify(pushAlerts));
    localStorage.setItem(
      'notifyUnreviewedTransactions',
      JSON.stringify(notifyUnreviewedTransactions)
    );
    localStorage.setItem('twoFactorAuth', JSON.stringify(twoFactorAuth));
    localStorage.setItem('fullName', fullName);
    localStorage.setItem('birthday', birthday);
    localStorage.setItem('timezone', timezone);
    localStorage.setItem('dataSharing', JSON.stringify(dataSharing));
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

  const sectionStyles =
    'mb-6 pb-4 border-b border-gray-300 dark:border-gray-700';

  return (
    <div className='min-h-screen p-6 '>
      <header className='mb-8'>
        <h1 className='text-xl font-medium dark:text-white animate-fadeIn'>
          Settings and Preferences
        </h1>
        <p className='text-muted-foreground text-[13px] dark:text-white/50 animate-fadeIn'>
          Customize your application settings and preferences to enhance your
          experience.
        </p>
      </header>
      <div className='flex '>
        <nav className='w-54 p-4 h-full mr-10'>
          <ul className='space-y-2/2 text-sm'>
            {[
              'Display Preferences',
              'Notification',
              'Transaction Review',
              'Account Management',
              'User Profile',
              'Privacy Settings',
            ].map((section) => (
              <li
                key={section}
                className={`cursor-pointer py-2 px-4 rounded ${
                  activeSection === section
                    ? ' dark:text-white text-black font-medium'
                    : 'dark:text-white/30 text-black/30 '
                }`}
                onClick={() => handleSectionChange(section)}
              >
                {section}
              </li>
            ))}
          </ul>
        </nav>

        <div className='flex-1 p-6'>
          {activeSection === 'Display Preferences' && (
            <section className={sectionStyles}>
              <div className='border-[#383838] dark:bg-black/20 border rounded mb-4'>
                <div className='p-4'>
                  <h2 className='text-md font-semibold dark:text-white mb-5'>
                    Display Preferences
                  </h2>
                  <div className='mb-4'>
                    <Select
                      onValueChange={(value) => setTheme(value)}
                      className='dark:bg-black '
                    >
                      <SelectTrigger className='w-[180px] dark:text-white border-white/20 text-[12px]'>
                        <SelectValue
                          placeholder='Theme'
                          className='text-[12px]'
                        />
                      </SelectTrigger>
                      <SelectContent className='dark:bg-[#141414] dark:text-white border-white/20'>
                        <SelectItem value='light' className='text-[12px]'>
                          Light
                        </SelectItem>
                        <SelectItem value='dark' className='text-[12px]'>
                          Dark
                        </SelectItem>
                        <SelectItem value='system' className='text-[12px]'>
                          System
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />
                <div className='text-[12px] p-2 my-2 dark:text-white/40'>Select your preferred display mode from the options</div>
              </div>
              <div className='flex items-center'>
                <label className='mr-4 dark:text-white'>Language</label>
                <Select
                  className='border p-1 dark:bg-black dark:text-white'
                  value={language}
                  onValueChange={(value) => setLanguage(value)}
                >
                  <SelectTrigger className='dark:text-white'>
                    <SelectValue
                      placeholder='Select Language'
                      className='dark:text-white'
                    />
                  </SelectTrigger>
                  <SelectContent className='w-32 dark:bg-black dark:text-white'>
                    {['English', 'Chinese', 'Spanish', 'German'].map((lang) => (
                      <SelectItem
                        key={lang}
                        value={lang}
                        className='dark:text-white'
                      >
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Update />
            </section>
          )}

          {activeSection === 'Notification' && (
            <section className={sectionStyles}>
              <h2 className='text-xl font-semibold mb-6 dark:text-white'>
                Notification Settings
              </h2>
              <div className='mb-6'>
                <h3 className='text-lg font-semibold mb-4 dark:text-white'>
                  Email Notifications
                </h3>
                <div className='mb-4 flex items-center'>
                  <label className='mr-4 dark:text-white'>Enable</label>
                  <Checkbox
                    checked={emailNotifications}
                    onCheckedChange={(checked) =>
                      setEmailNotifications(checked)
                    }
                  />
                </div>
                <div className='mb-4 flex items-center'>
                  <label className='mr-4 dark:text-white'>Frequency</label>
                  <Select
                    className='border p-1 dark:bg-black dark:text-white'
                    value={emailFrequency}
                    onValueChange={(value) => setEmailFrequency(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select Frequency' />
                    </SelectTrigger>
                    <SelectContent className='w-32 dark:bg-black dark:text-white'>
                      {['Instant', 'Daily', 'Weekly'].map((freq) => (
                        <SelectItem key={freq} value={freq}>
                          {freq}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='mb-4'>
                  <h4 className='text-md font-semibold mb-2 dark:text-white'>
                    Alerts
                  </h4>
                  {['budgetAlerts', 'goalMilestones', 'accountIssues'].map(
                    (alert) => (
                      <div key={alert} className='mb-2 flex items-center'>
                        <label className='mr-4 dark:text-white capitalize'>
                          {alert.replace(/([A-Z])/g, ' $1').trim()}
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

              <div className='mb-6'>
                <h3 className='text-lg font-semibold mb-4 dark:text-white'>
                  Mobile Notifications
                </h3>
                <div className='mb-4 flex items-center'>
                  <label className='mr-4 dark:text-white'>Enable</label>
                  <Checkbox
                    checked={mobileNotifications}
                    onCheckedChange={(checked) =>
                      setMobileNotifications(checked)
                    }
                  />
                </div>
                <div className='mb-4 flex items-center'>
                  <label className='mr-4 dark:text-white'>Frequency</label>
                  <Select
                    className='border p-1 dark:bg-black dark:text-white'
                    value={mobileFrequency}
                    onValueChange={(value) => setMobileFrequency(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select Frequency' />
                    </SelectTrigger>
                    <SelectContent className='w-32 dark:bg-black dark:text-white'>
                      {['Instant', 'Daily', 'Weekly'].map((freq) => (
                        <SelectItem key={freq} value={freq}>
                          {freq}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='mb-4'>
                  <h4 className='text-md font-semibold mb-2 dark:text-white'>
                    Alerts
                  </h4>
                  {['budgetAlerts', 'goalMilestones', 'accountIssues'].map(
                    (alert) => (
                      <div key={alert} className='mb-2 flex items-center'>
                        <label className='mr-4 dark:text-white capitalize'>
                          {alert.replace(/([A-Z])/g, ' $1').trim()}
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
                <h3 className='text-lg font-semibold mb-4 dark:text-white'>
                  Push Notifications
                </h3>
                <div className='mb-4 flex items-center'>
                  <label className='mr-4 dark:text-white'>Enable</label>
                  <Checkbox
                    checked={pushNotifications}
                    onCheckedChange={(checked) => setPushNotifications(checked)}
                  />
                </div>
                <div className='mb-4 flex items-center'>
                  <label className='mr-4 dark:text-white'>Frequency</label>
                  <Select
                    className='border p-1 dark:bg-black dark:text-white'
                    value={pushFrequency}
                    onValueChange={(value) => setPushFrequency(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select Frequency' />
                    </SelectTrigger>
                    <SelectContent className='w-32 dark:bg-black dark:text-white'>
                      {['Instant', 'Daily', 'Weekly'].map((freq) => (
                        <SelectItem key={freq} value={freq}>
                          {freq}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='mb-4'>
                  <h4 className='text-md font-semibold mb-2 dark:text-white'>
                    Alerts
                  </h4>
                  {['budgetAlerts', 'goalMilestones', 'accountIssues'].map(
                    (alert) => (
                      <div key={alert} className='mb-2 flex items-center'>
                        <label className='mr-4 dark:text-white capitalize'>
                          {alert.replace(/([A-Z])/g, ' $1').trim()}
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

          {activeSection === 'Transaction Review' && (
            <section className={sectionStyles}>
              <h2 className='text-xl font-semibold mb-6 dark:text-white'>
                Transaction Review
              </h2>
              <div className='mb-4 flex items-center'>
                <label className='mr-4 dark:text-white'>
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

          {activeSection === 'Account Management' && (
            <section className={sectionStyles}>
              <h2 className='text-xl font-semibold mb-6 dark:text-white'>
                Account Management
              </h2>
              <div className='mb-4 flex items-center'>
                <label className='mr-4 dark:text-white'>Email</label>
                <Input
                  type='email'
                  className='border p-1 dark:bg-black dark:text-white ml-8'
                />
              </div>
              <div className='mb-4 flex items-center'>
                <label className='mr-4 dark:text-white'>Password</label>
                <div className='relative flex items-center'>
                  <Input
                    type={passwordVisible ? 'text' : 'password'}
                    className='border p-1 dark:bg-black dark:text-white'
                  />
                  <button
                    type='button'
                    className='absolute right-2'
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? (
                      <FaEyeSlash className='h-5 w-5 dark:text-white' />
                    ) : (
                      <FaEye className='h-5 w-5 dark:text-white' />
                    )}
                  </button>
                </div>
              </div>
              <div className='flex items-center'>
                <label className='mr-4 mt-4 dark:text-white'>
                  Two-Factor Authentication
                </label>
                <Checkbox
                  checked={twoFactorAuth}
                  className='mt-4'
                  onCheckedChange={(checked) => setTwoFactorAuth(checked)}
                />
              </div>
              <Update />
            </section>
          )}

          {activeSection === 'User Profile' && (
            <section className={sectionStyles}>
              <h2 className='text-xl font-semibold mb-6 dark:text-white'>
                User Profile
              </h2>
              <div className='mb-4 flex flex-col space-y-4'>
                <div className='mb-4 flex items-center'>
                  <label className='mr-4 dark:text-white'>Picture</label>
                  <input
                    type='file'
                    className='border p-1 dark:bg-black dark:text-white ml-6'
                  />
                </div>
                <div className='flex items-center'>
                  <label className='mr-4 dark:text-white'>Full Name</label>
                  <Input
                    type='text'
                    className='border p-1 dark:bg-black dark:text-white ml-1'
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className='flex items-center'>
                  <label className='mr-4 dark:text-white'>Birthday</label>
                  <Input
                    type='date'
                    className='border p-1 dark:bg-black dark:text-white ml-3'
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                  />
                </div>
                <div className='flex items-center'>
                  <label className='mr-4 dark:text-white'>Timezone</label>
                  <Select
                    className='border p-1 dark:bg-black dark:text-white'
                    value={timezone}
                    onValueChange={(value) => setTimezone(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select Timezone' />
                    </SelectTrigger>
                    <SelectContent className='w-32 dark:bg-black dark:text-white'>
                      {['IST', 'GMT', 'EST', 'PST'].map((tz) => (
                        <SelectItem key={tz} value={tz}>
                          {tz}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Update />
            </section>
          )}

          {activeSection === 'Privacy Settings' && (
            <section className={sectionStyles}>
              <h2 className='text-xl font-semibold mb-6 dark:text-white'>
                Privacy Settings
              </h2>
              <div className='mb-4 flex items-center'>
                <label className='mr-4 dark:text-white'>Data Sharing</label>
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
