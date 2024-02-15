const inputField =document.getElementById("inputField");
const listContainer=document.getElementById("listContainer")


function addTask(){
    if(inputField.value ==="")
        return alert("You must Write Some task first");
    
    else{
        let li=document.createElement("li");
        li.innerHTML=inputField.value;
        listContainer.appendChild(li);

        let span=document.createElement("span");
        span.innerHTML="&#10006";
        li.appendChild(span);
        inputField.value="";
        saveData();
    }
}

listContainer.addEventListener("click",function(e){
    if(e.target.tagName ==="LI"){
        e.target.classlist.toggle("checked");
    }
    else if(e.target.tagName==="SPAN"){
    e.target.parentElement.remove();
    saveData();
    }
},false);

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);
}
function getData(){
    listContainer.innerHTML= localStorage.getItem("data");
}
getData();