import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";
import { firebaseConfig } from "./firebaseConfig.js";

console.log(firebaseConfig);
firebase.initializeApp(firebaseConfig);
firebase.analytics();

// utils
const db = firebase.firestore();

// refs
const people = db.collection("royalFamily");

function GetPersonByID(personID) {
    return people
        .where("PersonID", "==", personID)
        .get()
        .then(function (query) {
            let arr = [];
            query.forEach(function (doc) {
                arr.push(doc.data());
            });
            return arr;
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}

function GetFirstPerson() {
    return people
        .orderBy("PersonID")
        .limit(1)
        .get()
        .then(query => {
            let arr = [];
            query.forEach(function (doc) {
                arr.push(doc.data());
            });
            return arr;
        })
        .catch(function (error) {
            console.log("Error getting documents: ", error);
        });
}

// export utils/refs
export default {
    GetPersonByID,
    GetFirstPerson
}