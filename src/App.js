
import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Logo from './components/logo/logo';
import Navigation from './components/navigation/Navigation';
import Rank from './components/rank/Rank';
import { particleOpt } from './ParticleOpt';
import Clarifai from 'clarifai';

const app = new Clarifai.App({

  apiKey: '8c7957e5446740c89b6114f71d5c8c87'
 });



class App extends Component {

  constructor() {
    super();
    this.state = { input:'' }
  }


  onInputChange = (event) =>{

    this.setState({input: event.target.value})
    console.log(event.target.value);
  }

  onBtnSubmit= (e) =>{
    e.preventDefault();

    console.log('clicked');


    app.models.predict(
      'd02b4508df58432fbb84e800597b8959', 'https://opinion.bdnews24.com/wp-content/uploads/2017/07/bangabandhu111-1170x660.jpg'
    )
    .then((response) =>{
        console.log(response);

    }).then((error)=>{
        console.log(error);

    });


  }



  render() { 
    return ( 
      <div className="App">

        <Particles className="particles" id="tsparticles" params={particleOpt} />
        <Navigation/>
        <Logo/>
        <Rank/>
        <ImageLinkForm 
        inputChange={this.onInputChange} 
        btnSubmit={this.onBtnSubmit} 
        />

      </div>
      
     );
  }
}
 
export default App;