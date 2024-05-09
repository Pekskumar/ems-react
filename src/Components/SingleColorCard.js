import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CalenderIcon from "../Assets/Images/CalenderIcon";
import WeeddingIcon from "../Assets/Images/WeeddingIcon";
import MettingIcon from "../Assets/Images/MettingIcon";
import EducationIcon from "../Assets/Images/EducationIcon";
import PartyIcon from "../Assets/Images/PartyIcon";
import ProductlaunchIcon from "../Assets/Images/ProductlaunchIcon";
import FestivalIcon from "../Assets/Images/FestivalIcon";
import SportsIcon from "../Assets/Images/SportsIcon";
import CorporateIcon from "../Assets/Images/CorporateIcon";
import HeartIcon from "../Assets/Images/HeartIcon";
import { Color } from "../Services/Constant";

const SingleColorCard = (props) => {
  return (
    <div
      className="card-border-radius p-3 mb-3"
      style={{
        background:  Color?.[props.title]?.bg,
        color: Color?.[props.title]?.textcolor,
      }}
    >
      <Row>
        <Col md={8}>
          <p>{props.title}</p>
          <h1 className="m-0">{props.count.count}</h1>
        </Col>
        <Col md={4} className="d-flex justify-content-end    align-items-end">
          {props.title === "Wedding" ? (
            <HeartIcon />
          ) : props.title === "Meetings" ? (
            <MettingIcon />
          ) : props.title === "Education" ? (
            <EducationIcon />
          ) : props.title === "Product launches" ? (
            <ProductlaunchIcon />
          ) : props.title === "Party" ? (
            <PartyIcon />
          ) : props.title === "Festivals" ? (
            <FestivalIcon />
          ) : props.title === "Sports" ? (
            <SportsIcon />
          ) : (
            <CorporateIcon />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default SingleColorCard;
