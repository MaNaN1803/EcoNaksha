import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SimulationForm from "@/components/SimulationForm";
import Visualization from "@/components/Visualization";

export default function Simulation() {
  const [simulationResult, setSimulationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const runSimulation = async (prompt) => {
    setLoading(true);
    try {
      const response = await fetch("/api/simulations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();
      setSimulationResult(data.result);
    } catch (error) {
      console.error("Simulation Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow bg-gray-100 p-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Run a Simulation</h1>
        <SimulationForm onSubmit={runSimulation} />
        {loading && <p className="text-gray-600 mt-4">Running simulation...</p>}
        {simulationResult && (
          <div className="bg-white p-4 mt-6 rounded shadow">
            <h2 className="text-2xl font-semibold">Simulation Results:</h2>
            <pre className="bg-gray-100 p-4 mt-4 rounded overflow-auto">
              {JSON.stringify(simulationResult, null, 2)}
            </pre>
            <div>
    <SimulationResults data={simulationResult} />
    <Visualization
      trafficData={{
        privateVehicles: simulationResult.traffic_analysis.private_vehicle_usage_percentage,
        publicTransport: simulationResult.traffic_analysis.public_transport_usage_percentage,
      }}
      pollutionData={{
        industrial: simulationResult.pollution_analysis.industrial_emission_percentage,
        vehicles: simulationResult.pollution_analysis.daily_vehicle_emissions_co2_units,
      }}
    />
  </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
