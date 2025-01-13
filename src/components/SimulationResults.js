import { jsPDF } from "jspdf";

const SimulationResults = ({ data }) => {
  const exportPDF = () => {
    const doc = new jsPDF();
    const content = JSON.stringify(data, null, 2);

    doc.setFontSize(14);
    doc.text("Simulation Results", 10, 10);
    doc.setFontSize(10);
    doc.text(content, 10, 20);
    doc.save("simulation_results.pdf");
  };

  return (
    <div className="bg-white p-4 mt-6 rounded shadow">
      <h2 className="text-2xl font-semibold">Simulation Results:</h2>
      <pre className="bg-gray-100 p-4 mt-4 rounded overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
      <button
        onClick={exportPDF}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Export as PDF
      </button>
    </div>
  );
};

export default SimulationResults;
