let main = document.querySelector("main")
let nameInput = document.querySelector("#name")
let submitButton = document.querySelector("#submit")
let nameTestedList = []


//function to create a new div
const createNewDiv = (array) => {
    let newDiv = document.createElement("div")
    let newPara = document.createElement("p")
    let newNameText = document.createTextNode("The name ")
    let newNameValue = document.createElement("span")
    newNameValue.classList.add("newNameValue")
    newNameValue.innerText = array[array.length-1].name

    //let newPara2 = document.createElement("p")
    let newNameText2 = document.createTextNode(" is associated with an age of ")
    let newNameAge = document.createElement("span")
    newNameAge.classList.add("newNameAge")
    newNameAge.innerText = array[array.length-1].age

    newPara.appendChild(newNameText)
    newPara.appendChild(newNameValue)
    newPara.appendChild(newNameText2)
    newPara.appendChild(newNameAge)

    newDiv.appendChild(newPara)
    main.appendChild(newDiv)
}

const getAge = (name) => {
    currentName = {}
    currentName.name = name
    fetch ('https://api.agify.io/?name='+name)
    .then(response => response.json())
    .then(json => {
        currentName.age = json.age
        currentName.count = json.count
        createNewDiv(nameTestedList)
    })
    .catch(error => {
    console.log('There was an error!', error)
    })
    nameTestedList.push(currentName)
    return nameTestedList
}


//addeventlistener on submit button
submitButton.addEventListener("click", (event) => {
    event.preventDefault()
    let nameInputValue = nameInput.value
    getAge(nameInputValue)
    nameInput.value = ""
})



