import { useState, useContext } from "react";
import { Form, Button } from "react-bootstrap";
import Input from "./Input";
import Checkbox from "./Checkbox";
import Table from "./Table";
import inputsData from "../json/inputsData.json";
import contact_via from "../json/contact-via.json";
import { Context } from "../App";

const FormInfo = () => {
  const [values, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    age: "",
    color: "",
    contact: [],
  });
  const [data, setData] = useContext(Context);
  const [errorContact, setErrorContact] = useState(null);

  const inputs = inputsData;
  const colors = ["red", "green", "blue", "white", "black"];
  const contact = contact_via;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!values.contact.length) {
      setErrorContact("Please select at least one Contact Preference");
      return false;
    }
    setErrorContact(null);
    setData((prevState) => [...prevState, values]);
  };

  const onChange = (type) => (e) => {
    switch (type) {
      case "input":
        setValues((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
        break;

      case "option":
        setValues((prevState) => ({ ...prevState, color: e.target.value }));
        break;

      case "checkbox":
        if (e.target.checked) {
          setErrorContact(null);
          setValues((prevState) => ({
            ...prevState,
            contact: [...prevState.contact, e.target.value],
          }));
        } else {
          setValues((prevState) => {
            return {
              ...prevState,
              contact: [
                ...prevState.contact.filter((item) => item !== e.target.value),
              ],
            };
          });
        }
        break;

      
    }
  };

  return (
    <div className="container">
      <div className="row pt-5">
        <div className="col-12">
          <Form onSubmit={handleSubmit}>
            {inputs.map((input) => (
              <Input
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange("input")}
              />
            ))}

            <div className="d-flex flex-column pt-3 pb-3">
              <label>Select Color</label>

              <select className="form-select" onChange={onChange("option")}>
                {colors.map((option, i) => (
                  <option key={i} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-3">
              <label>Select Contact Preference</label>
              {contact.map((contact) => (
                <Checkbox
                  key={contact.id}
                  {...contact}
                  onChange={onChange("checkbox")}
                />
              ))}
              <span className="text-danger">{errorContact}</span>
            </div>

            <div className="text-right">
              <Button
                variant="primary"
                className="btn btn-success btn-lg"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>

        <div className="col-12 mt-5 mb-5">
          {data.length === 0 ? (
            <div className="wrapper">
              <div className="alert alert-warning" role="alert">
                No data
              </div>
            </div>
          ) : (
            <Table data={{ title: Object.keys(values) }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default FormInfo;
