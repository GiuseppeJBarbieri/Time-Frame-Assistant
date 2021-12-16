import { Modal, Button } from 'react-bootstrap';
import { useState } from "react";

const TimeFrameModel = () => {
    /**
     * This is the data from the row that you want to edit, its already in parent state so NO CHILD STATE here
     * 
     * {
        storeName: '',
        customerName: '',
        town: '',
        orderNumber: '',
        timeFrame: '',
    }
     *
     * {@param updateData} is use to "save" or update the data by notifying parent of state change
     */
    const { data, updateData } = props;

    const [showAddTimeFrame, setShowAddTimeFrame] = useState(false)

    const handleShow = () => setShowAddTimeFrame(true);

    const handleClose = () => {
        setShowAddTimeFrame(false);
        console.log({ storeName: modalState.storeName, customerName: modalState.customerName, town: modalState.town, orderNumber: modalState.orderNumber, timeFrame: modalState.timeFrame })
    }

    const handleNext = () => {
        console.log({ storeName: modalState.storeName, customerName: modalState.customerName, town: modalState.town, orderNumber: modalState.orderNumber, timeFrame: modalState.timeFrame })
        // Store this info into db
    }

    return (
        <Modal show={showAddTimeFrame} onHide={handleClose} className='bg-dark'>
            <Modal.Header closeButton>
                <Modal.Title>Add Time Frame</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ color: 'red', fontSize: 18, fontWeight: 400 }}>Please enter time frame information.</Modal.Body>
            <div className='container d-grid gap-2' style={{ marginBottom: 15 }}>
                <input
                    id='storeName'
                    type='text'
                    placeholder='Store Name'
                    value={modalState.storeName}
                    onChange={(event) => setModalState({ ...modalState, storeName: event.target.value })}
                    defaultValue={''}
                />
                <input
                    id='customerName'
                    type='text'
                    placeholder='Customer Name'
                    value={modalState.customerName}
                    onChange={(event) => setModalState({ ...modalState, customerName: event.target.value })}
                    defaultValue={''}
                />
                <input
                    id='town'
                    type='text'
                    placeholder='Town'
                    value={modalState.town}
                    onChange={(event) => setModalState({ ...modalState, town: event.target.value })}
                    defaultValue={''}
                />
                <input
                    id='orderNumber'
                    type='text'
                    placeholder='Order Number'
                    value={modalState.orderNumber}
                    onChange={(event) => setModalState({ ...modalState, orderNumber: event.target.value })}
                    defaultValue={''}
                />
                <input
                    id='timeFrame'
                    type='text'
                    placeholder='Time Frame'
                    value={modalState.timeFrame}
                    onChange={(event) => setModalState({ ...modalState, timeFrame: event.target.value })}
                    defaultValue={''}
                />

                <br />
                <Button variant="primary" onClick={() => {
                    // Clear modal state (field values)
                    handleNext();

                    const data = {
                        storeName: '', // TODO: Retrieve store name
                        customerName: '', // TODO: Retrieve customer name
                        town: '', // TODO: Retrieve town
                        orderNumber: '', // TODO: Retrieve order #
                        timeFrame: '',// TODO: Retrieve time fram
                    };

                    /** I think this is corrent - idk what a "time frame" is in this context (also, is this the right place to "finish" editing and save?)
                     * Sending edited data back upstream the DOM to parent (app.js in this case)
                     * to later be send back downstream to this module's sibling. (Table..ExpandedRow)
                     */
                    updateData(data);
                }}>
                    Add Time Frame

                </Button>
                <hr />
                <Button variant="primary" onClick={() => {
                    // Form validation here
                    modalState.storeName && modalState.customerName && modalState.town && modalState.timeFrame && handleClose();
                }}>
                    Finish Time Frames
                </Button>
            </div>
        </Modal>
    )
}

export default TimeFrameModel

