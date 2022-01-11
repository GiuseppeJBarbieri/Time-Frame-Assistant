import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from 'react-bootstrap-table-next';
import './TimeFrameTable.css'
import { Pencil, Trash } from 'react-bootstrap-icons';

interface ExpandedRowProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> { }

const timeFrames = [
    {
        id: 1,
        storeName: 'Glen Harris',
        customerName: 'Barbieri',
        town: 'Farmingdale',
        orderNumber: 'Order Number 1',
        timeFrame: '11 - 2'
    },
    {
        id: 2,
        storeName: 'KandP',
        customerName: 'Barbieri',
        town: 'Town',
        orderNumber: 'Order Number 2',
        timeFrame: '8 - 2'
    },
    {
        id: 3,
        storeName: 'Elantech',
        customerName: 'Hajee',
        town: 'Town',
        orderNumber: 'Order Number 3',
        timeFrame: '9 - 1'
    },
    {
        id: 4,
        storeName: 'Mr. Jays',
        customerName: 'Bloomfield',
        town: 'Town',
        orderNumber: 'Order Number 4',
        timeFrame: '10 - 12'
    },
    {
        id: 5,
        storeName: 'Giuseppe',
        customerName: 'Lawrence',
        town: 'Town',
        orderNumber: 'Order Number 5',
        timeFrame: '11 - 5'
    }
];

const rankFormatterEdit = () => {
    return (
        <div
            style={{
                textAlign: 'center',
                cursor: 'pointer',
                lineHeight: 'normal',
            }}>

            <Pencil
                style={{ fontSize: 20, color: 'white' }}
            />
        </div>
    );

};
const rankFormatterRemove = () => {
    return (
        <div
            style={{
                textAlign: 'center',
                cursor: 'pointer',
                lineHeight: 'normal',
            }}>

            <Trash
                style={{ fontSize: 20, color: 'white' }}
            />
        </div>
    );

};

const columns = [
    {
        id: 1,
        dataField: "storeName",
        text: "Store Name",
        sort: true
    },
    {
        id: 2,
        dataField: "customerName",
        text: "Customer Name",
        sort: true
    },
    {
        id: 3,
        dataField: "town",
        text: "Town"
    },
    {
        id: 4,
        dataField: "orderNumber",
        text: "Order Number"
    },
    {
        id: 5,
        dataField: "timeFrame",
        text: "Time Frame"
    },
    {
        id: 6,
        dataField: "edit",
        text: "Edit",
        sort: false,
        formatter: rankFormatterEdit,
        headerAttrs: { width: 50 },
        attrs: { width: 50 }
    },
    {
        id: 7,
        dataField: "remove",
        text: "Remove",
        sort: false,
        formatter: rankFormatterRemove,
        headerAttrs: { width: 75 },
        attrs: { width: 50 }
    }
];

/*
    You can edit cells with bootstrap
    is this a good design?

    Should i use this or another screen?

    TODO
    Store Screen Functionality ---
        1. Add Store 
        2. Edit Store
        3. Remove Store

    Driver Screen Functionality ---
        1. Add Driver
        2. Edit Driver
        3. Remove Driver

    Home Screen Functionality ---
        1. Load Time Frames for date in date picker
        2. Add Time Frame
            Should be able to add another by hitting enter at the end
            Clear Fields
            Store Name - Dropdown
            Customer Name - Text
            Town - AutoFill?
            Order Number - Text/Null
            Time Frame 10am-8pm only need 10-2 or 2-6
            Order Date taken from date picker or current date
        3. Edit time frame
        4. Remove time frame
        5. Email Store
        6. Email All Stores

    

*/


const ExpandedRowComponent: FunctionComponent<ExpandedRowProps> = ({ history }) => {
    return (
        <div style={{ 'background': '#1e1e2f' }}>
            <div style={{ paddingLeft: '15px', paddingRight: '15px', paddingBottom: '15px' }}>
                {/* <h2 style={{ fontWeight: 300 }} >Time Frames</h2>*/}
                <br /><br />
                <BootstrapTable
                    key='timeFramesTbl'
                    bootstrap4
                    keyField="nestedTable"
                    data={timeFrames}
                    columns={columns}
                    rowStyle={{ fontWeight: 300 }}
                    classes="table table-dark  table-hover table-striped"
                    pagination={paginationFactory({ sizePerPage: 5 })}
                />
            </div>
        </div>
    );
};

export const ExpandedRow = withRouter(ExpandedRowComponent);

function cellEditFactory(arg0: { mode: string; }): any {
    console.log('edit');
}
