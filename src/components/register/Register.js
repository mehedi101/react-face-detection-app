import React, { Component } from 'react';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            name: '',
            email: '',
            password: '',
         }
    }

  onNameChanged = (event) => {
      this.setState({name: event.target.value})
  }

  onEmailChanged = (event) => {
      this.setState({email: event.target.value})
  }

  onPasswordChanged = (event) => {
      this.setState({password: event.target.value})
  }

  onsubmitRegistration = (event) => {
      event.preventDefault();
       
   //   console.log('berore_sumbir', this.state);

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        })
    };

      fetch('http://localhost:3000/register/', requestOptions)
            .then( response => response.json())
            .then(user => {
                console.log(user);
                if(user){
                    this.props.loadUser(user);
                    this.props.onRouteChanged('home');
                }
            }).catch(error => console.log(error));

  }

    render() { 
        return ( 
            <main className="pa4 black-80 br2 ba dark-gray b--black-10 mv6 w-100 w-50-m w-50-l mw6 shadow-4 center">
                    <form className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text" 
                            name="name"  
                            id="name"
                            onChange={this.onNameChanged}
                            />
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address"  
                            id="email-address"
                            onChange={this.onEmailChanged}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password"  
                            id="password"
                            onChange={this.onPasswordChanged}
                            />
                        </div>
                      
                        </fieldset>
    
                        <div className="">
                        <input 
                        onClick={this.onsubmitRegistration}
                        className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                        type="submit" 
                        value="Register"  
                        />
                        
                        </div>
                       
                    </form>
            </main>
         );
    }
}
 
export default Register;