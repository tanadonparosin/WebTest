var gameRef = firebase.database().ref("Game");
const roomRef = firebase.database().ref("RoomList");

let addRoom = () => {
    var roomname = document.getElementById("getRoomN").value;
    var roompass = document.getElementById("getRoomP").value;
    var qcategory = document.getElementById("qcategory").value;

    const currentUser = firebase.auth().currentUser;
    console.log(currentUser)

    roomRef.push({
        RoomName: roomname,
        RoomPassword: roompass,
        QuestCategory: qcategory,
    }).then(thisroom => {
        roomRef.child(thisroom.key).once('value').then((snapshot) => {
            userListRef.child(`${currentUser.uid}`).update({
                Location: thisroom.key
            })
        })
        roomRef.child(thisroom.key).update({
            PlayerO: currentUser.uid
        })
    })




    alert("Add list complete!");
    document.getElementById("getRoomN").value = "";
    document.getElementById("getRoomP").value = "";
    document.getElementById("qcategory").value = "";
    window.location.href = `Room.html?roomname=${roomname}_password=${roompass}`;

}
const addbtn = document.getElementById('addRoom_from_Owner');
addbtn.addEventListener("click", addRoom);

function keyroom() {
    // const currentUser = firebase.auth().currentUser;
    // const OwnerForm = document.getElementById("ownerDisplayinRoom");
    // const OwnerProfile = document.querySelector(".OwnerProfile");
    // // document.getElementById("idforleave").id = `${currentUser.uid}`
    // const addbtn = `
    //                 <button type="button" class="btn btn-danger" id="${currentUser.uid}" onclick="Endroom()">
    //                     End Room
    //                     </button>
    //         `;
    // const newElement = document.createRange().createContextualFragment(addbtn);
    // document.getElementById("btn-endroom").appendChild(newElement);

    // OwnerProfile.src = currentUser.photoURL;
    if (OwnerForm.value == "") {

        roomRef.child(`${currentUser.uid}-Room`).once('value').then((snapshot) => {
            let OwnerID = `Owner-${currentUser.displayName}-id`;
            let OwnerEmail = `Owner-${currentUser.displayName}-email`;
            let OwnerRole = "Owner-Play-as-O"
            let data = snapshot.val();
            let OwnerRoomName = data.RoomName;

            gameRef.child(`${OwnerRoomName}`).update({
                [OwnerRole]: "Player-O",
                [OwnerID]: currentUser.uid,
                [OwnerEmail]: currentUser.email
            });
            console.log(currentUser.email + " added.");
            userListRef.child(currentUser.uid).once("value").then((snapshot) => {
                var u_name = snapshot.val().displayName;
                OwnerForm.value = u_name;
            });
        });
    }
    document.getElementById("OwnerStartRoom").disabled = true;
}
function showRoomOwner(snapshot) {
    const OwnerForm = document.getElementById("ownerDisplayinRoom");
    const OwnerProfile = document.querySelector(".OwnerProfile");
    // document.getElementById("idforleave").id = `${currentUser.uid}`
    const addbtn = `
                    <button type="button" class="btn btn-danger" id="${currentUser.uid}" onclick="Endroom()">
                        End Room
                        </button>
            `;
    const newElement = document.createRange().createContextualFragment(addbtn);
    document.getElementById("btn-endroom").appendChild(newElement);

    OwnerProfile.src = currentUser.photoURL;
}
gameRef.on("value", (snapshot) => {
    keyroom();
    playerAccept()
    showRoomOwner(snapshot);
})
function Endroom() {
    console.log("clicked")
    const currentUser = firebase.auth().currentUser;
    roomRef.child(`${currentUser.uid}-Room`).remove();
    console.log("delete Room");
    window.location.href = "mainMenu.html";
}

