import { Navbar, Container, Nav } from 'react-bootstrap';

const NestedNavBar = ( {handleShow} ) => {
    
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Nav className="me-auto">
                        <Nav.Link onClick={handleShow} >Add</Nav.Link>
                        <Nav.Link href="#features">Edit</Nav.Link>
                        <Nav.Link href="#pricing">Remove</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>        
        </div>
    )
}

export default NestedNavBar
