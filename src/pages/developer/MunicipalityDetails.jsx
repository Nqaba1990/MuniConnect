import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Settings,
  Users,
  Wrench,
  MapPin,
  Bell,
  ShieldCheck,
  Pencil,
  CheckCircle2,
} from "lucide-react";
import "../../styles/municipality-details.css";

function MunicipalityDetails() {
  const navigate = useNavigate();
  const { municipalityId } = useParams();

  const municipality = {
    id: municipalityId,
    name: "Raymond Mhlaba Local Municipality",
    code: "RMLM",
    province: "Eastern Cape",
    town: "Fort Beaufort",
    phone: "040 653 8000",
    email: "info@raymondmhlaba.gov.za",
    website: "www.raymondmhlaba.gov.za",
    address:
      "15 Somerset Street, Fort Beaufort, Eastern Cape",
    status: "ACTIVE",
  };

  const departments = [
    {
      name: "Water",
      description:
        "Water leaks, outages and water supply problems.",
      status: "ACTIVE",
    },
    {
      name: "Sewerage",
      description:
        "Blocked drains, sewer leaks and overflowing manholes.",
      status: "ACTIVE",
    },
    {
      name: "Electricity",
      description:
        "Municipal electricity faults and streetlights.",
      status: "ACTIVE",
    },
    {
      name: "Refuse",
      description:
        "Missed collections, bins and illegal dumping.",
      status: "ACTIVE",
    },
    {
      name: "Fire Department",
      description:
        "Fire hazards, hydrants and fire-related services.",
      status: "ACTIVE",
    },
    {
      name: "Eskom",
      description:
        "Community reports for Eskom electricity faults.",
      status: "ACTIVE",
    },
  ];

  const handleEditDetails = () => {
    alert(
      "Municipality editing will be connected to the backend later."
    );
  };

  const handleAdministrators = () => {
  navigate(
    `/developer/municipalities/${municipalityId}/administrators`
  );
};

  const handleAgents = () => {
  navigate(
    `/developer/municipalities/${municipalityId}/agents`
  );
};

  const handleTechnicians = () => {
  navigate(
    `/developer/municipalities/${municipalityId}/technicians`
  );
};

  const handleServiceAreas = () => {
  navigate(
   `/developer/municipalities/${municipalityId}/service-areas`
  );

  };

  const handleMunicipalAlerts = () => {
  navigate(
    `/developer/municipalities/${municipalityId}/alerts`
  );
};

  const handleSettings = () => {
    alert("Municipality settings will be managed here.");
  };

  const handleDepartmentConfigure = (departmentName) => {
    alert(
      `Detailed configuration for ${departmentName} will be added here.`
    );
  };

  return (
    <div className="municipality-details-page">
      {/* =====================================
          HEADER
      ====================================== */}

      <header className="details-header">
        <div className="details-header-left">
          <button
            className="details-back-button"
            onClick={() =>
              navigate("/developer/municipalities")
            }
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <p className="details-eyebrow">
              MUNICIPALITY MANAGEMENT
            </p>

            <h1>{municipality.name}</h1>

            <p>
              Configure municipality information,
              departments, users and services.
            </p>
          </div>
        </div>

        <span className="details-active-badge">
          <CheckCircle2 size={16} />
          {municipality.status}
        </span>
      </header>

      {/* =====================================
          MUNICIPALITY PROFILE
      ====================================== */}

      <section className="municipality-profile-card">
        <div className="municipality-profile-logo">
          <Building2 size={38} />
        </div>

        <div className="municipality-profile-content">
          <div className="profile-title-row">
            <div>
              <span className="profile-code">
                {municipality.code}
              </span>

              <h2>{municipality.name}</h2>
            </div>

            <button
              className="edit-profile-button"
              onClick={handleEditDetails}
            >
              <Pencil size={16} />
              Edit Details
            </button>
          </div>

          <div className="profile-information">
            <span>
              <MapPin size={15} />
              {municipality.town},{" "}
              {municipality.province}
            </span>

            <span>
              <strong>Phone:</strong>{" "}
              {municipality.phone}
            </span>

            <span>
              <strong>Email:</strong>{" "}
              {municipality.email}
            </span>

            <span>
              <strong>Website:</strong>{" "}
              {municipality.website}
            </span>
          </div>

          <div className="profile-address">
            <MapPin size={15} />
            {municipality.address}
          </div>
        </div>
      </section>

      {/* =====================================
          MANAGEMENT CARDS
      ====================================== */}

      <section className="municipality-management-grid">
        {/* Administrators */}

        <button
          className="management-section-card"
          onClick={handleAdministrators}
        >
          <div className="section-card-icon">
            <Users size={23} />
          </div>

          <div>
            <h3>Administrators</h3>

            <p>
              Manage municipality administrators and
              their permissions.
            </p>
          </div>

          <strong>3</strong>
        </button>

        {/* Agents */}

        <button
          className="management-section-card"
          onClick={handleAgents}
        >
          <div className="section-card-icon">
            <Users size={23} />
          </div>

          <div>
            <h3>Agents</h3>

            <p>
              Manage service agents assigned to this
              municipality.
            </p>
          </div>

          <strong>8</strong>
        </button>

        {/* Technicians */}

        <button
          className="management-section-card"
          onClick={handleTechnicians}
        >
          <div className="section-card-icon">
            <Wrench size={23} />
          </div>

          <div>
            <h3>Technicians</h3>

            <p>
              Manage technicians responsible for field
              work.
            </p>
          </div>

          <strong>16</strong>
        </button>

        {/* Service Areas */}

        <button
          className="management-section-card"
          onClick={handleServiceAreas}
        >
          <div className="section-card-icon">
            <MapPin size={23} />
          </div>

          <div>
            <h3>Service Areas</h3>

            <p>
              Configure towns, wards and areas covered
              by the municipality.
            </p>
          </div>

          <strong>12</strong>
        </button>

        {/* Alerts */}

        <button
          className="management-section-card"
          onClick={handleAlerts}
        >
          <div className="section-card-icon">
            <Bell size={23} />
          </div>

          <div>
            <h3>Municipal Alerts</h3>

            <p>
              Create and manage alerts for the
              community.
            </p>
          </div>

          <strong>4</strong>
        </button>

        {/* Settings */}

        <button
          className="management-section-card"
          onClick={handleSettings}
        >
          <div className="section-card-icon">
            <Settings size={23} />
          </div>

          <div>
            <h3>Settings</h3>

            <p>
              Configure municipality-specific platform
              settings.
            </p>
          </div>
        </button>
      </section>

      {/* =====================================
          DEPARTMENTS & SERVICES
      ====================================== */}

      <section className="departments-section">
        <div className="departments-heading">
          <div>
            <p className="details-eyebrow">
              SERVICE CONFIGURATION
            </p>

            <h2>Departments & Services</h2>

            <p>
              Services available to residents within
              this municipality.
            </p>
          </div>

          <button
            className="configure-services-button"
            onClick={() =>
              navigate(
                `/developer/municipalities/${municipalityId}/services`
              )
            }
          >
            <Settings size={17} />
            Configure Services
          </button>
        </div>

        <div className="departments-grid">
          {departments.map((department) => (
            <div
              className="department-card"
              key={department.name}
            >
              <div className="department-card-top">
                <div className="department-icon">
                  <Wrench size={21} />
                </div>

                <span className="department-status">
                  <CheckCircle2 size={13} />
                  {department.status}
                </span>
              </div>

              <h3>{department.name}</h3>

              <p>{department.description}</p>

              <button
                onClick={() =>
                  handleDepartmentConfigure(
                    department.name
                  )
                }
              >
                Configure
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================
          SECURITY / TENANT ISOLATION
      ====================================== */}

      <section className="municipality-security-notice">
        <div className="security-icon">
          <ShieldCheck size={24} />
        </div>

        <div>
          <h3>
            Municipality Data Isolation
          </h3>

          <p>
            Users, tickets, services, alerts and other
            records belonging to this municipality will
            be isolated from other municipalities. This
            rule will ultimately be enforced by the
            Spring Boot backend and database.
          </p>
        </div>
      </section>
    </div>
  );
}

export default MunicipalityDetails;