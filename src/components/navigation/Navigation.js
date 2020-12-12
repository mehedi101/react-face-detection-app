import React from 'react';
const Navigation = ({onRouteChanged, isLoggedIn}) => {
    return ( 
        <nav style={{display:'flex',justifyContent: 'flex-end'}}> 
            {
               isLoggedIn ?   
                <div style={{display:'flex',justifyContent: 'flex-end'}}> 
                   <p onClick={() => onRouteChanged('signin') } className="f3 link dim black underline pa3 pointer">Log out</p>
                </div>

                : 
                <div style={{display:'flex',justifyContent: 'flex-end'}}>
                        <p onClick={() => onRouteChanged('signin') } className="f3 link dim black underline pa3 pointer">Log In</p>
                        <p onClick={() => onRouteChanged('register') } className="f3 link dim black underline pa3 pointer">Register</p>
                </div>


            }

          
          


      </nav> 
     );
}
 
export default Navigation;