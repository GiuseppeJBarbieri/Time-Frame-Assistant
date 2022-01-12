import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useState } from 'react';
import { Button, Fade, Spinner } from 'react-bootstrap';
import { DriverTable } from '../../components/DriverTable/DriverTable';
import { BASE_API_URL } from '../../constants/API';
import IDriver from '../../types/IDriver';
import axios from 'axios';
import './Drivers.css';
import { driver } from 'localforage';

interface DriversProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

export const DriversLayout: FunctionComponent<DriversProps> = ({ history }) => {
  const [driverTableState, setDriverTableState] = useState<{ data: IDriver[], isPending: boolean }>({ data: [], isPending: true });
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [driver, setDriver] = useState<IDriver>({ driverId: 0, name: '' });

  const addDriver = () => {
    setIsSaving(true);
    axios.post(`${BASE_API_URL}drivers`, driver, { withCredentials: true })
      .then((response) => {
        setIsSaving(false);
        setDriver({ name: '' });
      })
      .catch((err) => {
        console.log(err);
        setIsSaving(false);
      });
  }

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
        </div>
        <br />
        <div style={{ display: 'flex' }}>
          <h2 style={{ fontWeight: 300 }}>Drivers</h2>
          <span style={{ marginLeft: '10px' }} />

          <Button
            className='btn btn-dark'
            style={{ height: 38 }}
            onClick={() => setOpen(!open)}
            aria-controls="collapse-btns"
            aria-expanded={open}
          >
            Add Driver
          </Button>
          <Fade in={open}>
            <div id="example-fade-text flex">
              <form className='container d-flex' style={{ 'maxWidth': 400 }}>

                <input type='text' className="form-control" placeholder="Driver Name" onChange={(e) => setDriver({ name: e.target.value })} style={{ 'marginBottom': 15, 'textAlign': 'center', height: 36, marginTop: 1 }} />

                <Button
                  className='btn btn-dark'
                  style={{ height: 38, marginLeft: 5 }}
                  aria-controls="collapse-btns"
                  aria-expanded={open}
                  onClick={async () => {
                    // setOpen(!open)
                    addDriver()
                    window.location.reload();
                  }
                  }
                >
                  Add
                </Button>


              </form>
            </div>
          </Fade>
        </div>
        <br />
        <div style={{ marginTop: -30 }} >
          {isSaving ?
            <div className='spinnerDiv' >
              <ul>
                <li key='1' style={{ listStyle: 'none' }}>
                  <Spinner animation="border" role="status" />
                </li>
                <li key='2' style={{ listStyle: 'none' }}>
                  <label>Loading...</label>
                </li>
              </ul>
            </div>
            :
            <DriverTable data={driverTableState.data} isPending={driverTableState.isPending} />
          }
        </div>
      </div>
    </section>

  );
};

export const Drivers = withRouter(DriversLayout);
