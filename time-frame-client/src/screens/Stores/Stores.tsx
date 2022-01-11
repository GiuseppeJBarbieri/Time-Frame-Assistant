import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { useState } from 'react';
import { Button, Fade } from 'react-bootstrap';
import { StoreTable } from '../../components/StoreTable/StoreTable';
import { BASE_API_URL } from '../../constants/API';
import axios from 'axios';
import IStore from '../../types/IStore';

// TODO - Add Custom CSS File
import './Stores.css'
interface StoresProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

export const StoresLayout: FunctionComponent<StoresProps> = ({ history }) => {
  const [storeTableState, setStoreTableState] = useState<{ data: IStore[], isPending: boolean }>({ data: [], isPending: true });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      axios.get(`${BASE_API_URL}stores`, { withCredentials: true })
        .then((response) => {
          setStoreTableState({ data: response?.data?.payload, isPending: false });
        })
        .catch((err) => {
          console.log(err);
        });
    }, 400);
  }, []);
  return (
    <section className="text-white main-section overflow-auto">
      <div style={{ padding: 20 }}>
        <div>
          <h1 style={{ fontWeight: 300, marginBottom: 0 }}>Time Frame Assistant</h1>
          <br />
        </div>
        <div style={{ display: 'flex' }}>
          <h2 style={{ fontWeight: 300 }}>Stores</h2>
          <span style={{ marginLeft: '10px' }} />
          <Button
            className='btn btn-dark'
            style={{ height: 38 }}
            onClick={() => setOpen(!open)}
            aria-controls="collapse-btns"
            aria-expanded={open}
          >
            Add Store
          </Button>
          <Fade in={open}>
            <div id="example-fade-text flex">
              <form className='container d-flex' style={{ 'maxWidth': 400 }}>

                <input type='text' className="form-control" placeholder="Store Name" style={{ 'marginBottom': 15, 'textAlign': 'center', height: 36, marginTop: 1 }} />
                <input type='email' className="form-control" placeholder="Email Address" style={{ 'marginBottom': 15, 'textAlign': 'center', height: 36, marginTop: 1, marginLeft: 5 }} />

                <Button
                  className='btn btn-dark'
                  style={{ height: 38, marginLeft: 5 }}
                  onClick={() => setOpen(!open)}
                  aria-controls="collapse-btns"
                  aria-expanded={open}
                >
                  Add
                </Button>


              </form>
            </div>
          </Fade>
        </div>
        <br />
        <div style={{ marginTop: -30 }} >
          <StoreTable data={storeTableState.data} isPending={storeTableState.isPending} />
        </div>
      </div>
    </section>
  );
};

export const Stores = withRouter(StoresLayout);
