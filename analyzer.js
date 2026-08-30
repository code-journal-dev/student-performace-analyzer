let students=[];
let savedStudents=localStorage.getItem("students");
if(savedStudents){
   students=JSON.parse(savedStudents);
}
let studentNameInput=document.getElementById("names");
let studentMarksInput=document.getElementById("marks");
let addBtn=document.getElementById("add");
addBtn.addEventListener("click",function(){
  let name=studentNameInput.value.trim();
  if(studentMarksInput.value === ""){
    resultsPage.textContent="Enter Student Marks";
    return;
  }
  let marks=Number(studentMarksInput.value);
  if(name === ""){
    resultsPage.textContent="Enter Student Name"
    return;
  }
  if(marks < 0 || marks > 100){
    resultsPage.textContent="Enter Marks between 0 to 100"
    return;
  }
  let student={
    name:name,
    marks:marks
  };
  students.push(student);
  localStorage.setItem("students",JSON.stringify(students));
  studentNameInput.value="";
  studentMarksInput.value="";
});
const allStudentsBtn=document.getElementById("allStudents");
const passedStudentsBtn=document.getElementById("passedStudents");
const studentsBelow40Btn=document.getElementById("below40");
const highScorersBtn=document.getElementById("highScorers");
const topStudentBtn=document.getElementById("topStudent");
const statisticsBtn=document.getElementById("statistics");
const resultsPage=document.getElementById("result");
//Event listeners
//All students
allStudentsBtn.addEventListener("click",function(){
  const studentCards=students.map(function(student){
   return `<p>${student.name}- ${student.marks}</p>`
  })
  resultsPage.innerHTML=studentCards.join("");
});
//Passed students 
passedStudentsBtn.addEventListener("click",function(){
  const passedStudents=students.filter(function(student){
   return student.marks >= 50;
}).map(function(student){
   return student.name;
});
  const passedStudentCards=passedStudents.map(function(student){
   return `<p>${student}</p>`
});
  resultsPage.innerHTML=passedStudentCards.join("\n");
});
//Students Below 40
studentsBelow40Btn.addEventListener("click",function(){
  const scoredBelow40=students.filter(function(student){
   return student.marks < 40;
  });
  if(scoredBelow40.length === 0){
    resultsPage.textContent="No students scored below 40";
    return;
  }
  const below40Cards=scoredBelow40.map(function(student){
    return `<p>${student.name} - ${student.marks}</p>`;
  });
  resultsPage.innerHTML=below40Cards.join("");
});
//High Scorers
highScorersBtn.addEventListener("click",function(){
  const scored80More=students.filter(function(student){
   return student.marks >= 80;
}).map(function(student){
   return student.name;
});
  const highScorersCards=scored80More.map(function(student){
   return `<p>${student}</p>`
});
  resultsPage.innerHTML=highScorersCards.join("\n");
})
//Top student
topStudentBtn.addEventListener("click",function(){
  const topStudent=students.reduce(function(acc,student){
   if(acc.marks < student.marks){
    acc=student;
   }
   return acc;
});
  resultsPage.textContent="Top Student-" + topStudent.name + ", " +"Marks-" + topStudent.marks;
});
//Statistics
statisticsBtn.addEventListener("click",function(){
  const totalMarks=students.reduce(function(acc,student){
   return acc+student.marks;
},0);
  const averageMarks=totalMarks/students.length;
  const passedStudentsCount=students.reduce(function(acc,student){
  if(student.marks >= 50){
    acc=acc+1;
  }
   return acc;
},0);
  const topStudent=students.reduce(function(acc,student){
   if(acc.marks < student.marks){
    acc=student;
   }
   return acc;
});
  resultsPage.textContent="Total Students-" + students.length + "\n" + "Total Marks-" + totalMarks + "\n" + "Average Marks-" + averageMarks + "\n" + "Passed Students-" + passedStudentsCount + "\n" +"Top Student-" + topStudent.name;
});

