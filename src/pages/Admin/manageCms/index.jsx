import "./manageCmsStyle.css";
import "../../../styles/App.css";
import CommonUpload from "../../../components/common/Field/CommonUpload";

import { useDispatch } from "react-redux";
import {
  addCMSApi,
  addCmsPropertiesApi,
} from "../../../redux/action/adminAction";
import { useRef, useState } from "react";
import AuthHoc from "../../../components/authHoc/authHoc";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CommonTextFields from "../../../components/common/Field/CommonTextFIelds";
import CommonTextArea from "../../../components/common/Field/CommonTextArea";
import { TextEditor } from "../../../components/common/ckeditor";
import { useFormik } from "formik";
import * as Yup from "yup";

const ManageCMS = () => {
  const [divs, setDivs] = useState({
    aboutUs:[],
    blogDiv: [],
    solutionDiv: [],
    featuresDiv: [],
  });

  const [dynamicValue, setDynamicValue] = useState({
    aboutUs:[],
    blogs: [],
    solutions: [],
    features: [],
  });
  const dispatch = useDispatch();
  const [aboutUsFiles, setAboutUsFiles] = useState("");
  const [termsAndConditionsFiles, setTermsAndConditionsFiles] = useState([]);

  const handleAboutUsFileChange = (e) => {
    setAboutUsFiles(e.target.files[0]);
  };
  const handleAdd = (name) => {
    if (divs[name].length < 4) {
      setDivs({ ...divs, [name]: [...divs[name], divs[name].length] });
    }
  };

  const handleDelete = (name) => {
    divs[name].pop();
    setDivs({ ...divs });
  };

  const handleTermsAndConditionsFileChange = (e) => {
    setTermsAndConditionsFiles(e.target.files[0]);
  };
  const handleUploadDocuments = () => {
    try {
      const formData = new FormData();
      formData.append(`about_us`, aboutUsFiles);
      formData.append(`terms_condition`, termsAndConditionsFiles);
      dispatch(addCMSApi(formData));
    } catch (err) {
      alert(err);
    }
  };
  // const handleTextEditorChange = () => {
  //   setAboutUsFiles(editorRef.current.getContent());
  // };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      featuresHeader: "",
      blogsHeader: "",
      solutiosnHeader: "",
      features: {},
      blogs: {},
      solution: {},
      // aboutUsFiles: "",
    },
    validationSchema: Yup.object({
      featureHeader: Yup.string().required("Header For Features is required"),
      blogHeader: Yup.string().required("Header for Blog is required"),
      solutionHeader: Yup.string().required("Header for Solutions is required"),
      
    }),
    onSubmit: async (values, { resetForm }) => {},
  });


  const handleinputchange = (event) => {
    let newobj = { header: ""};
    const { name, value } = event.target;
    const fieldName = name.split("_")[0];
    const fieldobjName = name.split("_")[1];
    const fieldId = parseInt(name.split("_")[2]);
    if (fieldobjName === "image") {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const finalvalue = reader.result;
          // const finalvalue ="data:image/png;base64,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";
          setDynamicValue((prevState) => {
            const updatedField = [...(prevState[fieldName] || [])];
            if (updatedField[fieldId]) {
              updatedField[fieldId][fieldobjName] = finalvalue;
              updatedField[fieldId][`${fieldobjName}text`] = file?.name
            } else {
              newobj[fieldobjName] = finalvalue;
              newobj[`${fieldobjName}text`] = file?.name
              updatedField.push(newobj);
            }
            return {
              ...prevState,
              [fieldName]: updatedField,
            };
          });
        };
        reader.readAsDataURL(file);
      }
    } else {
      const finalvalue = value;
      setDynamicValue((prevState) => {
        const updatedField = [...(prevState[fieldName] || [])];
        if (updatedField[fieldId]) {
          updatedField[fieldId][fieldobjName] = finalvalue;
        } else {
          newobj[fieldobjName] = finalvalue;
          updatedField.push(newobj);
        }
        return {
          ...prevState,
          [fieldName]: updatedField,
        };
      });
    }
  };
  const savecms = (url) => {
    if(url !== "create-about-content"){
      let title = formik.values[`${url}Header`]
      let cmsarr = [...dynamicValue[url]];
      dispatch(addCmsPropertiesApi(url, cmsarr));
      setDivs({
        aboutUs:[],
        blogDiv: [],
        solutionDiv: [],
        featuresDiv: [],
      })
    }
    else{
      let aboutContent = {
        "about_content":aboutUsFiles
      }
      dispatch(addCmsPropertiesApi(url,aboutContent));
      
    }
  };


  return (
    <>
      <div className="commonbox">
        <p style={{ fontSize: "24px", fontWeight: "600" }}>Manage CMS Page</p>
        <div className="cmscontainer">
          <div>
            <Accordion defaultExpanded>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                <Typography>
                  <b>About us</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {/* <CommonTextFields label="Header :" /> */}
                <TextEditor
                  
                  note = {aboutUsFiles}
                  customchange={setAboutUsFiles}
                />
                <div
                  style={{
                    marginTop: "5px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    className="cmsbutton"
                    onClick={() => savecms("create-about-content")}
                    
                  >
                    Submit & Continue
                  </button>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>
                  <b>Feature</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CommonTextFields formik={formik} label="Header :" id="featuresHeader"/>
                <div>
                  <button
                    className="cmsbutton"
                    onClick={() => handleAdd("featuresDiv")}
                    disabled={divs["featuresDiv"].length >= 4}
                  >
                    Add
                  </button>
                  {divs.featuresDiv.map((div, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        marginTop: "12px",
                        border: "1px solid #b2d1c5",
                        padding: "12px",
                      }}
                    >
                      <button
                        onClick={() => handleDelete("featuresDiv")}
                        className="crossbtn"
                      >
                        X
                      </button>
                      <CommonTextFields
                        values={dynamicValue.features[div]?.header}
                        name={`features_header_${div}`}
                        customChange={(event) => handleinputchange(event)}
                        label={`Features header ${div} :`}
                        style={{ marginBottom: "14px" }}
                      />
                      <CommonTextArea
                        values={dynamicValue.features[div]?.content}
                        customchange={(event) => handleinputchange(event)}
                        label={`Features content ${div} :`}
                        name={`features_content_${div}`}
                      />
                        <CommonUpload
                        customStyle = {{display:"flex",justifyContent:"space-between"}}
                        filename={dynamicValue.features[div]?.imagetext}
                        label={`Features_Image ${div} :`}
                        name ={`features_image_${div}`}
                        onFileChange={(event) => handleinputchange(event)}
                      />
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: "5px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    className="cmsbutton"
                    onClick={() => savecms("features")}
                  >
                    Submit & Continue
                  </button>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>
                  <b>Blogs</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CommonTextFields formik={formik} label="Header :" />
                <div>
                  <button
                    className="cmsbutton"
                    onClick={() => handleAdd("blogDiv")}
                    disabled={divs["blogDiv"].length >= 3}
                  >
                    Add
                  </button>
                  {divs.blogDiv.map((div, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        marginTop: "12px",
                        border: "1px solid #b2d1c5",
                        padding: "12px",
                      }}
                    >
                      <button
                        onClick={() => handleDelete("blogDiv")}
                        className="crossbtn"
                      >
                        X
                      </button>
                      <CommonTextFields
                        values={dynamicValue.blogs?.[`blogs_author_${div}`]}
                        name={`blogs_author_${div}`}
                        customChange={(event) => handleinputchange(event)}
                        label={`Blogs ${div} Author :`}
                        style={{ marginBottom: "14px" }}
                      />
                      <CommonTextFields
                        values={dynamicValue.blogs?.[`blogs_header_${div}`]}
                        name={`blogs_header_${div}`}
                        customChange={(event) => handleinputchange(event)}
                        label={`Blogs Heading ${div} :`}
                        style={{ marginBottom: "14px" }}
                      />

                      <CommonTextArea
                        label={`Blogs description ${div} :`}
                        values={
                          dynamicValue.blogs?.[`blogs_description_${div}`]
                        }
                        name={`blogs_description_${div}`}
                        customchange={(event) => handleinputchange(event)}
                      />

                      <CommonTextFields
                        // values={dynamicValue.blogs?.[`blogs_header_${div}`]}
                        name={`blogs_routing-url_${div}`}
                        customChange={(event) => handleinputchange(event)}
                        label={`Blogs URL ${div} :`}
                        style={{ marginBottom: "14px" }}
                        type="url"
                      />
                   
                      <CommonUpload
                        customStyle = {{display:"flex",justifyContent:"space-between"}}
                        label={`Blogs Image ${div} :`}
                        name ={`blogs_image_${div}`}
                        onFileChange={(event) => handleinputchange(event)}
                        filename={"Test"}
                      />
                    </div>
                  ))}
                  <div
                    style={{
                      marginTop: "5px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <button
                      className="cmsbutton"
                      onClick={() => savecms("blogs")}
                    >
                      Submit & Continue
                    </button>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
              >
                <Typography>
                  <b>Solutions</b>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <CommonTextFields formik={formik} label="Header :" />
                <div>
                  <button
                    className="cmsbutton"
                    onClick={() => handleAdd("solutionDiv")}
                    disabled={divs["solutionDiv"].length >= 2}
                  >
                    Add
                  </button>
                  {divs.solutionDiv.map((div, index) => (
                    <div
                      key={index}
                      style={{
                        position: "relative",
                        marginTop: "12px",
                        border: "1px solid #b2d1c5",
                        padding: "12px",
                      }}
                    >
                      <button
                        onClick={() => handleDelete("solutionDiv")}
                        className="crossbtn"
                      >
                        X
                      </button>

                      <CommonTextFields
                        values={
                          dynamicValue.solutions?.[`solutions_header_${div}`]
                        }
                        name={`solutions_header_${div}`}
                        customChange={(event) => handleinputchange(event)}
                        label={`Solutions Heading ${div} :`}
                        style={{ marginBottom: "14px" }}
                      />

                      <CommonTextArea
                        values={
                          dynamicValue.solutions?.[
                            `solutions_description_${div}`
                          ]
                        }
                        name={`solutions_description_${div}`}
                        customchange={(event) => handleinputchange(event)}
                        label={`Solutions description ${div} :`}
                      />
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: "5px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <button
                    className="cmsbutton"
                    onClick={() => savecms("solutions")}
                    
                  >
                    Submit & Continue
                  </button>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};
export default AuthHoc(ManageCMS, "managecms");
