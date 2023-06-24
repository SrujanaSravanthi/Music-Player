const uploadButton = document.getElementById('uploadButton');
const progressText = document.getElementById('progressText');
const FileInput = document.getElementById('fileInput');
const imageContainer = document.getElementById('imageContainer');
const scrollingBar = document.getElementById('scrollingBar');
const showButton = document.getElementById('showButton');
const reader = new FileReader();

//ADd event listener to the FileInput
FileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];
});



// Add event listener to the upload button
uploadButton.addEventListener('click', (e) => {
    console.log('Started');
    // Get the selected music file
    const file = FileInput.files[0];

    // Create a storage reference with a unique filename
    const storageRef = storage.ref().child(`images/${file.name}`);

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
            progressText.textContent = 'Upload and Download';
        },
        () => {
            // Upload complete
            console.log('Upload successful');
            progressText.textContent = 'Upload and Download';

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




//Add an event listener when showbutton is clicked
showButton.addEventListener('click', () => {
    scrollingBar.innerHTML = '';
    const imagesRef = storage.ref('images');
    //List all the image sin the folder
    imagesRef.listAll().then((res) => {
        res.items.forEach((itemRef) => {
            //Get Download URL for each img
            itemRef.getDownloadURL().then((downloadURL) => {
                //create an img element and set the source downloadURL
                const img = document.createElement('img');
                img.src = downloadURL;
                scrollingBar.appendChild(img);
            }).catch((error) =>{
                console.error('Error getting download URL:', error);
            });
        });
    }).catch((error) => {
        console.error('Error listing images:', error);
    });
});