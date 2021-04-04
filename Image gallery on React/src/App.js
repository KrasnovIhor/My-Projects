import React, { useEffect, useState } from "react";
import api from "./config";
import axios from "axios";
import "./styles.css";
import Gallery from "./Components/Gallery";
import CircularProgress from "@material-ui/core/CircularProgress";

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const {
      data: { results },
    } = await axios.get(
      `https://api.unsplash.com/search/photos?page=1&query=office&client_id=${api}&per_page=20`
    );
    setPhotos(results);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size={100} />
      </div>
    );

  return (
    <div className="App">
      <Gallery photos={photos} />
    </div>
  );
};

export default App;
