let btnSignUp = document.querySelector("#signUp");
let formName = document.querySelector("#name");
let formMovie = document.querySelector("#movie")
let formGrade = document.querySelectorAll('input[name = "grade"]')


class Student{

    constructor(name, movie, grade, club){
        this.name = name;
        this.movie = movie;
        this.grade = grade;
        this.club = club;
    }
}

async function s() {

    return new Promise ((resolve,reject) => {

        for(let i = 0; i < formGrade.length; i++){

            if(formGrade[i].checked){
                let grade = formGrade.id
                resolve(grade)
            }
            
        }

    })
    

}

btnSignUp.addEventListener("click", async () => {


    let m = await s();



    let student = new Student(formName.value, formMovie.value, m);




    
    console.log(student)
    

})