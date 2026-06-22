/* =====================================
   CONFIG
===================================== */

const API_URL =
  "https://script.google.com/macros/s/AKfycbyOutjag1r91t9cLHWy967K8tb7-eP9m3Nl6pKvOFfh8rDAs-mPutTxXzqXmZrqjh5Plw/exec";



/* =====================================
   LOGIN CHECK
===================================== */

const username =
  localStorage.getItem("username");

if (!username) {

  window.location.href =
    "login.html";

}

/* =====================================
   PAGE LOAD
===================================== */

document.addEventListener(
  "DOMContentLoaded",
  function () {

    M.AutoInit();

    loadProfile();

    document
      .getElementById("logoutBtn")
      .addEventListener(
        "click",
        logout
      );

    document
      .getElementById("changePasswordForm")
      .addEventListener(
        "submit",
        changePassword
      );

  }
);

/* =====================================
   LOAD PROFILE
===================================== */

async function loadProfile() {

  try {

    const response =
      await fetch(API_URL, {

        method: "POST",

        body: JSON.stringify({

          action: "getProfile",

          username: username

        })

      });

    const result =
      await response.json();

    if (result.success) {

      const user =
        result.user;

      document
        .getElementById("welcomeName")
        .textContent =
        user.name;

      document
        .getElementById("name")
        .textContent =
        user.name;

      document
        .getElementById("username")
        .textContent =
        user.username;

      document
        .getElementById("email")
        .textContent =
        user.email;

      document
        .getElementById("phone")
        .textContent =
        user.phone;

      const date =
        new Date(user.timestamp);

      document
        .getElementById("memberSince")
        .textContent =
        date.getFullYear();

      loadFortune();

    }
    else {

      M.toast({
        html: result.message,
        classes: "red"
      });

    }

  }
  catch (error) {

    console.error(error);

    M.toast({
      html: "Unable to load profile",
      classes: "red"
    });

  }

}

/* =====================================
   FORTUNE MESSAGE
===================================== */

function loadFortune() {

  const fortunes = [

    "✨ Trust your intuition today.",

    "🌙 A new opportunity is approaching.",

    "⭐ Good luck is surrounding you.",

    "🔮 Positive energy is flowing your way.",

    "💫 Believe in your inner wisdom.",

    "🌟 A meaningful connection awaits.",

    "🪄 The answers you seek are closer than you think.",

    "🌈 Positive changes are on the horizon."

  ];

  const randomFortune =

    fortunes[
      Math.floor(
        Math.random() *
        fortunes.length
      )
    ];

  document
    .getElementById(
      "fortuneMessage"
    )
    .textContent =
    randomFortune;

}

/* =====================================
   CHANGE PASSWORD
===================================== */

async function changePassword(e) {

  e.preventDefault();

  const currentPassword =
    document
      .getElementById(
        "currentPassword"
      )
      .value;

  const newPassword =
    document
      .getElementById(
        "newPassword"
      )
      .value;

  const confirmPassword =
    document
      .getElementById(
        "confirmPassword"
      )
      .value;

  /* ================================
     VALIDATION
  ================================ */

  if (newPassword.length < 6) {

    M.toast({

      html:
        "Password must be at least 6 characters",

      classes:
        "red"

    });

    return;

  }

  if (newPassword !== confirmPassword) {

    M.toast({

      html:
        "Passwords do not match",

      classes:
        "red"

    });

    return;

  }

  try {

    showLoading();

    const response =
      await fetch(API_URL, {

        method: "POST",

        body: JSON.stringify({

          action:
            "changePassword",

          username:
            username,

          currentPassword:
            currentPassword,

          newPassword:
            newPassword

        })

      });

    const result =
      await response.json();

    if (result.success) {

      M.toast({

        html:
          "Password updated. Please login again.",

        classes:
          "green"

      });

      setTimeout(() => {

        localStorage.clear();

        window.location.href =
          "login.html";

      }, 1500);

    }
    else {

      hideLoading();

      M.toast({

        html:
          result.message,

        classes:
          "red"

      });

    }

  }
  catch (error) {

    hideLoading();

    console.error(error);

    M.toast({

      html:
        "Server Error",

      classes:
        "red"

    });

  }

}

/* =====================================
   LOGOUT
===================================== */

function logout(e) {

  e.preventDefault();

  localStorage.clear();

  window.location.href =
    "index.html";

}

/* =====================================
   LOADING OVERLAY
===================================== */

function showLoading() {

  document
    .getElementById(
      "loadingOverlay"
    )
    .style.display =
    "flex";

}

function hideLoading() {

  document
    .getElementById(
      "loadingOverlay"
    )
    .style.display =
    "none";

}