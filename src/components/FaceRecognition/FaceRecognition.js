import React from 'react';
import "./FaceRecognition.css";
const FaceRecognition = ({ imageUrl, box }) => {
      //  let img= 'https://www.gap.com/Asset_Archive/GPWeb/content/0019/560/580/assets/vdn/G31726_AllDiv_VDNRefresh_bb.jpg';
      //  const insect= { top: "14.2448%", right: "29.35%", bottom: "59.45%", left: "41.23%" };
      const insect= {top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol};
    return (
        <div className="flex items-center justify-center ">
         
                <div className="imgArea relative">
                    <img id="faceImg" src={imageUrl} alt="face"  width="380px" height="auto"/>
                        <div className="bounding-box-container absolute z-999 absolute--fill">
                               <div className="bounding-box" style={insect}  ></div>
                        </div>
                </div>
           
        </div>
    )
}

export default FaceRecognition;
