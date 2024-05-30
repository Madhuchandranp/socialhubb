import "../pages/Home.css"; // Import your CSS file for styling
import { Link } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Adminnavbar from "./Adminnavbar";

export default function Adminpage() {
  
    
      return (
        <div>
            <Adminnavbar/>
<Container>

<Row>
 
 <Col xs={6} md={4}  style={{border:"1px solid", width:"4cm",height:"2cm",}}>
    <Link to="/Users">Users</Link>
  </Col>
</Row>
</Container>
        </div>
        
      );
    }
    
