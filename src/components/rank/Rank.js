import React from 'react';

const Rank = ({name, rank}) => {
    return ( 
        <div className="rank tc">
            <div className="white f3">
                {`Hello! ${name}, your rank is...`}
            </div>
            <div className="white f1">
                {`#${rank}`}
            </div>
        </div>
     );
}
 
export default Rank;