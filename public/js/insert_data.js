let createDisplayname = () => {
    var d_name = document.querySelector('#toDoInput').value;

    const currentUser = firebase.auth().currentUser;
    userListRef.child(currentUser.uid).set({
        displayName: d_name,
        score: 0,
        win: 0,
        lose: 0,
    })

    console.log("create displayName completed!!!");
    document.querySelector('#toDoInput').value = "";
    window.location.href = "mainMenu.html";
}
