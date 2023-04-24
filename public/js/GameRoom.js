window.onload = () => {
    const currentUser = firebase.auth().currentUser;
    userListRef.child(currentUser.uid).once('value').then((snapshot) => {
        const data = snapshot.val();
        roomRef.child(data.Location).on("value", roomsnap => {
            showPlayerProfile(roomsnap)
        })
    })
    
}

function showPlayerProfile(roomsnap){
    const OwnerForm = document.getElementById("ownerDisplayinRoom");
    const OwnerProfile = document.querySelector(".OwnerProfile");
}