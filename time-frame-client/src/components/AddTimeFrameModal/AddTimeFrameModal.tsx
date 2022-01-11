import axios from "axios";
import moment from "moment";
import React, { HTMLAttributes, FunctionComponent, useEffect, useState } from "react";
import { Modal, Button, Dropdown, Form, Spinner } from "react-bootstrap";
import { ArrowDown } from "react-bootstrap-icons";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { BASE_API_URL } from "../../constants/API";
import IDriver from "../../types/IDriver";
import IStore from '../../types/IStore';
import ITimeFrame from "../../types/ITimeFrame";

interface AddTimeFrameModalProps extends RouteComponentProps, HTMLAttributes<HTMLDivElement> {
    onClose: () => Promise<void>;
    driver?: IDriver;
    selectedDate: string;
}

const AddTimeFrameModalComponent: FunctionComponent<AddTimeFrameModalProps> = ({ history, onClose, driver, selectedDate }) => {
    const [storeList, setStoreList] = useState<IStore[]>([]);
    const [isSaving, setIsSaving] = useState(false);

    //const [storeId, setStoreId] = '';
    const [modalInputs, setModalInputs] =
        useState<{ storeId: number, customerName: string, town: string, orderNumber: string, timeFrame: string }>
            ({ storeId: 0, customerName: '', town: '', orderNumber: '', timeFrame: '' });


    useEffect(() => {
        axios.get(`${BASE_API_URL}stores`, { withCredentials: true })
            .then((response) => {
                setStoreList(response?.data?.payload);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const addTimeFrame = async () => {
        let result = false;
        setIsSaving(true);
        const data:ITimeFrame = {
            storeId: modalInputs.storeId,
            driverId: driver?.driverId,
            customerName: modalInputs.customerName,
            town: modalInputs.town,
            orderNumber: modalInputs.orderNumber,
            timeFrame: modalInputs.timeFrame,
            orderDate: selectedDate
        };
        console.log(data.customerName)
        axios.post(`${BASE_API_URL}timeframes`, data, { withCredentials: true })
            .then((response) => {
                setIsSaving(false);
                result = true;
            })
            .catch((err) => {
                console.log(err);
                setIsSaving(false);
            });
        return result;
    };
    return (
        <Modal backdrop="static" show={true} onHide={onClose} className='bg-dark'>
            <Modal.Header closeButton>
                <Modal.Title style={{ display: 'inline-flex' }}>
                    <h4 style={{ verticalAlign: 'middle' }} >Adding Time Frame for </h4>
                    <h4 style={{ color: '#0d6efd', fontWeight: 500, marginLeft: 5 }}> {driver?.name}</h4>
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
                                    setModalInputs({ ...modalInputs, storeId: Number(e.target.value) })
                                }}
                                className="form-control"
                                style={{ color: 'grey' }}
                            >
                                <option selected>Choose Store... </option><ArrowDown />
                                {storeList.map((store) => <option value={store.storeId}>{store.storeName}</option>)}
                            </select>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Label>Customer Name</Form.Label>
                            <Form.Control onChange={(e) => setModalInputs({ ...modalInputs, customerName: (e.target.value) })} type="text" placeholder="Customer Name" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Town</Form.Label>
                            <Form.Control onChange={(e) => setModalInputs({ ...modalInputs, town: (e.target.value) })} id="town" type="text" placeholder="Town" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Order Number</Form.Label>
                            <Form.Control onChange={(e) => setModalInputs({ ...modalInputs, orderNumber: (e.target.value) })} id="orderNumber" type="text" placeholder="Order Number" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Time Frame</Form.Label>
                            <Form.Control onChange={(e) => setModalInputs({ ...modalInputs, timeFrame: (e.target.value) })} id="timeFrame" type="text" placeholder="Time Frame" />
                        </Form.Group>

                        <br />
                        <Button variant="primary" onClick={async () => {
                            let result = await addTimeFrame();
                            result &&
                                setModalInputs({ storeId: 0, customerName: '', town: '', orderNumber: '', timeFrame: '' });
                        }}>
                            Add Time Frame
                        </Button>
                        <hr />
                        <Button variant="primary" onClick={async () => {
                            const result = await addTimeFrame();
                            result &&
                                onClose();
                        }}>
                            Finish Time Frames
                        </Button>
                    </Form>
                }
            </div>
        </Modal>
    );
};

export const AddTimeFrameModal = withRouter(AddTimeFrameModalComponent);