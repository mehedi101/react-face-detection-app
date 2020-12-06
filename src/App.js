
import React, { Component } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Navigation from './components/navigation/Navigation';
import Rank from './components/rank/Rank';

import Particles from 'react-particles-js';
import { particleOpt } from './ParticleOpt';
import Logo from './components/logo/logo';
import Clarifai from 'clarifai';
import './App.css';


const app = new Clarifai.App({

  apiKey: '8c7957e5446740c89b6114f71d5c8c87'
 });



class App extends Component {

  constructor() {
    super();
    this.state = { 
      input:'',
      imgUrl:'',
      box: {}
    }
  }


  onInputChange = (event) =>{

    this.setState({input: event.target.value})
    console.log(event.target.value);
  }

  onBtnSubmit= (e) =>{
    e.preventDefault();

    this.setState({
      imgUrl: this.state.input
    })
   

  }

  calculateBoxArea(data){
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box; 
    const image = document.getElementById("faceImg");
    const width = Number( image.width ) ;
    const height = Number( image.height );

    return {
          leftCol: clarifaiFace.left_col * width,
          topRow: clarifaiFace.top_row * height,
          rightCol: width - (clarifaiFace.right_col * width),
          bottomRow: height - ( clarifaiFace.bottom_row * height) 

    };
  }

  displayFaceBox = (box) => {
   // console.log(box);

    this.setState({box}) ;
  }

componentDidUpdate(){
app.models.predict(
     Clarifai.FACE_DETECT_MODEL, this.state.imgUrl
    )
    .then(response =>  this.displayFaceBox( this.calculateBoxArea(response) ) )
    .catch(err => console.log(err));

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

        <FaceRecognition box={this.state.box} imageUrl= {this.state.imgUrl}/>

      </div>
      
     );
  }
}
 
export default App;