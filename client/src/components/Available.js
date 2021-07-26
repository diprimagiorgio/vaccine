import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
import { Container, Col, Row } from "react-bootstrap";
import React, { Component } from 'react';
import expired from '../stock.png'
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import Axios from "axios";
import {baseUrl} from '../shared/baseUrl';
import draw from './helperBarCharExpired'
import moment from 'moment';
//TODO fix problem with 0 
// leave the calendar alwas open
export class Available extends Component{
    constructor(props){
        super(props);
        this.state = {
            dosesAvailable : 0,
            doses10Days : 0,
            initialValue : "04/13/2021 12:00 AM"
        };
        this.handleDate = this.handleDate.bind(this);
    }
    componentDidMount(){
        let date = moment(this.state.initialValue).utc().format();
        draw("dose/expired10dayssplitted?date="+date);
        this.getAvailable(date);
        this.getExpired10days(date);
    }
    getAvailable(date){
        Axios.get(baseUrl + "dose/available?date="+date)
        .then((response) => {
          this.setState({dosesAvailable : response.data.result})
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getExpired10days(date){
        Axios.get(baseUrl + "dose/expired10days?date="+date)
        .then((response) => {
          this.setState({doses10Days : response.data.result})
        })
        .catch((err) => {
          console.log(err);
        });
    }
    handleDate(input_date){
        let date = input_date.utc().format();

        // remove the svg printed before
        var elem = document.getElementById("expiredChar");
        elem.removeChild(elem.childNodes[0]);
        
        draw("dose/expired10dayssplitted?date="+date);
        this.getAvailable(date);
        this.getExpired10days(date);
    };
  
    render(){
        return(
               <Container className='pb-5 mb-5'>
                <Row className="p-5 bg-light mt-5">
                    <h3 className='text-centre'>
                        Vaccine available 
                    </h3>
                </Row>
                <Row className='mt-5'>
                    <Col className="col-3">
                            <img src={expired} alt="expired" class="pl-2 pr-5" width="95" height="95"/>
                        <Row className="mt-3" >
                        Select a day and check how many vaccines are left to use and how many vaccines are going to expire in the next 10 days?
                        </Row>
                        <Row className="justify-content-center mt-3">
                            <Datetime initialValue={this.state.initialValue} onChange={this.handleDate} />
                            {/* <Button className='col-2'variant="secondary" onClick={this.check()}>Check</Button> */}
                        </Row>
                    </Col>
                    <Col className="col-5 mr-5 d-flex flex-column">
                        <h6 >How many doses are going to expired in the next 10 days </h6>
                        <div id="expiredChar"></div>
                    </Col>
                    <Col className='d-flex align-items-center flex-wrap"'>
                        <div class="d-flex flex-column">
                            <div class="p-2">Vaccines are left to use: {this.state.dosesAvailable}</div>
                            <div class="p-2">Vaccines are going to expire in the next 10 days:{this.state.doses10Days}</div>
                        </div>
                    </Col>
                </Row>
                <Row className='mt-5'>
                   
                </Row>

            </Container>
        );
    }
};