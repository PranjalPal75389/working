let Name = document.getElementById("name");
let Mob = document.getElementById("mobno.");
const last = document.getElementById("last");
function run() {

    Name = Name.value;
    Mob = Number(Mob.value);
    if (Name == "") {
        last.textContent = "Please write name and mobNo.";
        return 0;
    }
    else
        last.textContent =" you have Successfully Submited the Form "
        alert(`your name is ${Name} and  your mob no. is ${Mob}`);
}