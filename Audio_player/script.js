const progress=document.getElementById("progress")
const song=document.getElementById("song")
const ctrlIcon=document.getElementById("ctrlIcon")

const songs=["./audios/lost-in-dreams-abstract-chill-downtempo-cinematic-future-beats-270241.mp3",
    "./audios/showreel-music-promo-advertising-opener-vlog-background-intro-theme-261601.mp3",
    "./audios/soulsweeper-252499.mp3",
    "./audios/stylish-deep-electronic-262632.mp3"
];
let currentSongIndex = 0;
song.src = songs[currentSongIndex];

song.onloadedmetadata = function (){
    progress.max=song.duration;
    progress.value=song.currentTime;
}
song.ontimeupdate = function() {
    progress.value = song.currentTime;
};

function playpause(){
     if(ctrlIcon.classList.contains("fa-play")){
        ctrlIcon.classList.replace("fa-play","fa-pause")
        song.play();
     }
     else{
        ctrlIcon.classList.replace("fa-pause","fa-play")
        song.pause();
     }
}
if(song.play()){
    setInterval(()=>{
    progress.value=song.currentTime;      
    },500)

}
progress.onchange=function(){
    song.currentTime = progress.value;
    song.play();

}

function previousSong(){
    currentSongIndex=(currentSongIndex===0?songs.length-1:currentSongIndex-1)
    song.src=songs[currentSongIndex];
    song.play();
    ctrlIcon.classList.replace("fa-play","fa-pause")
}

function nextSong(){
    if(currentSongIndex===songs.length-1){
        currentSongIndex=0;
    }
   currentSongIndex=currentSongIndex+1;
    song.src=songs[currentSongIndex];
    song.play();
    ctrlIcon.classList.replace("fa-play","fa-pause")
}

song.onended=()=>nextSong();
