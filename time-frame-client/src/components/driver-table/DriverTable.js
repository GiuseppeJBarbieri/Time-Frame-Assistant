import BootstrapTable from 'react-bootstrap-table-next';
import ExpandedRow from './ExpandedRow';
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css"
import './driverTable.css'

export const productsGenerator = quantity => {
    const items = [];
    for (let i = 0; i < quantity; i++) {
        items.push({ id: i, name: `Town name ${i}`, price: 2100 + i });
    }
    return items;
};
// this is just a temp list to show correct data in that first table
const drivers = [
    {
        id: 1,
        firstName: 'Giuseppe',
        lastName: 'Barbieri'
    },
    {
        id: 2,
        firstName: 'Paul',
        lastName: 'Barbieri'
    },
    {
        id: 3,
        firstName: 'Darren',
        lastName: 'Lawrence'
    },
    {
        id: 4,
        firstName: 'Spike',
        lastName: 'Jones'
    },
    {
        id: 5,
        firstName: 'Greyson',
        lastName: 'MrBaby'
    }
];

const columns = [
    {
        dataField: "id",
        text: "Driver ID",
        sort: true
    },
    {
        dataField: "firstName",
        text: "First Name",
        sort: true
    },
    {
        dataField: "lastName",
        text: "Last Name"
    }
];

const DriverTable = () => {

    return (
        <div>
            <BootstrapTable
                bootstrap4
                keyField="id"
                data={drivers}
                columns={columns}
                classes="table table-dark table-condensed table-hover table-striped"
                expandRow={{
                    renderer: row => (
                        <ExpandedRow />
                    )
                }}

            />
        </div>
    )
}

export default DriverTable
