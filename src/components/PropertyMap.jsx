import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix para que aparezca el icono correctamente (Leaflet bug con Webpack/Vite)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const PropertyMap = ({ lat, lng }) => {
  if (!lat || !lng) return <p>Coordenadas no disponibles.</p>;

  return (
    <div className="w-full h-96 rounded-xl overflow-hidden shadow-md">
      <MapContainer
        center={[lat, lng]}
        zoom={15}
        scrollWheelZoom={false} 
        className="h-full w-full"
      > 
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        />
        <Marker position={[lat, lng]}>
          <Popup>Ubicación de la propiedad</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
