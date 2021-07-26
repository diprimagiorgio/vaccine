
import { HeaderBar } from './components/Navbar';
import { LastUpdate } from './components/LastUpdate';
import { TotalDoses } from './components/TotalDoses';
import { BarCharProducer } from './components/BarCharProducer'
import { Expired } from './components/Expired'
import { Available } from './components/Available'

import './App.css';
import { Component } from 'react';



class App extends Component {
  
  render(){
    return (
      <div className="App">
        < HeaderBar />
        {/* < LastUpdate /> */}
        < TotalDoses />
        < BarCharProducer />
        < Expired />
        < Available />
      </div>
    );
  }
}

export default App;
