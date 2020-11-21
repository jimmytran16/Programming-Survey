// function to check if user has voted yet or not
const validateIfVoted = () => {
    if(!localStorage.getItem('vote')) {
        return false;
    }
    else {
        return true;
    }
}

// function to keep record that the user has voted
const listUserAsVoted = () => {
    localStorage.setItem('vote','true');
}

 // function to get the percentage of the votes for each lang
const getPercentageOfData = (data) => {
    let newData = []
    var TOTAL_COUNT = data.reduce(function(a, b){
        return a + b;
    }, 0);
    for(var i = 0; i < data.length; i++) {
        newData.push(((data[i]/TOTAL_COUNT) * 100).toFixed(2));
    }
    return newData;
}

// object to match the proglang with the right class name
const LanguageColorMatch = {
    'Java':'secondary',
    'Python':'info',
    'Javascript':'warning',
    'Go':'light',
    'C++':'primary',
    'Ruby':'danger',
    'C#':'success',
    'PHP':'dark'
}

const backgroundColors = [
    'rgba(128, 128, 128, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(228, 87, 47, 0.6)',
    'rgba(47, 228, 47, 0.6)',
    'rgba(255, 255, 255, 0.6)',
    'rgba(0, 0, 0, 0.82)',
]

// bar options configs
const barChartOptions = {
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

// export the functions, and variables
export  {
    validateIfVoted,
    listUserAsVoted,
    getPercentageOfData,
    LanguageColorMatch,
    backgroundColors,
    barChartOptions
}