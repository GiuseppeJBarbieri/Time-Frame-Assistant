import React, { FunctionComponent, HTMLAttributes, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { ExpandedRow } from './ExpandedRow';

import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from 'react-bootstrap-table-next';

// @ts-ignore
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import './TimeFrameTable.css';
// import ITimeFrame from '../../types/ITimeFrame';
import { Spinner } from 'react-bootstrap';
import IDriver from '../../types/IDriver';
import { Plus } from 'react-bootstrap-icons';
import { AddTimeFrameModal } from '../AddTimeFrameModal/AddTimeFrameModal';
import moment from 'moment';

interface TimeFrameTableProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    data: IDriver[];
    isPending: boolean;
    date: string;
}

export const productsGenerator = (quantity: number) => {
    const items = [];
    for (let i = 0; i < quantity; i++) {
        items.push({ id: i, name: `Town name ${i}`, price: 2100 + i });
    }
    return items;
};

const defaultModalState = {selectedDriver: {}, modalVisible: false, selectedDate: ''};

const TimeFrameTableComponent: FunctionComponent<TimeFrameTableProps> = ({ history, data, isPending, date }) => {
    const { SearchBar } = Search;
    const [modalState, setModalState] = useState<{modalVisible: boolean, selectedDriver: IDriver, selectedDate: string}>(defaultModalState);

    const rankFormatter = (_: any, data: any, index: any) => {
        return (
            <div
                style={{
                    textAlign: 'center',
                    cursor: 'pointer',
                    lineHeight: 'normal',
                    zIndex: 0
                }}
                onClick={(e) => { e.stopPropagation() }}
            >
                <div onClick={(e) => {
                    setModalState({modalVisible: true, selectedDriver: data, selectedDate: date});
                }
                }>
                    <Plus
                        style={{ fontSize: 20, color: 'white' }}
                    />
                </div>
            </div>
        );
    };
    const columns = [
        {
            id: 1,
            dataField: "driverId",
            text: "Driver ID",
            sort: true,
            headerAttrs: { width: 150 },
            attrs: { width: 50 }
        },
        {
            id: 2,
            dataField: "name",
            text: "Name",
            sort: true
        },
        {
            id: 3,
            dataField: "addTimeFrame",
            text: "Add Time Frame",
            sort: false,
            formatter: rankFormatter,
            headerAttrs: { width: 150 },
            attrs: { width: 50 }
        }
    ];
    return (
        <div>
            {isPending ?
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
                                                placeholder="Search Driver"
                                            />
                                        </div>
                                    </div>
                                    <hr />
                                    <BootstrapTable
                                        key='driversTbl'
                                        {...props.baseProps}
                                        bootstrap4
                                        keyField="driverId"
                                        data={data}
                                        columns={columns}
                                        classes="table table-dark table-condensed table-hover table-striped"
                                        expandRow={{
                                            onlyOneExpanding: true,
                                            renderer: row => (
                                                <ExpandedRow />

                                            )
                                        }}
                                        pagination={paginationFactory({ sizePerPage: 4 })}
                                    />
                                </div>
                            )
                        }
                    </ToolkitProvider>
                </div>
            }
            {
                // if true then render this
                modalState.modalVisible &&
                <AddTimeFrameModal
                    // onCloseSave={() => {
                    //     // Event modal will come back with to notify parent they have to sync with the db
                    //     // resync and close
                    //     return setAddTFModalVisible(false);
                    // }}
                    driver={modalState.selectedDriver}
                    selectedDate={date}
                    onClose={async () => {
                        setModalState(defaultModalState);
                    }}
                />
            }
        </div >
    );
};

export const TimeFrameTable = withRouter(TimeFrameTableComponent);


