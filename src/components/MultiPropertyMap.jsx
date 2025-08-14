import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet"
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const MultiPropertyMap = ({ markers }) => {
  if (!markers || markers.length === 0) return <p>No hay propiedades para mostrar.</p>;

  // Centro inicial (tomo la primera propiedad como referencia)
  const center = [markers[0].lat, markers[0].lng];

  return (
    <div className="w-full h-96 rounded-xl overflow-hidden shadow-md">
      <MapContainer center={center} zoom={14} scrollWheelZoom={true} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        />
        
        {markers.map((m) => (
          <Marker key={m.id} position={[m.lat, m.lng]}>
            <Popup>
              {m.title || "Propiedad"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MultiPropertyMap;



