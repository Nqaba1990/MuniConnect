import FaultReport from "../../components/tickets/FaultReport";

function Water() {
  return (
    <FaultReport
      serviceName="Water"
      serviceDescription="Report water leaks, no water, damaged meters and other municipal water problems."
      faultTypes={[
        "No Water",
        "Water Leak",
        "Burst Pipe",
        "Low Water Pressure",
        "Damaged Water Meter",
        "Contaminated Water",
        "Other",
      ]}
    />
  );
}

export default Water;