import React from 'react';
const ImageLinkForm = () => {
    return ( 
        <div className="tc">
            <p className='f3'>
                {'This Magic Brain will detect face in an image. Give a try'}
            </p>
            <form className="pa2 flex justify-center"> 
                <div className="pa4 honeyCombPattern shadow-4">
                  <input type="url" name="imgUrl" className="pa3"/> <button type="button" className="pa3 bg-purple white grow dib ">Detect</button>
                </div>
               
            </form>
        </div>
     );
}
 
export default ImageLinkForm;