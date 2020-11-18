
import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Logo from './components/logo/logo';
import Navigation from './components/navigation/Navigation';
import Rank from './components/rank/Rank';
import { particleOpt } from './ParticleOpt';





class App extends Component {

  constructor() {
    super();
    this.state = { input:'' }
  }

  onInputChange = (event) =>{

    this.setState({input: event.target.value})
    console.log(event.target.value);
  }


  render() { 
    return ( 
      <div className="App">

        <Particles className="particles" id="tsparticles" params={particleOpt} />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm inputChange={this.onInputChange} />

      </div>
      
     );
  }
}
 
export default App;