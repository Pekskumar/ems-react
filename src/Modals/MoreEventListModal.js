import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import YouMayEvent from "../Components/YouMayEvent";
import CreateUpdateEventModal from "./CreateUpdateEventModal";

const MoreEventListModal = (props) => {
  let navigate = useNavigate();
  const [EventModalshow, setEventModalshow] = useState(false);
  const [SingleEvent, setSingleEvent] = useState();
  function fnChangePAram(data) {
    navigate(`/eventdetail/${data?.id}`);
  }
  return (
    <Modal
      className="create-event"
      {...props}
      size="lg"
      // backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <div>
          <Modal.Title>Events</Modal.Title>
        </div>
      </Modal.Header>

      <Modal.Body className="eventtable p-0">
        <div className="pt-3">
          {props?.data?.length > 0 &&
            props?.data?.map((itemy, indexy) => (
              <YouMayEvent
                data={itemy}
                key={indexy}
                type={props?.type}
                fnDeleteMore={props?.fnDeleteMore}
                fnChangePAram={fnChangePAram}
              />
            ))}
        </div>
        {/* <Table striped>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Title</th>
              <th>Type</th>
              <th>Date</th>
              <th>Location</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {props?.data?.length > 0 &&
              props?.data?.map((item, index) => (
                <tr key={index}>
                  <td>
                    {item.event_pic !== "" &&
                    item.event_pic !== undefined &&
                    item.event_pic !== null ? (
                      <img
                        src={item.event_pic}
                        className="rounded-circle"
                        alt=""
                        width={140}
                        height={140}
                      />
                    ) : (
                      <img
                        src={item.event_pic}
                        className="rounded-circle"
                        alt=""
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = ProfilePlaceholder;
                        }}
                        width={40}
                        height={40}
                      />
                    )}
                  </td>
                  <td>{item?.title}</td>
                  <td>{item?.type}</td>
                  <td>
                    <div className="d-flex">
                      <Badge variant="primary event-button">
                        {Commonservice.getDateFormat(item?.start_date)}
                      </Badge>{" "}
                      -{"  "}
                      <Badge variant="primary event-button">
                        {Commonservice.getDateFormat(item?.end_date)}
                      </Badge>
                    </div>
                  </td>
                  <td>{item?.city}</td>
                  <td>
                    <div className="d-flex     justify-content-center    align-items-center">
                      <Link to={`/eventdetail/${item?.id}`}>
                        <ViewIcon />
                      </Link>
                      <span
                        className="ms-2"
                        onClick={() => {
                          setEventModalshow(true);
                          setSingleEvent(item);
                        }}
                      >
                        <EditIcon />
                      </span>
                      <span
                        className="ms-2"
                        onClick={() =>
                          confirmAlert({
                            title: "Confirm to Delete?",
                            message: "Are you sure to do this.",
                            buttons: [
                              {
                                label: "Yes",
                                onClick: () => props?.fnDeleteMore(item),
                              },
                              {
                                label: "No",
                              },
                            ],
                          })
                        }
                      >
                        <DeleteIcon />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table> */}
      </Modal.Body>
      <Modal.Footer>
        <div>
          <Button
            variant="secondary event-button"
            onClick={() => props.onHide()}
          >
            Close
          </Button>
        </div>
      </Modal.Footer>
      {EventModalshow && (
        <CreateUpdateEventModal
          type="edit"
          selecteddate={new Date()}
          singleevent={SingleEvent}
          show={EventModalshow}
          onHide={() => {
            setEventModalshow(false);
            props.onHide();
          }}
        />
      )}
    </Modal>
  );
};

export default MoreEventListModal;
