import React from "react";
import { Commonservice } from "../Services/Commonservice";

const WelcomeBanner = () => {
  return (
    <div className="welcome-banner p-4 mb-3">
      <p className="mb-2 d-flex align-items-center">{Commonservice.getUserLoginMessage()}</p>     
      <h4 className="m-0"><b> Event Management System</b></h4>
    </div>
  );
};

export default WelcomeBanner;
