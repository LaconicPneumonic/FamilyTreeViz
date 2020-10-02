import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/analytics";
import "firebase/auth";
import { firebaseConfig } from "./firebaseConfig.js";

firebase.initializeApp(firebaseConfig)
firebase.analytics();

// utils
const db = firebase.firestore();
const auth = firebase.auth();

// refs
const people = db.collection("royalFamily");

async function LogInUser(email, password) {
    try {
        await auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
        return firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e) {
        // we want to obfuscate the reason behind a bad login to hinder brute force attacks
        return null;
    }
}

async function GetPersonByID(personID) {
    try {
        const query = await people
            .where("PersonID", "==", personID)
            .get();
        let arr = [];
        query.forEach(function (doc) {
            arr.push(doc.data());
        });
        return arr;
    } catch (error) {
        return null;
    }
}

async function GetFirstPerson() {
    try {
        const query = await people
            .orderBy("PersonID")
            .limit(1)
            .get();
        let arr = [];
        query.forEach(function (doc) {
            arr.push(doc.data());
        });
        return arr;
    } catch (error) {
        return null;
    }
}

var store = {
    state: {
        loggedIn: false
    },
}

// firebase auth state watcher used because the direct call to auth().currentUser is inaccurate
auth.onAuthStateChanged(user => {
    if (user) {
        store.loggedIn = true;
    } else {
        store.loggedIn = false;
    }
})

export default {
    GetPersonByID,
    GetFirstPerson,
    LogInUser,
    auth,
    store
}