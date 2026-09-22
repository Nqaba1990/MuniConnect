import FaultReport from "../../components/tickets/FaultReport";

function Refuse() {
  return (
    <FaultReport
      serviceName="Refuse"
      serviceDescription="Report missed refuse collections, illegal dumping and refuse-related problems."
      faultTypes={[
        "Missed Collection",
        "Illegal Dumping",
        "Damaged Bin",
        "Overflowing Bins",
        "Waste Collection Problem",
        "Other",
      ]}
    />
  );
}

export default Refuse;