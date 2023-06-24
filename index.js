const exitButton = document.getElementById('exitButton');
exitButton.addEventListener('click', () => {
    console.log("Exit button clicked");
    const confirmed = window.confirm("Do you really want to exit?");
    if(confirmed){
        setTimeout(() => {
            window.location.href = "./exit.html";
        }, 2000);
    }
});