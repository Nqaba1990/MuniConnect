import FaultReport from "../../components/tickets/FaultReport";

function Sewerage() {
  return (
    <FaultReport
      serviceName="Sewerage"
      serviceDescription="Report blocked drains, sewage leaks, overflowing manholes and other sewerage problems."
      faultTypes={[
        "Blocked Drain",
        "Sewage Leak",
        "Overflowing Manhole",
        "Blocked Sewer",
        "Damaged Sewer Line",
        "Bad Odour",
        "Other",
      ]}
    />
  );
}

export default Sewerage;