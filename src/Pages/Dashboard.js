import React, { useEffect, useState } from "react";
import SingleColorCard from "../Components/SingleColorCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import EventTable from "../Components/EventTable";
import WelcomeBanner from "../Components/WelcomeBanner";
import Whether from "../Components/Whether";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { eventTypeArray } from "../Services/Constant";
import { CreateEventFlagSlice } from "../Redux-Toolkit/EventSlice";

const Dashboard = () => {
  const EventStore = useSelector((state) => state.EventStore.EventData);

  const [EventTypeList, setEventTypeList] = useState({});
  const [UpcommigEvents, setUpcommigEvents] = useState([]);
  useEffect(() => {
    if (EventStore?.length > 0) {
      let TypeObj = {};
      EventStore.forEach((element) => {
        if (TypeObj[element.type]) {
          TypeObj[element.type].count = TypeObj[element.type].count + 1;
        } else {
          TypeObj = {
            ...TypeObj,
            [element.type]: {
              count: 1,
            },
          };
        }
      });
      setEventTypeList(TypeObj);
    }
  }, [EventStore]);
  function fncount(item) {
    if (Object.keys(EventTypeList)?.length > 0) {
      let count = EventTypeList[item]?.count || 0;
      return { count, type: item };
    }
    return { count: 0, type: item };
  }

  useEffect(() => {
    const dateFormatted = moment().format("MM-DD-yyyy");
    const eventData = EventStore?.filter(
      (event) => moment(event.start_date).format("MM-DD-yyyy") > dateFormatted
    );
    let temp = [];
    eventData.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
    eventData?.forEach((event, index) => {
      if (index < 5) {
        temp.push(event);
      }
    });
    setUpcommigEvents(temp);
  }, [EventStore]);

  let dispatch = useDispatch();
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
    <>
      <WelcomeBanner />
      <div className="count-cards">
        <Row>
          {eventTypeArray.map((item, index) => (
            <Col key={index} md={3}>
              <SingleColorCard count={fncount(item)} title={item} />
            </Col>
          ))}
        </Row>
      </div>
      <Row>
        <Col md={12}>
          <EventTable data={UpcommigEvents} />
        </Col>
        {/* <Col md={4}>
          <Whether />
        </Col> */}
      </Row>
    </>
  );
};

export default Dashboard;
