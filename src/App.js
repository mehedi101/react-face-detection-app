
import React, { Component, Fragment } from 'react';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/imageLinkForm/ImageLinkForm';
import Navigation from './components/navigation/Navigation';
import  Register from './components/register/Register';
import Signin from './components/signin/signin';
import Rank from './components/rank/Rank';

import Particles from 'react-particles-js';
import { particleOpt } from './ParticleOpt';
import Logo from './components/logo/logo';
import Clarifai from 'clarifai';
import './App.css';



const app = new Clarifai.App({

  apiKey: 'afdd8659f9554cf7a24e1289b2e1532d'
 });



class App extends Component {

  constructor() {
    super();
    this.state = { 
      input:'',
      imgUrl:'',
      box: {},
      route: 'signin',
      isLoggedIn: false,
      user: {
        id:'',
        name: '',
        email: '',
        rank: 0,
        logged_in:''
      }
    }
  }

  loadUser = (data) => {
    this.setState({
      user:{
        id: data.id,
        name: data.name,
        email: data.email,
        rank: data.rank,
        logged_in: data.logged_in
      }
    })
  }

  /* componentDidMount(){

    fetch('http://localhost:3000')
    .then(response => response.json())
    .then(console.log);
  } */


  onInputChange = (event) =>{

    this.setState({
      input: event.target.value,
      imgUrl: event.target.value
    })
    
  }

  onBtnSubmit= (e) =>{
    e.preventDefault();
//https://learn.zoner.com/wp-content/uploads/2015/06/020mm.jpg
 
   console.log('imageUrl', this.state.imgUrl);

    app.models.predict(
  { id: 'd02b4508df58432fbb84e800597b8959'}, this.state.input
    )
    .then(response =>  {

      if(response){
        fetch('http://localhost:3000/image', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body:JSON.stringify({
              id: this.state.user.id
          })
      }).then(response => response.json())
        .then(rank =>{
            console.log('updatedRank', rank);
           this.setState( Object.assign(this.state.user, {rank: rank}));

        })
        .catch(err => console.error(err))

      }

      this.displayFaceBox( this.calculateBoxArea(response) )


    } )
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

    console.log('box_area', box);
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
        <Rank name={this.state.user.name} rank={this.state.user.rank}/>
        <ImageLinkForm 
        inputChange={this.onInputChange} 
        btnSubmit={this.onBtnSubmit} 
        />

        <FaceRecognition box={box} imageUrl= {imgUrl}/>
        </main>
        : 
        ( route === 'signin' ?  
   
        <Signin loadUser={this.loadUser} onRouteChanged={this.onRouteChanged} /> : 
        <Register loadUser={this.loadUser} onRouteChanged={this.onRouteChanged} />
        )

        }
      </div>
      </Fragment>
      
     );
  }
}
 
export default App;
