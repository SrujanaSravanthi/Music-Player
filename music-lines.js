const firebaseConfig = {
    apiKey: "AIzaSyCvFbtAYxJl9cBlrvLV-vupoLma1h9hPTk",
    authDomain: "infinity-and-beyond-7731.firebaseapp.com",
    databaseURL: "https://infinity-and-beyond-7731-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "infinity-and-beyond-7731",
    storageBucket: "infinity-and-beyond-7731.appspot.com",
    messagingSenderId: "205314122281",
    appId: "1:205314122281:web:a441e56fefc24c13a3f238",
    measurementId: "G-6VXJV3LF6N"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();


//API Genius
import axios from 'axios';
const clientAccessToken = 'g_AgauXSyfMlwTvhu2dR1q4Aq5-URvF9ICLzpN8f_qy6UycDfIeguUhlEmxIn_ld';
const apiUrl = 'https://api.genius.com';


const Generate = document.getElementById('generate');
const uploadForm = document.getElementById('uploadForm');
//const Upload = document.getElementById('upload');
const musicLineInput = document.getElementById('lineInput');
const progressText = document.getElementById('progress');
const lineList = document.getElementById('unordered-list');
const uploadAMusicLine = document.getElementById('upload-line');


uploadAMusicLine.addEventListener('click', ()=>{
    uploadForm.classList.remove('input');
});


//Event Listener for form Submission
uploadForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const musicLine = musicLineInput.value;
    storage.ref("musicLines").push().set({line: musicLine});
    musicLineInput.value = "";
});


//Retrieve Music Lines from the dataBase
function getMusicLines(){
    storage.ref("musicLines").once("value", (snapshot) => {
        const musicLinesData = snapshot.val();
        const musicLinesArray = Object.values(musicLinesData);
        displayMusicLines(musicLinesArray);
    })
}


//Function to display Music Lines
function displayMusicLines(musicLinesArray){
    lineList.innerHTML = "";
    musicLinesArray.forEach((musicLine) => {
        const listItem = document.createElement('li');
        lineElement.textContent = musicLine.line;
        lineList.appendChild(lineElement);
    });
}

//Function to generate lyrics by taking ID as input
function generateLyrics(ID){
    const songId = ID;
    const headers = {
        Authorization: `Bearer ${clientAccessToken}`,
    };
    axios.get(`${apiUrl}/songs/${songId}`, {headers}).then(response => {
        const lyrics = response.data.response.song.lyrics;
        console.log(lyrics);
    }).catch(error => {
        console.error(error);
    });
}