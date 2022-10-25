const form = document.querySelector('.form')
const formInput = document.querySelector('.form__input')
const button = document.querySelector(".form__button")


const buttonClicked = (e) =>{
    e.preventDefault()
    const name = e.target.name.value
    const birthday = e.target.birthday.value
    const color = e.target.color.value
    console.log(name)
    console.log(birthday)
    console.log(color)
}

form.addEventListener('submit', buttonClicked)