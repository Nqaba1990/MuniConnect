import FaultReport from "../../components/tickets/FaultReport";

function Eskom() {
  return (
    <FaultReport
      serviceName="Eskom"
      serviceDescription="Report Eskom electricity faults, outages and electrical infrastructure problems."
      faultTypes={[
        "Power Outage",
        "Damaged Power Line",
        "Fallen Electricity Pole",
        "Transformer Fault",
        "Sparking Power Line",
        "Streetlight Fault",
        "Other",
      ]}
    />
  );
}

export default Eskom;