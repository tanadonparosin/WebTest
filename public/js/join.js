//Join Room//
// const btnJoins = document.querySelectorAll(".joinBtn");
// btnJoins.forEach((btnJoin) => btnJoin.addEventListener("click", joingame));

// function join_room(event){
//     const currentUser = firebase.auth().currentUser;
//     console.log("[Join] Current user", currentUser);
//     if (currentUser) {
//         const Role = event.currentTarget.getAttribute("id");
//         console.log(Role);
//         const player = Role[Role.length - 1];

//         const playerForm = document.getElementById(`Player-${player}`);
//         if (playerForm.value == "") {
//             let tmpID = `Player-${player}-id`;
//             let tmpEmail = `Player-${player}-email`;
//             gameRef.child(`game-${currentUser.displayName}`).update({
//                 [tmpID]: currentUser.uid,
//                 [tmpEmail]: currentUser.email
//             });
//             console.log(currentUser.email + " Joined.");
//         }
//     }
// }

// function getGameInfo(snapshot) {
//     document.getElementById("inputPlayer-x").value = "";
//     document.getElementById("inputPlayer-o").value = "";
//     const currentUser = firebase.auth().currentUser;

//     snapshot.forEach((data) => {
//         const gameInfo = data.val();
//         Object.keys(gameInfo).forEach((key) => {
//             playerX = document.getElementById("Player-x");
//             playerO = document.getElementById("Player-o");
//             switch (key) {
//                 case "user-x-email":
//                     if (gameInfo[key]){
//                         playerX.value = gameInfo[key];
//                         if (playerX.value == currentUser.email){
//                             document.querySelector("#btnJoin-o").disabled = true;
//                             document.querySelector("#btnJoin-x").disabled = true;
//                         }
//                         else {
//                             document.querySelector("#btnJoin-x").disabled = true;
//                         }
                        
//                     }
//                     else {
//                         if (playerO.value != currentUser.email){
//                             document.querySelector("#btnJoin-x").disabled = false;
//                         }
//                     }break;
//                 case "user-o-email":
//                     if (gameInfo[key]){
//                         playerO.value = gameInfo[key];
//                         if (playerO.value == currentUser.email){
//                             document.querySelector("#btnJoin-x").disabled = true;
//                             document.querySelector("#btnJoin-o").disabled = true;
//                         }
//                         else {
//                             document.querySelector("#btnJoin-o").disabled = true;
//                         }
                        
//                     }
//                     else {
                        
//                             document.querySelector("#btnJoin-o").disabled = false;
                        
//                     }break;
//                 case "state":
//                     if (gameInfo[key] == "play"){
//                         document.querySelector("#btnStartGame").disabled = true;
//                         document.querySelector("#btnCancel-x").disabled = true;
//                         document.querySelector("#btnCancel-o").disabled = true;
//                         document.querySelectorAll(".table-col").forEach(col => col.addEventListener('click', printTable))
//                     }
//                     else if (gameInfo[key] == "prepare"){
//                         document.querySelector("#btnStartGame").disabled = gameInfo["user-o-email"] == "" || gameInfo["user-x-email"] == "";
//                         document.querySelector("#btnCancel-x").disabled = false;
//                         document.querySelector("#btnCancel-o").disabled = false;
//                         document.querySelectorAll(".table-col").forEach(col => col.removeEventListener('click', printTable))
//                     }
//             }
//         })
//     })
// }

// gameRef.on("value", (snapshot) => {
//     getGameInfo(snapshot);
// })

function openRoom(){
    
    const currentUser = firebase.auth().currentUser;
    
    console.log('create Room Complete');
    
    console.log("[Join] Current user CreateRoom", currentUser);
    if (currentUser) {
        const playerForm = document.getElementById(`Player-x`);
        if (playerForm.value == "") {
            let tmpID = `owner-x-id`;
            let tmpEmail = `owner-x-email`;
            gameRef.child(`game-${currentUser.uid}`).update({
                [tmpID]: currentUser.uid,
                [tmpEmail]: currentUser.email
            });
            console.log(currentUser.email + " added.");
        }
    }
    document.querySelector("#ownerDisplayinRoom").innerHTML = "";
    try {
        userListRef.child(user.uid).once("value").then((snapshot) => {
            var u_name = snapshot.val().displayName;
            const newDiv = `
                    <h2>Hello, ${u_name}</h2><br>
                    <img src="${user.photoURL}">
                    `;
            const newEle = document.createRange().createContextualFragment(newDiv);
            document.querySelector("#ownerDisplayinRoom").appendChild(newEle);
        })
    } catch (e) {
        console.error(e);
    }
    window.location.href = "Room.html";
}