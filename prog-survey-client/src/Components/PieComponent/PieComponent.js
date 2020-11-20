import React from 'react';
import './style.css';
import { Pie } from 'react-chartjs-2';


function PieComponent(props) {
    return (
        <>
           <div className="pie-chart-container">
                <h3 style={{textAlign:'center',fontWeight:'bolder'}}> This is the pie component!</h3>
                <Pie
                    data={props.barData}
                    options={props.options}
                />
           </div>
        </>
    )
}

export default PieComponent;