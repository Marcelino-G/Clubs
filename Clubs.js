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
let countArrayLength = 0;
let countGamers = 0;
let countDrama = 0;
let countSports = 0;
let countFreehand = 0;
let studentInfo = [];
let capName = "";
let capMoive = "";
let btnRemoveStudentInfo = document.getElementById("removeStudentInfo");

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

    capName = formName.value
    capName = capName.toLowerCase()
                                .split(" ")
                                .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                .join(" ")
    capMoive = formMovie.value
    capMoive = capMoive.toLowerCase()
                                    .split(" ")
                                    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
                                    .join(" ")

    dialogContent[0].textContent = `Name: ${capName}`;
    dialogContent[1].textContent = `Favorite Moive: ${capMoive}`;
    dialogContent[2].textContent = `Grade: ${x.value}`;
    dialogContent[3].textContent = `Club: ${y.value}`;
}

btnSignUp.addEventListener("click", () => {

    if(formName.value.trim() === ""){
        alert("What is your name?")
        return
    } else if(formMovie.value.trim() === ""){
        alert("What is your favorite movie?")
        return
    }

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

    let student = new Student(capName, capMoive, grade.value, club.value);
   
    if (studentInfo.find(findThisStudentInArray)){
        alert("Name already taken. Try adding your last name initial.")
        return
    }

    studentInfo.push(student);
    clearForm(grade,club);
    dialog.close();
    placement(studentInfo);
    console.log(studentInfo)
})

noBtn.addEventListener("click", () => {

    dialog.close();
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
});

function placement(x) {
    
    let clubName = x[countArrayLength]["club"]
    
    switch (clubName){
        case "Gamers": 
            if(countGamers === 6){
                alert("sorry, club is full")
                x.pop();
                return
            }
            createListElement(x,0);
            countArrayLength++;
            countGamers++
            break;
        case "Drama":
            if(countDrama === 6){
                alert("sorry, club is full")
                x.pop();
                return
            }
            createListElement(x,1);
            countArrayLength++;
            countDrama++
            break;
        case "Sports":
            if(countSports === 6){
                alert("sorry, club is full")
                x.pop();
                return
            }
            createListElement(x,2);
            countArrayLength++;
            countSports++
            break;
        case "Freehand":
            if(countFreehand === 6){
                alert("sorry, club is full")
                x.pop();
                return
            }
            createListElement(x,3);
            countArrayLength++;
            countFreehand++
            break;
    }
}

function createListElement(x,y) {

    let newLi = document.createElement("li");
    newLi.classList.add("col-6")
    newLi.classList.add("student")
    newLi.classList.add("fw-bold")
    let liContent = document.createTextNode(`${x[countArrayLength]["name"]}`)
    newLi.appendChild(liContent);
    memberList[y].insertAdjacentElement("afterbegin", newLi)
}

let target  = "";
let text = ""

document.addEventListener("click", e => {

    target = e.target

    if (!target.classList.contains("student")){
        return
    }
    text = target.textContent
    
    let clickedStudent = (studentInfo.find(findThisStudentHTML))
    makePopUpContent(clickedStudent)
    
})

function findThisStudentHTML(student) {
    return student.name === text;
}

function findThisStudentInArray(student){
    return student.name === capName;
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

btnRemoveStudentInfo.addEventListener("click", () => {

    for(let i = 0; i < studentInfo.length; i++){

        if (studentInfo[i]["name"] === text){
            let clubName = studentInfo[i]["club"]
            switch(clubName){
                case "Gamers":
                    countGamers --;
                    break;
                case "Drama":
                    countDrama --;
                    break;
                case "Sports":
                    countSports --;
                    break;
                case "Freehand":
                    countFreehand --;
                    break;
            }
            studentInfo.splice(i, 1)
        }
    }
    target.remove();
    countArrayLength --;
    popUp.style.display = "none"
    console.log(studentInfo)
})
