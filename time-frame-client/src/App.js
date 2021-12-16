import React, { useState } from 'react';
import DriverTable from './components/driver-table/DriverTable';
import { Form, Row, Col, Dropdown } from 'react-bootstrap';
import moment from 'moment';
import TimeFrameModel from './components/driver-table/TimeFrameModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js';

const App = () => {

  // TODO: Implement this by moving all table data from children into here so it can be kept track of
  const [tabledata, setTableData] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new moment())

  return (
    <div className="container text-white bg-dark">
      <div className='container' style={{ padding: 30 }}>
        <Row>
          <Col sm={7}>
            <h1>Time Frame Assistant</h1>
          </Col>
          <Col sm={5}>
            <Form.Group controlId="dob">
              <Form.Control type="date" value={date.format('yyyy-MM-DD')} onChange={(event) => setDate(event.target.value)} />
            </Form.Group>
          </Col>
        </Row>
        <br />
        <div style={{ display: 'flex' }}>
          <h2>Driver Table</h2>
          <span style={{ marginLeft: '10px' }} />
          <Dropdown>
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
              <Dropdown.Menu variant="dark">
                <Dropdown.Item href="#/action-1">Add Store</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Edit Store</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Remove Store</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#/action-4">Add Driver</Dropdown.Item>
                <Dropdown.Item href="#/action-5">Edit  Driver</Dropdown.Item>
                <Dropdown.Item href="#/action-6">Remove  Driver</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#/action-7">Email Store</Dropdown.Item>
                <Dropdown.Item href="#/action-8">Email all Stores</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#/action-9">Save Table</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown.Toggle>
          </Dropdown>
        </div>
        <br />
        {/* TODO: Implement this function in the child to send back out the "row" data */}
        <DriverTable onRowEditClicked={(row) => {
          _ROW_DATA_TO_BE_EDITED = row
          setModalVisible(true);
        }} />
      </div>

      {/* Edit "table data" modal that accepts */}
      {modalVisible ? <TimeFrameModel data={_ROW_DATA_TO_BE_EDITED} updateData={(editedRowData) => {
        // TODO: Figure out what row this was and replace old one in `data` state variable
      }} /> : null}
    </div>
  );
}

export default App;
