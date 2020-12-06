import React from 'react';
import "./FaceRecognition.css";
const FaceRecognition = ({ imageUrl, box }) => {
        let img= 'https://www.gap.com/Asset_Archive/GPWeb/content/0019/560/580/assets/vdn/G31726_AllDiv_VDNRefresh_bb.jpg';
        let insect = {inset: '14.602% 34.1265% 71.5308% 59.331%'};
    return (
        <div className="flex items-center justify-center relative">
         
                <img id="faceImg" src={imageUrl} alt="face"  width="380px" height="auto"/>
                <div className="bounding-box-container">
                    <div className="bounding-boxes">
                        <div className="bobounding-box-set">
                            <div className="bounding-box" style={insect}  ></div>
                        </div>
                    </div>
                </div>
           
        </div>
    )
}

export default FaceRecognition;
