import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Color } from "../Services/Constant";

export default function CalenderCustom(props) {
  const SameDay = new Date();
  let dayNames = [
    {
      F: "Sunday",
      M: "Sun",
      S: "Su",
    },
    {
      F: "Monday",
      M: "Mon",
      S: "MO",
    },
    {
      F: "Tuesday",
      M: "Tue",
      S: "Tu",
    },
    {
      F: "Wednesday",
      M: "Wed",
      S: "We",
    },
    {
      F: "Thursday",
      M: "Thu",
      S: "Th",
    },
    {
      F: "Friday",
      M: "Fri",
      S: "Fr",
    },
    {
      F: "Saturday",
      M: "Sat",
      S: "Sa",
    },
  ];
  let monthNames = [
    {
      F: "January",
      M: "Jan",
    },
    {
      F: "February",
      M: "Feb",
    },
    {
      F: "March",
      M: "Mar",
    },
    {
      F: "April",
      M: "Apr",
    },
    {
      F: "May",
      M: "May",
    },
    {
      F: "June",
      M: "Jun",
    },
    {
      F: "July",
      M: "Jul",
    },
    {
      F: "August",
      M: "Aug",
    },
    {
      F: "September",
      M: "Sep",
    },
    {
      F: "October",
      M: "Oct",
    },
    {
      F: "November",
      M: "Nov",
    },
    {
      F: "December",
      M: "Dec",
    },
  ];
  const [date, setdate] = useState(props.date);
  const [time, settime] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23,
  ]);
  const [viewtype, setviewtype] = useState(props.viewtype);
  // const [data, setdata] = useState(props?.data);

  const [CalDisplayLalbe, setCalDisplayLalbe] = useState(
    monthNames[date.getMonth()].F + "-" + date.getFullYear()
  );

  // function fnEventListModal(item) {
  //   setEventListDate(item);
  //   // setEventListModalShow(true);
  // }

  function fnGenerateCal(date, viewtype, data) {
    if (viewtype === "Day") {
      return DayWeekView(date, data);
    } else if (viewtype === "Month") {
      return MonthView(date, data);
    } else if (viewtype === "Week") {
      return DayWeekView(date, data);
    } else if (viewtype === "List") {
      return ListView(date, data);
    } else if (viewtype === "Year") {
      return YearView(date, data);
    }
  }
  function MonthView(date, data) {
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    var CalStart = new Date(
      new Date(firstDay).setDate(firstDay.getDate() - firstDay.getDay())
    );
    var CalEnd = new Date(
      new Date(firstDay).setDate(firstDay.getDate() - firstDay.getDay())
    );
    CalEnd = new Date(CalEnd.setDate(CalEnd.getDate() + 41));
    let DateRowArray = [];
    for (let r = 0; r < 6; r++) {
      let DateColArray = [];
      for (let c = 0; c < 7; c++) {
        DateColArray.push(new Date(CalStart));
        CalStart = new Date(CalStart.setDate(CalStart.getDate() + 1));
      }
      DateRowArray.push(DateColArray);
    }

    function fnBindAllEvents(data) {
      return (
        <>
          {data?.map(
            (ed, edindex) =>
              edindex < 3 && (
                <p
                  style={{
                    background: Color?.[ed.type]?.bg,
                    color: Color?.[ed.type]?.textcolor,
                  }}
                  title={ed.title}
                  className="event_details"
                  onClick={(e) => {
                    e.stopPropagation();
                    props.fnAddEvent(ed.start_date, "", "edit", ed);
                  }}
                >
                  {formatAMPM(new Date(ed.start_date))}
                  &nbsp;&nbsp;{ed.title}
                </p>
              )
          )}
          {data?.length > 3 && (
            <p
              className="more_btn event_details"
              onClick={(e) => {
                e.stopPropagation();
                props?.fnMorebtn(data);
              }}
            >
              {data?.length - 3}+ more
            </p>
          )}
        </>
      );
    }

    return (
      <>
        <table className="month-view-calender">
          <thead>
            <tr>
              <th className="table_cell">{dayNames[0].M}</th>
              <th className="table_cell">{dayNames[1].M}</th>
              <th className="table_cell">{dayNames[2].M}</th>
              <th className="table_cell">{dayNames[3].M}</th>
              <th className="table_cell">{dayNames[4].M}</th>
              <th className="table_cell">{dayNames[5].M}</th>
              <th className="table_cell">{dayNames[6].M}</th>
            </tr>
          </thead>
          <tbody>
            {DateRowArray.map((r_item, row) => (
              <tr key={row}>
                {r_item.map((c_item, col) => (
                  <td
                    sd={c_item}
                    ed={
                      new Date(new Date(c_item).setDate(c_item.getDate() + 1))
                    }
                    className={
                      `${
                        c_item >= firstDay && c_item <= lastDay
                          ? ""
                          : "disable table_body_cell"
                      }` ||
                      `table_body_cell ${
                        moment(c_item).format("MM-DD-yyyy") ===
                        moment(SameDay).format("MM-DD-yyyy")
                          ? "dayno today"
                          : "dayno"
                      }`
                    }
                    key={col}
                    onClick={(e) => props.fnAddEvent(c_item, "", "add")}
                  >
                    <div
                      className="main-cell"
                      // onClick={(e) => props.fnAddEvent(c_item, e, "add")}
                    >
                      <div className="date-cell">{c_item.getDate()}</div>
                      <div className="event-cell">
                        {fnBindAllEvents(
                          data?.filter(
                            (e) =>
                              new Date(e.end_date) >= c_item &&
                              new Date(e.start_date) <
                                new Date(
                                  new Date(c_item).setDate(c_item.getDate() + 1)
                                )
                          )
                        )}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
  function DayWeekView(date, data) {
    var firstDay = new Date(date);
    var lastDay = new Date(date);
    if (viewtype === "Week") {
      var first = date.getDate() - date.getDay();
      var last = first + 6;
      firstDay = new Date(date.setDate(first));
      lastDay = new Date(date.setDate(last));
    }
    let WeekDays = [];

    // let dates = new Date(date);
    // var first = dates.getDate() - dates.getDay();
    // var firstDay = new Date(dates.setDate(first));
    // firstDay.setDate(dates.getDate());

    for (
      var dt = firstDay;
      dt <= lastDay;
      dt = new Date(dt.setDate(dt.getDate() + 1))
    ) {
      WeekDays.push(new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()));
    }

    

    return (
      <>
        <table
          className={`month-view-calender dayWeek-view-calender show-border-sticky viewtype-${viewtype}`}
        >
          <thead className="dayWeek_view_calender_thead">
            <tr>
              <th
                style={viewtype === "Day" ? {} : { minWidth: "80px" }}
                className="week_cell time_width"
              ></th>
              {WeekDays.map((d, index) => (
                <th className="week_cell" key={index}>
                  {moment(new Date(d)).format("ddd MM/DD")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="day_week_body">
            <tr>
              <td className="all_day_cell">all-day</td>
              {WeekDays.map((all_item, all_index) => (
                <td
                  className={`all_day_cell ${
                    moment(all_item).format("MM-DD-yyyy") ===
                    moment(SameDay).format("MM-DD-yyyy")
                      ? "dayno today"
                      : "dayno"
                  }`}
                  key={all_index}
                  onClick={(e) => {
                    props.fnAddEvent(all_item, "", "add");
                  }}
                >
                  {/* <div className="event-container-dayweek "> */}
                  {fnBindAllEvents(
                    data?.filter(
                      (e) =>
                        // e.type === "allDay" &&
                        moment(e.start_date).format("MM-DD-yyyy") ===
                        // commonservices.getDayMonthFormat(e.date)
                        moment(all_item).format("MM-DD-yyyy")
                      // commonservices.getDayMonthFormat(all_item)
                    )
                  )}
                  {/* </div> */}
                </td>
              ))}
            </tr>
            {time.map((t_item, t_index) => (
              <tr key={t_index}>
                <td
                  className={`day_cell ${
                    moment(t_item, ["HH"]).format("hh a") ===
                    moment(SameDay, ["HH"]).format("hh a")
                      ? "active"
                      : ""
                  }`}
                >
                  {moment(t_item, ["HH"]).format("hh a")}
                </td>
                {WeekDays.map((d_item, index) => (
                  <td
                    sd={new Date(new Date(d_item).setHours(t_item))}
                    ed={new Date(new Date(d_item).setHours(t_item + 1))}
                    className={`day_cell ${
                      // commonservices.getDayMonthFormat(d_item)
                      moment(d_item).format("MM-DD-yyyy") ===
                      moment(SameDay).format("MM-DD-yyyy")
                        ? // commonservices.getDayMonthFormat(SameDay)
                          "dayno today"
                        : "dayno"
                    }`}
                    onClick={(e) => {
                      props.fnAddEvent(
                        new Date(new Date(d_item).setHours(t_item)),
                        "",
                        "add"
                      );
                    }}
                  >
                    <div className="event-cell">
                      {fnBindAllEvents(
                        data?.filter(
                          (e) =>
                            new Date(e.end_date) >=
                              new Date(new Date(d_item).setHours(t_item)) &&
                            new Date(e.start_date) <
                              new Date(new Date(d_item).setHours(t_item + 1))
                        )
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
            {/* </div> */}
            {/* </tr> */}
          </tbody>
        </table>
      </>
    );
  }
  function fnBindAllEvents(data) {
    return (
      <>
        {data?.map(
          (ed, edindex) =>
            edindex < 1 && (
              <p
                style={{
                  background: Color?.[ed.type]?.bg,
                  color: Color?.[ed.type]?.textcolor,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  props.fnAddEvent(ed.start_date, "", "edit", ed);
                }}
                data-event-date={ed.start_date}
                className="event_details"
              >
                {formatAMPM(new Date(ed.start_date))}
                &nbsp;&nbsp;{ed.title}
              </p>
            )
        )}
        {data?.length > 1 && (
          <p
            className="more_btn event_details"
            onClick={(e) => {
              e.stopPropagation();
              props?.fnMorebtn(data);
            }}
          >
            {data?.length - 1}+ more
          </p>
        )}
      </>
    );
  }

  function fnNextPrev(value) {
    if (viewtype === "Month") {
      if (value === 1) {
        let dates = new Date(date);
        dates.setMonth(dates.getMonth() + 1);
        setdate(dates);
        setCalDisplayLalbe(
          monthNames[dates.getMonth()].F + "-" + dates.getFullYear()
        );
      } else if (value === -1) {
        let dates = new Date(date);
        dates.setMonth(dates.getMonth() - 1);
        setdate(dates);
        setCalDisplayLalbe(
          monthNames[dates.getMonth()].F + "-" + dates.getFullYear()
        );
      } else if (value === 0) {
        let dates = new Date();
        dates.setMonth(dates.getMonth());
        setdate(dates);
        setCalDisplayLalbe(
          monthNames[dates.getMonth()].F + "-" + dates.getFullYear()
        );
      }
    } else if (viewtype === "Week" || viewtype === "List") {
      if (value === 1) {
        let dates = new Date(date);
        var first = dates.getDate() - dates.getDay();
        var firstDay = new Date(dates.setDate(first));
        firstDay.setDate(dates.getDate() + 7);
        setdate(firstDay);
        moment(firstDay).weekday(6).format("MMMM DD, yyyy");
        setCalDisplayLalbe(
          monthNames[firstDay.getMonth()].F +
            " " +
            firstDay.getDate() +
            " - " +
            moment(firstDay).weekday(6).format("MMMM DD, yyyy")
        );
      } else if (value === -1) {
        let dates = new Date(date);
        var first = dates.getDate() - dates.getDay();
        var firstDay = new Date(dates.setDate(first));
        firstDay.setDate(dates.getDate() - 7);
        setdate(firstDay);
        setCalDisplayLalbe(
          monthNames[firstDay.getMonth()].F +
            " " +
            firstDay.getDate() +
            " - " +
            moment(firstDay).weekday(6).format("MMMM DD, yyyy")
        );
      } else if (value === 0) {
        let dates = new Date();
        var first = dates.getDate() - dates.getDay();
        var firstDay = new Date(dates.setDate(first));
        firstDay.setDate(dates.getDate());
        setdate(firstDay);

        setCalDisplayLalbe(
          monthNames[firstDay.getMonth()].F +
            " " +
            firstDay.getDate() +
            " - " +
            moment(firstDay).weekday(6).format("MMMM DD, yyyy")
        );
      }
    } else if (viewtype === "Day") {
      if (value === 1) {
        let dates = new Date(date);
        dates.setDate(dates.getDate() + 1);
        setdate(dates);
        setCalDisplayLalbe(moment(dates).format("dddd, MMMM DD, yyyy"));
      } else if (value === -1) {
        let dates = new Date(date);
        dates.setDate(dates.getDate() - 1);
        setdate(dates);
        setCalDisplayLalbe(moment(dates).format("dddd, MMMM DD, yyyy"));
      } else if (value === 0) {
        let dates = new Date();
        dates.setDate(dates.getDate());
        setdate(dates);
        setCalDisplayLalbe(moment(dates).format("dddd, MMMM DD, yyyy"));
      }
    } else if (viewtype === "Year") {
      if (value === 1) {
        let dates = new Date(date);
        dates.setFullYear(dates.getFullYear() + 1);
        setdate(dates);
        setCalDisplayLalbe(dates.getFullYear());
      } else if (value === -1) {
        let dates = new Date(date);
        dates.setFullYear(dates.getFullYear() - 1);
        setdate(dates);
        setCalDisplayLalbe(dates.getFullYear());
      } else if (value === 0) {
        let dates = new Date();
        dates.setFullYear(dates.getFullYear());
        setdate(dates);
        setCalDisplayLalbe(dates.getFullYear());
      }
    }
  }
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }
  function fnViewChange(value) {
    if (value === "Week" || value === "List") {
      let dates = new Date(date);
      var first = dates.getDate() - dates.getDay();
      var firstDay = new Date(dates.setDate(first));
      firstDay.setDate(dates.getDate());
      setdate(firstDay);

      setCalDisplayLalbe(
        monthNames[firstDay.getMonth()].F +
          " " +
          firstDay.getDate() +
          " - " +
          moment(firstDay).weekday(6).format("MMMM DD, yyyy")
      );
    } else if (value === "Day") {
      let dates = new Date(date);
      dates.setDate(dates.getDate());
      setdate(dates);
      setCalDisplayLalbe(moment(dates).format("dddd, MMMM DD, yyyy"));
    } else if (value === "Month") {
      let dates = new Date(date);
      dates.setMonth(dates.getMonth());
      setdate(dates);
      setCalDisplayLalbe(
        monthNames[dates.getMonth()].F + "-" + dates.getFullYear()
      );
    } else if (value === "Year") {
      let dates = new Date(date);
      dates.setFullYear(dates.getFullYear());
      setdate(dates);
      setCalDisplayLalbe(dates.getFullYear());
    }
    setviewtype(value);
  }
  function YearView(date1, data) {
    let FullyearDays = [];
    let year = date1.getFullYear();
    var _date = new Date(year, 0);
    while (_date.getFullYear() === year) {
      FullyearDays.push(new Date(_date));
      _date.setDate(_date.getDate() + 1);
    }

    function fnBindAllEvents(data) {
      return (
        <>
          {data?.map(
            (ed, edindex) =>
              edindex < 1 && (
                <p
                  style={{
                    background: Color?.[ed.type]?.bg,
                    color: Color?.[ed.type]?.textcolor,
                  }}
                  onClick={(e) => {                    
                    e.stopPropagation();
                    props.fnAddEvent(ed.start_date, ed.type, "edit", ed);
                  }}
                  className="event_details"
                  title={ed.title}
                >
                  {formatAMPM(new Date(ed.start_date))}
                  &nbsp;&nbsp;{ed.title}
                </p>
              )
          )}
          {data?.length > 1 && (
            <p
              className="more_btn  event_details"
              onClick={(e) => {
                e.stopPropagation();
                props?.fnMorebtn(data);
              }}
            >
              {data?.length - 1}+ more
            </p>
          )}
        </>
      );
    }

    return (
      <>
        <table className="day_week_common_table year_table">
          <thead className="day_week_common_table_head year_table_head">
            <tr>
              <th style={{ minWidth: "300px", textAlign: "center" }}>Events</th>
              {monthNames.map((d, d_index) => (
                <>
                  <th key={d_index}>
                    <p className="week_head_one ps-3">{d.F}</p>
                    {FullyearDays.filter(
                      (dyear) => monthNames[dyear.getMonth()].F === d.F
                    ).map((t_item, t_index) => (
                      <th className="timeline_head" sd={t_item} key={t_index}>
                        {moment(t_item).format("DD dd")}
                      </th>
                    ))}
                  </th>
                </>
              ))}
            </tr>
          </thead>
          <tbody className="day_week_common_table_body year_table_body">
            {props.EventNameList.map((td_item, t_index) => (
              <tr key={t_index}>
                <td>{td_item}</td>
                {monthNames.map((d_item, d_index) => (
                  <>
                    <td key={d_index}>
                      {FullyearDays.filter(
                        (dyear) => monthNames[dyear.getMonth()].F === d_item.F
                      ).map((t_item, t_index) => (
                        <td
                          className="timeline_head"
                          key={t_index}
                          sd={new Date(new Date(t_item).setHours(t_item))}
                          ed={new Date(new Date(t_item).setHours(t_item + 1))}
                          onClick={(e) => {                            
                            props.fnAddEvent(
                              t_item,
                              td_item,
                              "add",
                              null,
                              td_item.title
                            );
                          }}
                        >
                          {fnBindAllEvents(
                            data?.filter(
                              (e) =>
                                e.type === td_item &&
                                new Date(e.end_date) >= t_item &&
                                new Date(e.start_date) <
                                  new Date(
                                    new Date(t_item).setDate(
                                      t_item.getDate() + 1
                                    )
                                  )
                            )
                          )}
                        </td>
                      ))}
                    </td>
                  </>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
  function ListView(date, data) {
    var firstDay = new Date(date);
    var lastDay = new Date(date);
    var first = date.getDate() - date.getDay();
    var last = first + 6;
    firstDay = new Date(date.setDate(first));
    lastDay = new Date(date.setDate(last));
    let WeekDays = [];
    for (
      var dt = firstDay;
      dt <= lastDay;
      dt = new Date(dt.setDate(dt.getDate() + 1))
    ) {
      WeekDays.push(new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()));
    }

    let lst = [];
    data?.forEach((el1) => {
      for (let index = 0; index < WeekDays.length; index++) {
        const el2 = WeekDays[index];
        if (
          // commonservices.getDateInFormat(el1.date)
          moment(el1.start_date).format("MM-DD-yyyy") ===
          // commonservices.getDateInFormat(el2)
          moment(el2).format("MM-DD-yyyy")
        ) {
          lst.push(el1);
        } else {
          lst.push();
        }
      }
    });
    // groupdata

    const groups = lst.reduce((groups, elist) => {
      // const date = commonservices.getDateInFormat(elist.date);
      const date = moment(elist.start_date).format("MM-DD-yyyy");
      if (!groups[date]) {
        groups[date] = {
          date: date,
          eventlist: [],
        };
      }
      groups[date].eventlist.push(elist);
      return groups;
    }, {});

    return (
      <>
        {Object.keys(groups).length > 0 ? (
          Object.keys(groups).map((list_item, list_index) => (
            <table
              key={list_index}
              className="month-view-calender dayWeek-view-calender list-view-calender"
            >
              <thead className="list_head">
                <tr>
                  <th className="">
                    <span>{moment(groups[list_item].date).format("dddd")}</span>
                    <span>
                      {moment(groups[list_item].date).format("MMMM DD,yyyy")}
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="list_body">
                {groups[list_item].eventlist.length > 0 &&
                  groups[list_item].eventlist.map((e_item, e_index) => (
                    <tr key={e_index}>
                      <td className="">
                        <p>{formatAMPM(new Date(e_item.start_date))}</p>
                        <p className="d-flex     align-items-center">
                          <div
                            className="me-2 main-dot"
                            style={{ background: Color?.[e_item.type]?.bg }}
                          ></div>
                          {e_item.title}
                        </p>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          ))
        ) : (
          <div className="no-data">
            <div>No Data Found.</div>
          </div>
        )}
      </>
    );
  }
  return (
    <>
      <div className="calender_main color-card position-relative">
        <div className="calender_main_inner">
          <div className="calender_buttons">
            <div className="text_start">
              <button onClick={(e) => fnNextPrev(-1)} className="prev btn_css">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-left"
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#ffffff"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M15 6l-6 6l6 6" />
                </svg>
              </button>
              <button onClick={(e) => fnNextPrev(1)} className="next btn_css">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-chevron-right"
                  width="21"
                  height="21"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#ffffff"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 6l6 6l-6 6" />
                </svg>
              </button>
              <button
                onClick={(e) => fnNextPrev(0)}
                className="btn_css"
                // className={`ms-5 ${
                //   // commonservices.getDateInFormat(date)
                //   moment(date).format("MM-DD-yyyy") ===
                //   moment(SameDay).format("MM-DD-yyyy")
                //     ? // commonservices.getDateInFormat(SameDay)
                //       "disable"
                //     : ""
                // }`}
              >
                Today
              </button>
            </div>
            <div className="text_center">
              <h4> {CalDisplayLalbe}</h4>
            </div>
            <div className="text_end">
              <button
                onClick={(e) => fnViewChange("Month")}
                // className={viewtype === "Month" ? "active" : "month"}
                className={`btn_css ${
                  viewtype === "Month" ? "view_active" : "month"
                }`}
              >
                Month
              </button>

              <button
                onClick={(e) => fnViewChange("Week")}
                // className={viewtype === "Week" ? "view_active" : "week"}

                className={`btn_css ${
                  viewtype === "Week" ? "view_active" : "week"
                }`}
              >
                Week
              </button>
              <button
                onClick={(e) => fnViewChange("Day")}
                // className={viewtype === "Day" ? "view_active" : "day"}

                className={`btn_css ${
                  viewtype === "Day" ? "view_active" : "day"
                }`}
              >
                Day
              </button>
              <button
                onClick={(e) => fnViewChange("Year")}
                // className={viewtype === "Day" ? "view_active" : "day"}

                className={`btn_css ${
                  viewtype === "Year" ? "view_active" : "year"
                }`}
              >
                Year
              </button>

              <button
                onClick={(e) => fnViewChange("List")}
                // className={viewtype === "List" ? "view_active" : "list"}
                className={`btn_css ${
                  viewtype === "List" ? "view_active" : "list"
                }`}
              >
                List
              </button>
            </div>
          </div>
          <div className="calender_body">
            <div className="inner-calender_body">
              {fnGenerateCal(date, viewtype, props?.data)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
