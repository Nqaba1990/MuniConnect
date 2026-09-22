import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Settings,
  ShieldCheck,
  Bell,
  Ticket,
  Clock3,
  Upload,
  Smartphone,
  Server,
  CheckCircle2,
  AlertTriangle,
  LockKeyhole,
} from "lucide-react";

import "../../styles/system-settings.css";

function SystemSettings() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    platformName: "MuniConnect",
    supportEmail: "support@municonnect.co.za",
    supportPhone: "010 000 0000",

    maintenanceMode: false,
    allowNewMunicipalities: true,

    requireMFA: true,
    passwordExpiry: "90",
    sessionTimeout: "30",
    maxLoginAttempts: "5",

    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,

    defaultSla: "24",
    urgentSla: "2",
    autoAssignment: true,
    residentNotifications: true,

    maxFileSize: "10",
    allowPhotos: true,
    allowLocation: true,

    pwaEnabled: true,
    offlineMode: true,
    pushEnabled: true,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setSettings((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));

    setSaved(false);
  };

  const saveSettings = () => {
    setSaved(true);

    window.setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  return (
    <div className="system-settings-page">

      <header className="system-settings-header">

        <div className="system-settings-header-left">

          <button
            className="system-settings-back"
            onClick={() =>
              navigate("/developer/dashboard")
            }
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="system-settings-breadcrumb">
              Developer / System Settings
            </div>

            <h1>System-wide Settings</h1>

            <p>
              Configure platform-wide MuniConnect
              behaviour.
            </p>
          </div>

        </div>

        <button
          className="system-settings-save"
          onClick={saveSettings}
        >
          <Save size={17} />
          Save Changes
        </button>

      </header>

      {saved && (
        <div className="system-settings-success">
          <CheckCircle2 size={18} />

          <div>
            <strong>Settings saved</strong>

            <p>
              Platform settings have been updated
              successfully.
            </p>
          </div>
        </div>
      )}

      <div className="system-settings-layout">

        <main className="system-settings-main">

          {/* GENERAL */}
          <section className="system-settings-section">

            <div className="system-settings-section-header">
              <div className="system-settings-icon">
                <Settings size={19} />
              </div>

              <div>
                <h2>General Platform Settings</h2>

                <p>
                  Basic information and platform
                  controls.
                </p>
              </div>
            </div>

            <div className="system-settings-form-grid">

              <div className="system-settings-field">
                <label>Platform Name</label>

                <input
                  name="platformName"
                  value={settings.platformName}
                  onChange={handleChange}
                />
              </div>

              <div className="system-settings-field">
                <label>Support Email</label>

                <input
                  name="supportEmail"
                  type="email"
                  value={settings.supportEmail}
                  onChange={handleChange}
                />
              </div>

              <div className="system-settings-field">
                <label>Support Phone</label>

                <input
                  name="supportPhone"
                  value={settings.supportPhone}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="system-settings-options">

              <label className="system-settings-toggle">

                <div>
                  <strong>Maintenance Mode</strong>

                  <span>
                    Temporarily place the entire
                    MuniConnect platform into maintenance
                    mode.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={handleChange}
                />

              </label>

              <label className="system-settings-toggle">

                <div>
                  <strong>
                    Allow New Municipalities
                  </strong>

                  <span>
                    Allow Developer users to onboard
                    additional municipalities.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="allowNewMunicipalities"
                  checked={
                    settings.allowNewMunicipalities
                  }
                  onChange={handleChange}
                />

              </label>

            </div>

          </section>

          {/* SECURITY */}
          <section className="system-settings-section">

            <div className="system-settings-section-header">
              <div className="system-settings-icon">
                <ShieldCheck size={19} />
              </div>

              <div>
                <h2>Security & Authentication</h2>

                <p>
                  Platform-wide authentication and
                  account security policies.
                </p>
              </div>
            </div>

            <div className="system-settings-options">

              <label className="system-settings-toggle">

                <div>
                  <strong>
                    Require MFA
                  </strong>

                  <span>
                    Require multi-factor authentication
                    for supported accounts.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="requireMFA"
                  checked={settings.requireMFA}
                  onChange={handleChange}
                />

              </label>

              <div className="system-settings-select-row">

                <div>
                  <strong>Password Expiry</strong>

                  <span>
                    Number of days before passwords must
                    be changed.
                  </span>
                </div>

                <select
                  name="passwordExpiry"
                  value={settings.passwordExpiry}
                  onChange={handleChange}
                >
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="90">90 days</option>
                  <option value="180">180 days</option>
                  <option value="0">Never</option>
                </select>

              </div>

              <div className="system-settings-select-row">

                <div>
                  <strong>Session Timeout</strong>

                  <span>
                    Automatically end inactive sessions.
                  </span>
                </div>

                <select
                  name="sessionTimeout"
                  value={settings.sessionTimeout}
                  onChange={handleChange}
                >
                  <option value="15">
                    15 minutes
                  </option>

                  <option value="30">
                    30 minutes
                  </option>

                  <option value="60">
                    1 hour
                  </option>

                  <option value="120">
                    2 hours
                  </option>
                </select>

              </div>

              <div className="system-settings-select-row">

                <div>
                  <strong>
                    Maximum Login Attempts
                  </strong>

                  <span>
                    Failed attempts before temporary
                    account lockout.
                  </span>
                </div>

                <select
                  name="maxLoginAttempts"
                  value={settings.maxLoginAttempts}
                  onChange={handleChange}
                >
                  <option value="3">3 attempts</option>
                  <option value="5">5 attempts</option>
                  <option value="10">10 attempts</option>
                </select>

              </div>

            </div>

          </section>

          {/* NOTIFICATIONS */}
          <section className="system-settings-section">

            <div className="system-settings-section-header">
              <div className="system-settings-icon">
                <Bell size={19} />
              </div>

              <div>
                <h2>Notifications</h2>

                <p>
                  Configure available notification
                  channels.
                </p>
              </div>
            </div>

            <div className="system-settings-options">

              <label className="system-settings-toggle">

                <div>
                  <strong>Email Notifications</strong>

                  <span>
                    Enable email notifications throughout
                    the platform.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={
                    settings.emailNotifications
                  }
                  onChange={handleChange}
                />

              </label>

              <label className="system-settings-toggle">

                <div>
                  <strong>SMS Notifications</strong>

                  <span>
                    Enable SMS notifications when an SMS
                    provider is configured.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="smsNotifications"
                  checked={
                    settings.smsNotifications
                  }
                  onChange={handleChange}
                />

              </label>

              <label className="system-settings-toggle">

                <div>
                  <strong>Push Notifications</strong>

                  <span>
                    Enable browser and PWA push
                    notifications.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="pushNotifications"
                  checked={
                    settings.pushNotifications
                  }
                  onChange={handleChange}
                />

              </label>

            </div>

          </section>

          {/* TICKETS */}
          <section className="system-settings-section">

            <div className="system-settings-section-header">
              <div className="system-settings-icon">
                <Ticket size={19} />
              </div>

              <div>
                <h2>Ticket Defaults</h2>

                <p>
                  Default behaviour for municipal fault
                  reports.
                </p>
              </div>
            </div>

            <div className="system-settings-form-grid">

              <div className="system-settings-field">
                <label>
                  Default SLA
                </label>

                <select
                  name="defaultSla"
                  value={settings.defaultSla}
                  onChange={handleChange}
                >
                  <option value="4">4 hours</option>
                  <option value="8">8 hours</option>
                  <option value="24">24 hours</option>
                  <option value="48">48 hours</option>
                  <option value="72">72 hours</option>
                </select>
              </div>

              <div className="system-settings-field">
                <label>
                  Urgent Ticket SLA
                </label>

                <select
                  name="urgentSla"
                  value={settings.urgentSla}
                  onChange={handleChange}
                >
                  <option value="1">1 hour</option>
                  <option value="2">2 hours</option>
                  <option value="4">4 hours</option>
                  <option value="8">8 hours</option>
                </select>
              </div>

            </div>

            <div className="system-settings-options">

              <label className="system-settings-toggle">

                <div>
                  <strong>
                    Automatic Ticket Assignment
                  </strong>

                  <span>
                    Allow the system to automatically
                    assign tickets.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="autoAssignment"
                  checked={settings.autoAssignment}
                  onChange={handleChange}
                />

              </label>

              <label className="system-settings-toggle">

                <div>
                  <strong>
                    Resident Ticket Notifications
                  </strong>

                  <span>
                    Notify residents about ticket status
                    changes.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="residentNotifications"
                  checked={
                    settings.residentNotifications
                  }
                  onChange={handleChange}
                />

              </label>

            </div>

          </section>

          {/* FILES */}
          <section className="system-settings-section">

            <div className="system-settings-section-header">
              <div className="system-settings-icon">
                <Upload size={19} />
              </div>

              <div>
                <h2>File & Location Settings</h2>

                <p>
                  Configure evidence uploads and resident
                  location information.
                </p>
              </div>
            </div>

            <div className="system-settings-form-grid">

              <div className="system-settings-field">
                <label>
                  Maximum File Size
                </label>

                <select
                  name="maxFileSize"
                  value={settings.maxFileSize}
                  onChange={handleChange}
                >
                  <option value="5">5 MB</option>
                  <option value="10">10 MB</option>
                  <option value="20">20 MB</option>
                  <option value="50">50 MB</option>
                </select>
              </div>

            </div>

            <div className="system-settings-options">

              <label className="system-settings-toggle">

                <div>
                  <strong>
                    Allow Photo Uploads
                  </strong>

                  <span>
                    Residents and staff can attach photos
                    to tickets.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="allowPhotos"
                  checked={settings.allowPhotos}
                  onChange={handleChange}
                />

              </label>

              <label className="system-settings-toggle">

                <div>
                  <strong>
                    Allow Location Information
                  </strong>

                  <span>
                    Allow tickets to include location
                    information.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="allowLocation"
                  checked={settings.allowLocation}
                  onChange={handleChange}
                />

              </label>

            </div>

          </section>

          {/* PWA */}
          <section className="system-settings-section">

            <div className="system-settings-section-header">
              <div className="system-settings-icon">
                <Smartphone size={19} />
              </div>

              <div>
                <h2>PWA & Mobile Experience</h2>

                <p>
                  Configure progressive web application
                  features.
                </p>
              </div>
            </div>

            <div className="system-settings-options">

              <label className="system-settings-toggle">

                <div>
                  <strong>
                    PWA Enabled
                  </strong>

                  <span>
                    Allow MuniConnect to be installed as
                    a PWA.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="pwaEnabled"
                  checked={settings.pwaEnabled}
                  onChange={handleChange}
                />

              </label>

              <label className="system-settings-toggle">

                <div>
                  <strong>
                    Offline Mode
                  </strong>

                  <span>
                    Allow supported screens to operate
                    with limited connectivity.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="offlineMode"
                  checked={settings.offlineMode}
                  onChange={handleChange}
                />

              </label>

              <label className="system-settings-toggle">

                <div>
                  <strong>
                    PWA Push Notifications
                  </strong>

                  <span>
                    Enable push notifications for
                    installed applications.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="pushEnabled"
                  checked={settings.pushEnabled}
                  onChange={handleChange}
                />

              </label>

            </div>

          </section>

        </main>

        <aside className="system-settings-sidebar">

          <section className="system-side-card">

            <div className="system-side-icon">
              <Server size={20} />
            </div>

            <h3>Platform Status</h3>

            <div className="system-status-row">
              <span>Platform</span>

              <strong>
                <CheckCircle2 size={13} />
                Operational
              </strong>
            </div>

            <div className="system-status-row">
              <span>Environment</span>
              <strong>Development</strong>
            </div>

            <div className="system-status-row">
              <span>Version</span>
              <strong>1.0.0</strong>
            </div>

          </section>

          <section className="system-side-card">

            <div className="system-side-icon security">
              <LockKeyhole size={20} />
            </div>

            <h3>Security</h3>

            <p>
              Platform security policies apply across
              supported municipalities unless overridden
              by municipality configuration.
            </p>

            <div className="system-security-status">
              <CheckCircle2 size={15} />
              MFA policy enabled
            </div>

          </section>

          <section className="system-side-card warning">

            <div className="system-side-icon warning">
              <AlertTriangle size={20} />
            </div>

            <h3>Developer Notice</h3>

            <p>
              These settings are currently stored in
              frontend state. Production persistence will
              be handled by the Spring Boot API and
              MariaDB.
            </p>

          </section>

        </aside>

      </div>

    </div>
  );
}

export default SystemSettings;