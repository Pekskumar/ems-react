import moment from "moment";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
// import ProfilePlaceholder from "../Assets/Images/cloud.jpg";
import RightIcon from "../Assets/Images/RightIcon";
import ProfilePlaceholder from "../Assets/Images/clouda.jpg";
import GlobalGoogleMap from "../Components/GlobalGoogleMap";
import YouMayEvent from "../Components/YouMayEvent";
import { CreateEventFlagSlice } from "../Redux-Toolkit/EventSlice";

const EventDetail = () => {
  let param = useParams();
  const [eventId, setEventId] = useState(param.id);
  const [DL, setDL] = useState();
  let navigate = useNavigate();
  const EventStore = useSelector((state) => state.EventStore.EventData);
  let dispatch = useDispatch();
  const [EventInfo, setEventInfo] = useState();  
  useEffect(() => {
    let temp = EventStore?.find((f) => f.id === eventId);
    setEventInfo(temp);
  }, [EventStore, eventId]);

  useEffect(() => {
    if (EventInfo) {
      const deadline = new Date(EventInfo.deadline);
      const today = new Date();
      const differenceMs = deadline.getTime() - today.getTime();
      const daysBetween = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
      if (daysBetween > 0) {
        setDL(daysBetween);
      }
    }
  }, [EventInfo]);

  function fnChangePAram(data) {
    setEventId(data?.id);
  }
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const CreateEventFlag = useSelector(
    (state) => state.EventStore.CreateEventFlag
  );
  useEffect(() => {
    if (window.location.href.includes("eventdetail")) {
      dispatch(CreateEventFlagSlice(false));
    } else {
      dispatch(CreateEventFlagSlice(true));
    }
  }, [CreateEventFlag]);

  return (
    <div className="mb-3 event-detail">
      <div className="welcome-banner p-4 mb-3">
        <h4 className="m-0">Event details</h4>
      </div>
      <Row className="my-3">
        <Col>
          <div className="event-detail-banner mb-3 color-card">
            {EventInfo?.event_pic !== "" &&
            EventInfo?.event_pic !== undefined &&
            EventInfo?.event_pic !== null ? (
              <img src={EventInfo?.event_pic} alt="" width={50} height={50} />
            ) : (
              <img
                src={EventInfo?.event_pic}
                alt=""
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src = ProfilePlaceholder;
                }}
                width={50}
                height={50}
              />
            )}
            <div className="d-flex     justify-content-between ">
              <div className="d-flex p-4  ">
                <div className="custom-cal-icon me-2">
                  <span className="calendar-month">
                    {moment(EventInfo?.start_date).format("MMM")}
                  </span>
                  <span className="calendar-day">
                    {moment(EventInfo?.start_date).format("DD")}
                  </span>
                </div>
                <div>
                  <h5>{EventInfo?.title}</h5>
                  <p className="m-0 color-blue">{EventInfo?.type}</p>
                </div>
              </div>
              {DL && (
                <div className="p-4">
                  <span className="left-day">{DL} days left</span>
                </div>
              )}
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={8}>
          <div className="color-card p-4">
            <h6 className="mb-3">{EventInfo?.title}</h6>
            <div className="mb-3">{EventInfo?.detail}</div>
            <div className="global-google-map">
              <GlobalGoogleMap data={EventInfo} />
            </div>
          </div>
        </Col>
        <Col md={4}>
          <div className="color-card mb-3 p-4 black-color-text">
            <p>Date & Time</p>
            {moment(EventInfo?.start_date).format("ddd,MMM DD,yyyy,hh:mm A")}
            -
            <br />
            {moment(EventInfo?.end_date).format("ddd,MMM DD,yyyy,hh:mm A")}
            <p className="mt-3"> Location</p>
            <div className="mb-3">
              {EventInfo?.address} <br />
              {EventInfo?.city} <br />
              {EventInfo?.state} <br />
              {EventInfo?.zipcode} <br />
              {EventInfo?.country} <br />
            </div>
            <Link
              target="_blank"
              to={`https://www.google.co.in/maps/dir/?saddr=&daddr=${parseFloat(
                EventInfo?.latitude
              )},${parseFloat(EventInfo?.longitude)}&directionsmode=driving`}
              className="view-map-btn     text-decoration-auto color-blue"
            >
              View map
            </Link>
          </div>
          <div className="color-card">
            <div className="table-heading p-3">
              <h5 className="m-0">Events you may like</h5>
            </div>
            <div className="pt-3 eve-detail-child">
              {EventStore?.length > 0 &&
                EventStore?.map(
                  (itemy, indexy) =>
                    indexy < 3 && (
                      <YouMayEvent
                        data={itemy}
                        key={indexy}
                        fnChangePAram={fnChangePAram}
                      />
                    )
                )}
            </div>
            <div
              onClick={() => navigate("/events")}
              className="table-heading cursor-pointer p-2 text-center"
            >
              <p className="m-0 color-blue">
                All Events <RightIcon />
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default EventDetail;
