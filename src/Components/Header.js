import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import CreateUpdateEventModal from "../Modals/CreateUpdateEventModal";
import { useDispatch, useSelector } from "react-redux";
import { CreateEventFlagSlice } from "../Redux-Toolkit/EventSlice";

const Header = () => {
  let dispatch = useDispatch();
  const CreateEventFlag = useSelector(
    (state) => state.EventStore.CreateEventFlag
  );  
  const [EventModalshow, setEventModalshow] = useState(false);

  useEffect(() => {
    if (window.location.href.includes("eventdetail")) {      
      dispatch(CreateEventFlagSlice(false));
    }
  }, [CreateEventFlag]);

  return (
    <>
      <header className="p-3     text-end">
        {CreateEventFlag ? (
          <Button
            className="event-button"
            onClick={() => setEventModalshow(true)}
          >
            Create New
          </Button>
        ) : (
          <Button
            className="event-button clean"
            // onClick={() => setEventModalshow(true)}
          >
            
          </Button>
        )}
      </header>
      {EventModalshow && (
        <CreateUpdateEventModal
          type="add"
          show={EventModalshow}
          eventname=""
          selecteddate=""
          onHide={() => setEventModalshow(false)}
        />
      )}
    </>
  );
};

export default Header;
