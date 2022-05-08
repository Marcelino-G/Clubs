// makes content for review(dialog) appear.
const btnSignUp = document.querySelector("#signUp");
// "no" if content isn't correct "yes" if it is
// then pushes it into the ONLY array here.
const btnNo = document.querySelector("#no");
const btnYes = document.querySelector("#yes");

// removes the student(li) from the html 
// and its information from the array
const btnRemoveStudentInfo = document.getElementById("removeStudentInfo");
// "closes" the popUpStudentInfo div
const btnExitStudentPopUp = document.getElementById("exitStudentInfo");
const popUpStudentInfo = document.getElementById("popUp");
let popUpContent = document.querySelectorAll(".infoPopUp li");

const form = document.querySelector("#form");
let formName = document.querySelector("#name");
let formMovie = document.querySelector("#movie");
let formGrade = document.getElementsByName("grade");
let formClub = document.getElementsByName("club");

let capitalizedName = "";
let capitalizedMovie = "";
let grade = "";
let club = "";

const dialog = document.querySelector("dialog");
let dialogContent = document.querySelectorAll(".infoReview li");

let arrayStudentInfo = [];
let countArrayLength = 0;
let countGamers = 0;
let countDrama = 0;
let countSports = 0;
let countFreehand = 0;

// document listening for (li) clicks
// turn into the htmlListTarget
let htmlListTarget  = "";
// is the "text" version of htmlListTarget
let htmlListTargetText = "";
// collection of (ul) in the html 
// gamers, drama, sports, freehand
const memberList = document.getElementsByClassName("memberList");


class Student{

    constructor(name, movie, grade, club){
        this.name = name;
        this.movie = movie;
        this.grade = grade;
        this.club = club;
    }
}

// Prevents the submit button from reloading the page
// when clicked on.
form.addEventListener("submit", (e) => {
    
    e.preventDefault();
});

// Clicking on the "remove" button removes the associated 
// student name from the html AND the arrayStudentInfo.
// The count for the array and total club members is reduced.
btnRemoveStudentInfo.addEventListener("click", () => {

    htmlListTarget.remove();
    countArrayLength --;
    popUpStudentInfo.style.display = "none"
    
    for(let i = 0; i < arrayStudentInfo.length; i++){

        if (arrayStudentInfo[i]["name"] === htmlListTargetText){
            let clubName = arrayStudentInfo[i]["club"]
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
            arrayStudentInfo.splice(i, 1)
        }
    }
})

// returns the checked radio value.
// used for the grade and club. 
function checkedRadio(x) {

    for (let checked of x){

        if(checked.checked){
            return(checked)
        }
    }
}

// Capitalizes every first letter of a word
// used for the name and movie.
function capitalize(x) {

    return x.toLowerCase()
        .split(" ")
        .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ")
}

// Before the student information is "pushed" into the array
// it must be reviewed here and confirmed. The information inserted
// here is taken straight from the present form values. 
function dialogReview (x,y) {

    capitalizedName = formName.value
    capitalizedName = capitalize(capitalizedName)

    capitalizedMovie = formMovie.value
    capitalizedMovie = capitalize(capitalizedMovie)

    dialogContent[0].textContent = `Name: ${capitalizedName}`;
    dialogContent[1].textContent = `Favorite Moive: ${capitalizedMovie}`;
    dialogContent[2].textContent = `Grade: ${x.value}`;
    dialogContent[3].textContent = `Club: ${y.value}`;
}

// This "shows" the dialog modal so the information 
// can be reviewed before being pushed.
// If any information is missing, alerts will show. 
btnSignUp.addEventListener("click", () => {

    try {

        grade = checkedRadio(formGrade);
        club = checkedRadio(formClub);

        if(formName.value.trim() === ""){
            const errorName = "What is your name?"
            throw errorName
        } else if(formMovie.value.trim() === ""){
            const errorMovie = "What is your favorite movie?"
            throw errorMovie
        } else if(!grade || !club){
            const errorRadio = "Select your grade level AND desired club."
            throw errorRadio
        }
    
        dialogReview(grade,club);
        dialog.showModal();

    } catch (error) {
        alert(error)
    }   
})

// clears the name, movie, grade, and club fields in the form.
function clearForm(x,y) {

    formName.value = null;
    formMovie.value = null;
    x.checked = null;
    y.checked = null;
}

// This is used to return the current TYPED name 
// so that it can be searched for in the array.
function findThisStudentArray(student){
    return student.name === capitalizedName;
}

// This removes the latest "new Student" and its information
// from the array. Preventing its information from being officially
// stored in the array when the club is full.
function preventSignUp(x) {

    x.pop();
    const errorClubFull = "sorry, club is full"
    return errorClubFull
}

// Creates a new list item that has the "new Student" name.
// This new (li) is then inserted into the memberList
// that corresponds with the same club name in html. 
function createListElement(x,y) {

    let newLi = document.createElement("li");
    newLi.classList.add("col-6", "student", "fw-bold")
    let liContent = document.createTextNode(`${x[countArrayLength]["name"]}`)
    newLi.appendChild(liContent);
    memberList[y].insertAdjacentElement("afterbegin", newLi)
}

// Depending on the information of the "new Student" 
// It is placed into its proper group and increases 
// the club count that it is assigned to.
// the count of countArrayLength increases regardless
// since it represents the ordered array items.
function htmlClubPlacement(x) {
    
    let clubName = x[countArrayLength]["club"]
    
    switch (clubName){
        case "Gamers": 
            try {
                if (countGamers === 6){
                    throw preventSignUp(x)
                }

                createListElement(x,0);
                countArrayLength++;
                countGamers++
                break
            } catch (error) {
                alert(error)
                break
            }
        case "Drama":
            try {
                if (countDrama === 6){
                    throw preventSignUp(x)
                }

                createListElement(x,1);
                countArrayLength++;
                countDrama++
                break
            } catch (error) {
                alert(error)
                break
            }
        case "Sports":
            try {
                if (countSports === 6){
                    throw preventSignUp(x)
                }

                createListElement(x,2);
                countArrayLength++;
                countSports++
                break
            } catch (error) {
                alert(error)
                break
            }
        case "Freehand":
            try {
                if (countFreehand === 6){
                    throw preventSignUp(x)
                }

                createListElement(x,3);
                countArrayLength++;
                countFreehand++
                break
            } catch (error) {
                alert(error)
                break
            }
    }
}

// When the information that was input is being reviewed and confirmed
// with yes, it officially creates a "new Student" with that information.
// The "new Student" is pushed into an array to store its information
// so that it can be accessed later. Based on its criteria, it is displayed
// underneath one of the clubs in the html.
// The review modal is then closed and the form is cleared. 
btnYes.addEventListener("click", () => {

    let student = new Student(capitalizedName, capitalizedMovie, grade.value, club.value);
   
    if (arrayStudentInfo.find(findThisStudentArray)){
        alert("Name already taken. Try adding your last name initial.")
        return
    }

    arrayStudentInfo.push(student);
    clearForm(grade,club);
    dialog.close();
    htmlClubPlacement(arrayStudentInfo);
})

// "No" button when the student information during the 
// review modal is present. closes the dialog.
btnNo.addEventListener("click", () => {

    dialog.close();
})

// This is used to return the current CLICKED name 
// so that it can be searched for in the array.
function findThisStudentClicked(student) {
    return student.name === htmlListTargetText;
}

// This takes the student information from the array
// and presents it in the html.
function makePopUpContent(x) {

    popUpContent[0].textContent = `Name: ${x["name"]}`
    popUpContent[1].textContent = `Favorite Moive: ${x["movie"]}`
    popUpContent[2].textContent = `Grade: ${x["grade"]}`
    popUpContent[3].textContent = `Club: ${x["club"]}`

    popUpStudentInfo.style.display = "block"
}

// This is used to listen for "click" on only
// the student name(li) in the html. 
// The name is then used to search for the rest of 
// the students information in the array so that
// it can be displayed in the html.
document.addEventListener("click", e => {

    let target = e.target

    if (!target.classList.contains("student")){
        target = null
        return
    }

    htmlListTarget = target
    htmlListTargetText = htmlListTarget.textContent
    let clickedStudent = (arrayStudentInfo.find(findThisStudentClicked))
    makePopUpContent(clickedStudent)
})

// This exits out of the presented student information
// that appears when the name is clicked on in the html.
// popupstudentinfo div 
btnExitStudentPopUp.addEventListener("click", () => {

    popUpStudentInfo.style.display = "none"
})

