import BootstrapTable from 'react-bootstrap-table-next';
import NestedNavBar from './NestedNavBar';

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
        id: 1,
        storeName: 'KandP',
        customerName: 'Barbieri',
        town: 'Town',
        orderNumber: 'Order Number 2',
        timeFrame: '8 - 2'
    },
    {
        id: 1,
        storeName: 'Elantech',
        customerName: 'Hajee',
        town: 'Town',
        orderNumber: 'Order Number 3',
        timeFrame: '9 - 1'
    },
    {
        id: 1,
        storeName: 'Mr. Jays',
        customerName: 'Bloomfield',
        town: 'Town',
        orderNumber: 'Order Number 4',
        timeFrame: '10 - 12'
    },
    {
        id: 1,
        storeName: 'Giuseppe',
        customerName: 'Lawrence',
        town: 'Town',
        orderNumber: 'Order Number 5',
        timeFrame: '11 - 5'
    }
];

const columns = [
    {
        dataField: "storeName",
        text: "Store Name",
        sort: true
    },
    {
        dataField: "customerName",
        text: "Customer Name",
        sort: true
    },
    {
        dataField: "town",
        text: "Town"
    },
    {
        dataField: "orderNumber",
        text: "Order Number"
    },
    {
        dataField: "timeFrame",
        text: "Time Frame"
    }
];

const ExpandedRow = () => {
    return (
        <div>
            <div>
                <NestedNavBar />
            </div>
            <div style={{ paddingLeft: '15px', paddingRight: '15px', paddingBottom: '15px' }}>
                <h2>Time Frames</h2>
                <BootstrapTable
                    bootstrap4
                    keyField="nestedTable"
                    data={timeFrames}
                    columns={columns}
                    classes="table table-dark table-condensed table-hover table-striped"
                />
            </div>
        </div>
    )
}

export default ExpandedRow
