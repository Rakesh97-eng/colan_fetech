import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const DynamicField = () => {
  const [fields, setFields] = useState([{ id: 1, label: "Field 1" }]);

  const addField = () => {
    const newField = {
      id: fields.length + 1,
      label: `Field ${fields.length + 1}`,
    };
    setFields([...fields, newField]);
  };

  const removeField = (id) => {
    const updatedFields = fields.filter((field) => field.id !== id);
    setFields(updatedFields);
  };

  return (
    <div>
      {fields.map((field) => (
        <div
          key={field.id}
          style={{
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <TextField label={field.label} />
          <Button
            onClick={() => removeField(field.id)}
            style={{ marginLeft: "5px", padding: 0 }}
          >
            <DeleteIcon sx={{color:"red"}} />
          </Button>
        </div>
      ))}

      <AddCircleIcon onClick={addField} sx={{ color: "#00e785" }} />
    </div>
  );
};

export default DynamicField;
