import { useFormikContext } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import cards from "../../assests/images/creditCardBrands .png";
import AddButton from "../common/Button/addButton";
import CommonDropDown from "../common/Field/CommonDropDown";
import "./stripepaymentcomp.css";

export const AccountInputCard = (props) => {
  const { cardInput, buttonText, formik, onchange, method = "" } = props;
  const [checknum, setChecknum] = useState("");
  const [indexvalue, setIndexvalue] = useState(0);
  const navigate = useNavigate();
  const handleStripepay = () => {
    navigate("/");
  };

  const getCountries = [
    { value: 1, label: "India" },
    { value: 2, label: "USA" },
    { value: 3, label: "UK" },
  ];

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
        const { label, includeImg, fullwidth, placeholderText, id, type,element } =
          inputdata;
        return type !== "select" ? (
          <div style={{ width: fullwidth == "true" ? "100%" : "40%" }}>
            <label>{label}</label>
            <div className="cardinputimage">
              {/* <input
                value={formik?.values[id]}
                id={id}
                name={id}
                // type={type}
                className="carddatainput"
                onChange={(e) => onchange(e,method)}
                placeholder={placeholderText}
                style={{ width: "100%" }}
              /> */}
              {element}
              <br />
              <div style={{ color: "red", margin: "0px" }}>
                {formik?.touched[id] && formik?.errors[id]
                  ? formik?.touched[id] && formik?.errors[id]
                  : " "}
              </div>
              {includeImg == "true" && (
                <img
                  width="170"
                  height="20"
                  style={{
                    position: "absolute",
                    right: "0px",
                    objectFit: "contain",
                    top: "18px",
                  }}
                  src={cards}
                />
              )}
            </div>
          </div>
        ) : (
          <div style={{ width: fullwidth == "true" ? "100%" : "40%"}} >
          <label>{label}</label>
          <br></br>
          <select className="carddatainput" style={{width:"100%"}}>
            <option>India</option>
            <option>UK</option>
            <option>Dubai</option>
          </select>
          </div>
        );
      })}
      <div className="cardpaybutton">
        <AddButton buttonText={buttonText} handleClick={formik?.handleSubmit} />
      </div>
    </div>
  );
};
