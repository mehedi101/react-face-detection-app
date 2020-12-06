import React from 'react';
const ImageLinkForm = ( { inputChange, btnSubmit } ) => {
    return ( 
        <div className="tc">
            <p className='f3'>
                {'This Magic Brain will detect face in an image. Give a try'}
            </p>
            <form className="pa2 flex justify-center" >  
                <div className="pa4 honeyCombPattern shadow-4">
                    
                  <input  onChange= { inputChange }
                  type="url" 
                  name="imgUrl" 
                  className="pa3"
                 required

                /> 

                  <button type="submit"  className="pa3 bg-purple white grow dib " onClick={ btnSubmit } >Detect</button>
                </div>
               
            </form>
        </div>
     );
}
 
export default ImageLinkForm;