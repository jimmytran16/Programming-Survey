import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './style.css'
import BarComponent from '../BarComponent/BarComponent';
import { validateIfVoted,listUserAsVoted } from './helpers';

export default function Main() {
    // states
    const [barData, setBarData] = useState({});
    const [option, setOption] = useState("");
    const [message, setMessage] = useState("");

    // graph configurations
    const barOptions = {
        options: {
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            },
            title: {
                display: true,
                text: 'Vote Results',
                fontSize: 25
            },
            legend: {
                display: true,
                position: 'top'
            }
        }
    }
    // useEffect to execute everytime there is a change in the message state -- when user submits their first vote
    useEffect(() => {
        // call the API endpoint to get the Vote result data to display on the graph
        axios.get('http://localhost:3001/')
            .then(response => {
                let langD = []
                let langL = []
                response.data.data.map(lang => {
                    langD.push(lang.count)
                    langL.push(lang.name)
                })
                console.log(langD, langL);
                // set the Bar Data
                setBarData(
                    {
                        labels: langL,
                        datasets: [
                            {
                                label: 'votes',
                                data: langD,
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.6)',
                                    'rgba(54, 162, 235, 0.6)',
                                    'rgba(255, 206, 86, 0.6)',
                                    'rgba(75, 192, 192, 0.6)'
                                ],
                                borderWidth: 3
                            }
                        ]
                    }
                )
            })
            .catch(error => console.log(error))

    }, [message])



    // function to handle the vote submission
    function handleSubmission(e) {
        // check if the user already voted
        if (!(validateIfVoted())) {
            axios.post('http://localhost:3001/submitVote', {
                option: option
            })
                .then(response => {
                    console.log(response)
                    setMessage('Thanks for voting!')
                    listUserAsVoted();
                })
                .catch(err => console.log(err))
        // if they have voted
        }else {
            setMessage('You already voted!');
        }
    }


    return (
        <>
            <div className="main-container">
                <div className="form-container">
                    <h2>What is your most preferred Programming Language?</h2>
                    <div className="form">
                        <select onChange={(e) => {
                            console.log(e.target.value);
                            setOption(e.target.value);
                        }}>
                            <option>Select a Language</option>
                            <option>Java</option>
                            <option>Python</option>
                            <option>Javascript</option>
                            <option>C++</option>
                        </select>
                        <button onClick={handleSubmission}>Vote!</button>
                        <span>{message}</span>
                    </div>
                </div>
                <BarComponent barData={barData} options={barOptions.options} />
            </div>
        </>

    )
}