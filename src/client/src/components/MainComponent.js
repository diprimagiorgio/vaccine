
import { HeaderBar } from './components/Navbar';
import { LastUpdate } from './components/LastUpdate';
import { TotalDoses } from './components/TotalDoses';
import { Component } from 'react';
import {getTotalDoses, getTotalOrders} from './dbquery';



class Main extends Component {
  constructor(props){
    super(props);
    this.state = {
      totalDoses : getTotalDoses(),
      totalOders : getTotalOrders()
    };
  }

  // const gettotalOrders = () => {
  //   Axios.get("http://localhost:3001/employees").then((response) => {
  //     setEmployeeList(response.data);
  //   });
  // };
  

  render(){
    return (
      <div className="App">
        <HeaderBar  />
        <LastUpdate />
        <TotalDoses totalOders={this.state.totalOders} TotalDoses={this.state.totalDoses} />
      </div>
    );
  }
}

export default App;
