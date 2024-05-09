import moment from "moment";
import Noon from "../Assets/Images/sun.gif";
import Evening from "../Assets/Images/eve.gif";
import Morning from "../Assets/Images/morning.gif";

export const Commonservice = {
  Logout401,
  fnCheckValidationOfObject,
  getDateInDBFormat,
  createGuid,
  getDateFormat,
  getUserLoginMessage,
};

export function fnCheckValidationOfObject(obj) {
  let IsValid = true;
  if (obj.errors !== null) {
    if (obj.errors.ValidationRules) {
      for (let i = 0; i < obj.errors.ValidationRules.length; i++) {
        obj.errors[obj.errors.ValidationRules[i].FieldName] = "";
      }

      for (let i = 0; i < obj.errors.ValidationRules.length; i++) {
        let objRules = obj.errors.ValidationRules[i];

        if (objRules !== null) {
          // Required validation :
          if (objRules.ValidationType.toLowerCase() === "required") {
            if (
              obj[objRules.FieldName] === "" ||
              obj[objRules.FieldName] === null ||
              obj[objRules.FieldName] === undefined
            ) {
              IsValid = false;
              obj.errors[objRules.FieldName] = objRules.ValidationMessage;
            }
          }

          if (
            obj[objRules.FieldName] !== "" &&
            obj[objRules.FieldName] !== null &&
            obj[objRules.FieldName] !== undefined
          ) {
            //  Range validation
            if (objRules.ValidationType.toLowerCase() === "range") {
              if (objRules.FieldName === "old_password") {
                if (obj.old_password.length < 6) {
                  IsValid = false;
                  obj.errors[objRules.FieldName] = objRules.ValidationMessage;
                }
              }
              if (objRules.FieldName === "new_password") {
                if (obj.new_password.length < 6) {
                  IsValid = false;
                  obj.errors[objRules.FieldName] = objRules.ValidationMessage;
                }
              }
            }

            // Masking Validation
            if (objRules.ValidationType.toLowerCase() === "mobile-mask") {
              // if (!obj[objRules.FieldName].toString().match(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/)) {
              if (!obj[objRules.FieldName].toString().match(/^[0-9]{10}$/)) {
                IsValid = false;
                obj.errors[objRules.FieldName] = objRules.ValidationMessage;
              }
            }

            // Email Validation
            if (
              obj.errors[objRules.FieldName] === "" &&
              objRules.ValidationType.toLowerCase() === "email"
            ) {
              var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
              if (!obj[objRules.FieldName].toString().match(mailformat)) {
                IsValid = false;
                obj.errors[objRules.FieldName] = objRules.ValidationMessage;
              }
            }

            //  Number validation
            if (
              objRules.ValidationType.toLowerCase() === "number" &&
              obj.errors[objRules.FieldName] === ""
            ) {
              var mailformat = /^[0-9]/;
              if (!obj[objRules.FieldName].toString().match(mailformat)) {
                IsValid = false;
                obj.errors[objRules.FieldName] = objRules.ValidationMessage;
              }
            }

            //  Compare Field Value

            if (
              obj.errors[objRules.FieldName] === "new_password" &&
              obj.errors[objRules.CompareFieldName] ===
                "confirm_new_password" &&
              objRules.ValidationType.toLowerCase() === "comparefieldvalue"
            ) {
              // var mailformat = /^[0-9]*$/;

              if (obj[objRules.FieldName] !== obj[objRules.CompareFieldName]) {
                IsValid = false;
                obj.errors[objRules.FieldName] = objRules.ValidationMessage;
              }
            }

            //date validation
            if (objRules.ValidationType.toLowerCase() === "date") {
              if (moment(obj[objRules.FieldName]) <= moment("1900-01-01")) {
                IsValid = false;
                obj.errors[objRules.FieldName] = objRules.ValidationMessage;
              }
            }
            if (objRules.ValidationType.toLowerCase() === "checkbox") {
              if (obj[objRules.FieldName].length === 0) {
                IsValid = false;
                obj.errors[objRules.FieldName] = objRules.ValidationMessage;
              }
            }
          }
        }
      }
    }
  }
  return { isValid: IsValid, obj: obj };
}
export function Logout401(errorcode) {
  if (errorcode === 401) {
    localStorage.clear();
    window.location.reload();
  }
}
function getDateInDBFormat(date) {
  if (date !== null && date !== "" && date !== undefined)
    return moment(date).format("YYYY-MM-DD");
  else return "";
}
function getDateFormat(date) {
  if (date !== null && date !== "" && date !== undefined)
    return moment(date).format("DD-MM-YYYY");
}
function createGuid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-4" +
    S4().substr(0, 3) +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  ).toLowerCase();
}
function getUserLoginMessage() {
  var today = new Date();
  var curHr = today.getHours();

  if (curHr < 12) {
    return (
      <>
        <img src={Morning} alt={Morning} width={35} className="me-2" />
        Good Morning!
      </>
    );
  } else if (curHr < 18) {
    return (
      <>
        <img src={Noon} alt={Noon} width={35} className="me-2" />
        Good Afternoon!
      </>
    );
  } else if (curHr < 18) {
    return (
      <>
        <img src={Noon} alt={Noon} width={35} className="me-2" />
        Good Afternoon!
      </>
    );
  } else {
    return (
      <>
        <img src={Evening} alt={Evening} width={35} className="me-2" />
        Good Evening!
      </>
    );
  }
}
