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
let index = 0;

//Add an event listener
displaySongsBtn.addEventListener('click', (event) => {
    event.preventDefault();
    fetchAndDisplaySongs();
});










// Function to fetch,store and return the uploaded songs from Firebase
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



//Function to display the songs by taking songs as input
function fetchAndDisplaySongs() {
    console.log('Fetching and Displaying songs...');
    fetchAndStoreSongs()
        .then((songs) => {
            songList.innerHTML = '';

            songs.forEach((song) => {
                const listItem = document.createElement('li');
                listItem.textContent = song.title;
                listItem.addEventListener('click', () => {
                    playSong(song);
                })
                songList.appendChild(listItem);
            });
        })
        .catch((error) => {
            console.error('Error fetching songs:', error);
        });
}



//Function to play the selected Song taking that song as input
function playSong(song) {
    const screen1 = document.querySelector('.screen-1');
    const screen2 = document.querySelector('.screen-2');
    const songImage = document.querySelector('.song-image');
    const playPauseIcon = document.querySelector('.play-pause-icon');
    const visualization = document.querySelector('.visualization'); 

    // Set the image source and title of the selected song in screen 2
    //songImage.innerHTML = `<img src="${song.url}" alt="${song.title}">`;
    screen1.style.display = 'none'; // Hide screen 1
    screen2.style.display = 'block'; // Show screen 2

    // Implement your song playing logic here
    // For example, you can use an audio element to play the song
    // You may need to modify this part based on your specific implementation
    const audioElement = document.createElement('audio');
    audioElement.src = song.url;
    audioElement.autoplay = true;

    // Start visualization when the song starts playing
    audioElement.addEventListener('play', () => {
        var image = document.getElementById('element');
        image.classList.add('animate');
    });

    audioElement.addEventListener('pause', () => {
        var image = document.getElementById('image');
        image.classList.remove('animate');
    });

    playPauseIcon.addEventListener('click', () => {
        if (audioElement.paused) {
            audioElement.play();
            playPauseIcon.classList.add('playing');
        } else {
            audioElement.pause();
            playPauseIcon.classList.remove('playing');
        }
    });

}

// Function to display shuffled songs By taking the songs as input
function fetchAndDisplayShuffledSongs() {
    console.log('Fetching and displaying shuffled songs...');
    fetchAndStoreSongs().then((songs) => {
        songs = shuffleArray(songs);
        playSongsSequentially(songs,0);
    }).catch((error) => {
        console.error('Error fetching songs:', error);
    });
}



//Shuffle The songs and Return It
function shuffleArray(songs){
    for(let i=songs.length-1; i>0; i--){
        const j=Math.floor(Math.random() * (i+1));
        [songs[i], songs[j]] = [songs[j], songs[i]];
    }
    return songs;
}


//Playing Songs One after one by Defualt
function playSongsSequentially(songs, index){

    const screen1 = document.querySelector('.screen-1');
    const screen2 = document.querySelector('.screen-2');
    const playPauseIcon = document.querySelector('.play-pause-icon');
    const nextBtn = document.getElementById('next');
    const prevBtn = document.getElementById('prev');


    screen1.style.display = 'none'; // Hide screen 1
    screen2.style.display = 'block'; // Show screen 2

    if(index >= songs.length)
        return;
    const song = songs[index];
    const audio = new Audio(song.url);
    audio.addEventListener('ended', function(){
        window.confirm("Hey hi");
        playSongsSequentially(songs, index+1);
    });

    audio.addEventListener('play', () => {
        var image = document.getElementById('element');
        image.classList.add('animate');
    });

    audio.addEventListener('pause', () => {
        var image = document.getElementById('image');
        image.classList.remove('animate');
    });

    playPauseIcon.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            playPauseIcon.classList.add('playing');
        } else {
            audio.pause();
            playPauseIcon.classList.remove('playing');
        }
    });

    prevBtn.addEventListener('click', () => {
        if(index > 0){
            audio.pause();
            playSongsSequentially(songs, index-1);
        }
        else{
            console.error('There are no previous songs', error);
            const result = window.confirm('Do you want to continue current song?');
            if(result)
                audio.play();
            else
                return;
        }
    });

    nextBtn.addEventListener('click', ()=> {
        if(index+1 < songs.length){
            audio.pause();
            playSongsSequentially(songs, index+1);
        }
        else{
            console.error('There are no next songs', error);
            const result = window.confirm('Do you want to continue current song?');
            if(result)
                audio.play();
            else
                return;
        }
    });
    audio.play();
}




