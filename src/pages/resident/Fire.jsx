import FaultReport from "../../components/tickets/FaultReport";

function Fire() {
  return (
    <FaultReport
      serviceName="Fire Department"
      serviceDescription="Submit a non-life-threatening fire department service request."
      faultTypes={[
        "Fire Hazard",
        "Fire Hydrant Problem",
        "Blocked Fire Access",
        "Damaged Fire Equipment",
        "Other",
      ]}
    />
  );
}

export default Fire;