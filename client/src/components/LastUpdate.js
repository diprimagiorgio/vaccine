import Alert from 'react-bootstrap/Alert'
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";
import React, { Component } from 'react';




export class LastUpdate extends Component{
    constructor(props){
        super(props);
        this.state = {
            last : "loading ...",

        };
        this.handleDate = this.handleDate.bind(this);
    }
    // componentDidMount(){
    //     let date = moment(this.state.initialValue).utc().format();
    //     this.getOrderExpired(date);
    //     this.getDoseExpired(date);
    // }
    // getOrderExpired(date){
    //     Axios.get(baseUrl + "order/lastDate")
    //     .then((response) => {
    //       this.setState({bottlesExpired : response.data.result})
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // }

    render(){
        return(
            <Alert variant="light">
            
            <p>
                Last order: To insert
            </p>
            <hr />
            
        </Alert>    
        );
    }
};
