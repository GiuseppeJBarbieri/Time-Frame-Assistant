import axios from "axios";
import React, { HTMLAttributes, FunctionComponent, useEffect, useState } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { BASE_API_URL } from "../../constants/API";

import IStore from '../../types/IStore';
import ITimeFrame from "../../types/ITimeFrame";

interface EditTimeFrameModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    getTimeFrames: (driverId: number, orderDate: Date) => void;
    selectedStoreString: string;
    selectedTimeFrame: ITimeFrame;
}

const EditTimeFrameModalComponent: FunctionComponent<EditTimeFrameModalProps> = (props) => {
    const [storeList, setStoreList] = useState<IStore[]>([]);
    const [selectedStore, setSelectedStore] = useState<number>();
    const [isSaving, setIsSaving] = useState(false);

    const [editedTimeFrame, setEditedTimeFrame] =
        useState<ITimeFrame>({
            orderId: props.selectedTimeFrame.orderId,
            storeId: selectedStore,
            driverId: props.selectedTimeFrame.driverId,
            customerName: props.selectedTimeFrame.customerName,
            town: props.selectedTimeFrame.town,
            orderNumber: props.selectedTimeFrame.orderNumber,
            timeFrame: props.selectedTimeFrame.timeFrame,
            orderDate: props.selectedTimeFrame.orderDate
        });

    useEffect(() => {
        axios.get(`${BASE_API_URL}stores`, { withCredentials: true })
            .then((response) => {
                const _storeList = response?.data?.payload;
                setStoreList(_storeList);
                for (var i = 0; i < _storeList.length; i++) {
                    if (_storeList[i].storeName?.toLocaleLowerCase === props.selectedStoreString.toLocaleLowerCase) {
                        setSelectedStore(i+1);
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }, []);

    const editTimeFrame = async () => {

    };
    return (
        <Modal backdrop="static" show={true} onHide={props.onClose} className='bg-dark'>
            <Modal.Header closeButton>
                <Modal.Title style={{ display: '' }}>
                    <h4 style={{ verticalAlign: '' }} >Editing Time Frame for </h4>
                    <h4 style={{ fontWeight: 500, marginLeft: 5 }}></h4>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ color: 'red', fontSize: 18, fontWeight: 400 }}>
                Please enter time frame information.
            </Modal.Body>
            <div className='container d-grid gap-2' style={{ marginBottom: 15 }}>
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
                    <Form className="container d-grid">
                        <div className="form-group mb-3">
                            <Form.Label>Store</Form.Label>
                            <select id="inputState"
                                onChange={(e) => {
                                    setEditedTimeFrame({ ...editedTimeFrame, storeId: Number(e.target.value) })
                                }}
                                className="form-control"
                                value={selectedStore}
                            >
                                {storeList.map((store, i) => {
                                    return <option value={i+1}>{store.storeName}</option>
                                }
                                )}
                            </select>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control
                                value={editedTimeFrame.customerName} onChange={(e) => setEditedTimeFrame({ ...editedTimeFrame, customerName: (e.target.value) })} type="text" placeholder="Customer Name"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Town</Form.Label>
                            <Form.Control
                                value={editedTimeFrame.town} onChange={(e) => setEditedTimeFrame({ ...editedTimeFrame, town: (e.target.value) })} id="town" type="text" placeholder="Town"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Order Number</Form.Label>
                            <Form.Control
                                value={editedTimeFrame.orderNumber} onChange={(e) => setEditedTimeFrame({ ...editedTimeFrame, orderNumber: (e.target.value) })} id="orderNumber" type="text" placeholder="Order Number"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Time Frame</Form.Label>
                            <Form.Control
                                value={editedTimeFrame.timeFrame} onChange={(e) => setEditedTimeFrame({ ...editedTimeFrame, timeFrame: (e.target.value) })} id="timeFrame" type="text" placeholder="Time Frame"
                            />
                        </Form.Group>
                        <hr />
                        <Button variant="primary" onClick={async () => {
                            editTimeFrame();
                            isSaving &&
                            setEditedTimeFrame({ storeId: 0, customerName: '', town: '', orderNumber: '', timeFrame: '' });
                        }}>
                            Edit Time Frame
                        </Button>
                    </Form>
                }
            </div>
        </Modal>
    );
};

export const EditTimeFrameModal = withRouter(EditTimeFrameModalComponent);