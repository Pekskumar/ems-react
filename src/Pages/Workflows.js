import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import BarChart from "../Components/BarChart";
import DoughnutChart from "../Components/DoughnutChart";
import { Bar } from "react-chartjs-2";
import MoreEventListModal from "../Modals/MoreEventListModal";
import { CreateEventFlagSlice, EventStoreSlice } from "../Redux-Toolkit/EventSlice";
import { toast } from "react-toastify";
import { Commonservice } from "../Services/Commonservice";
import MettingIcon from "../Assets/Images/MettingIcon";
import DatepickerIcon from "../Assets/Images/DatepickerIcon";

const Workflows = () => {
  let dispatch = useDispatch();
  const EventStore = useSelector((state) => state.EventStore.EventData);
  const [MoreTableData, setMoreTableData] = useState([]);
  const [MoreTableEventModalshow, setMoreTableEventModalshow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [BarclickData, setBarclickData] = useState();
  const [upcomingModaldata, setupcomingModaldata] = useState([]);
  const [overdueModaldata, setoverdueModaldata] = useState([]);
  const [eventmodalData, seteventmodalData] = useState([]);
  const [eventTypeData, setEventTypeData] = useState({
    labels: [],
    datasets: [],
  });
  const [UpcomingEventData, setUpcomingEventData] = useState({
    labels: [],
    datasets: [],
  });
  const [OverDueEventData, setOverDueEventData] = useState({
    labels: [],
    datasets: [],
  });
  const [barChartData, setBarChartData] = useState([]);

  const getDaysInMonth = (month, year) => {
    let date = new Date(year, month, 1);
    let days = [];
    while (date.getMonth() === month) {
      days.push(moment(new Date(date)).format("MM-DD-yyyy"));
      date.setDate(date.getDate() + 1);
    }
    return days;
  };

  const fnHandleChartDate = (date) => {
    setSelectedDate(date);
    const days = getDaysInMonth(date.getMonth(), date.getFullYear());
    const tempcount = days.map((day) => {
      const temp = EventStore?.filter(
        (event) => moment(event.start_date).format("MM-DD-yyyy") === day
      );
      return temp.length;
    });
    setBarChartData([
      { label: "Total Events", data: tempcount, backgroundColor: ["#2c7be5"] },
    ]);
    setEventTypeData(calculateEventData(date));
    setUpcomingEventData(upcomingEventData(date));
    setOverDueEventData(overdueEventData(date));
  };

  const calculateEventData = (date) => {
    const dateFormatted = moment(date).format("MM-yyyy");
    const eventData = EventStore?.filter(
      (event) => moment(event.start_date).format("MM-yyyy") === dateFormatted
    );
    const eventTypeCounts = {};
    let temp = [];
    eventData.forEach((event) => {
      eventTypeCounts[event.type] = (eventTypeCounts[event.type] || 0) + 1;
      temp.push(event);
    });
    seteventmodalData(temp);
    const labels = Object.keys(eventTypeCounts);
    const data = Object.values(eventTypeCounts);
    return {
      labels: labels,
      datasets: [
        {
          label: "Event Types",
          data: data,
          backgroundColor: [
            "#fce4ec",
            "#c8e6c9",
            "#bbdefb",
            "#ffccbc",
            "#999999",
            "#fff9c4",
            "#b2dfdb",
            "#d1c4e9",
          ],
        },
      ],
    };
  };

  const upcomingEventData = (date) => {    
    const dateFormatted = moment(date);
    const eventData = EventStore?.filter(
      (event) => moment(event?.start_date) > dateFormatted
    );
    // const dateFormatted = moment(date).format("MM-DD-YYYY");
    // const eventData = EventStore?.filter(
    //   (event) => moment(event?.start_date).format("MM-DD-YYYY") > dateFormatted
    // );
    
    const eventTypeCounts = {};
    let temp = [];
    eventData.sort((a, b) => new Date(a.start_date) - new Date(b.start_date))    
    eventData.forEach((event, index) => {
      if (index < 5) {
        eventTypeCounts[event.type] = (eventTypeCounts[event.type] || 0) + 1;
        temp.push(event);
      }
    });
    setupcomingModaldata(temp);
    const labels = Object.keys(eventTypeCounts);
    const data = Object.values(eventTypeCounts);
    return {
      labels: labels,
      datasets: [
        {
          label: "Event Types Count",
          data: data,
          backgroundColor: [
            "#fce4ec",
            "#c8e6c9",
            "#bbdefb",
            "#ffccbc",
            "#999999",
            "#fff9c4",
            "#b2dfdb",
            "#d1c4e9",
          ],
        },
      ],
    };
  };

  const overdueEventData = (date) => {
    const dateFormatted = moment(date);
    const eventData = EventStore?.filter(
      (event) => moment(event?.start_date) < dateFormatted
    );
    // const dateFormatted = moment(date).format("MM-DD-yyyy");
    // const eventData = EventStore?.filter(
    //   (event) => moment(event.start_date).format("MM-DD-yyyy") < dateFormatted
    // );
    const eventTypeCounts = {};
    let temp = [];
    eventData.forEach((event, index) => {
      if (index < 5) {
        eventTypeCounts[event.type] = (eventTypeCounts[event.type] || 0) + 1;
        temp.push(event);
      }
    });
    setoverdueModaldata(temp);
    const labels = Object.keys(eventTypeCounts);
    const data = Object.values(eventTypeCounts);
    return {
      labels: labels,
      datasets: [
        {
          label: "Event Types Count",
          data: data,
          backgroundColor: [
            "#fce4ec",
            "#c8e6c9",
            "#bbdefb",
            "#ffccbc",
            "#999999",
            "#fff9c4",
            "#b2dfdb",
            "#d1c4e9",
          ],
        },
      ],
    };
  };
  const options1 = {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { position: "right" },
    },
    onClick: (event, elements, chart) => {
      if (elements.length > 0) {
        const firstElement = elements[0];
        const clickedElementIndex = firstElement.index;
        const label = eventTypeData.labels[clickedElementIndex];
        let ettemp = eventmodalData?.filter((f) => f.type === label);
        setMoreTableData(ettemp);
        setMoreTableEventModalshow(true);
      }
    },
    scales: { y: { barPercentage: 0.5 } },
  };

  function fnDeleteMore(item) {
    let temp = EventStore.filter((f) => f.id !== item.id);
    dispatch(EventStoreSlice(temp));
    toast.success("Successfully Removed Event!");
    let temp2 = MoreTableData?.filter((f) => f.id !== item.id);
    setMoreTableData(temp2);
  }

  useEffect(() => {
    const CurrentDate = new Date();
    fnHandleChartDate(CurrentDate);
  }, [EventStore]); // Re-run effect when EventStore changes

  const handleDoughnutClick = (event, elements) => {
    if (elements.length > 0) {
      const firstElement = elements[0];
      const clickedElementIndex = firstElement.index;
      const label = UpcomingEventData.labels[clickedElementIndex];
      let uptemp = upcomingModaldata?.filter((f) => f.type === label);
      setMoreTableData(uptemp);
      setMoreTableEventModalshow(true);
    }
  };
  const handleOverDueClick = (event, elements) => {
    if (elements.length > 0) {
      const firstElement = elements[0];
      const clickedElementIndex = firstElement.index;
      const label = OverDueEventData.labels[clickedElementIndex];
      let uptemp = overdueModaldata?.filter((f) => f.type === label);
      setMoreTableData(uptemp);
      setMoreTableEventModalshow(true);
    }
  };

  useEffect(() => {
    if (BarclickData) {
      setMoreTableEventModalshow(true);
      let temp2 = EventStore?.filter(
        (f) => Commonservice.getDateFormat(f.start_date) === BarclickData
      );
      setMoreTableData(temp2);
    }
  }, [BarclickData]);

  
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
      <div className="mb-3">
        <div className="welcome-banner p-4 mb-3 d-flex justify-content-between align-items-center">
          <h4 className="m-0">Work Flows</h4>
          <div>
            <ReactDatePicker
              selected={selectedDate}
              onChange={(date) => fnHandleChartDate(date)}
              dateFormat="MMMM , yyyy"
              showMonthYearPicker      
              showIcon
              icon={<DatepickerIcon/>}        
            />
          </div>
        </div>
      </div>
      <Row>
        <Col md={12}>
          <div className="color-card">
            <div className="table-heading chart-heading p-3">
              <h5 className="m-0">Total Events</h5>
            </div>
            <div className="bar-chart p-3">
              <BarChart
                labels={getDaysInMonth(
                  selectedDate.getMonth(),
                  selectedDate.getFullYear()
                )}
                datasets={barChartData}
                maxPercentage={100}
                onBarClick={setBarclickData}
              />
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <div className=" color-card">
            <div className="table-heading chart-heading p-3">
              <h5 className="m-0"> Events Types Counts</h5>
            </div>
            <div className="p-3 other-chart">
              <Bar data={eventTypeData} options={options1} />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className=" color-card">
            <div className="table-heading chart-heading p-3">
              <h5 className="m-0"> Upcoming Events</h5>
            </div>
            <div className="p-3 other-chart">
              <DoughnutChart
                data={UpcomingEventData}
                handleDoughnutClick={handleDoughnutClick}
              />
            </div>
          </div>
        </Col>
        <Col md={3}>
          <div className=" color-card">
            <div className="table-heading chart-heading p-3">
              <h5 className="m-0"> Overdue Events</h5>
            </div>
            <div className="p-3 other-chart">
              <DoughnutChart
                data={OverDueEventData}
                handleDoughnutClick={handleOverDueClick}
              />
            </div>
          </div>
        </Col>
      </Row>
      {MoreTableEventModalshow && (
        <MoreEventListModal
          data={MoreTableData}
          type='workflow'
          fnDeleteMore={fnDeleteMore}
          show={MoreTableEventModalshow}
          onHide={() => setMoreTableEventModalshow(false)}
        />
      )}
    </>
  );
};

export default Workflows;
