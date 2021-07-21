import { Component } from 'react';
import meds from '../meds.png'
import "../App.css";
import Axios from "axios";
import {baseUrl} from '../shared/baseUrl';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Col, Container, Row } from 'react-bootstrap';




export class TotalDoses extends Component{
    constructor(props){
        super(props);
        this.state = {
            totalVaccines: 0
        };
    }
    componentDidMount(){
        this.getTotalVaccines();
    }
    getTotalVaccines(){
        Axios.get(baseUrl + "vaccination/total/")
        .then((response) => {
          this.setState({totalVaccines : response.data.result})
        })
        .catch((err) => {
          console.log(err);
        });
    }
    render(){
        return(
            <Container>
                <Row>
                    <Col>
                        <img src={meds} alt="meds" class="pl-2 pr-5"/>
                    </Col>
                    <Col className="d-flex align-items-center">
                        <h5 className="text-centre">The total of the vaccine done is: {this.state.totalVaccines}</h5>
                    </Col>
                </Row>
            </Container>
        );
    }
};