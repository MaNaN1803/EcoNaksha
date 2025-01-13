import { useState } from "react";

const SimulationForm = ({ onSubmit }) => {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(prompt);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <textarea
        className="w-full p-2 border rounded"
        placeholder="Enter your simulation prompt..."
        rows="5"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Run Simulation
      </button>
    </form>
  );
};

export default SimulationForm;
