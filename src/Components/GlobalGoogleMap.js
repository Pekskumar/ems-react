import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleMap,
  StandaloneSearchBox,
  LoadScript,
  Marker,
} from "@react-google-maps/api";

const lib = ["places"];

function GlobalGoogleMap(props) {
  
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const navigate = useNavigate(); // Ensure that you have this line if using React Router

  useEffect(() => {
    if (props?.data !== undefined) {
      setLatitude(props?.data?.latitude);
      setLongitude(props?.data?.longitude);
    }
  }, [props]);

  let presentLocation = {
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
  };

  const [center, setCenter] = useState();
  const [searchBox, setSearchBox] = useState(null);

  const onPlacesChanged = () => {
    const [place] = searchBox.getPlaces();
    if (place) {
      setCenter({
        lat: place?.geometry?.location?.lat(),
        lng: place?.geometry?.location?.lng(),
      });
    }
  };

  const onSBLoad = (ref) => {
    setSearchBox(ref);
  };

  const onMarkerClick = () => {
    const mapsUrl = `https://www.google.co.in/maps/dir/?saddr=&daddr=${parseFloat(
      props?.data?.latitude
    )},${parseFloat(props?.data?.longitude)}&directionsmode=driving`;
  
    // Open the URL in a new tab/window
    window.open(mapsUrl, "_blank");
  };
  

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAP_APIKEY}
      libraries={lib}
    >
      <GoogleMap
        mapContainerStyle={{ height: "100%", width: "100%" }}
        center={center ? center : presentLocation}
        zoom={12}
        // options={{
        //   mapTypeControl: false,
        //   draggable: false, // Disable map dragging
        // }}
      >
        <StandaloneSearchBox
          onPlacesChanged={onPlacesChanged}
          onLoad={onSBLoad}
        >
          <div
            style={{ position: "absolute" }}
            className="from-groups no-border-break m-3"
          >
            {/* Input field can be added here */}
          </div>
        </StandaloneSearchBox>
        <Marker
          position={center ? center : presentLocation}
          onClick={onMarkerClick}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default GlobalGoogleMap;
