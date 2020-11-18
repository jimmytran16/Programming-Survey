import React from 'react'
import './style.css'
import { Bar } from 'react-chartjs-2'

function BarComponent(props) {
    return (
        <div className="bar-container">
            <Bar
                data={props.barData}
                options={props.options} />
        </div>
    )
}

export default BarComponent