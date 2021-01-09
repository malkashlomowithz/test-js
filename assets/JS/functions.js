
let studentCounter  ;
if (localStorage.getItem('counter')) {                             //Prevent resetting of localStorage
    studentCounter = localStorage.getItem('counter')
} else {
    studentCounter = 0
};
let students;

if (localStorage.getItem('students')) {                           //Prevent resetting of localStorage
    students = JSON.parse(localStorage.getItem('students'));
} else {
    students = []
};

class Student{
    id;
    name;
    course;
    studentId;
    date;
    
    constructor(name,course,studentId,date,){
        this.id = studentCounter;
        this.name = name;
        this.course = course;
        this.studentId = studentId;
        this.date = date;
}}; 

function sendForm(){
    
    studentCounter ++;

    let student = new Student(document.getElementById('student_name').value,document.getElementById('student_cours').value,document.getElementById('student_tz').value,document.getElementById('student_date').value);
    students.push(student);

    updateLocalStorage();
    alert('הסטודנט נוסף בהצלחה');
    location.replace("listUser.html");
};

function updateLocalStorage(){

    localStorage.setItem('students', JSON.stringify(students));
    localStorage.setItem('counter', studentCounter);
};

function trMaker(myStudents){
    if (document.querySelector('tbody'))                            //Remove example.
    {document.querySelector('tbody').remove()}; 

    myStudents.forEach(element => {
        
    let tr = document.createElement('tr');                          //Place students in table.
    let thead = document.querySelector('thead');
    thead.appendChild(tr);    
    tr.innerHTML = `<td>${element.id}</td>
                    <td>${element.course}</td>
                    <td>${element.name}</td>
                    <td>${element.studentId}</td>
                    <td>${element.date}</td>
                    <td><button type="button" class="btn btn-info">הנפקת כרטיס</button></td>
                    <td><button type="button" class="btn btn-danger">X</button></td>` ;
    });  
};

trMaker(students);

let showCard = document.querySelectorAll('.btn-info');

    showCard.forEach(element => {

        element.setAttribute('onclick','seeCard(this)');         //Set up event on all the buttons.
    });
    
function closeLb(){
    
        let lightBox = document.querySelector('.lightBox');
        lightBox.style.display = 'none';
};

let x =document.querySelectorAll('.btn-danger');

    x.forEach(element => {

        element.setAttribute('onclick','removeRow(this)');         //Set up event on all the buttons.         
    });


function removeRow(thisStudent) {

    

    let studentsTab = document.querySelector('table');
    let a = thisStudent.parentNode.parentNode.rowIndex;
    studentsTab.deleteRow(a); 

    students = students.filter(function(current){

        return current.id !== a ;
        });

    studentCounter = 0  ;  
    let id = 1;

    students.forEach(element => {

        element.id = id++ ;                            //Fix up the student id.
        studentCounter ++  ;                     
    });   
    updateLocalStorage();
  
    location.reload()
};

function seeCard(aStudent){

    let black = document.querySelector('.lightBox');
        black.style.display = 'flex';
 
    let a = aStudent.parentNode.parentNode.rowIndex;
    
    let selectedStudent = students[a-1];
    
    let course = document.querySelector('.mb-2');         //Add information to card.
    course.textContent = 'קורס '+ selectedStudent.course;
    let name = document.querySelectorAll('.mb-0');
    name[1].textContent = selectedStudent.name;
    let studentId = document.querySelector('.m-0');
    studentId.textContent = selectedStudent.studentId;
    let date = document.querySelector('.text-muted');
    date.textContent ='עד '+ selectedStudent.date;
};

//Thanks for checking my test :)