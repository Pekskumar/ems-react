import React, { useState } from "react";
import { Badge, Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "../Assets/Images/EditIcon";
import ViewIcon from "../Assets/Images/ViewIcon";
// import ProfilePlaceholder from "../Assets/Images/cloud.jpg";
import ProfilePlaceholder from "../Assets/Images/clouda.jpg";
import CreateUpdateEventModal from "../Modals/CreateUpdateEventModal";
import { Commonservice } from "../Services/Commonservice";
import YouMayEvent from "./YouMayEvent";

const EventTable = (props) => {
  let navigate = useNavigate();
  const [EventModalshow, setEventModalshow] = useState(false);
  const [SingleEvent, setSingleEvent] = useState();
  function fnChangePAram(data) {
    navigate(`/eventdetail/${data?.id}`);
  }
  return (
    <div className="eventtable color-card">
      <div className="table-heading p-3">
        <h5 className="m-0">Upcomming Events</h5>
      </div>
      <Row>
        {props.data?.length > 0 &&
          props.data?.map((item, index) => (
            <Col md={6} key={index}>
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
    </div>
  );
};

export default EventTable;
