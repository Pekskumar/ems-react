import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import YouMayEvent from "../Components/YouMayEvent";
import CreateUpdateEventModal from "../Modals/CreateUpdateEventModal";
import { CreateEventFlagSlice, EventStoreSlice } from "../Redux-Toolkit/EventSlice";
import GoogleLocationIcon from "../Assets/Images/GoogleLocationIcon";
import FilterIcon from "../Assets/Images/FilterIcon";
import FilterModal from "../Modals/FilterModal";
import SearchIcon from "../Assets/Images/SearchIcon";

const Events = () => {
  const [SearchEvent, setSearchEvent] = useState("");
  const [FilterModalshow, setFilterModalshow] = useState(false);
  const [SearchData, setSearchData] = useState([]);
  const [SelectEventfromModal, setSelectEventfromModal] = useState("");
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const [EventModalshow, setEventModalshow] = useState(false);
  const [SingleEvent, setSingleEvent] = useState();
  const EventStore = useSelector((state) => state.EventStore.EventData);

  function fnChangePAram(data) {
    navigate(`/eventdetail/${data?.id}`);
  }

  useEffect(() => {
    if (EventStore?.length > 0) {
      let temp = EventStore.filter(
        (f) =>
          f?.title.toLowerCase().includes(SearchEvent) ||
          f?.type.toLowerCase().includes(SearchEvent)
      );
      setSearchData(temp);
    }
  }, [EventStore, SearchEvent]);

  function fnHandleFilter() {
    setFilterModalshow(true);
  }

  // let dispatch = useDispatch();
  const CreateEventFlag = useSelector(
    (state) => state.EventStore.CreateEventFlag
  );
  console.log("CreateEventFlag::", CreateEventFlag);

  useEffect(() => {
    if (window.location.href.includes("eventdetail")) {      
      dispatch(CreateEventFlagSlice(false));
    } else {
      dispatch(CreateEventFlagSlice(true));
    }
  }, [CreateEventFlag]);
  return (
    <div className="eventtable color-card">
      <div className="table-heading p-3 ">
        <Row>
          <Col md={6} className="d-flex        align-items-center">
            <h5 className="m-0 me-2">All Events</h5>
            <div className="position-relative">
              <Form.Control
                type="text"
                placeholder="Search..."
                value={SearchEvent}
                onChange={(e) => setSearchEvent(e.target.value)}
              />
              <span
                className="google-location-icon"
                // onClick={() => fnOpenGooglePlaceModal()}
              >
                <SearchIcon />
              </span>
            </div>
          </Col>
          <Col
            md={6}
            className="   d-flex align-items-center    justify-content-end"
          >
            {/* <div>
              {SelectEventfromModal !== "" && (
                <>
                  <Button>{SelectEventfromModal}</Button>
                  <Button onClick={() => setSelectEventfromModal("")}>
                    delete
                  </Button>
                </>
              )}
            </div> */}
            <span className="filter-btn" onClick={() => fnHandleFilter()}>
              <FilterIcon />
            </span>
          </Col>
        </Row>
      </div>
      <Row>
        {SearchData?.length > 0 &&
          SearchData?.map((item, index) => (
            <Col key={index} md={6}>
              <div className="pt-3">
                <YouMayEvent data={item} fnChangePAram={fnChangePAram} />
              </div>
            </Col>
          ))}
      </Row>
      {EventModalshow && (
        <CreateUpdateEventModal
          type="edit"
          selecteddate={new Date()}
          singleevent={SingleEvent}
          show={EventModalshow}
          onHide={() => setEventModalshow(false)}
        />
      )}
      {FilterModalshow && (
        <FilterModal
          // type="edit"
          // selecteddate={new Date()}
          // SearchData={SearchData}
          SearchData={SearchData}
          setSearchData={setSearchData}
          setSelectEventfromModal={setSelectEventfromModal}
          SelectEventfromModal={SelectEventfromModal}
          show={FilterModalshow}
          onHide={() => setFilterModalshow(false)}
        />
      )}
    </div>
  );
};

export default Events;
