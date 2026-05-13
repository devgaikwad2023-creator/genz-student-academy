import { auth } from "./firebase.js";

window.logoutUser = () => {
    signOut(auth).then(() => {
        alert("Logged Out!");
        window.location.href = "index.html"; // Logout ke baad seedha home page
    });
};
