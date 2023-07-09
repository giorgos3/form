import { useState, useContext } from "react";
import { Context } from "../App";

import { Button } from "react-bootstrap";
import Dialog from "./Modal";

const Table = (props) => {
  const { title } = props.data;

  const [data, setData] = useContext(Context);

  const [openModal, setOpenModal] = useState(false);
  const [exportModal, setExportModal] = useState(false);

  const [indexData, setIndexData] = useState();

  const showModal = (index) => {
    setIndexData(index);
    setOpenModal(!openModal);
  };

  const messages = {
    header: "Warning",
    title: "Are you sure you want to delete this item?",
    buttons: {
      confirm: "Confirm",
      cancel: "Cancel",
    },
  };

  const messagesExport = {
    header: "Export Data",
    title: "Copy data below :",
    buttons: {
      cancel: "Cancel",
    },
  };

  return (
    <div>
      {openModal && (
        <Dialog
          value={{ item: indexData, messages: messages }}
          open={openModal}
          type="alert"
          onClose={() => setOpenModal(false)}
        />
      )}
      <div className="table-responsive">
        <table className="table table-hover">
          <thead>
            <tr>
              {title.map((header, i) => (
                <th key={i} scope="col">
                  {header}
                </th>
              ))}
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, i) => (
              <tr key={i}>
                <td>{data.name}</td>
                <td>{data.surname}</td>
                <td>{data.email}</td>
                <td>{data.age}</td>
                <td>{data.color}</td>
                <td>{data.contact.toString().replace(/-/g, " ")}</td>
                <td>
                  <Button
                    className="btn btn-danger"
                    onClick={() => showModal(i)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-right">
        <Button
          className="btn btn-warning btn-lg"
          onClick={() => setExportModal(!exportModal)}
        >
          Export
        </Button>
      </div>
      {exportModal && (
        <Dialog
          value={{ messages: messagesExport }}
          open={exportModal}
          type="info"
          onClose={() => setExportModal(false)}
        />
      )}
    </div>
  );
};

export default Table;
