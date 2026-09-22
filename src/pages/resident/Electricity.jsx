import FaultReport from "../../components/tickets/FaultReport";

function Electricity() {
  return (
    <FaultReport
      serviceName="Electricity"
      serviceDescription="Report municipal electricity faults, outages and damaged electrical infrastructure."
      faultTypes={[
        "Power Outage",
        "Streetlight Fault",
        "Damaged Electrical Pole",
        "Electrical Cable Fault",
        "Sparking Cable",
        "Transformer Fault",
        "Other",
      ]}
    />
  );
}

export default Electricity;