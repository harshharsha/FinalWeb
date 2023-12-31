import "./App.css";
import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  return (
    <>
      <div className="App">
        <Canvas>
          <ScrollControls horizontal pages={5}>
            <LandingPage />
          </ScrollControls>
        </Canvas>
      </div>
    </>
  );
}

export default App;
