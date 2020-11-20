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

// export the functions, and variables
export  {
    validateIfVoted,
    listUserAsVoted,
    LanguageColorMatch,
    backgroundColors
}