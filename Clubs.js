let btnSignUp = document.querySelector("#signUp");
let formName = document.querySelector("#name");
let formMovie = document.querySelector("#movie");
let formGrade = document.getElementsByName("grade");
let formClub = document.getElementsByName("club");
let dialog = document.querySelector("dialog");
let dialogContent = document.querySelectorAll("ul li")
let noBtn = document.querySelector("#no");
let yesBtn = document.querySelector("#yes");
let grade = ""
let club = ""
let studentInfo = [];

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
})

noBtn.addEventListener("click", () => {

    dialog.close();
})