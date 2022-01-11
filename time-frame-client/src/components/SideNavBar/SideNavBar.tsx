import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import SlidingPane from 'react-sliding-pane';
import { Truck, HouseDoor, Shop, ArrowBarLeft } from 'react-bootstrap-icons';

import { PAGE_ROUTES } from '../../constants/PageRoutes';

import './SideNavBar.css';
import 'react-sliding-pane/dist/react-sliding-pane.css';

interface SideNavBarProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
  panelVisible: boolean;
  setPanelVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideNavBarComponent: FunctionComponent<SideNavBarProps> = ({ history, panelVisible, setPanelVisible }) => {
  return (
    <SlidingPane
      hideHeader
      isOpen={panelVisible}
      from="left"
      width="250px"
      className='bg-dark'
      onRequestClose={() => setPanelVisible(false)}
    >
      <div className="text-white bg-dark" >
        <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <ArrowBarLeft className="arrowBarLeftPointer bi me-2" width="40" height="32" onClick={() => setPanelVisible(false)}/>
          <h1 style={{ fontWeight: 300, marginBottom: 0 }}>Menu</h1>
        </div>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item ">
            <div className="btn btn-dark"
              style={{
                display: 'flex',
                flexDirection: 'row',
                verticalAlign: 'middle',
                textAlign: 'center',
              }}
              onClick={() => { setPanelVisible(false); history.replace(PAGE_ROUTES.HOME) }}>
              <HouseDoor className="bi me-2" width="25" height="25" style={{ 'verticalAlign': 'middle' }} />
              <h4 style={{ fontWeight: 300, marginTop: 2 }}>Home</h4>
            </div>
          </li>
          <li>
            <div className="btn btn-dark"
              style={{
                display: 'flex',
                flexDirection: 'row',
                verticalAlign: 'middle',
                textAlign: 'center',
              }}
              onClick={() => { setPanelVisible(false); history.replace(PAGE_ROUTES.STORES) }}>
              <Shop className="bi me-2" width="25" height="25" style={{ 'verticalAlign': 'middle' }} />
              <h4 style={{ fontWeight: 300, marginTop: 3  }}>Stores</h4>
            </div>
          </li>
          <li>
            <div className="btn btn-dark"
              style={{
                display: 'flex',
                flexDirection: 'row',
                verticalAlign: 'middle',
                textAlign: 'center',
              }}
              onClick={() => { setPanelVisible(false); history.replace(PAGE_ROUTES.DRIVERS) }}>
              <Truck className="bi me-2" width="25" height="25" style={{ 'verticalAlign': 'middle' }} />
              <h4 style={{ fontWeight: 300 }}>Drivers</h4>
            </div>
          </li>
          
        </ul>
        <div style={{ 'bottom': '0', 'position': 'absolute', 'width': '75%' }}>
          <hr />
          <p style={{ fontWeight: 300 }} >by Giuseppe Barbieri</p>
        </div>
      </div>
    </SlidingPane >
  );
};

export const SideNavBar = withRouter(SideNavBarComponent);
