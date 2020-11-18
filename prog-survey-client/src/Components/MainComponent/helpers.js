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

// export the functions
export  {
    validateIfVoted,
    listUserAsVoted
}