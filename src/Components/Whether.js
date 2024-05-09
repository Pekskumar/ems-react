import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Commonservice } from "../Services/Commonservice";
import { Col } from "react-bootstrap";

const Whether = () => {
  const Today = new Date();
  const navigate = useNavigate();
  const [WeatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState({});
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");

  async function fnLocationDetails(e) {
    const data = await fetch(`https://ipapi.co/json`)
      .then((res) => res.json())
      .then((data) => data);
    setlatitude(data.latitude);
    setlongitude(data.longitude);

    setCity(data);
  }

  async function weatherData(e) {
    if (latitude && longitude) {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${
          latitude !== "" &&
          latitude !== undefined &&
          latitude !== null &&
          latitude
        }&lon=${
          longitude !== "" &&
          longitude !== undefined &&
          longitude !== null &&
          longitude
        }&appid=32a5bb7b9aa1126387e06acad817149e`
      )
        .then((res) => res.json())
        .then((data) => data);

      const groups = data?.list?.reduce((groups, elist) => {
        const date = moment(elist.dt_txt).format("MM-DD-yyyy");
        if (!groups[date]) {
          groups[date] = {
            date: date,
            otherdata: [],
          };
        }
        groups[date].otherdata.push(elist);
        return groups;
      }, {});

      setWeatherData(groups);

      let timelst = [];
      if (groups) {
        Object?.keys(groups)?.forEach((element) => {
          groups[element].otherdata
            .filter(
              (d) =>
                Commonservice.getDateInDBFormat(d.dt_txt) ===
                Commonservice.getDateInDBFormat(e)
            )
            .forEach((element) => {
              timelst.push({
                name: moment(element.dt_txt).format("LT"),
                celsius: Math.floor(element.main.temp - 273.15),
              });
            });
        });
      }
    }
  }

  useEffect(() => {
    fnLocationDetails();
    weatherData(new Date());
  }, [latitude, longitude]);

  return (
    <div className="db-right-bottom p-4 color-card">
      <div className="cityTemp d-flex color-white align-items-center     justify-content-between">
        <h4 className="m-0">
          <b>{city?.city}</b>
        </h4>
        {WeatherData &&
          Object?.keys(WeatherData)?.map(
            (item, index) =>
              moment(WeatherData?.[item]?.date, "l").format("l") ===
                moment(Today).format("l") && (
                <h1 className=" m-0" key={index}>
                  {Math.floor(
                    (WeatherData?.[item]?.otherdata?.[0]?.main?.temp - 273.15) *
                      (9 / 5) +
                      32
                  )}
                  <sup>°F</sup>
                </h1>
              )
          )}
      </div>
      <div className="dayViseTemp mt-3 p-4">
        {WeatherData &&
          Object?.keys(WeatherData)?.map((item, index) => {
            return (
              <div
                key={index}
                className="dayTemp  d-flex  justify-content-between    align-items-center"
              >
                <div className="dayWithIcon d-flex     align-items-center">
                  {WeatherData?.[item]?.otherdata?.[0]?.weather?.[0]?.main ===
                  "Rain" ? (
                    <svg
                      width="33"
                      height="30"
                      viewBox="0 0 33 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25.0337 23H6.41617C4.79351 23.0045 3.22973 22.3931 2.04139 21.2895C0.85305 20.1858 0.128938 18.6725 0.0156286 17.0558C-0.0976806 15.439 0.408282 13.8396 1.4311 12.5814C2.45391 11.3232 3.91715 10.5002 5.52462 10.2789C5.47955 9.90393 5.45703 9.5266 5.4572 9.14895C5.46521 6.89819 6.30067 4.72881 7.80488 3.05287C9.30908 1.37693 11.3772 0.311233 13.6164 0.0582178C15.8556 -0.194797 18.1098 0.382509 19.9509 1.68046C21.7919 2.9784 23.0915 4.90654 23.6027 7.09862C24.6961 6.90765 25.8173 6.94559 26.8953 7.20997C27.9732 7.47435 28.9845 7.95941 29.8649 8.63449C30.7454 9.30957 31.4759 10.1599 32.0102 11.1317C32.5445 12.1034 32.8709 13.1755 32.9688 14.2798C33.0666 15.3841 32.9338 16.4967 32.5787 17.5471C32.2237 18.5975 31.654 19.5628 30.906 20.3818C30.1579 21.2009 29.2477 21.8558 28.233 22.3052C27.2183 22.7546 26.1212 22.9887 25.0112 22.9925L25.0337 23ZM6.41617 12.1571C5.78424 12.0794 5.14299 12.1366 4.53487 12.325C3.92675 12.5134 3.36564 12.8287 2.88869 13.25C2.41175 13.6713 2.02986 14.189 1.7683 14.7688C1.50674 15.3486 1.37148 15.9773 1.37148 16.6132C1.37148 17.2492 1.50674 17.8779 1.7683 18.4577C2.02986 19.0375 2.41175 19.5552 2.88869 19.9765C3.36564 20.3978 3.92675 20.713 4.53487 20.9014C5.14299 21.0898 5.78424 21.1471 6.41617 21.0693H25.0112C25.8905 21.0679 26.7589 20.8762 27.5569 20.5074C28.3548 20.1385 29.0631 19.6013 29.6332 18.9327C30.2032 18.2641 30.6214 17.48 30.8589 16.6344C31.0964 15.7889 31.1476 14.902 31.0089 14.0348C30.8702 13.1676 30.545 12.3408 30.0556 11.6112C29.5662 10.8816 28.9243 10.2667 28.1741 9.80869C27.4239 9.35071 26.5833 9.06062 25.71 8.95836C24.8368 8.85609 23.9517 8.94409 23.1158 9.21631C22.979 9.25911 22.8345 9.27124 22.6925 9.25185C22.5506 9.23245 22.4146 9.182 22.2944 9.1041C22.1742 9.0262 22.0727 8.92279 21.9971 8.8012C21.9215 8.6796 21.8737 8.54281 21.8571 8.40065C21.7562 7.40796 21.451 6.44681 20.9607 5.57746C20.4704 4.7081 19.8055 3.94931 19.0078 3.34864C18.2101 2.74797 17.2968 2.31841 16.325 2.08685C15.3533 1.85529 14.3442 1.82673 13.3609 2.003C12.3776 2.17926 11.4414 2.55653 10.6109 3.11114C9.78048 3.66576 9.07369 4.38576 8.53491 5.22601C7.99613 6.06625 7.63697 7.00859 7.47994 7.99398C7.32291 8.97938 7.3714 9.98657 7.62238 10.9524C7.65887 11.0999 7.66025 11.2539 7.62642 11.402C7.5926 11.5502 7.5245 11.6883 7.42759 11.8054C7.33228 11.9224 7.21066 12.0151 7.07267 12.0762C6.93467 12.1373 6.78418 12.1651 6.63343 12.1571H6.41617Z"
                        fill="#fff"
                      />
                      <path
                        d="M16.5023 26C16.5023 26 13.1221 29.5756 16.5023 30C19.8721 29.5835 16.5023 26 16.5023 26Z"
                        fill="#fff"
                      />
                      <path
                        d="M7.5 26C7.5 26 4.125 29.5756 7.5 30C10.875 29.5835 7.5 26 7.5 26Z"
                        fill="#fff"
                      />
                      <path
                        d="M24.5 26C24.5 26 23.375 29.5756 24.5 30C25.625 29.5835 24.5 26 24.5 26Z"
                        fill="#fff"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="33"
                      height="23"
                      viewBox="0 0 33 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M24.9792 22.9999H6.41559C4.79435 23.0064 3.23124 22.3978 2.04295 21.2972C0.854658 20.1966 0.130028 18.6865 0.0158708 17.0727C-0.0982866 15.4589 0.406564 13.8621 1.42814 12.6059C2.44971 11.3497 3.91162 10.5279 5.5177 10.3071C5.47268 9.93299 5.4502 9.5565 5.45036 9.17969C5.44397 6.92503 6.27169 4.74732 7.77486 3.064C9.27804 1.38067 11.3509 0.310162 13.5962 0.0576229C15.8414 -0.194916 18.1011 0.388309 19.9421 1.69549C21.783 3.00268 23.0758 4.94188 23.5725 7.14138C24.667 6.94435 25.7906 6.97701 26.8717 7.23731C27.9529 7.4976 28.9678 7.97982 29.8518 8.6532C30.7358 9.32658 31.4695 10.1763 32.0062 11.1484C32.5429 12.1204 32.8707 13.1933 32.9688 14.2988C33.0669 15.4042 32.9331 16.5179 32.576 17.5689C32.2188 18.6199 31.6462 19.5852 30.8945 20.4031C30.1428 21.221 29.2286 21.8737 28.2102 22.3195C27.1917 22.7653 26.0914 22.9945 24.9792 22.9925V22.9999ZM6.41559 12.1812C5.78658 12.1083 5.14924 12.1691 4.54543 12.3595C3.94163 12.5498 3.38502 12.8656 2.91216 13.2858C2.43929 13.7061 2.06087 14.2214 1.80175 14.798C1.54263 15.3745 1.40867 15.9992 1.40867 16.6311C1.40867 17.263 1.54263 17.8877 1.80175 18.4643C2.06087 19.0409 2.43929 19.5562 2.91216 19.9764C3.38502 20.3967 3.94163 20.7124 4.54543 20.9028C5.14924 21.0931 5.78658 21.1539 6.41559 21.0811H24.9792C25.8604 21.0832 26.7314 20.8942 27.5322 20.5272C28.333 20.1603 29.0443 19.6241 29.6169 18.9558C30.1896 18.2876 30.6099 17.5031 30.8488 16.6568C31.0877 15.8104 31.1395 14.9224 31.0006 14.0541C30.8617 13.1858 30.5354 12.358 30.0444 11.6279C29.5533 10.8979 28.9091 10.283 28.1564 9.82584C27.4038 9.36866 26.5605 9.08009 25.6851 8.98013C24.8097 8.88017 23.9229 8.97116 23.0862 9.24686C22.9495 9.29215 22.8043 9.30564 22.6616 9.28623C22.519 9.26682 22.3826 9.21504 22.2631 9.13489C22.1436 9.05688 22.0427 8.95355 21.9677 8.83225C21.8927 8.71095 21.8454 8.57465 21.8292 8.43305C21.7385 7.43355 21.4404 6.46383 20.9539 5.58549C20.4673 4.70715 19.803 3.93941 19.0031 3.33109C18.2032 2.72277 17.2852 2.28719 16.3075 2.052C15.3298 1.8168 14.3137 1.78712 13.3239 1.96491C12.3341 2.1427 11.3922 2.52405 10.558 3.08468C9.72384 3.64532 9.01568 4.373 8.47856 5.22147C7.94143 6.06994 7.58708 7.02066 7.43802 8.01316C7.28897 9.00565 7.34847 10.0182 7.61275 10.9865C7.65068 11.1322 7.65362 11.2847 7.62131 11.4317C7.58901 11.5787 7.52239 11.716 7.42686 11.8324C7.33133 11.9488 7.20959 12.0411 7.07157 12.1017C6.93355 12.1623 6.78313 12.1895 6.63257 12.1812H6.41559Z"
                        fill="#fff"
                      />
                    </svg>
                  )}
                  <h5 className="m-0 ms-2">
                    {moment(WeatherData?.[item]?.date, "l").format("l") ===
                    moment(Today).format("l")
                      ? "Today"
                      : moment(WeatherData?.[item]?.date, "l").format("dddd")}
                  </h5>
                </div>
                <div className="d-flex">
                  <h5 className="m-0 color-white">
                    {Math.floor(
                      (WeatherData?.[item]?.otherdata?.[0]?.main?.temp -
                        273.15) *
                        (9 / 5) +
                        32
                    )}
                    <sup>°F</sup>
                  </h5>
                  <h5 className="m-0 color-white">
                    /
                    {Math.floor(
                      (WeatherData?.[item]?.otherdata?.[0]?.main?.temp -
                        273.15) *
                        (9 / 5) +
                        32
                    )}
                    <sup>°F</sup>
                  </h5>
                </div>
              </div>
            );
            // }
          })}
      </div>
    </div>
  );
};

export default Whether;
