import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './style.css'
import BarComponent from '../BarComponent/BarComponent';
import PieComponent from '../PieComponent/PieComponent';
import LinkComponent from '../LinkComponent/LinkComponent';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { validateIfVoted, listUserAsVoted, LanguageColorMatch, backgroundColors, barChartOptions, getPercentageOfData } from '../../helpers/main/helpers';

export default function Main() {

    // states
    const [barData, setBarData] = useState({});
    const [pieData, setPieData] = useState({});
    const [option, setOption] = useState("None");
    const [message, setMessage] = useState("");
    const [programmingList, setProgrammingList] = useState([]);
    const [selectionPreviewStyle, setSelectionPreviewStyle] = useState({
        color: 'red'
    })

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
                fontSize: 25,
                fontFamily: 'Xanh Mono, monospace',
                fontColor: '#212529'
            },
            legend: {
                display: false,
                position: 'top'
            }
        }
    }


    // useEffect to execute everytime there is a change in the message state -- when user submits their first vote
    useEffect(() => {
        // call the API endpoint to get the Vote result data to display on the graph
        axios.get('https://programmingsurveyserver.herokuapp.com/')
            // axios.get('http://localhost:3001/')
            .then(response => {
                let langD = []
                let langL = []
                // loop through the data and store the count and programming language to the arrays
                response.data.data.map(lang => {
                    langD.push(lang.count)
                    langL.push(lang.name)
                })
                console.log(langD, langL);
                setProgrammingList(langL);
                // set the Bar Data
                setBarData(
                    {
                        labels: langL,
                        datasets: [
                            {
                                label: 'Vote Count',
                                data: langD,
                                backgroundColor: backgroundColors,
                                borderWidth: 3
                            }
                        ]
                    }
                )

                setPieData({
                    labels: langL,
                    datasets: [
                        {
                            label: 'Vote Count',
                            data: getPercentageOfData(langD),
                            backgroundColor: backgroundColors,
                            borderWidth: 3
                        }
                    ]
                })

            })
            .catch(error => console.log(error))

    }, [message])



    // function to handle the vote submission
    function handleSubmission(e) {

        // validate if they have selected a language -- if not prompt them to do so
        if (!(programmingList.includes(option))) { setMessage('Please select an option!'); return; }

        // check if the user already voted
        if (!(validateIfVoted())) {
            axios.post('https://programmingsurveyserver.herokuapp.com/submitVote', {
                // axios.post('http://localhost:3001/submitVote', {
                option: option
            })
                .then(response => {
                    console.log(response)
                    setMessage('Thanks for voting!')
                    listUserAsVoted();
                })
                .catch(err => console.log(err))
        } else {
            setMessage('You already voted!');
        }
    }

    // function to handle the option selection
    function handOptionSelection(lang) {
        setOption(lang);
        setSelectionPreviewStyle({
            color: 'green'
        })
    }

    return (
        <>
            <Router>
                <div className="main-container">
                    <div className="form-container">
                        <strong><h2>What is your most preferred Programming Language?</h2></strong>
                        <hr />
                        <div className="form">
                            <div>
                                {
                                    // renders the buttons with its corresponding labeled Prog Langs
                                    programmingList.map((lang, index) => {
                                        return (
                                            <Button key={index} onClick={(e) => handOptionSelection(lang)} className="prog-lang-btn" variant={LanguageColorMatch[lang]}>{lang}</Button>
                                        )
                                    })
                                }
                            </div>
                            <div className="selected-option-preview-container">
                                <p>You selected:</p> <p style={selectionPreviewStyle} className="selected-option"> <strong>{option}</strong> </p>
                            </div>
                            <button className="vote-btn" onClick={handleSubmission}>VOTE</button>
                            <span>{message}</span>
                        </div>
                    </div>
                    <hr />
                    {/* ROUTERS for choosing pie or bar chart */}
                    {/* Renders the bar componenet and passing in data props */}
                    <LinkComponent />
                    <Switch>
                        <Route path="/pie">
                            <PieComponent barData={pieData} />
                        </Route>
                        <Route path="/">
                            <BarComponent barData={barData} options={barOptions.options} />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </>
    )
}