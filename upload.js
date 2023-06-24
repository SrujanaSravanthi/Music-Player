const FileInput = document.getElementById('musicFileInput');
const playButton = document.getElementById('playButton');
const pauseButton = document.getElementById('pauseButton');
const audioPlayer = document.getElementById('audioPlayer');
const background = document.querySelector('.background');
const container = document.querySelector('.menu-container');
const songImage = document.querySelector('.song-image');
const heading = document.getElementById('head');
const reader = new FileReader();

playButton.addEventListener('click', () => {
    audioPlayer.play();
    background.style.filter = 'blur(5px)';
    songImage.classList.add('animate');
    heading.classList.add('animate');
    songImage.style.display = 'block';
    container.style.filter = 'blur(5px)';

});

pauseButton.addEventListener('click', () => {
    audioPlayer.pause();
    background.style.filter = 'none';
    songImage.classList.remove('animate');
    heading.classList.remove('animate');
    songImage.style.display = 'none';
    container.style.filter = 'none';
});

container.addEventListener('mouseover', () => {
    if(!audioPlayer.paused)
        container.style.filter = 'none';
});

container.addEventListener('mouseout', () => {
    if(!audioPlayer.paused)
        container.style.filter = 'blur(5px)';
});

FileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    const audioURL = URL.createObjectURL(file);
    audioPlayer.src = audioURL;
});




// JavaScript code

const uploadButton = document.getElementById('uploadButton');
const progressText = document.getElementById('progressText');

// Add event listener to the upload button
uploadButton.addEventListener('click', () => {
    console.log('Started');
    // Get the selected music file
    const file = FileInput.files[0];

    // Create a storage reference with a unique filename
    const storageRef = storage.ref().child(`songs/${file.name}`);

    // Upload the file to Firebase Storage
    const uploadTask = storageRef.put(file);

    // Update progress bar during the upload
    uploadTask.on('state_changed', 
        (snapshot) => {
            // Calculate upload progress percentage
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            function updateProgress(progress){
                if(progress <= 100){
                    progressText.textContent = `Uploading: ${progress.toFixed(2)}%`;
                    progressText.style.color = `hsl(${progress}, 100%, 50%)`;

                }
            }
            updateProgress(progress);
        },
        (error) => {
            // Handle upload error
            console.error('Upload failed:', error);
            progressText.textContent = 'Upload and Listen';
        },
        () => {
            // Upload complete
            console.log('Upload successful');
            progressText.textContent = 'Upload and Listen';

            // Get the download URL of the uploaded file
            storageRef.getDownloadURL().then((downloadURL) => {
                console.log('Download URL:', downloadURL);
                // Perform further operations with the download URL if needed
            }).catch((error) => {
                console.error('Error getting download URL:', error);
            });
        }
    );
});

function homePage(){
    window.location.href = "./index.html";
}
