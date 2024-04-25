import { useEffect, useState } from "react";
import loader from "@/utils/googleMapsLoader";

const Map = ({ address }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    loader.load().then(() => {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address }, (results, status) => {
        if (status === "OK") {
          const mapOptions = {
            center: results[0].geometry.location,
            zoom: 16,
          };
          const newMap = new window.google.maps.Map(
            document.getElementById("map"),
            mapOptions
          );

          const marker = new window.google.maps.Marker({
            position: results[0].geometry.location,
            map: newMap,
            label: {
              text: "Custom Label",
              color: "white", // label text color
              fontWeight: "bold", // label font weight
            },
          });

          setMap(newMap);
        } else {
          console.error(
            "Geocode was not successful for the following reason: ",
            status
          );
        }
      });
    });
  }, [address]);

  return <div id="map" style={{ height: "400px", width: "650px" }}></div>;
};

export default Map;
