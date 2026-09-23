import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  User,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  Play,
  ClipboardCheck,
  MessageSquare,
  Camera,
  FileText,
  Wrench,
  Zap,
  Droplets,
  Trash2,
  Flame,
  Construction,
  Send,
} from "lucide-react";

import "../../styles/technician-job-details.css";

const MOCK_JOBS = [
  {
    id: "104817",
    ticketNumber: "MC-ESKO-104817",
    service: "Eskom",
    title: "Power Outage",
    category: "Electricity Supply",
    priority: "URGENT",
    status: "IN_PROGRESS",
    resident: "Noluthando Radebe",
    phone: "072 456 7812",
    email: "noluthando@example.com",
    location: "Fort Beaufort",
    address: "12 Main Street, Fort Beaufort",
    reportedAt: "23 September 2026, 14:30",
    sla: "45 minutes remaining",
    description:
      "Resident reports a complete loss of electricity at the property. Nearby properties are also affected according to the initial report.",
    assignedTechnician: "Lwazi Nqoma",
    assignedAt: "23 September 2026, 15:02",
    icon: Zap,
    notes: [
      {
        id: 1,
        author: "Agent",
        text: "Fault verified and assigned to field technician.",
        time: "15:02",
      },
      {
        id: 2,
        author: "Lwazi Nqoma",
        text: "Technician dispatched to investigate the outage.",
        time: "15:18",
      },
    ],
  },
  {
    id: "104808",
    ticketNumber: "MC-REFU-104808",
    service: "Refuse",
    title: "Missed Refuse Collection",
    category: "Refuse Collection",
    priority: "LOW",
    status: "ASSIGNED",
    resident: "Ayanda Peterson",
    phone: "072 555 2144",
    email: "ayanda@example.com",
    location: "Adelaide",
    address: "8 Church Street, Adelaide",
    reportedAt: "23 September 2026, 09:15",
    sla: "18 hours remaining",
    description:
      "Household refuse was not collected on the scheduled collection day.",
    assignedTechnician: "Lwazi Nqoma",
    assignedAt: "23 September 2026, 10:05",
    icon: Trash2,
    notes: [
      {
        id: 1,
        author: "Agent",
        text: "Collection schedule checked. Job assigned for field verification.",
        time: "10:05",
      },
    ],
  },
  {
    id: "104799",
    ticketNumber: "MC-FIRE-104799",
    service: "Fire Department",
    title: "Fire Hydrant Damaged",
    category: "Fire Infrastructure",
    priority: "URGENT",
    status: "ASSIGNED",
    resident: "Nomsa Mbeki",
    phone: "072 334 1188",
    email: "nomsa@example.com",
    location: "Alice",
    address: "45 Victoria Road, Alice",
    reportedAt: "23 September 2026, 12:40",
    sla: "1 hour remaining",
    description:
      "A damaged fire hydrant has been reported near a residential area and requires urgent inspection.",
    assignedTechnician: "Lwazi Nqoma",
    assignedAt: "23 September 2026, 13:10",
    icon: Flame,
    notes: [
      {
        id: 1,
        author: "Agent",
        text: "Urgent infrastructure inspection required.",
        time: "13:10",
      },
    ],
  },
  {
    id: "104821",
    ticketNumber: "MC-WATE-104821",
    service: "Water",
    title: "Burst Water Pipe",
    category: "Water Infrastructure",
    priority: "HIGH",
    status: "OPEN",
    resident: "Demo Resident",
    phone: "072 123 4567",
    email: "resident@municonnect.co.za",
    location: "Fort Beaufort",
    address: "24 High Street, Fort Beaufort",
    reportedAt: "23 September 2026, 08:30",
    sla: "6 hours remaining",
    description:
      "A burst water pipe is causing water to flow onto the road. Immediate inspection and isolation may be required.",
    assignedTechnician: "Lwazi Nqoma",
    assignedAt: "23 September 2026, 09:15",
    icon: Droplets,
    notes: [],
  },
  {
    id: "104815",
    ticketNumber: "MC-ELEC-104815",
    service: "Electricity",
    title: "Streetlight Not Working",
    category: "Municipal Electricity",
    priority: "MEDIUM",
    status: "OPEN",
    resident: "Lwazi Mbeki",
    phone: "072 888 4432",
    email: "lwazi@example.com",
    location: "Bedford",
    address: "19 Market Road, Bedford",
    reportedAt: "22 September 2026, 17:45",
    sla: "18 hours remaining",
    description:
      "Municipal streetlight is not functioning and requires inspection.",
    assignedTechnician: "Lwazi Nqoma",
    assignedAt: "23 September 2026, 07:30",
    icon: Construction,
    notes: [],
  },
];

function JobDetails() {
  const navigate = useNavigate();
  const { jobId } = useParams();

  const [jobs, setJobs] = useState(MOCK_JOBS);
  const [note, setNote] = useState("");
  const [photoAttached, setPhotoAttached] = useState(false);

  const job = useMemo(
    () => jobs.find((item) => item.id === jobId) || jobs[0],
    [jobs, jobId]
  );

  const ServiceIcon = job.icon;

  const updateJobStatus = (newStatus) => {
    setJobs((currentJobs) =>
      currentJobs.map((item) =>
        item.id === job.id
          ? {
              ...item,
              status: newStatus,
            }
          : item
      )
    );
  };

  const addNote = () => {
    if (!note.trim()) {
      alert("Please enter a progress note.");
      return;
    }

    setJobs((currentJobs) =>
      currentJobs.map((item) =>
        item.id === job.id
          ? {
              ...item,
              notes: [
                ...item.notes,
                {
                  id: Date.now(),
                  author: "Lwazi Nqoma",
                  text: note.trim(),
                  time: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              ],
            }
          : item
      )
    );

    setNote("");
  };

  const handleAttachPhoto = () => {
    setPhotoAttached(true);
    alert("Photo attachment added in demo mode.");
  };

  const getPriorityClass = (priority) => {
    return `priority-badge priority-${priority.toLowerCase()}`;
  };

  const getStatusClass = (status) => {
    return `status-badge status-${status.toLowerCase()}`;
  };

  const getStatusLabel = (status) => {
    return status.replace("_", " ");
  };

  return (
    <div className="technician-job-page">
      <header className="technician-job-header">
        <div className="technician-job-header-left">
          <button
            className="technician-job-back"
            onClick={() => navigate("/technician/dashboard")}
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <div className="technician-job-breadcrumb">
              Technician / My Jobs / {job.ticketNumber}
            </div>

            <h1>{job.title}</h1>

            <p>
              {job.ticketNumber} · {job.service}
            </p>
          </div>
        </div>

        <div className="technician-job-header-status">
          <span className={getPriorityClass(job.priority)}>
            <AlertTriangle size={14} />
            {job.priority}
          </span>

          <span className={getStatusClass(job.status)}>
            {getStatusLabel(job.status)}
          </span>
        </div>
      </header>

      <main className="technician-job-content">
        <section className="technician-job-main">
          <div className="technician-job-card technician-job-summary">
            <div className="job-service-icon">
              <ServiceIcon size={28} />
            </div>

            <div className="job-summary-content">
              <div className="job-summary-top">
                <div>
                  <span className="job-section-label">SERVICE</span>
                  <h2>{job.service}</h2>
                </div>

                <div className="job-sla">
                  <Clock3 size={17} />
                  <div>
                    <span>SLA</span>
                    <strong>{job.sla}</strong>
                  </div>
                </div>
              </div>

              <p className="job-description">{job.description}</p>
            </div>
          </div>

          <div className="technician-job-card">
            <div className="technician-card-header">
              <div>
                <span className="job-section-label">FAULT DETAILS</span>
                <h2>Reported Problem</h2>
              </div>

              <FileText size={20} />
            </div>

            <div className="job-detail-grid">
              <div className="job-detail-item">
                <span>Ticket Number</span>
                <strong>{job.ticketNumber}</strong>
              </div>

              <div className="job-detail-item">
                <span>Category</span>
                <strong>{job.category}</strong>
              </div>

              <div className="job-detail-item">
                <span>Reported</span>
                <strong>{job.reportedAt}</strong>
              </div>

              <div className="job-detail-item">
                <span>Current Status</span>
                <strong>{getStatusLabel(job.status)}</strong>
              </div>
            </div>

            <div className="job-description-box">
              <span>Description</span>
              <p>{job.description}</p>
            </div>
          </div>

          <div className="technician-job-card">
            <div className="technician-card-header">
              <div>
                <span className="job-section-label">LOCATION</span>
                <h2>Fault Location</h2>
              </div>

              <MapPin size={20} />
            </div>

            <div className="job-location-box">
              <MapPin size={24} />

              <div>
                <strong>{job.location}</strong>
                <p>{job.address}</p>
              </div>

              <button
                className="job-map-button"
                onClick={() =>
                  alert("Map/GPS integration will be connected later.")
                }
              >
                View Location
              </button>
            </div>
          </div>

          <div className="technician-job-card">
            <div className="technician-card-header">
              <div>
                <span className="job-section-label">FIELD WORK</span>
                <h2>Technician Actions</h2>
              </div>

              <Wrench size={20} />
            </div>

            <div className="technician-action-grid">
              {job.status === "ASSIGNED" && (
                <button
                  className="job-action primary"
                  onClick={() => updateJobStatus("IN_PROGRESS")}
                >
                  <Play size={18} />
                  Start Work
                </button>
              )}

              {job.status === "OPEN" && (
                <button
                  className="job-action primary"
                  onClick={() => updateJobStatus("IN_PROGRESS")}
                >
                  <ClipboardCheck size={18} />
                  Accept & Start
                </button>
              )}

              {job.status === "IN_PROGRESS" && (
                <button
                  className="job-action success"
                  onClick={() => updateJobStatus("RESOLVED")}
                >
                  <CheckCircle2 size={18} />
                  Mark Resolved
                </button>
              )}

              {job.status === "RESOLVED" && (
                <button
                  className="job-action success"
                  onClick={() => updateJobStatus("COMPLETED")}
                >
                  <CheckCircle2 size={18} />
                  Complete Job
                </button>
              )}

              {job.status === "COMPLETED" && (
                <div className="job-completed-message">
                  <CheckCircle2 size={20} />
                  Job completed successfully.
                </div>
              )}
            </div>
          </div>

          <div className="technician-job-card">
            <div className="technician-card-header">
              <div>
                <span className="job-section-label">PROGRESS</span>
                <h2>Technician Notes</h2>
              </div>

              <MessageSquare size={20} />
            </div>

            <div className="job-note-form">
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Enter progress notes, work performed, findings or materials used..."
                rows="4"
              />

              <div className="job-note-actions">
                <button
                  className="job-photo-button"
                  onClick={handleAttachPhoto}
                >
                  <Camera size={17} />
                  {photoAttached ? "Photo Added" : "Attach Photo"}
                </button>

                <button
                  className="job-note-button"
                  onClick={addNote}
                >
                  <Send size={17} />
                  Add Note
                </button>
              </div>
            </div>

            <div className="job-notes-list">
              {job.notes.length === 0 ? (
                <div className="empty-job-notes">
                  <MessageSquare size={20} />
                  <p>No progress notes have been added yet.</p>
                </div>
              ) : (
                job.notes.map((item) => (
                  <div className="job-note-item" key={item.id}>
                    <div className="job-note-avatar">
                      {item.author.charAt(0)}
                    </div>

                    <div className="job-note-content">
                      <div className="job-note-meta">
                        <strong>{item.author}</strong>
                        <span>{item.time}</span>
                      </div>

                      <p>{item.text}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <aside className="technician-job-sidebar">
          <div className="technician-job-card">
            <div className="technician-card-header">
              <div>
                <span className="job-section-label">RESIDENT</span>
                <h2>Reported By</h2>
              </div>

              <User size={20} />
            </div>

            <div className="resident-profile">
              <div className="resident-avatar">
                {job.resident
                  .split(" ")
                  .map((name) => name.charAt(0))
                  .slice(0, 2)
                  .join("")}
              </div>

              <div>
                <strong>{job.resident}</strong>
                <span>{job.email}</span>
              </div>
            </div>

            <a
              className="resident-contact-button"
              href={`tel:${job.phone}`}
            >
              <Phone size={17} />
              {job.phone}
            </a>
          </div>

          <div className="technician-job-card">
            <div className="technician-card-header">
              <div>
                <span className="job-section-label">ASSIGNMENT</span>
                <h2>Technician</h2>
              </div>

              <Wrench size={20} />
            </div>

            <div className="assignment-person">
              <div className="assignment-avatar">LN</div>

              <div>
                <strong>{job.assignedTechnician}</strong>
                <span>Field Technician</span>
              </div>
            </div>

            <div className="assignment-date">
              Assigned: {job.assignedAt}
            </div>
          </div>

          <div className="technician-job-card">
            <div className="technician-card-header">
              <div>
                <span className="job-section-label">ATTACHMENTS</span>
                <h2>Photos & Evidence</h2>
              </div>

              <Camera size={20} />
            </div>

            <div className="job-photo-placeholder">
              <Camera size={30} />

              {photoAttached ? (
                <>
                  <strong>1 Photo Attached</strong>
                  <span>Demo attachment ready for upload.</span>
                </>
              ) : (
                <>
                  <strong>No photos attached</strong>
                  <span>Photos can be uploaded during field work.</span>
                </>
              )}

              <button
                onClick={handleAttachPhoto}
                className="job-upload-button"
              >
                <Camera size={16} />
                Add Photo
              </button>
            </div>
          </div>

          <div className="technician-job-card job-safety-card">
            <AlertTriangle size={21} />

            <div>
              <strong>Field Safety</strong>
              <p>
                Follow municipal safety procedures and use the appropriate
                protective equipment before starting work.
              </p>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

export default JobDetails;