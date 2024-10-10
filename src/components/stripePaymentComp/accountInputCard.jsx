import { useFormikContext } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import cards from "../../assests/images/creditCardBrands .png";
import AddButton from "../common/Button/addButton";
import CommonDropDown from "../common/Field/CommonDropDown";
import "./stripepaymentcomp.css";

export const AccountInputCard = (props) => {
  const {
    cardInput,
    buttonText,
    formik,
    handlePayment,
    onchange,
    onInputChange,
    isButtonDisabled,
    method = "",
  } = props;



  const getCountries = [
    { value: 1, label: "India" ,id:"IN"},
    { value: 2, label: "USA",id:"US" },
    { value: 3, label: "UK",id:"UK" },
  ];
  const getStates = [
    { value: 1, label: "TamilNadu" },
    { value: 2, label: "Chicago" },
    { value: 3, label: "UK" },
  ];

  const disableStyle = {
    backgroundColor:"grey !important"
  }

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        width: "100%",
        justifyContent: "space-between",
        padding: "5px",
        alignItems: "center",
      }}
    >
      {cardInput.map((inputdata) => {
        const {
          label,
          includeImg,
          fullwidth,
          placeholderText,
          id,
          type,
          element,
          options = "",
        } = inputdata;
        return type !== "select" ? (
          <div
            style={{
              width: fullwidth == "true" ? "100%" : "40%",
              marginTop: "3%",
            }}
          >
            <label>{label}</label>
            <div className="cardinputimage">
              {/* {element} */}
              {React.cloneElement(element, {
                onChange: onInputChange, // Attach onChange handler to Stripe elements
              })}
              {includeImg && (
                <div
                  style={{
                    width: "150px",
                    position: "absolute",
                    right: 5,
                    top: "20px",
                  }}
                >
                  <img
                    src={cards}
                    style={{ width: "100%", objectFit: "contain" }}
                  ></img>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div
            style={{
              width: fullwidth == "true" ? "100%" : "40%",
              marginTop: "3%",
            }}
          >
            <label>{label}</label>
            <br></br>
            <select className="carddatainput" style={{ width: "100%" }} id={id=="country"?"country":"state"} onChange={(e)=>onchange(e)}>
              {id == "country"
                ? getCountries?.map((countries) => {
                    return <option value={countries.id}>{countries.label}</option>;
                  })
                : getStates?.map((states) => {
                    return <option value={states.id}>{states.label}</option>;
                  })}
            </select>
          </div>
        );
      })}
      <div className="cardpaybutton">
        <AddButton buttonText={buttonText} handleClick={handlePayment} customStyles={disableStyle}  disable={isButtonDisabled}  />
      </div>
    </div>
  );
};
