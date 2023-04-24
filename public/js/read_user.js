let getList = (user) => {
    if (user) {
        userListRef.child(user.uid).on("value", (snapshot) => {
        });
    }
};