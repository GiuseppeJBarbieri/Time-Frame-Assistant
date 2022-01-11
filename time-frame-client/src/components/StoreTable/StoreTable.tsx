import * as React from 'react';
import { FunctionComponent, HTMLAttributes } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from 'react-bootstrap-table-next';

// @ts-ignore
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import { Spinner } from 'react-bootstrap';
import IStore from '../../types/IStore';
import './StoreTable.css'
import { Pencil, Trash } from 'react-bootstrap-icons';


interface StoreTableProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    data: IStore[];
    isPending: boolean;
}

const { SearchBar } = Search;
const check = () => {
    console.log('checking 123');
}
const rankFormatterEdit = () => {
    return (
        <div
            style={{
                cursor: 'pointer',
                lineHeight: 'normal',
                textAlign: 'center'
            }}
            onClick={check}
            >

            <Pencil
                style={{ fontSize: 20, color: 'white' }}
                onClick={check}
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
            }}
            onClick={check}
            >

            <Trash
                style={{ fontSize: 20, color: 'white' }}
                onClick={check}
            />
        </div>
    );

};
const columns = [
    {
        id: 1,
        dataField: "storeId",
        text: "ID",
        sort: true,
        headerAttrs: { width: 75 },
        attrs: { width: 50 }
    },
    {
        id: 2,
        dataField: "storeName",
        text: "Name",
        sort: true,
        headerAttrs: { width: 175 },
        attrs: { width: 50 }
    },
    {
        id: 3,
        dataField: "emailAddress",
        text: "Email Address",
        sort: true
    },
    {
        id: 4,
        dataField: "editStore",
        text: "Edit",
        sort: false,
        formatter: rankFormatterEdit,
        headerAttrs: { width: 50 },
        attrs: { width: 50 }
    },
    {
        id: 5,
        dataField: "removeStore",
        text: "Remove",
        sort: false,
        formatter: rankFormatterRemove,
        headerAttrs: { width: 75 },
        attrs: { width: 75 }
    }
];

const StoreTableComponent: FunctionComponent<StoreTableProps> = ({ history, data, isPending }) => {
    return (
        <div>
            {isPending ?
                <div className='spinnerDiv' >
                    <ul>
                        <li style={{ listStyle: 'none' }}>
                            <Spinner animation="border" role="status" />
                        </li>
                        <li style={{ listStyle: 'none' }}>
                            <label>Loading...</label>
                        </li>
                    </ul>
                </div>
                :
                <div>
                    <ToolkitProvider
                        keyField="storeId"
                        data={data}
                        columns={columns}
                        search
                    >
                        {
                            (props: { searchProps: JSX.IntrinsicAttributes, baseProps: any }) => (
                                <div>
                                    <div style={{ textAlign: 'end' }}>
                                        <div>
                                            <SearchBar
                                                style={{ textAlign: 'center', zIndex: 1 }}
                                                {...props.searchProps}
                                                srText=""
                                                placeholder="Search Stores"
                                            />
                                        </div>
                                    </div>
                                    <hr />
                                    <BootstrapTable
                                        key='storesTbl'
                                        {...props.baseProps}
                                        bootstrap4
                                        keyField="storeId"
                                        data={data}
                                        columns={columns}
                                        classes="table table-dark table-condensed table-hover table-striped"
                                        pagination={paginationFactory({ sizePerPage: 4 })}
                                    />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </div>
            }
        </div >
    );
};

export const StoreTable = withRouter(StoreTableComponent);