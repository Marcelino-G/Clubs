let btnSignUp = document.querySelector("#signUp");
let form = document.querySelector("#form");
let formName = document.querySelector("#name");
let formMovie = document.querySelector("#movie");
let formGrade = document.getElementsByName("grade");
let formClub = document.getElementsByName("club");
let dialog = document.querySelector("dialog");
let dialogContent = document.querySelectorAll(".infoReview li")
let popUpContent = document.querySelectorAll(".infoPopUp li")
let noBtn = document.querySelector("#no");
let yesBtn = document.querySelector("#yes");
let grade = ""
let club = ""
let i = 0;
let gamersCount = 0;
let dramaCount = 0;
let sportsCount = 0;
let freehandCount = 0;
let studentInfo = [];

let memberList = document.getElementsByClassName("memberList");


class Student{

    constructor(name, movie, grade, club){
        this.name = name;
        this.movie = movie;
        this.grade = grade;
        this.club = club;
    }
}

function checkedGrade() {

    for (let checked of formGrade){

        if(checked.checked){
            return(checked)
        }
    }
}

function checkedClub() {

    for (let checked of formClub){

        if(checked.checked){
            return(checked)
        }
    }
}

function dialogReview (x,y) {

    dialogContent[0].textContent = `Name: ${formName.value}`;
    dialogContent[1].textContent = `Favorite Moive: ${formMovie.value}`;
    dialogContent[2].textContent = `Grade: ${x.value}`;
    dialogContent[3].textContent = `Club: ${y.value}`;
}

btnSignUp.addEventListener("click", () => {

    grade = checkedGrade();
    club = checkedClub();

    
    dialogReview(grade,club);
    dialog.showModal();
})

function clearForm(x,y) {

    formName.value = null;
    formMovie.value = null;
    x.checked = null;
    y.checked = null;
}

yesBtn.addEventListener("click", () => {

    let student = new Student(formName.value, formMovie.value, grade.value, club.value);
    studentInfo.push(student);
    clearForm(grade,club);
    dialog.close();
    placement(studentInfo);
})

noBtn.addEventListener("click", () => {

    dialog.close();
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
});

function placement(x) {
    
    let clubName = x[i]["club"]
    
    switch (clubName){
        case "gamers": 
            createListElement(x,0);
            i++;
            break;
        case "drama":
            createListElement(x,1);
            i++;
            break;
        case "sports":
            createListElement(x,2);
            i++;
            break;
        case "freehand":
            createListElement(x,3);
            i++;
            break;
    }
}

function createListElement(x,y) {

    let newLi = document.createElement("li");
    newLi.classList.add("col-6")
    newLi.classList.add("student")
    let liContent = document.createTextNode(`${x[i]["name"]}`)
    newLi.appendChild(liContent);
    memberList[y].insertAdjacentElement("afterbegin", newLi)
}

document.addEventListener("click", e => {

    let target = e.target

    if (!target.classList.contains("student")){
        return
    }
    text = target.textContent
    
    let clickedStudent = (studentInfo.find(findThisStudent))
    makePopUpContent(clickedStudent)
    
    console.log(clickedStudent["movie"])
})

function findThisStudent(student) {
    return student.name === text;
}

let popUp = document.getElementById("popUp")
let btnExitStudentPopUp = document.getElementById("exitStudentInfo");

function makePopUpContent(x) {

    popUpContent[0].textContent = `Name: ${x["name"]}`
    popUpContent[1].textContent = `Favorite Moive: ${x["movie"]}`
    popUpContent[2].textContent = `Grade: ${x["grade"]}`
    popUpContent[3].textContent = `Club: ${x["club"]}`

    popUp.style.display = "block"
}

btnExitStudentPopUp.addEventListener("click", () => {

    popUp.style.display = "none"

})