import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCWzttWHmPGxVINMksXgVkqjzP4jFHf0wE",
    authDomain: "wartactic-8a8a1.firebaseapp.com",
    projectId: "wartactic-8a8a1",
    storageBucket: "wartactic-8a8a1.firebasestorage.app",
    messagingSenderId: "409457288660",
    appId: "1:409457288660:web:bafb9b3a475c1a31c56241",
    measurementId: "G-M438315YTV"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        // Exit Animation
        const card = document.querySelector('.login-card');
        if (card) {
            card.style.transform = 'translateY(-20px)';
            card.style.opacity = '0';
            card.style.transition = 'all 0.5s ease';
        }
        
        setTimeout(() => { window.location.href = "index.html"; }, 600);
    }
});

let isLogin = true;
const form = document.getElementById('auth-form');
const emailIn = document.getElementById('email');
const passIn = document.getElementById('password');
const btn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');
const btnLoader = document.getElementById('btn-loader');
const toggle = document.getElementById('toggle-mode');
const toggleTextP = document.getElementById('toggle-text');
const errorMsg = document.getElementById('error-msg');

toggle.addEventListener('click', () => {
    isLogin = !isLogin;
    btnText.innerText = isLogin ? "Sign In" : "Create Account";
    
    // Update toggle text safely
    const prefix = isLogin ? "Don't have an account? " : "Already have an account? ";
    const actionText = isLogin ? "Create Account" : "Sign In";
    
    toggleTextP.innerHTML = `${prefix}<span id="toggle-mode">${actionText}</span>`;
    
    // Re-attach event listener since span was recreated
    document.getElementById('toggle-mode').addEventListener('click', () => toggle.click());
    
    errorMsg.style.display = 'none';
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailIn.value;
    const pass = passIn.value;

    errorMsg.style.display = 'none';
    btn.disabled = true;
    btn.style.cursor = 'wait';
    btnText.style.display = 'none';
    btnLoader.style.display = 'block';

    try {
        if (isLogin) {
            await signInWithEmailAndPassword(auth, email, pass);
        } else {
            await createUserWithEmailAndPassword(auth, email, pass);
        }
    } catch (error) {
        errorMsg.innerText = error.message.replace('Firebase:', '').replace('Error', '');
        errorMsg.style.display = 'block';
        
        btn.disabled = false;
        btn.style.cursor = 'pointer';
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
    }
});