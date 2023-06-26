let main = document.querySelector("main")
let nameInput = document.querySelector("#name")
let nameInputCountry = document.querySelector("#country")
let submitButton = document.querySelector("#submit")
let nameTestedList = []


//function to create a new div
const createNewDiv = (array) => {
    let newDiv = document.createElement("div")
    let newPara = document.createElement("p")
    let newNameText0 = document.createTextNode("In ")
    let newNameCountry = document.createElement("span")
    newNameCountry.classList.add("newNameCountry")
    newNameCountry.innerText = array[array.length-1].country

    let newNameText = document.createTextNode(", the name ")
    let newNameValue = document.createElement("span")
    newNameValue.classList.add("newNameValue")
    newNameValue.innerText = array[array.length-1].name

    let newNameText2 = document.createTextNode(" is associated with an age of ")
    let newNameAge = document.createElement("span")
    newNameAge.classList.add("newNameAge")
    newNameAge.innerText = array[array.length-1].age

    newPara.appendChild(newNameText0)
    newPara.appendChild(newNameCountry)
    newPara.appendChild(newNameText)
    newPara.appendChild(newNameValue)
    newPara.appendChild(newNameText2)
    newPara.appendChild(newNameAge)

    newDiv.appendChild(newPara)
    main.appendChild(newDiv)
}

const getAge = (name, country) => {
    currentName = {}
    currentName.name = name
    // Use the REST Countries API to get the country name based on the country code
    fetch(`https://restcountries.com/v2/alpha/${country}`)
        .then(response => response.json())
        .then(json => {
            currentName.country = json.name
            // Use the Agify API to get the age
            fetch(`https://api.agify.io/?name=${name}&country_id=${country}`)
                .then(response => response.json())
                .then(json => {
                    currentName.age = json.age
                    currentName.count = json.count
                    console.log(json.country)
                    nameTestedList.push(currentName)
                    createNewDiv(nameTestedList)
                })
                .catch(error => {
                    console.log('There was an error!', error)
                })
        })
        .catch(error => {
            console.log('There was an error!', error)
        })
    
    return nameTestedList
}


//addeventlistener on submit button
submitButton.addEventListener("click", (event) => {
    event.preventDefault()
    let nameInputValue = nameInput.value
    let nameCountry = nameInputCountry.value
    getAge(nameInputValue, nameCountry)
    nameInput.value = ""
})



