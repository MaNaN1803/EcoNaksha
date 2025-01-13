import { useEffect } from "react";
import * as THREE from "three";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Dashboard() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("three-canvas").appendChild(renderer.domElement);

    // Add a cube to represent the city block
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <h1 className="text-3xl font-bold text-center my-4">3D Dashboard</h1>
        <div id="three-canvas" style={{ width: "100%", height: "600px" }}></div>
      </main>
      <Footer />
    </div>
  );
}
