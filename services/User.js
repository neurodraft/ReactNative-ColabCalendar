import firebase from "../firebase";

export default new (function () {
    const collection = "users";

    this.new = (uid, user) =>
        firebase
            .firestore()
            .collection(collection)
            .doc(uid)
            .set(user)
            .then(() => {
                console.log("Document successfully written!");
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });

    return this;
})();
