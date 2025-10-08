import { Routes, Route, Link } from "react-router-dom";
import ListView from "./ListView";
import GalleryView from "./GalleryView";
import DetailView from "./DetailView";
import './App.css';

function App() {
  return (
      <div style={{ padding: "20px" }}>
        <h1>PokeDex Directory</h1>
        <nav>
          <Link to="/" style={{ marginRight: "8px" }}>List</Link>
          <Link to="/gallery">Gallery</Link>
        </nav>

        <Routes>
          <Route path="/" element={<ListView />} />
          <Route path="/gallery" element={<GalleryView />} />
          <Route path="/pokemon/:id" element={<DetailView />} />
        </Routes>
      </div>
  );
}


export default App;
