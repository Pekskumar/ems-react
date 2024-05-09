import moment from "moment";
import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { confirmAlert } from "react-confirm-alert";
import DeleteIcon from "../Assets/Images/DeleteIcon";
import EditIcon from "../Assets/Images/EditIcon";
import ThreeDotIcon from "../Assets/Images/ThreeDotIcon";
import { EventStoreSlice } from "../Redux-Toolkit/EventSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import CreateUpdateEventModal from "../Modals/CreateUpdateEventModal";

const YouMayEvent = (props) => {
  let dispatch = useDispatch();
  const EventStore = useSelector((state) => state.EventStore.EventData);
  const [EventModalshow, setEventModalshow] = useState(false);
  const [SingleEvent, setSingleEvent] = useState();
  function fnDeleteEvent(item) {    
    let temp = EventStore.filter((f) => f.id !== item.id);
    dispatch(EventStoreSlice(temp));
    toast.success("Successfully Removed Event!");
    if (props?.onHide) {
      props?.onHide();
    }
  }

  return (
    <div className="d-flex custom-cal-main pb-3 px-3">
      <div className="custom-cal-icon me-3">
        <span className="calendar-month">
          {moment(props?.data?.start_date).format("MMM")}
        </span>
        <span className="calendar-day">
          {moment(props?.data?.start_date).format("DD")}
        </span>
      </div>
      <div className="custom-cal-main-border-bottom">
        <div className="color-blue mb-1 cursor-pointer d-flex     justify-content-between">
          <p
            onClick={() => props.fnChangePAram(props?.data)}
            className="mb-1 custom-cal-main-border-bottom-title"
          >
            {props?.data?.title}
          </p>
          <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
              <ThreeDotIcon />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => {
                  setEventModalshow(true);
                  setSingleEvent(props?.data);
                }}
              >
                <EditIcon />
                <span className="ms-2">Edit</span>
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  confirmAlert({
                    title: "Confirm to Delete?",
                    message: "Are you sure to do this.",
                    buttons: [
                      {
                        label: "Yes",
                        onClick: () =>
                          props?.type
                            ? props?.fnDeleteMore(props?.data)
                            : fnDeleteEvent(props?.data),
                      },
                      {
                        label: "No",
                      },
                    ],
                  })
                }
              >
                <DeleteIcon />
                <span className="ms-2">Delete</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <h6>{props?.data?.type}</h6>
        <div className="time-duration-place">
          <div>Time: {moment(props?.data?.start_date).format("hh:mm A")}</div>
          <div>
            Duration: {moment(props?.data?.start_date).format("hh:mm A")}-
            {moment(props?.data?.end_time).format("hh:mm A")}
          </div>
          <div>
            Place: 
            {/* {props?.data?.address && props?.data?.address + ","} */}
            {props?.data?.city && props?.data?.city + ","}
            {/* {props?.data?.state && props?.data?.state + ","} */}
            {props?.data?.country && props?.data?.country}
            {/* {props?.data?.zipcode && props?.data?.zipcode + ","} */}
          </div>
        </div>
      </div>
      {EventModalshow && (
        <CreateUpdateEventModal
          type="edit"
          selecteddate={new Date()}
          singleevent={SingleEvent}
          show={EventModalshow}
          onHide={() => setEventModalshow(false)}
        />
      )}
    </div>
  );
};

export default YouMayEvent;
