const userListRef = firebase.database().ref("UserList");

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        readList(user);
        
    } else {

    }
})

let readList = (user) => {
    console.log("readList running")
    console.log(user);
    document.querySelector("#userDisplay").innerHTML = "";
    try {
        userListRef.child(user.uid).once("value").then((snapshot) => {
            var u_name = snapshot.val().displayName;
            const newDiv = `
                    <h2>Hello, ${u_name}</h2>
                    <img src="${user.photoURL}">
                    `;
            const newEle = document.createRange().createContextualFragment(newDiv);
            document.querySelector("#userDisplay").appendChild(newEle);
        })
    } catch (e) {
        console.error(e);
    }
}

function loginUser(e) {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((userInfo) => {
        const user_id = userInfo.user.uid;
        userListRef.child(user_id).once("value").then(doc => {
            // console.log(doc.val().displayName);
            let c_user = doc.val();
            console.log(doc.val());
            if (c_user == null) {
                window.location.href = "createUser.html";
            } else {
                window.location.href = "mainMenu.html";
            }
        })
    }).catch((error) => {
        console.error(error);
    })
}

function gotolobby() {
    console.log("goLobby clicked");
    window.location.href = "Lobby.html";
}

function createRoom() {
    console.log("createRoom clicked");
    window.location.href = "createroom.html";
}

function logOutUser(e) {
    firebase.auth().signOut();
    console.log("Logout completed.");
    window.location.href = "index.html";
}

let getList = (user) => {
    if (user) {
        userListRef.child(user.uid).on("value", (snapshot) => {
            readList(user);
        });
    }
};