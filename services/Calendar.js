
import firebase from "../firebase";

export default new (function(){

    const collection = 'calendars'

    this.new = calendar => firebase.firestore().collection(collection).add(calendar)

    
    return this;
})