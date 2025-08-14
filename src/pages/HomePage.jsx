import { useEffect, useState } from "react";
import MultiPropertyMap from "../components/MultiPropertyMap";
import axios from "axios";


export default function HomePage() {
  const [markers, setMarkers] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/map`);
        setMarkers(res.data);   // [{ id, lat, lng, title }, ...]
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  return  <div className="h-[420px] rounded-xl overflow-hidden">
                
    <MultiPropertyMap markers={markers} />;
              </div>
};

