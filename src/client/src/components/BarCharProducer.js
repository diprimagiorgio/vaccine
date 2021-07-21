import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
import draw from './helperBarCharProducer'
import { Container, Col, Button, Row } from "react-bootstrap";
import React, { Component } from 'react';
import Axios from "axios";
import {baseUrl} from '../shared/baseUrl';

   

export class BarCharProducer extends Component{
    constructor(props){
        super(props);
        this.state = {
            totalDoses : 0,
            totalOrders : 0,
            doses : true
        };

        this.handleToggleClick = this.handleToggleClick.bind(this);
    }
    componentDidMount(){
        draw("dose/totalPerProducer/");
        this.getTotalDoses();
        this.getTotalOrders();

    }
    getTotalDoses () {
        Axios.get(baseUrl + "dose/total/")
        .then((response) => {
          this.setState({totalDoses : response.data.result})
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getTotalOrders (){
        Axios.get(baseUrl + "order/total")
        .then((response) => {
          this.setState({totalOrders : response.data.result})
        })
        .catch((err) => {
          console.log(err);
        });
    }


    //TODO: I can use the function of d3 to change the data without removing the element from the dom
    handleToggleClick() {
        this.setState(prevState => ({
          doses: !prevState.doses
        }));
        console.log(this.state.doses);
        // remove the svg printed before
        var elem = document.getElementById("totalPerProducer");
        elem.removeChild(elem.childNodes[0]);
        // print the new one
        if(this.state.doses)
            draw("order/totalPerProducer/");
        else
            draw("dose/totalPerProducer/");
    }    

    render(){
        return(
            <Container>
                <Row className="p-5 bg-light mt-5">
                    <h3 className='text-centre'>
                        This is the total of {this.state.doses ? 'doses' : 'orders'} per producer 

                    </h3>
                </Row>
                <Row>
                    <Col className='col-8'>
                        <div id="totalPerProducer"></div>
                    </Col>
                    <Col>
                        <Button className="col-5 mt-5 btn-secondary" type="reset" onClick={this.handleToggleClick}>
                        {this.state.doses ? 'See orders' : 'See doses'}
                        </Button>
                        <h4 className='mt-5 pt-5'>The total of {this.state.doses ? 'doses' : 'orders'} is: {
                            
                            this.state.doses ? this.state.totalDoses : this.state.totalOrders
                        
                        }</h4>
                    </Col>
                </Row>
            </Container>
        );
    }
};
// I'd like to see in the last 12 month how many of each vaccine bar one on top of the other