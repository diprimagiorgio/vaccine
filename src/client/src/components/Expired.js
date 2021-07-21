import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
import { Container, Col, Button, Row } from "react-bootstrap";
import React, { Component } from 'react';
import expired from '../expired.svg'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import Axios from "axios";
import {baseUrl} from '../shared/baseUrl';


export class Expired extends Component{
    constructor(props){
        super(props);
        this.state = {
            dosesExpired : 0,
            bottlesExpired : 0
        };
        this.handleDate = this.handleDate.bind(this);
    }
    // Should I use a button ??
    
  
    handleDate(input_date){
        let date = input_date.utc().format();
        Axios.get(baseUrl + "order/expired?date="+date)
        .then((response) => {
          this.setState({bottlesExpired : response.data.result})
        })
        .catch((err) => {
          console.log(err);
        });
        Axios.get(baseUrl + "dose/expired?date="+date)
        .then((response) => {
          this.setState({dosesExpired : response.data.result})
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    render(){
        return(
               <Container className='pb-5 mb-5'>
                <Row className="p-5 bg-light mt-5">
                    <h3 className='text-centre'>
                        Vaccine expired 
                    </h3>
                </Row>
                <Row className='mt-5'>
                    <Col className="col-3">
                        <img src={expired} alt="expired" class="pl-2 pr-5" width="74" height="98"/>
                    </Col>
                    <Col className="col-5 mr-5 d-flex flex-column">
                        <Row >
                        Select a day and check how many vaccine and orders has expired in the given day?
                        </Row>
                        <Row className="justify-content-center mt-3">
                            <Datetime className = 'col-6' onChange={this.handleDate} />
                            {/* <Button className='col-2'variant="secondary" onClick={this.check()}>Check</Button> */}
                        </Row>
                    </Col>
                    <Col className='d-flex flex-column'>
                        <Row className='justify-content-center'>Doses expired: {this.state.dosesExpired}</Row>
                        <Row className='justify-content-center'>Bottles expired:{this.state.bottlesExpired}</Row>
                    </Col>
                </Row>
            </Container>
        );
    }
};