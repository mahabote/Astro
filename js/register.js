/* =====================================
   CONFIG
===================================== */

// Your deployed Apps Script Web App URL
const API_URL =
  "https://script.google.com/macros/s/AKfycbyOutjag1r91t9cLHWy967K8tb7-eP9m3Nl6pKvOFfh8rDAs-mPutTxXzqXmZrqjh5Plw/exec";



/* =====================================
   PAGE LOAD
===================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    M.AutoInit();
    M.updateTextFields();

    document
      .getElementById("registerForm")
      .addEventListener(
        "submit",
        registerUser
      );

  }
);

/* =====================================
   REGISTER USER
===================================== */

async function registerUser(e) {

  e.preventDefault();

  const name =
    document
      .getElementById("name")
      .value
      .trim();

  const username =
    document
      .getElementById("username")
      .value
      .trim();

  const password =
    document
      .getElementById("password")
      .value;

  const email =
    document
      .getElementById("email")
      .value
      .trim();

  const phone =
    document
      .getElementById("phone")
      .value
      .trim();

  /* =====================================
     BASIC VALIDATION
  ===================================== */

  if (!name) {

    M.toast({
      html: "Please enter your name",
      classes: "red"
    });

    return;
  }

  if (!username) {

    M.toast({
      html: "Please enter a username",
      classes: "red"
    });

    return;
  }

  if (username.length < 4) {

    M.toast({
      html: "Username must be at least 4 characters",
      classes: "red"
    });

    return;
  }

  if (!password) {

    M.toast({
      html: "Please enter a password",
      classes: "red"
    });

    return;
  }

  if (password.length < 6) {

    M.toast({
      html: "Password must be at least 6 characters",
      classes: "red"
    });

    return;
  }

  if (!email) {

    M.toast({
      html: "Please enter an email address",
      classes: "red"
    });

    return;
  }

  if (!phone) {

    M.toast({
      html: "Please enter a phone number",
      classes: "red"
    });

    return;
  }

  /* =====================================
     SHOW LOADING
  ===================================== */

  showLoading();

  const registerBtn =
    document.getElementById("registerBtn");

  registerBtn.disabled = true;

  /* =====================================
     REQUEST DATA
  ===================================== */

  const data = {

    action: "register",

    name: name,

    username: username,

    password: password,

    email: email,

    phone: phone

  };

  try {

    const response =
      await fetch(API_URL, {

        method: "POST",

        body: JSON.stringify(data)

      });

    const result =
      await response.json();

    /* =====================================
       SUCCESS
    ===================================== */

    if (result.success) {

      M.toast({
        html:
          "Registration successful!",
        classes:
          "green"
      });

      setTimeout(() => {

        window.location.href =
          "index.html?registered=1";

      }, 1000);

    }

    /* =====================================
       FAILED
    ===================================== */

    else {

      hideLoading();

      registerBtn.disabled = false;

      M.toast({
        html:
          result.message ||
          "Registration failed",
        classes:
          "red"
      });

    }

  }

  /* =====================================
     SERVER ERROR
  ===================================== */

  catch (error) {

    console.error(error);

    hideLoading();

    registerBtn.disabled = false;

    M.toast({
      html:
        "Unable to connect to server",
      classes:
        "red"
    });

  }

}

/* =====================================
   SHOW LOADING
===================================== */

function showLoading() {

  document
    .getElementById("loadingOverlay")
    .style.display =
    "flex";

}

/* =====================================
   HIDE LOADING
===================================== */

function hideLoading() {

  document
    .getElementById("loadingOverlay")
    .style.display =
    "none";

}