import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  Plus,
  Search,
  MapPin,
  Phone,
  Mail,
  Globe,
  Pencil,
  MoreVertical,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import "../../styles/municipalities.css";

function Municipalities() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [municipalities, setMunicipalities] = useState([
    {
      id: 1,
      name: "Raymond Mhlaba Local Municipality",
      code: "RMLM",
      province: "Eastern Cape",
      town: "Fort Beaufort",
      phone: "040 653 8000",
      email: "info@raymondmhlaba.gov.za",
      website: "www.raymondmhlaba.gov.za",
      status: "ACTIVE",
    },
    {
      id: 2,
      name: "Makana Local Municipality",
      code: "MAKANA",
      province: "Eastern Cape",
      town: "Makhanda",
      phone: "046 603 6000",
      email: "info@makana.gov.za",
      website: "www.makana.gov.za",
      status: "ACTIVE",
    },
    {
      id: 3,
      name: "Ndlambe Local Municipality",
      code: "NDLAMBE",
      province: "Eastern Cape",
      town: "Port Alfred",
      phone: "046 604 5500",
      email: "info@ndlambe.gov.za",
      website: "www.ndlambe.gov.za",
      status: "ACTIVE",
    },
    {
      id: 4,
      name: "Peddie Municipality",
      code: "PEDDIE",
      province: "Eastern Cape",
      town: "Peddie",
      phone: "040 673 3000",
      email: "info@peddie.gov.za",
      website: "www.peddie.gov.za",
      status: "ACTIVE",
    },
  ]);

  const [form, setForm] = useState({
    name: "",
    code: "",
    province: "",
    town: "",
    phone: "",
    email: "",
    website: "",
    address: "",
  });

  const filteredMunicipalities = municipalities.filter((municipality) =>
    `${municipality.name} ${municipality.code} ${municipality.town}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name || !form.code || !form.province || !form.town) {
      alert("Please complete all required fields.");
      return;
    }

    const newMunicipality = {
      id: Date.now(),
      ...form,
      status: "ACTIVE",
    };

    setMunicipalities((current) => [
      ...current,
      newMunicipality,
    ]);

    setForm({
      name: "",
      code: "",
      province: "",
      town: "",
      phone: "",
      email: "",
      website: "",
      address: "",
    });

    setShowForm(false);
  };

  const handleManageMunicipality = (municipalityId) => {
    navigate(`/developer/municipalities/${municipalityId}`);
  };

  return (
    <div className="municipalities-page">
      {/* Header */}
      <header className="municipalities-header">
        <div className="municipalities-header-left">
          <button
            className="back-button"
            onClick={() => navigate("/developer/dashboard")}
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <p className="page-eyebrow">DEVELOPER PORTAL</p>

            <h1>Municipality Management</h1>

            <p>
              Add and manage municipalities connected to MuniConnect.
            </p>
          </div>
        </div>

        <button
          className="add-municipality-button"
          onClick={() => setShowForm(true)}
        >
          <Plus size={19} />
          Add Municipality
        </button>
      </header>

      {/* Summary */}
      <section className="municipality-summary">
        <div className="summary-card">
          <div className="summary-icon">
            <Building2 size={22} />
          </div>

          <div>
            <span>Total Municipalities</span>

            <strong>
              {municipalities.length}
            </strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <CheckCircle2 size={22} />
          </div>

          <div>
            <span>Active</span>

            <strong>
              {
                municipalities.filter(
                  (municipality) =>
                    municipality.status === "ACTIVE"
                ).length
              }
            </strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <XCircle size={22} />
          </div>

          <div>
            <span>Inactive</span>

            <strong>
              {
                municipalities.filter(
                  (municipality) =>
                    municipality.status !== "ACTIVE"
                ).length
              }
            </strong>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="municipality-toolbar">
        <div className="municipality-search">
          <Search size={19} />

          <input
            type="text"
            placeholder="Search municipalities..."
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
          />
        </div>
      </section>

      {/* Municipality list */}
      <section className="municipality-list">
        {filteredMunicipalities.map((municipality) => (
          <article
            className="municipality-card"
            key={municipality.id}
          >
            <div className="municipality-card-main">
              <div className="municipality-logo">
                <Building2 size={27} />
              </div>

              <div className="municipality-information">
                <div className="municipality-title-row">
                  <div>
                    <h2>{municipality.name}</h2>

                    <span className="municipality-code">
                      {municipality.code}
                    </span>
                  </div>

                  <span
                    className={`municipality-status ${
                      municipality.status === "ACTIVE"
                        ? "status-active"
                        : "status-inactive"
                    }`}
                  >
                    {municipality.status}
                  </span>
                </div>

                <div className="municipality-details">
                  <span>
                    <MapPin size={15} />

                    {municipality.town},{" "}
                    {municipality.province}
                  </span>

                  <span>
                    <Phone size={15} />

                    {municipality.phone}
                  </span>

                  <span>
                    <Mail size={15} />

                    {municipality.email}
                  </span>

                  <span>
                    <Globe size={15} />

                    {municipality.website}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="municipality-actions">
              <button
                onClick={() =>
                  handleManageMunicipality(
                    municipality.id
                  )
                }
              >
                <Pencil size={17} />

                Manage
              </button>

              <button
                className="icon-action"
                onClick={() =>
                  alert(
                    `More options for ${municipality.name}`
                  )
                }
              >
                <MoreVertical size={18} />
              </button>
            </div>
          </article>
        ))}

        {filteredMunicipalities.length === 0 && (
          <div className="empty-municipalities">
            <Building2 size={38} />

            <h3>No municipalities found</h3>

            <p>
              Try a different search term.
            </p>
          </div>
        )}
      </section>

      {/* Add Municipality Modal */}
      {showForm && (
        <div className="municipality-modal-overlay">
          <div className="municipality-modal">
            {/* Modal Header */}
            <div className="modal-header">
              <div>
                <p className="page-eyebrow">
                  NEW TENANT
                </p>

                <h2>Add Municipality</h2>

                <p>
                  Register a new municipality on the
                  MuniConnect platform.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={() => setShowForm(false)}
              >
                ×
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Municipality Information */}
              <div className="form-section">
                <h3>
                  Municipality Information
                </h3>

                <div className="form-grid">
                  <div className="form-field full-width">
                    <label>
                      Municipality Name{" "}
                      <span>*</span>
                    </label>

                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Raymond Mhlaba Local Municipality"
                    />
                  </div>

                  <div className="form-field">
                    <label>
                      Municipality Code{" "}
                      <span>*</span>
                    </label>

                    <input
                      name="code"
                      value={form.code}
                      onChange={handleChange}
                      placeholder="e.g. RMLM"
                    />
                  </div>

                  <div className="form-field">
                    <label>
                      Province <span>*</span>
                    </label>

                    <select
                      name="province"
                      value={form.province}
                      onChange={handleChange}
                    >
                      <option value="">
                        Select province
                      </option>

                      <option>
                        Eastern Cape
                      </option>

                      <option>
                        Free State
                      </option>

                      <option>
                        Gauteng
                      </option>

                      <option>
                        KwaZulu-Natal
                      </option>

                      <option>
                        Limpopo
                      </option>

                      <option>
                        Mpumalanga
                      </option>

                      <option>
                        North West
                      </option>

                      <option>
                        Northern Cape
                      </option>

                      <option>
                        Western Cape
                      </option>
                    </select>
                  </div>

                  <div className="form-field">
                    <label>
                      Main Town <span>*</span>
                    </label>

                    <input
                      name="town"
                      value={form.town}
                      onChange={handleChange}
                      placeholder="e.g. Fort Beaufort"
                    />
                  </div>

                  <div className="form-field">
                    <label>
                      Contact Number
                    </label>

                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="e.g. 040 000 0000"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="form-section">
                <h3>
                  Contact Information
                </h3>

                <div className="form-grid">
                  <div className="form-field">
                    <label>
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="info@municipality.gov.za"
                    />
                  </div>

                  <div className="form-field">
                    <label>
                      Website
                    </label>

                    <input
                      name="website"
                      value={form.website}
                      onChange={handleChange}
                      placeholder="www.municipality.gov.za"
                    />
                  </div>

                  <div className="form-field full-width">
                    <label>
                      Physical Address
                    </label>

                    <textarea
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="Municipal offices physical address"
                      rows="3"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() =>
                    setShowForm(false)
                  }
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-municipality-button"
                >
                  <Plus size={18} />

                  Add Municipality
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Municipalities;