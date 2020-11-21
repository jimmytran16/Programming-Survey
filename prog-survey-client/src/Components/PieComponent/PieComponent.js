import React, { useEffect } from 'react';
import './style.css';
import { Pie } from 'react-chartjs-2';


function PieComponent(props) {
    function calculatePercentageOfVotes() {
        let data = props.barData;
    }
    useEffect(() => {
        console.log('TEST '+props.barData);
    },[])
    return (
        <>
           <div className="pie-chart-container">
                <h3 style={{textAlign:'center',fontWeight:'bolder'}}> Percentage Breakdown</h3>
                <Pie
                    data={props.barData}
                />
           </div>
        </>
    )
}

export default PieComponent;