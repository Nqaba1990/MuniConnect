import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  ShieldCheck,
  Bell,
  LockKeyhole,
  Pencil,
  Save,
  X,
  LogOut,
  CheckCircle2,
} from "lucide-react";

import "../../styles/profile.css";

function Profile() {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "Demo",
    lastName: "Resident",
    email: "resident@municonnect.co.za",
    phone: "072 123 4567",
    address: "Fort Beaufort",
    municipality: "Raymond Mhlaba Local Municipality",
    municipalityCode: "RMLM",
  });

  const [preferences, setPreferences] = useState({
    municipalAlerts: true,
    ticketUpdates: true,
    communityUpdates: true,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePreferenceChange = (event) => {
    const { name, checked } = event.target;

    setPreferences((previous) => ({
      ...previous,
      [name]: checked,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);

    window.alert(
      "Profile updated successfully. Changes will be saved to the server when the backend is connected."
    );
  };

  const handleLogout = () => {
    const confirmed = window.confirm(
      "Are you sure you want to log out?"
    );

    if (!confirmed) return;

    navigate("/login");
  };

  return (
    <div className="profile-page">
      <header className="profile-header">
        <div className="profile-header-left">
          <button
            className="profile-back-button"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="profile-breadcrumb">
              Resident / My Profile
            </div>

            <h1>My Profile</h1>

            <p>
              Manage your personal information and account
              settings.
            </p>
          </div>
        </div>

        {!isEditing ? (
          <button
            className="profile-primary-button"
            onClick={() => setIsEditing(true)}
          >
            <Pencil size={17} />
            Edit Profile
          </button>
        ) : (
          <div className="profile-header-actions">
            <button
              className="profile-secondary-button"
              onClick={() => setIsEditing(false)}
            >
              <X size={17} />
              Cancel
            </button>

            <button
              className="profile-primary-button"
              onClick={handleSave}
            >
              <Save size={17} />
              Save Changes
            </button>
          </div>
        )}
      </header>

      <section className="profile-overview-card">
        <div className="profile-avatar">
          {profile.firstName.charAt(0)}
          {profile.lastName.charAt(0)}
        </div>

        <div className="profile-overview-info">
          <h2>
            {profile.firstName} {profile.lastName}
          </h2>

          <p>{profile.email}</p>

          <div className="profile-overview-meta">
            <span>
              <Building2 size={14} />
              {profile.municipality}
            </span>

            <span className="profile-active-badge">
              <CheckCircle2 size={13} />
              Active Account
            </span>
          </div>
        </div>

        <div className="profile-municipality-code">
          <span>Municipality</span>
          <strong>{profile.municipalityCode}</strong>
        </div>
      </section>

      <div className="profile-content-grid">
        <main className="profile-main-column">
          <section className="profile-section">
            <div className="profile-section-header">
              <div>
                <h2>Personal Information</h2>
                <p>
                  Your basic contact and residential
                  information.
                </p>
              </div>

              <User size={20} />
            </div>

            <div className="profile-form-grid">
              <div className="profile-field">
                <label>First Name</label>

                <div className="profile-input-wrapper">
                  <User size={16} />

                  <input
                    name="firstName"
                    value={profile.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="profile-field">
                <label>Last Name</label>

                <div className="profile-input-wrapper">
                  <User size={16} />

                  <input
                    name="lastName"
                    value={profile.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="profile-field">
                <label>Email Address</label>

                <div className="profile-input-wrapper">
                  <Mail size={16} />

                  <input
                    name="email"
                    type="email"
                    value={profile.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="profile-field">
                <label>Phone Number</label>

                <div className="profile-input-wrapper">
                  <Phone size={16} />

                  <input
                    name="phone"
                    value={profile.phone}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="profile-field profile-field-full">
                <label>Residential Address / Area</label>

                <div className="profile-input-wrapper">
                  <MapPin size={16} />

                  <input
                    name="address"
                    value={profile.address}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="profile-section">
            <div className="profile-section-header">
              <div>
                <h2>Municipality</h2>
                <p>
                  Your account is linked to the municipality
                  selected during registration.
                </p>
              </div>

              <Building2 size={20} />
            </div>

            <div className="profile-municipality-box">
              <div className="profile-municipality-icon">
                <Building2 size={22} />
              </div>

              <div>
                <span>Registered Municipality</span>

                <strong>
                  {profile.municipality}
                </strong>

                <small>
                  Municipality Code:{" "}
                  {profile.municipalityCode}
                </small>
              </div>
            </div>

            <div className="profile-isolation-notice">
              <ShieldCheck size={19} />

              <div>
                <strong>
                  Municipality account protection
                </strong>

                <p>
                  Your resident account is associated with
                  this municipality. You will only see
                  municipal services, tickets and alerts
                  available to your municipality.
                </p>
              </div>
            </div>
          </section>

          <section className="profile-section">
            <div className="profile-section-header">
              <div>
                <h2>Notification Preferences</h2>
                <p>
                  Choose which updates you want to receive.
                </p>
              </div>

              <Bell size={20} />
            </div>

            <div className="profile-preferences">
              <label className="profile-preference">
                <div>
                  <strong>Municipal Alerts</strong>

                  <span>
                    Receive important announcements from
                    your municipality.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="municipalAlerts"
                  checked={
                    preferences.municipalAlerts
                  }
                  onChange={handlePreferenceChange}
                />
              </label>

              <label className="profile-preference">
                <div>
                  <strong>Ticket Updates</strong>

                  <span>
                    Receive updates when your reported
                    faults change status.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="ticketUpdates"
                  checked={preferences.ticketUpdates}
                  onChange={handlePreferenceChange}
                />
              </label>

              <label className="profile-preference">
                <div>
                  <strong>Community Updates</strong>

                  <span>
                    Receive general community information
                    and service updates.
                  </span>
                </div>

                <input
                  type="checkbox"
                  name="communityUpdates"
                  checked={
                    preferences.communityUpdates
                  }
                  onChange={handlePreferenceChange}
                />
              </label>
            </div>
          </section>
        </main>

        <aside className="profile-side-column">
          <section className="profile-security-card">
            <div className="profile-side-icon">
              <ShieldCheck size={21} />
            </div>

            <h3>Account Security</h3>

            <div className="profile-security-item">
              <div>
                <strong>MFA</strong>
                <span>
                  Multi-factor authentication
                </span>
              </div>

              <span className="security-enabled">
                Enabled
              </span>
            </div>

            <div className="profile-security-item">
              <div>
                <strong>Password</strong>
                <span>
                  Last changed: Never
                </span>
              </div>

              <button
                className="profile-small-button"
                onClick={() =>
                  window.alert(
                    "Password change will be connected to the backend."
                  )
                }
              >
                Change
              </button>
            </div>

            <div className="profile-security-item">
              <div>
                <strong>Account Status</strong>
                <span>
                  Your account is currently active.
                </span>
              </div>

              <CheckCircle2
                size={18}
                className="security-check"
              />
            </div>
          </section>

          <section className="profile-quick-card">
            <h3>Quick Access</h3>

            <button
              onClick={() => navigate("/tickets")}
            >
              <span>
                <CheckCircle2 size={17} />
                My Tickets
              </span>

              <span>→</span>
            </button>

            <button
              onClick={() =>
                navigate("/notifications")
              }
            >
              <span>
                <Bell size={17} />
                Notifications
              </span>

              <span>→</span>
            </button>

            <button
              onClick={() => navigate("/calendar")}
            >
              <span>
                <Bell size={17} />
                Calendar
              </span>

              <span>→</span>
            </button>
          </section>

          <section className="profile-account-actions">
            <div className="profile-side-icon danger">
              <LockKeyhole size={20} />
            </div>

            <h3>Account</h3>

            <p>
              You can log out of MuniConnect from this
              device.
            </p>

            <button
              className="profile-logout-button"
              onClick={handleLogout}
            >
              <LogOut size={17} />
              Log Out
            </button>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default Profile;