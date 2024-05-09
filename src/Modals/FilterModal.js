import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { eventTypeArray } from "../Services/Constant";
import DatepickerIcon from "../Assets/Images/DatepickerIcon";

const FilterModal = (props) => {
  const EventStore = useSelector((state) => state.EventStore.EventData);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [SelectEvent, setSelectEvent] = useState("");

  function fnHandleDropdown(value) {
    if (EventStore?.length > 0 && value !== "all") {
      setSelectEvent(value);
      props.setSelectEventfromModal(value);
      let temp = EventStore?.filter((f) => f.type === value);
      props.setSearchData(temp);
    } else {
      props.setSelectEventfromModal("");
      props.setSearchData(EventStore);
    }
  }

  function fnHandleStartDate(date) {
    setStartDate(date);
    if (props?.SearchData?.length > 0) {
      let temp = props?.SearchData.filter(
        (f) => new Date(f.start_date) > new Date(date)
      );
      props.setSearchData(temp);
    }
  }
  function fnHandleEndDate(date) {
    setEndDate(date);
    if (props?.SearchData?.length > 0) {
      let temp = props?.SearchData.filter(
        (f) => new Date(f.end_date) < new Date(date)
      );
      props.setSearchData(temp);
    }
  }

  return (
    <Modal
      // className="create-event"
      {...props}
      size="sm"
      // backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <div>
          <Modal.Title>Filter Events</Modal.Title>
        </div>
      </Modal.Header>

      <Modal.Body className="eventtable">
        <Form.Label>Event Type</Form.Label>
        <Form.Select
          aria-label="Default select example"
          value={SelectEvent}
          // onChange={(e) => setSelectEvent(e.target.value)}
          onChange={(e) => fnHandleDropdown(e.target.value)}
        >
          <option value="all">All</option>
          {eventTypeArray.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </Form.Select>
        <Form.Label className="mt-2">Start Date</Form.Label>
        <div>
          <DatePicker
            selected={startDate}
            // onChange={(date) => setStartDate(date)}
            onChange={(date) => fnHandleStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            showIcon
            dateFormat="MMMM d, yyyy"
            icon={<DatepickerIcon />}
            // dateFormat="dd-MMM-yyyy"
          />
        </div>
        <Form.Label className="mt-2">End Date</Form.Label>
        <div>
          <DatePicker
            selected={endDate}
            // onChange={(date) => setEndDate(date)}
            onChange={(date) => fnHandleEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            showIcon
            dateFormat="MMMM d, yyyy"
            icon={<DatepickerIcon />}
          />
        </div>
      </Modal.Body>
      <Modal.Footer className="    justify-content-between">
        <Button variant="secondary event-button" onClick={() => props.onHide()}>Close</Button>
        <Button
          onClick={() => {
            // props.onHide();
            setSelectEvent("all");
            fnHandleDropdown("all");
            setStartDate(new Date());
            setEndDate(new Date());
          }}
          variant="primary event-button"
        >
          Reset
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
