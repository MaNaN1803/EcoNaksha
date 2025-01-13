import { Bar, Pie } from "react-chartjs-2";

const Visualization = ({ trafficData, pollutionData }) => {
  const trafficChart = {
    labels: ["Private Vehicles", "Public Transport"],
    datasets: [
      {
        label: "Traffic Usage",
        data: [trafficData.privateVehicles, trafficData.publicTransport],
        backgroundColor: ["#3498db", "#2ecc71"],
      },
    ],
  };

  const pollutionChart = {
    labels: ["Industrial Emissions", "Vehicle Emissions"],
    datasets: [
      {
        label: "Pollution Sources",
        data: [pollutionData.industrial, pollutionData.vehicles],
        backgroundColor: ["#e74c3c", "#f1c40f"],
      },
    ],
  };

  return (
    <div className="grid grid-cols-2 gap-6 mt-6">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Traffic Analysis</h3>
        <Bar data={trafficChart} />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-2">Pollution Analysis</h3>
        <Pie data={pollutionChart} />
      </div>
    </div>
  );
};

export default Visualization;
