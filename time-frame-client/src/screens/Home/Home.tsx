import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useState } from 'react';
import { Form, Button, Fade } from 'react-bootstrap';
import { TimeFrameTable } from '../../components/TimeFrameTable/TimeFrameTable';
import { BASE_API_URL } from '../../constants/API';
import IDriver from '../../types/IDriver';
import moment from 'moment';
import axios from 'axios';
import './Home.css';

interface HomeProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

export const HomeLayout: FunctionComponent<HomeProps> = ({ history }) => {
  const [date, setDate] = useState(moment());
  const [driverTableState, setDriverTableState] = useState<{ data: IDriver[], isPending: boolean }>({ data: [], isPending: true });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      axios.get(`${BASE_API_URL}drivers`, { withCredentials: true })
        .then((response) => {
          setDriverTableState({ data: response?.data?.payload, isPending: false });
        })
        .catch((err) => {
          console.log(err);
        });
    }, 400);
  }, []);
  return (
    <section className="text-white main-section overflow-auto">
      <div style={{ padding: 20 }}>
        <div className='d-flex justify-content-between'>
          <h1 style={{ fontWeight: 300 }}>Time Frame Assistant</h1>
          <Form.Group controlId="dob">
            <Form.Control style={{ textAlign: 'center' }} type="date" value={date.format('yyyy-MM-DD')} onChange={(event) => setDate(moment(event.target.value))} />
          </Form.Group>
        </div>
        <br />
        <div style={{ display: 'flex' }}>
          <h2 style={{ fontWeight: 300 }}>Time Frames</h2>
          <span style={{ marginLeft: '10px' }} />
          <Button
            className='btn btn-dark'
            style={{ height: 38 }}
            onClick={() => setOpen(!open)}
            aria-controls="collapse-btns"
            aria-expanded={open}
          >
            Email
          </Button>
          <Fade in={open}>
            <div id="example-fade-text">
              <Button
                style={{ marginLeft: 10 }}
                className='btn btn-dark'
                onClick={() => setOpen(!open)}
                aria-controls="collapse-btns"
                aria-expanded={open}
              >
                Store
              </Button>
              <Button
                style={{ marginLeft: 10 }}
                className='btn btn-dark'
                onClick={() => setOpen(!open)}
                aria-controls="collapse-btns"
                aria-expanded={open}
              >
                All Stores
              </Button>
            </div>
          </Fade>
        </div>
        <br />
        <div style={{ marginTop: -30 }} >
          <TimeFrameTable data={driverTableState.data} isPending={driverTableState.isPending} date={date} />
        </div>
      </div>
    </section>

  );
};

export const Home = withRouter(HomeLayout);
