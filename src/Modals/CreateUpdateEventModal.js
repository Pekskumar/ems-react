import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import GoogleLocationIcon from "../Assets/Images/GoogleLocationIcon";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { EventStoreSlice } from "../Redux-Toolkit/EventSlice";
import { Commonservice } from "../Services/Commonservice";
import GooglePlaceModal from "./GooglePlaceModal";
import DatepickerIcon from "../Assets/Images/DatepickerIcon";
import { eventTypeArray } from "../Services/Constant";

const CreateUpdateEventModal = (props) => {
  const EventStore = useSelector((state) => state.EventStore.EventData);
  const ref = useRef();
  let dispatch = useDispatch();
  const [GooglePlaceModalShow, setGooglePlaceModalShow] = useState(false);
  const [GooglePlaceData, setGooglePlaceData] = useState();
  const [file, setFile] = useState();

  const [input, setInput] = useState({
    event_pic: "",
    title: "",
    start_date:
      props?.selecteddate !== "" ? new Date(props?.selecteddate) : new Date(),
    end_date:
      props?.selecteddate !== "" ? new Date(props?.selecteddate) : new Date(),
    deadline:
      props?.selecteddate !== "" ? new Date(props?.selecteddate) : new Date(),
    address: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    type: props?.eventname !== "" ? props?.eventname : eventTypeArray[0],
    latitude: "",
    longitude: "",
    detail: "",
    errors: {
      event_pic: "",
      title: "",
      start_date: "",
      end_date: "",
      address: "",
      city: "",
      state: "",
      country: "",
      zipcode: "",
      type: eventTypeArray[0],
      ValidationRules: [
        {
          FieldName: "title",
          ValidationType: "required",
          ValidationMessage: "This Field is a required field",
        },
        {
          FieldName: "start_date",
          ValidationType: "required",
          ValidationMessage: "This Field is a required field",
        },
        {
          FieldName: "end_date",
          ValidationType: "required",
          ValidationMessage: "This Field is a required field",
        },
        {
          FieldName: "city",
          ValidationType: "required",
          ValidationMessage: "This Field is a required field",
        },
        {
          FieldName: "country",
          ValidationType: "required",
          ValidationMessage: "This Field is a required field",
        },
        {
          FieldName: "detail",
          ValidationType: "required",
          ValidationMessage: "This Field is a required field",
        },
      ],
    },
  });
  useEffect(() => {
    if (GooglePlaceData) {
      setInput({
        ...input,
        address: GooglePlaceData.line1,
        city: GooglePlaceData.city,
        state: GooglePlaceData.state,
        country: GooglePlaceData.country,
        zipcode: GooglePlaceData.pinCode,
        latitude: GooglePlaceData.latitude,
        longitude: GooglePlaceData.longitude,
      });
    }
  }, [GooglePlaceData]);

  useEffect(() => {
    if (props?.type === "edit") {
      setInput({
        ...input,
        id: props.singleevent.id,
        event_pic: props.singleevent.event_pic,
        title: props.singleevent.title,
        start_date: new Date(props.singleevent.start_date),
        end_date: new Date(props.singleevent.end_date),
        deadline: new Date(props.singleevent.deadline),
        address: props.singleevent.address,
        city: props.singleevent.city,
        state: props.singleevent.state,
        country: props.singleevent.country,
        zipcode: props.singleevent.zipcode,
        type: props.singleevent.type,
        latitude: props.singleevent.latitude,
        longitude: props.singleevent.longitude,
        detail: props.singleevent.detail,
      });
    }
  }, [props?.type]);

  const reset = () => {
    ref.current.value = "";
    setFile("");
    setInput({
      ...input,
      event_pic: "",
    });
  };
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));

    getBase64(e.target.files[0]);
  }
  const onLoad = (fileString) => {
    setInput({
      ...input,
      event_pic: fileString,
    });
  };
  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };
  function fnOpenGooglePlaceModal() {
    setGooglePlaceModalShow(true);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    let obj = Commonservice.fnCheckValidationOfObject(input);
    setInput({
      ...obj.obj,
    });

    const invalidFeedbackElement = document.querySelector(".invalid-feedback");
   

    if (invalidFeedbackElement) {
      invalidFeedbackElement.scrollIntoView({ behavior: "smooth" });
    } else {
      console.error("No element found with class 'invalid-feedback'");
    }

    if (obj.isValid) {
      let body = {
        id: Commonservice.createGuid(),
        event_pic: input.event_pic,
        title: input.title,
        start_date: input.start_date,
        end_date: input.end_date,
        deadline: input.deadline,
        address: input.address,
        city: input.city,
        state: input.state,
        country: input.country,
        zipcode: input.zipcode,
        type: input.type,
        latitude: input.latitude,
        longitude: input.longitude,
        detail: input.detail,
        createdat: new Date(),
      };
      if (EventStore?.length > 0) {
        if (props.type === "edit") {
          let temp1 = EventStore.map((element1) => {
            if (element1.id === input.id) {
              return {
                ...element1,
                event_pic: input?.event_pic,
                title: input.title,
                start_date: input.start_date,
                end_date: input.end_date,
                deadline: input.deadline,
                address: input.address,
                city: input.city,
                state: input.state,
                country: input.country,
                zipcode: input.zipcode,
                type: input.type,
                latitude: input.latitude,
                longitude: input.longitude,
                detail: input.detail,
                updatedat: new Date(),
              };
            }
            return element1;
          });
          dispatch(EventStoreSlice(temp1));
          toast.success("Successfully Updated Event!");
          props.onHide();
        } else {
          let temp = [...EventStore, body];
          dispatch(EventStoreSlice(temp));
          toast.success("Successfully Created Event!");
          props.onHide();
        }
      } else {
        dispatch(EventStoreSlice([body]));
        toast.success("Successfully Created Event!");
        props.onHide();
      }
    }
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
        <Modal.Title>Create Event</Modal.Title>
      </Modal.Header>
      <Form onSubmit={(e) => handleSubmit(e)} className="authflow-form">
        <Modal.Body>
          {/* <div className="form-label-group position-relative mt-3 d-inline-block prof-img">
            <div className="user-img-col-box position-relative">
              <div className="user-profile-image-col">
                {file !== "" && file !== undefined && file !== null ? (
                  <img src={file} alt="" width={140} height={140} />
                ) : (
                  <img
                    src={input.event_pic}
                    alt=""
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = ProfilePlaceholder;
                    }}
                    width={140}
                    height={140}
                  />
                )}
              </div>
              <Button type="button" variant="ddd imageCloseBtn" onClick={reset}>
                close icon
              </Button>
            </div>
            <input
              id="input-file-hidden"
              name="property_logo"
              type="file"
              ref={ref}
              className="form-control is-invalid"
              onChange={handleChange}
            />
          </div> */}
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Event Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="title"
              maxLength={60}
              value={input.title}
              onChange={(e) =>
                setInput({
                  ...input,
                  title: e.target.value,
                })
              }
              isInvalid={input.errors.title}
            />
            {input.errors.title && (
              <Form.Control.Feedback type="invalid">
                {input.errors.title}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Start Date</Form.Label>
                <div>
                  <DatePicker
                    selected={new Date(input.start_date)}
                    onChange={(date) =>
                      setInput({
                        ...input,
                        start_date: date,
                        end_date: date,
                        deadline: new Date(date.getTime() - 1 * 24 * 60 * 60 * 1000),
                      })
                    }
                    // showTimeSelect
                    // timeFormat="HH:mm"
                    timeIntervals={15}
                    timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    showIcon
                    showTimeInput
                    icon={<DatepickerIcon />}
                  />
                </div>
                {input.errors.password && (
                  <Form.Control.Feedback type="invalid">
                    {input.errors.password}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>End Date</Form.Label>
                <div>
                  <DatePicker
                    selected={new Date(input.end_date)}
                    onChange={(date) =>
                      setInput({
                        ...input,
                        end_date: date,
                      })
                    }
                    // showTimeSelect
                    // timeFormat="HH:mm"
                    
                    timeIntervals={15}
                    // timeCaption="time"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    showIcon
                    showTimeInput
                    icon={<DatepickerIcon />}
                    // minDate={input.start_date}
                  />
                </div>
                {input.errors.password && (
                  <Form.Control.Feedback type="invalid">
                    {input.errors.password}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Event Type</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  value={input.type}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      type: e.target.value,
                    })
                  }
                >
                  {eventTypeArray.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Registration Deadline</Form.Label>
                <div>
                  <DatePicker
                    selected={new Date(input.deadline)}
                    onChange={(date) =>
                      setInput({
                        ...input,
                        deadline: date,
                      })
                    }
                    disabled
                    // peekNextMonth
                    // showMonthDropdown
                    // showYearDropdown
                    dropdownMode="select"
                    minDate={input.start_date}
                    maxDate={input.end_date}
                    showIcon
                    dateFormat="MMMM d, yyyy"
                    icon={<DatepickerIcon />}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Address</Form.Label>
            <div className="position-relative">
              <Form.Control
                type="text"
                placeholder="address"
                value={input.address}
                onChange={(e) =>
                  setInput({
                    ...input,
                    address: e.target.value,
                  })
                }
                isInvalid={input.errors.address}
              />
              <span
                className="google-location-icon"
                onClick={() => fnOpenGooglePlaceModal()}
              >
                <GoogleLocationIcon />
              </span>
            </div>
            {input.errors.address && (
              <Form.Control.Feedback type="invalid">
                {input.errors.address}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Row>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="city"
                  value={input.city}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      city: e.target.value,
                    })
                  }
                  isInvalid={input.errors.city}
                />
                {input.errors.city && (
                  <Form.Control.Feedback type="invalid">
                    {input.errors.city}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="state"
                  value={input.state}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      state: e.target.value,
                    })
                  }
                  isInvalid={input.errors.state}
                />
                {input.errors.state && (
                  <Form.Control.Feedback type="invalid">
                    {input.errors.state}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Country</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="country"
                  value={input.country}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      country: e.target.value,
                    })
                  }
                  isInvalid={input.errors.country}
                />
                {input.errors.country && (
                  <Form.Control.Feedback type="invalid">
                    {input.errors.country}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>ZipCode</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="zipcode"
                  value={input.zipcode}
                  onChange={(e) =>
                    setInput({
                      ...input,
                      zipcode: e.target.value,
                    })
                  }
                  isInvalid={input.errors.zipcode}
                />
                {input.errors.zipcode && (
                  <Form.Control.Feedback type="invalid">
                    {input.errors.zipcode}
                  </Form.Control.Feedback>
                )}
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Detail</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="detail"
              value={input.detail}
              onChange={(e) =>
                setInput({
                  ...input,
                  detail: e.target.value,
                })
              }
              isInvalid={input.errors.detail}
            />
            {input.errors.detail && (
              <Form.Control.Feedback type="invalid">
                {input.errors.detail}
              </Form.Control.Feedback>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer >
          <Button variant="secondary event-button" onClick={props.onHide}>
            Close
          </Button>
          <Button type="submit" variant="primary event-button">
            Save
          </Button>
        </Modal.Footer>
      </Form>
      {GooglePlaceModalShow && (
        <GooglePlaceModal
          show={GooglePlaceModalShow}
          GooglePlaceData={setGooglePlaceData}
          onHide={() => setGooglePlaceModalShow(false)}
        />
      )}
    </Modal>
  );
};

export default CreateUpdateEventModal;
