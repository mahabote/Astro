/* =====================================
   CONFIG
===================================== */

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
      .getElementById("loginForm")
      .addEventListener(
        "submit",
        loginUser
      );

  }
);

/* =====================================
   LOGIN
===================================== */

async function loginUser(e){

  e.preventDefault();

  const username =
    document
      .getElementById("username")
      .value
      .trim();

  const password =
    document
      .getElementById("password")
      .value;

  showLoading();

  try{

    const response =
      await fetch(API_URL,{

        method:"POST",

        body:JSON.stringify({

          action:"login",

          username,

          password

        })

      });

    const result =
      await response.json();

    if(result.success){

      localStorage.setItem(
        "username",
        result.username
      );

      localStorage.setItem(
        "name",
        result.name
      );

      window.location.href =
        "dashboard.html";

    }
    else{

      hideLoading();

      M.toast({

        html:
        result.message,

        classes:
        "red"

      });

    }

  }
  catch(error){

    console.error(error);

    hideLoading();

    M.toast({

      html:
      "Server Error",

      classes:
      "red"

    });

  }

}

/* =====================================
   LOADING
===================================== */

function showLoading(){

  document
    .getElementById("loadingOverlay")
    .style.display =
    "flex";

}

function hideLoading(){

  document
    .getElementById("loadingOverlay")
    .style.display =
    "none";

}