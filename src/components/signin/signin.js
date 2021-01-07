
import React, { Component } from 'react';

class Signin extends Component{


    constructor(props){
        super(props);
        this.state={
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) =>{
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) =>{
        this.setState({signInPassword: event.target.value})
    }

    onSubmitLogin = (event) =>{
        event.preventDefault();
   //     console.log(this.state);
    //   this.props.onRouteChanged('home');


    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body:JSON.stringify({
            email: this.state.signInEmail,
            password: this.state.signInPassword
        })
    };
        fetch('http://localhost:3000/login', requestOptions)
        .then( response => response.json() )
        .then( data => {
            console.log(data);
        })
        
        

    }

       render() {

        return (

            <main className="pa4 black-80 br2 ba dark-gray b--black-10 mv6 w-100 w-50-m w-50-l mw6 shadow-4 center">
                <form className="measure center">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                        <input 
                        onBlur={this.onEmailChange}
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address"  
                        id="email-address"
                        required
                        />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                        <input 
                        onBlur={this.onPasswordChange}
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password"
                        required
                        />
                    </div>
                  
                    </fieldset>

                    <div className="">
                    <input 
                    onClick={ this.onSubmitLogin}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                    type="submit" 
                    value="Sign in"  
                    />
                    
                    </div>
                    <div className="lh-copy mt3">
                    <p onClick={ () => this.props.onRouteChanged('register') } className="f6 link dim black db pointer">Register</p>
                
                    </div>
                </form>
        </main>
        )

       }

}

export default Signin;
