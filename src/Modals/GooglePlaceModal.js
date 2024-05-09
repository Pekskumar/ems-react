import {
  GoogleMap,
  LoadScript,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import { Form, InputGroup, Modal } from "react-bootstrap";
const lib = ["places"];

const GooglePlaceModal = (props) => {
  const [location, setLocation] = useState(null);

  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");

  const [ZOOM, setZOOM] = useState(14);
  const [searchBox, setSearchBox] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setlatitude(position?.coords?.latitude);
          setlongitude(position?.coords?.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const onPlacesChanged = () => {
    const [place] = searchBox.getPlaces();
    if (place) {
      const addressComponents = place?.address_components;
      const formattedAddress = {
        line1: "",
        line2: "",
        city: "",
        state: "",
        country: "",
        pinCode: "",
      };

      addressComponents?.forEach((component) => {
        const types = component.types;

        if (types.includes("premise")) {
          // Concatenate the values for "premise"
          formattedAddress.line1 += component.long_name + " ";
        } else if (types.includes("sublocality_level_1")) {
          formattedAddress.line2 = component.long_name;
        } else if (types.includes("locality")) {
          formattedAddress.city = component.long_name;
        } else if (types.includes("administrative_area_level_1")) {
          formattedAddress.state = component.long_name;
        } else if (types.includes("country")) {
          formattedAddress.country = component.long_name;
        } else if (types.includes("postal_code")) {
          formattedAddress.pinCode = component.long_name;
        }
      });

      // Trim any extra whitespaces from the end of line1
      formattedAddress.line1 = formattedAddress.line1.trim();

      const { lat, lng } = place.geometry.location;
      const latitude = lat();
      const longitude = lng();

      setLocation(formattedAddress);
      props.GooglePlaceData({ ...formattedAddress, latitude, longitude });
      props.onHide();
    }

    setZOOM(13);
  };

  const onSBLoad = (ref) => {
    setSearchBox(ref);
  };

  return (
    <>
      <Modal className="" size="md" centered {...props}>
        <Modal.Header closeButton>
          <div style={{ visibility: "hidden" }}>A</div>
          <Modal.Title id="contained-modal-title-vcenter">
            Google Map
          </Modal.Title>
          <div style={{ visibility: "hidden" }}>A</div>
        </Modal.Header>

        <Modal.Body className="g-map-modal-body p-0">
          <LoadScript
            googleMapsApiKey="AIzaSyDCTqQg08irT8djGDqiwQCS3Xcf9B2Hsgc"
            libraries={lib}
          >
            <GoogleMap
            // mapContainerStyle={{ height: "100%", width: "100%" }}
            // center={center}
            // zoom={center ? 14 : 1}
            // options={{ mapTypeControl: false }}
            >
              <StandaloneSearchBox
                onPlacesChanged={onPlacesChanged}
                onLoad={onSBLoad}
              >
                <div className="modal-header-search-group d-flex gap-3 w-100 align-items-center p-1">
                  <InputGroup className="search-input-group ">
                    <Form.Control
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="basic-addon5"
                    />
                    {/* <InputGroup.Text id="basic-addon5">
                      <img
                        src={searchIcon}
                        alt="search"
                        className="black-search-icon"
                      />
                    </InputGroup.Text> */}
                  </InputGroup>
                </div>
              </StandaloneSearchBox>
            </GoogleMap>
          </LoadScript>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GooglePlaceModal;
