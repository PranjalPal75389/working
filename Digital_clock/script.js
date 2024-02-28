
run();
function run(){
    let livetime = new Date();
let hrs = livetime.getHours();
let mins = livetime.getMinutes();
let secs = livetime.getSeconds();
console.log(`Hours : ${hrs} mins: ${mins} secs: ${secs}`);
document.querySelector(".displaytime").innerHTML =
  (hrs < 10 ? "0" : "") + `${hrs}:` +
  (mins < 10 ? "0" : "")+ `${mins}:`+
  (secs < 10 ? "0" : "") + secs;
}
setInterval(run,1000);