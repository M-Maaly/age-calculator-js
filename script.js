const inputsElement = document.querySelectorAll('.card__input');
const submitButton = document.querySelector(".card__button");

const validateDay = (day) => {
    if (day && day > 0 && day <= 31) {
        return true
    }
}
const validateMonth = (month) => {
    if (month && month > 0 && month <= 12) {
        return true
    }
}
const validateYear = (year) => {
    const currentYear = new Date().getFullYear()
    if (year && year > 0 && year <= currentYear) {
        return true
    }
}

const isDataValid = (dayElement, monthElement, yearElement) => {
    let isValid = [false, false, false]

    if (!validateDay(dayElement.value)) {
        dayElement.classList.add('card__input--error')
    } else {
        dayElement.classList.remove('card__input--error')
        isValid[0] = true;
    }

    if (!validateMonth(monthElement.value)) {
        monthElement.classList.add('card__input--error')
    } else {
        monthElement.classList.remove('card__input--error')
        isValid[1] = true;
    }

    if (!validateYear(yearElement.value)) {
        yearElement.classList.add('card__input--error')
    } else {
        yearElement.classList.remove('card__input--error')
        isValid[2] = true;
    }

    return isValid.every((item) => item === true)
}
const calculateAge = (year, month, day) => {
    const toDay = new Date()
    const birthDay = new Date(year, month-1, day)
    let age = toDay.getFullYear() - birthDay.getFullYear()
    const monthDiff = toDay.getMonth() - birthDay.getMonth()

    if (monthDiff < 0 || (monthDiff === 0 && toDay.getDate() < birthDay.getDate())) {
        age--;
    } 

    return age
}
console.log(calculateAge(2003,5,5));

const onClickHandler = () => {
    const dayElement = document.querySelector(".card__input[name='day']")
    const monthElement = document.querySelector('.card__input[name="month"]')
    const yearElement = document.querySelector('.card__input[name="year"]')
    const resultElement = document.querySelector('.card__resultValue')
    
    if (!isDataValid(dayElement, monthElement, yearElement)) {
        resultElement.textContent = "--"
        return;
    }

    resultElement.textContent = calculateAge(yearElement.value, monthElement.value, dayElement.value).toString()
}

inputsElement.forEach(item => {
    item.addEventListener('keydown', (event)=>{
        event.key === 'Enter' && onClickHandler()
    })
})

submitButton.addEventListener('click', onClickHandler)