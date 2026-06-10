import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/home.css";
import Navbar from "../components/Navbar";
import Shop from "../components/Shop";

const Sale: React.FC = () => {
  const location = useLocation();

  const pageTitles: Record<string, string> = {
    "/men": "Men",
    "/women": "Women",
    "/children": "Children",
    "/new-arrivals": "New Arrivals",
    "/sale": "Sale",
  };

  const title = pageTitles[location.pathname] ?? "Sale";

  return (
    <div className="home">
      <div className="home">
        <Navbar />
        <Shop title={title} />
      </div>
    </div>
  );
};

export default Sale;
