import Header from "../../Header/header"
import React,{ useEffect, useState} from "react"
import { Col, Container, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom"


interface User {
  _id: string;
  name: string;
  email: string;
}

const DashboardA:React.FC = () =>{

  const token = localStorage.getItem("token");
  const [users, setUsers] = useState<User[]>([]); // ✅ Specify type
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () =>{
      
      try {
        //(fetch)C'est une API JavaScript qui permet d'envoyer des requêtes HTTP (GET, POST, PUT, DELETE, etc.) au backend
        //Par défaut, fetch(url) effectue une requête GET.
        const response = await fetch("http://localhost:5000/api/users",{
          headers: {
            Authorization: `Bearer ${token}` 
          }      
          });
        const result = await response.json();
        setUsers(result);


      } catch (error) {
        console.log("dashboardA",error);
      }
    }
    if(token){
      fetchUsers();
    }
    else {
      navigate("/login1");
    }
  },[token,navigate])

  
  return (
    <div>
      <Header></Header>
      <Container className="mt-5">
        <Row>
          <Col>
           <h1 className="text-center">Dashboard</h1>
           <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>

                </tr>
              ))}
            </tbody>
           </Table>
          </Col>
        </Row>
      </Container>
         </div>
  )
}

export default DashboardA
