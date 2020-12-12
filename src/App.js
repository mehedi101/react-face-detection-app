
import React, { Component, Fragment } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Navigation from './components/navigation/Navigation';
import Rank from './components/rank/Rank';

import Particles from 'react-particles-js';
import { particleOpt } from './ParticleOpt';
import Logo from './components/logo/logo';
import Clarifai from 'clarifai';
import './App.css';
import { Signin } from './components/signin/signin';
import { Register } from './components/register/Register';


const app = new Clarifai.App({

  apiKey: ''
 });



class App extends Component {

  constructor() {
    super();
    this.state = { 
      input:'',
      imgUrl:'',
      box: {},
      route: 'signin',
      isLoggedIn: false 
    }
  }


  onInputChange = (event) =>{

    this.setState({input: event.target.value})
    
  }

  onBtnSubmit= (e) =>{
    e.preventDefault();

    this.setState({
      imgUrl: this.state.input
    })
   
    app.models.predict(
  { id: 'd02b4508df58432fbb84e800597b8959'}, this.state.imgUrl
    )
    .then(response =>  this.displayFaceBox( this.calculateBoxArea(response) ) )
    .catch(err => console.log(err));

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


    this.setState({box}) ;
  }


  onRouteChanged = (route) => {

    if(route === 'signin' || route === 'register') { 
      this.setState({ isLoggedIn: false }) ;

    }else if(route === 'home') {
      this.setState({ isLoggedIn: true}) ;
    }
    this.setState({route});

  }

  render() { 
     
   const {isLoggedIn, imgUrl, box, route} = this.state;
  
    return ( 
      <Fragment>
      <div className="App">

        <Particles className="particles" id="tsparticles" params={particleOpt} />
         <Navigation isLoggedIn={isLoggedIn} onRouteChanged={this.onRouteChanged} />
        { this.state.route === 'home' ?

        <main>
       
        <Logo/>
        <Rank/>
        <ImageLinkForm 
        inputChange={this.onInputChange} 
        btnSubmit={this.onBtnSubmit} 
        />

        <FaceRecognition box={box} imageUrl= {imgUrl}/>
        </main>
        : 
        ( route === 'signin' ?  
        <Signin onRouteChanged={this.onRouteChanged} /> : 
        <Register onRouteChanged={this.onRouteChanged} />
        )

        }
      </div>
      </Fragment>
      
     );
  }
}
 
export default App;
