import { useTranslation } from "../../auto-il8n";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
export default function AddressMap({
  address
}) {
  const {
    t
  } = useTranslation();
  const [position, setPosition] = useState(null);
  const [mapKey, setMapKey] = useState(0);
  useEffect(() => {
    async function getLocation() {
      const {
        t
      } = useTranslation();
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`);
        const data = await response.json();
        console.log(data);
        console.log(address);
        if (data.length > 0) {
          const newPosition = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
          setPosition(newPosition);

          // force full remount
          setMapKey(prev => prev + 1);
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (address) {
      getLocation();
    }
  }, [address]);
  if (!position) {
    return <div style={{
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center"
    }}>{t("loading_map")}</div>;
  }
  return <MapContainer key={mapKey} center={position} zoom={15} style={{
    width: "100%",
    height: "100%"
  }}>
      <TileLayer attribution="© OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      <Marker position={position}>
        <Popup>{address}</Popup>
      </Marker>

    </MapContainer>;
}