const playerJoinInfo = firebase.database().ref("PlayerN&P");

let readRoomList = () => {
    var ref = firebase.database().ref("RoomList");
    var number = 0;
    document.getElementById("lobby_table").innerHTML = "";
    ref.once("value").then((snapshot) => {
        snapshot.forEach((data) => {
            var id = data.key;
            let roomname = snapshot.child(id).child("RoomName").val();
            let roompass = snapshot.child(id).child("RoomPassword").val();
            let qcat = snapshot.child(id).child("QuestCategory").val();
            let roomstate = '';
            number += 1

            if (roompass == "") {
                roomstate = 'ไม่มีรหัสผ่าน';
            }
            else {
                roomstate = 'มีรหัสผ่าน'
            }
            const roomdetail = `                    
                <div class="row" class="justify-content-center">
                    <div class="col">${number}</div>
                    <div class="col">${roomname}</div>
                    <div class="col">${qcat}</div>
                    <div class="col">${roomstate}</div>
                    <div class="col"><button type="button" class="btn btn-success btn-join" data-jname="${roomname}" data-jpass="${roompass}" data-key="${id}"data-bs-toggle="modal"
                    data-bs-target="#modal-join">Join Room</button></div>
                </div>`;
            const addRowRoom = document.createRange().createContextualFragment(roomdetail);
            document.getElementById("lobby_table").appendChild(addRowRoom);
        })
        document.querySelectorAll("button.btn-join").forEach((btn) => {
            btn.addEventListener("click", playerJoinRoom);
        });
    })
}
window.onload = readRoomList;

const refresh = document.getElementById("refresBtn");
refresh.addEventListener("click", readRoomList);

const joinform = document.getElementById("Join-Room-form");
joinform.addEventListener("click", playerJoinRoom);

function playerJoinRoom(event) {
    const currentUser = firebase.auth().currentUser;
    const modalrname = document.getElementById("RoomN");
    // const modalrpass = document.getElementById("RoomP");
    const joinname = event.currentTarget.getAttribute('data-jname');
    const joinpass = event.currentTarget.getAttribute('data-jpass');
    const joinkey = event.currentTarget.getAttribute('data-key');
    modalrname.innerText = "Room Name : " + joinname;

    userListRef.child(`${currentUser.uid}`).update({
        Location: joinkey
    });
    roomRef.child(joinkey).update({
        PlayerX: currentUser.uid
    });
    // const joinform = document.getElementById("btnJoin-Room");
    // joinform.addEventListener("click", function () {
    //     if (modalrpass == joinpass) {
    window.location.href = `Room.html?roomname=${joinname}_password=${joinpass}`;
    //     }
    //     else {
    //         alert("Incorrect Password,Please Enter The Correct Password.")
    //     }
    // });
}

function playerAccept() {
    const currentUser = firebase.auth().currentUser;
    playerJoinInfo.child(`${currentUser.uid}`).once('value').then((snapshot) => {
        let data = snapshot.val();
        let name = data.NameRoomtoJoin
        const playerForm = document.getElementById("playerDisplayinRoom");
        const playerProfile = document.querySelector(".playerProfile");

        const addbtn = `
                    <button type="button" class="btn btn-danger" id="${currentUser.uid}" onclick="quitRoom()">
                        End Room
                        </button>
            `;
        const newElement = document.createRange().createContextualFragment(addbtn);
        document.getElementById("btn-endroom").appendChild(newElement);

        playerProfile.src = currentUser.photoURL;
        if (playerForm.value == "") {
            let tmpID = `Player-${currentUser.displayName}-id`;
            let tmpEmail = `Player-${currentUser.displayName}-email`;
            let OwnerRole = "Player-Play-as-X"
            gameRef.child(`${name}`).update({
                [OwnerRole]: "PlayerX",
                [tmpID]: currentUser.uid,
                [tmpEmail]: currentUser.email
            });
            console.log(currentUser.email + " added.");
            playerForm.value = currentUser.displayName;
        }
    });
    document.getElementById("PlayerAccepttoplay").disabled = true;
}

function quitRoom() {
    console.log("clicked")
    window.location.href = "mainMenu.html";
}
