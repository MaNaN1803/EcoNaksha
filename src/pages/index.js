import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to EcoNaksha</h1>
          <p className="text-gray-600 mb-6">
            A cutting-edge platform for urban sustainability planning and simulation.
          </p>
          <a
            href="/simulation"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
          >
            Start a Simulation
          </a>
        </div>
      </main>
      <Footer />
    </div>
  );
}
