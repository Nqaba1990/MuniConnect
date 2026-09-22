import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Wrench,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Search,
  MapPin,
  LogOut,
  ArrowRight,
} from "lucide-react";

import "../../styles/technician-dashboard.css";

const technicianJobs = [
  {
    id: "MC-ESKO-583921",
    service: "Eskom",
    title: "Power Outage",
    resident: "Thabo Mokoena",
    location: "12 Station Road, Fort Beaufort",
    priority: "URGENT",
    status: "IN PROGRESS",
    assigned: "14 Sep 2026, 16:20",
  },
  {
    id: "MC-REFU-781234",
    service: "Refuse",
    title: "Missed Collection",
    resident: "Lerato Jacobs",
    location: "Victoria Road, Fort Beaufort",
    priority: "MEDIUM",
    status: "ASSIGNED",
    assigned: "15 Sep 2026, 08:40",
  },
  {
    id: "MC-FIRE-219876",
    service: "Fire Department",
    title: "Fire Hydrant Problem",
    resident: "Peter Williams",
    location: "High Street, Fort Beaufort",
    priority: "HIGH",
    status: "IN PROGRESS",
    assigned: "13 Sep 2026, 14:10",
  },
  {
    id: "MC-WATE-998321",
    service: "Water",
    title: "Burst Pipe",
    resident: "Ayanda Ndlovu",
    location: "Victoria Street, Fort Beaufort",
    priority: "HIGH",
    status: "ASSIGNED",
    assigned: "15 Sep 2026, 11:05",
  },
  {
    id: "MC-ELEC-654210",
    service: "Electricity",
    title: "Damaged Electrical Pole",
    resident: "Michael Adams",
    location: "Church Road, Fort Beaufort",
    priority: "URGENT",
    status: "COMPLETED",
    assigned: "12 Sep 2026, 09:30",
  },
];

function TechnicianDashboard() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filteredJobs = useMemo(() => {
    return technicianJobs.filter((job) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        job.id.toLowerCase().includes(searchValue) ||
        job.title.toLowerCase().includes(searchValue) ||
        job.resident.toLowerCase().includes(searchValue) ||
        job.location.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "ALL" || job.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const assignedJobs = technicianJobs.filter(
    (job) => job.status === "ASSIGNED"
  ).length;

  const inProgressJobs = technicianJobs.filter(
    (job) => job.status === "IN PROGRESS"
  ).length;

  const completedJobs = technicianJobs.filter(
    (job) => job.status === "COMPLETED"
  ).length;

  const urgentJobs = technicianJobs.filter(
    (job) => job.priority === "URGENT" && job.status !== "COMPLETED"
  ).length;

  return (
    <div className="technician-dashboard">
      <aside className="technician-sidebar">
        <div className="technician-brand">
          <div className="technician-logo">M</div>

          <div>
            <strong>MuniConnect</strong>
            <span>Technician Portal</span>
          </div>
        </div>

        <nav className="technician-navigation">
          <button className="active">
            <LayoutDashboard size={19} />
            Dashboard
          </button>

          <button>
            <Wrench size={19} />
            My Jobs
          </button>

          <button>
            <Clock3 size={19} />
            Job History
          </button>
        </nav>

        <div className="technician-sidebar-bottom">
          <button onClick={() => navigate("/")}>
            <LogOut size={19} />
            Logout
          </button>
        </div>
      </aside>

      <main className="technician-main">
        <header className="technician-topbar">
          <div>
            <span className="technician-label">
              TECHNICIAN PORTAL
            </span>

            <h1>My Dashboard</h1>

            <p>
              View and manage municipal jobs assigned to you.
            </p>
          </div>

          <div className="technician-user">
            <div className="technician-avatar">T</div>

            <div>
              <strong>Sipho Nkosi</strong>
              <span>Field Technician</span>
            </div>
          </div>
        </header>

        <section className="technician-stats">
          <div className="technician-stat-card">
            <div className="technician-stat-icon assigned">
              <Wrench size={21} />
            </div>

            <div>
              <span>Assigned Jobs</span>
              <strong>{assignedJobs}</strong>
              <small>Waiting to start</small>
            </div>
          </div>

          <div className="technician-stat-card">
            <div className="technician-stat-icon progress">
              <Clock3 size={21} />
            </div>

            <div>
              <span>In Progress</span>
              <strong>{inProgressJobs}</strong>
              <small>Currently working</small>
            </div>
          </div>

          <div className="technician-stat-card">
            <div className="technician-stat-icon urgent">
              <AlertTriangle size={21} />
            </div>

            <div>
              <span>Urgent Jobs</span>
              <strong>{urgentJobs}</strong>
              <small>Needs attention</small>
            </div>
          </div>

          <div className="technician-stat-card">
            <div className="technician-stat-icon completed">
              <CheckCircle2 size={21} />
            </div>

            <div>
              <span>Completed</span>
              <strong>{completedJobs}</strong>
              <small>Completed jobs</small>
            </div>
          </div>
        </section>

        <section className="technician-jobs-section">
          <div className="technician-section-header">
            <div>
              <span className="technician-label">
                WORK QUEUE
              </span>

              <h2>My Assigned Jobs</h2>
            </div>

            <span className="technician-job-count">
              {filteredJobs.length} jobs
            </span>
          </div>

          <div className="technician-filters">
            <div className="technician-search">
              <Search size={18} />

              <input
                type="text"
                placeholder="Search jobs, residents or locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">All Jobs</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="IN PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div className="technician-job-list">
            {filteredJobs.length === 0 ? (
              <div className="technician-no-results">
                <Wrench size={40} />
                <h3>No jobs found</h3>
                <p>Try changing your search or filter.</p>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div className="technician-job-card" key={job.id}>
                  <div className="technician-job-main">
                    <div className="technician-job-top">
                      <div>
                        <span className="technician-ticket-id">
                          {job.id}
                        </span>

                        <h3>{job.title}</h3>

                        <span className="technician-service">
                          {job.service}
                        </span>
                      </div>

                      <span
                        className={`technician-priority ${job.priority.toLowerCase()}`}
                      >
                        {job.priority}
                      </span>
                    </div>

                    <div className="technician-job-details">
                      <div>
                        <span>Resident</span>
                        <strong>{job.resident}</strong>
                      </div>

                      <div className="technician-location">
                        <span>Location</span>

                        <strong>
                          <MapPin size={15} />
                          {job.location}
                        </strong>
                      </div>

                      <div>
                        <span>Assigned</span>
                        <strong>{job.assigned}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="technician-job-action">
                    <span
                      className={`technician-job-status ${job.status
                        .toLowerCase()
                        .replaceAll(" ", "-")}`}
                    >
                      {job.status}
                    </span>

                    <button
                      onClick={() =>
                        navigate(
                          `/technician/jobs/${job.id}`
                        )
                      }
                    >
                      Open Job
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default TechnicianDashboard;