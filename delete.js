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





const displaySongsBtn = document.getElementById('display-songs-btn');
const songList = document.getElementById('song-list');
const undoBtn = document.getElementById('undo');
const redoBtn = document.getElementById('redo');


//Add an event listener
displaySongsBtn.addEventListener('click', (event) => {
    event.preventDefault();
    songList.style.display = 'block';
    fetchAndDisplaySongs();
});










// Function to fetch and store uploaded songs from Firebase
async function fetchAndStoreSongs() {
    try {
        // Get a reference to the "songs" folder in Firebase Storage
        const storageRef = storage.ref('songs');
        // Fetch the songs from Firebase Storage
        const items = await storageRef.listAll();

        // Store the fetched songs in an array
        const songs = [];

        for (const item of items.items) {
            const downloadURL = await item.getDownloadURL();

            songs.push({
                title: item.name,
                url: downloadURL
            });
        }

        // Return the stored songs
        return songs;
    } catch (error) {
        console.error('Error fetching songs:', error);
        return []; // Return an empty array in case of an error
    }
}

//function to display the fetched songs in a list
function fetchAndDisplaySongs() {
    console.log('Fetching and Displaying songs...');
    fetchAndStoreSongs()
        .then((songs) => {
            songList.innerHTML = '';

            songs.forEach((song) => {
                const listItem = document.createElement('li');
                listItem.classList.add('.container-li');
                listItem.textContent = song.title;
                listItem.addEventListener('click', () => {
                    DeleteSong(song);
                })
                songList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error('Error fetching songs:', error);
        });
}

let deletedSong = null;
function DeleteSong(song){
    const storageRef = storage.ref('songs').child(song.title);
    const result = window.confirm('Are you sure want to delete this item?');
    if(result){
        deletedSong = song;
        storageRef.delete().then(() => {
            console.log('Song removed from Storage', song.title);
            displayUndo();
            fetchAndDisplaySongs();
        }).catch((error) => {
            console.error('Error removing song:',error);
        });
    }
}

undoBtn.addEventListener('click',() => {
    if(deletedSong){
        const storageRef = storage.ref('songs').child(deletedSong.title);
        storageRef.put(deletedSong).then(() => {
            console.log('Song Added into the database', deletedSong);
            fetchAndDisplaySongs();
            hideUndo();
        }).catch((error) => {
            console.error('Error Adding the song', error);
        });
    }
});

function displayUndo(){
    undoBtn.style.display = 'block';
}

function hideUndo(){
    undoBtn.style.display = 'none';
}

function home(){
    window.location.href= "./index.html";
}