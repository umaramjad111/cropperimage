import "./App.css";
import CropperImage from "./components/cropper/cropper";
import Navbar from "./components/navbar/navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <CropperImage />
    </div>
  );
}

export default App;
