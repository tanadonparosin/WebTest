
function logOutUser(e){
    firebase.auth().signOut();
    console.log("Logout completed.");
    window.location.href="index.html";
}