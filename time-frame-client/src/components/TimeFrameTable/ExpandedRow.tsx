import * as React from 'react';
import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import paginationFactory from "react-bootstrap-table2-paginator";
import BootstrapTable from 'react-bootstrap-table-next';
import './TimeFrameTable.css'
import { Pencil, Trash } from 'react-bootstrap-icons';
import axios from 'axios';
import { BASE_API_URL } from '../../constants/API';
import ITimeFrame from '../../types/ITimeFrame';
import { Spinner } from 'react-bootstrap';

import './ExpandedRow.css';
import { EditTimeFrameModal } from '../EditTimeFrameModal/EditTimeFrameModal';

interface ExpandedRowProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    data: { driverId: number, orderDate: string };
    getTimeFrames: (driverId: number, orderDate: Date) => void;
    timeFrameList: ITimeFrame[];
    isPending: boolean;
}

const ExpandedRowComponent: FunctionComponent<ExpandedRowProps> = (props) => {
    const [selectedTimeFrame, setSelectedTimeFrame] = useState<ITimeFrame>({});
    const [selectedStoreName, setSelectedStoreName] = useState('');
    const [editTimeFrameSwitch, setEditTimeFrameSwitch] = useState(true);

    useEffect(() => {
        props.getTimeFrames(props.data.driverId, new Date(props.data.orderDate));
    }, []);

    const editTimeFrame = (timeFrame: ITimeFrame) => {
        setSelectedTimeFrame(timeFrame);
        setEditTimeFrameSwitch(false);
    };
    const removeTimeFrame = (orderId: number) => {
        setTimeout(() => {
            axios.delete(`${BASE_API_URL}timeFrames/${orderId}`, { withCredentials: true })
                .then((response) => {
                    props.getTimeFrames(props.data.driverId, new Date(props.data.orderDate));
                })
                .catch((err) => {
                    console.log(err);
                });
        }, 400);
    };
    const rankFormatterEdit = (_: any, data: any, index: any) => {
        return (
            <div style={{ textAlign: 'center', cursor: 'pointer', lineHeight: 'normal', }}
                onClick={() => {
                    editTimeFrame(data);
                    setSelectedStoreName(data.Store.storeName);
                }} >
                <Pencil style={{ fontSize: 20, color: 'white' }} />
            </div>
        );
    };
    const rankFormatterRemove = (_: any, data: any, index: any) => {
        return (
            <div style={{ textAlign: 'center', cursor: 'pointer', lineHeight: 'normal', }} onClick={() => removeTimeFrame(data.orderId)} >
                <Trash style={{ fontSize: 20, color: 'white' }} />
            </div>
        );
    };
    const columns = [
        {
            id: 1,
            dataField: "Store.storeName",
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

    return (
        <div key='expandedRow' className='expandedTimeFrameRow'>
            {props.isPending ?
                <div className='spinnerDiv' style={{ verticalAlign: 'middle' }} >
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
                    {editTimeFrameSwitch ?
                        <div>
                            <br /><br />
                            <BootstrapTable
                                keyField="timeFrames"
                                bootstrap4
                                data={props.timeFrameList}
                                columns={columns}
                                rowStyle={{ fontWeight: 300 }}
                                classes="table table-dark  table-hover table-striped"
                                pagination={paginationFactory({ sizePerPage: 5 })}
                            />
                        </div>
                        :
                        <div>
                            <EditTimeFrameModal
                                selectedTimeFrame={selectedTimeFrame}
                                getTimeFrames={props.getTimeFrames}
                                selectedStoreString={selectedStoreName}
                                onClose={async () => {
                                    setEditTimeFrameSwitch(true);
                                }}
                            />
                        </div>
                    }
                </div>
            }
        </div>
    );
};

export const ExpandedRow = withRouter(ExpandedRowComponent);

