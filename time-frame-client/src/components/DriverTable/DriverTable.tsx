import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from 'react-bootstrap-table-next';

// @ts-ignore
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import './DriverTable.css';
import IDriver from '../../types/IDriver';
import { Spinner } from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';

interface DriverTableProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    data: IDriver[];
    isPending: boolean;
}
const { SearchBar } = Search;
const check = () => {
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
        dataField: "driverId",
        text: "Driver ID",
        sort: true
    },
    {
        id: 2,
        dataField: "name",
        text: "Name",
        sort: true
    },,
    {
        id: 3,
        dataField: "editStore",
        text: "Edit",
        sort: false,
        formatter: rankFormatterEdit,
        headerAttrs: { width: 50 },
        attrs: { width: 50 }
    },
    {
        id: 4,
        dataField: "removeStore",
        text: "Remove",
        sort: false,
        formatter: rankFormatterRemove,
        headerAttrs: { width: 75 },
        attrs: { width: 75 }
    }
];

const DriverTableComponent: FunctionComponent<DriverTableProps> = ({ history, data, isPending }) => {
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
                        keyField="driverId"
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
                                                style={{ textAlign: 'center' }}
                                                {...props.searchProps}
                                                srText=""
                                                placeholder="Search Drivers"
                                            />
                                        </div>
                                    </div>
                                    <hr />
                                    <BootstrapTable
                                        {...props.baseProps}
                                        bootstrap4
                                        keyField="driverId"
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

export const DriverTable = withRouter(DriverTableComponent);