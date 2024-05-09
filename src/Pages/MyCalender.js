import React, { useEffect, useState } from "react";
import CalenderCustom from "../Components/CalenderCustom";
import { Col, Row } from "react-bootstrap";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import CreateUpdateEventModal from "../Modals/CreateUpdateEventModal";
import MoreEventListModal from "../Modals/MoreEventListModal";
import {
  CreateEventFlagSlice,
  EventStoreSlice,
} from "../Redux-Toolkit/EventSlice";
import { toast } from "react-toastify";

const MyCalender = () => {
  let dispatch = useDispatch();
  const [EventModalshow, setEventModalshow] = useState(false);
  const [MoreTableEventModalshow, setMoreTableEventModalshow] = useState(false);
  const [MoreTableData, setMoreTableData] = useState([]);
  let AllEvent1 = [
    "Wedding",
    "Meetings",
    "Education",
    "Party",
    "Product launches",
    "Festivals",
    "Sports",
    "Corporate event",
  ];
  const EventStore = useSelector((state) => state.EventStore.EventData);
  const [date, setdate] = useState(new Date());
  const [EventType, setEventType] = useState();
  const [SelectedTime, setSelectedTime] = useState("");
  const [viewtype, setviewtype] = useState("Month");
  const [EventName, setEventName] = useState("");
  const [AllEevnts, setAllEevnts] = useState(AllEvent1);
  const [SingleEvent, setSingleEvent] = useState();

  function fnCallBack(date, e, type, data) {
    setEventType(type);
    setEventModalshow(true);
    setSelectedTime(date);
    setEventName(e);
    if (type === "edit") {
      setSingleEvent(data);
    }
  }

  function fnMoreEventList(data) {
    setMoreTableEventModalshow(true);
    setMoreTableData(data);
  }

  function fnDeleteMore(item) {
    let temp = EventStore.filter((f) => f.id !== item.id);
    dispatch(EventStoreSlice(temp));
    toast.success("Successfully Removed Event!");
    let temp2 = MoreTableData?.filter((f) => f.id !== item.id);
    setMoreTableData(temp2);
  }

  // let dispatch = useDispatch();
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
    <Row>
      <Col>
        <CalenderCustom
          date={date}
          viewtype={viewtype}
          data={EventStore}
          EventNameList={AllEevnts}
          fnAddEvent={fnCallBack}
          fnMorebtn={fnMoreEventList}
        />
      </Col>
      {EventModalshow && (
        <CreateUpdateEventModal
          type={EventType}
          eventname={EventName}
          selecteddate={SelectedTime}
          singleevent={SingleEvent}
          show={EventModalshow}
          onHide={() => setEventModalshow(false)}
        />
      )}
      {MoreTableEventModalshow && (
        <MoreEventListModal
          data={MoreTableData}
          fnDeleteMore={fnDeleteMore}
          // EventName={EventName}
          // selecteddate={SelectedTime}
          // singleevent={SingleEvent}
          show={MoreTableEventModalshow}
          onHide={() => setMoreTableEventModalshow(false)}
        />
      )}
    </Row>
  );
};

export default MyCalender;
