"use script";
import html2canvas from "html2canvas-pro";

//Form variables
const inputImg = document.querySelector(".input-img");
const fileErrorMsg = document.getElementById("upload-error-msg");
const errorMsg = document.querySelector(".error-msg");
const uploadImg = document.getElementById("upload-img");
const dropTxt = document.getElementById("drop-txt");
const changeRemoveDiv = document.getElementById("change-remove-div");
const emailContaineer = document.querySelector(".email-container");
const emailError = document.querySelector(".error-msg");
const removeBtn = document.getElementById("remove-btn");
const changeBtn = document.getElementById("change-btn");
const uploadSrc = uploadImg.src;
// const generateBtn = document.getElementById("generate-ticket");

//Ticket variables
const userForm = document.getElementById("user-form");
const formDiv = document.getElementById("form");
const ticket = document.getElementById("ticket");
const ticketNum = document.getElementById("ticket-num");
const emailAddr = document.getElementById("email");
const userName = document.querySelectorAll(".user-name");
const githubName = document.querySelector(".github-name");
const profileImg = document.getElementById("profile-img");
const ticketImg = document.getElementById("ticket-img");
const download = document.querySelector(".download");

if (emailError.classList.contains("hidden")) {
  emailContaineer.style.paddingBottom = "1.3rem";
}

let fileUrl = "";

inputImg.addEventListener("change", () => {
  const imgFile = inputImg.files[0];
  fileUrl = URL.createObjectURL(imgFile);
  const imgSize = Math.trunc(imgFile.size / 1024);

  // console.log(imgSize);
  // console.log(fileUrl);

  if (imgSize > 500) {
    fileErrorMsg.style.display = "none";
    errorMsg.style.display = "block";
    inputImg.value = "";
  } else {
    fileErrorMsg.style.display = "flex";
    errorMsg.style.display = "none";
    uploadImg.src = fileUrl;
    uploadImg.classList.remove("p-2");
    dropTxt.style.display = "none";
    changeRemoveDiv.style.display = "block";
  }
});

removeBtn.addEventListener("click", function () {
  inputImg.value = "";
  uploadImg.src = uploadSrc;
  uploadImg.classList.add("p-2");
  dropTxt.style.display = "block";
  changeRemoveDiv.style.display = "none";
});

changeBtn.addEventListener("click", () => {
  inputImg.value = "";
  inputImg.click();
});

let ticketDigit = "";

userForm.addEventListener("submit", (e) => {
  e.preventDefault();

  function generateTicketNum(length) {
    for (let i = 0; i < length; i++) {
      ticketDigit += Math.trunc(Math.random() * 10);
    }
    console.log(ticketDigit);
  }
  generateTicketNum(5);

  const githubInput = document.getElementById("github").value;
  const emailInput = document.querySelector(".email").value;
  const nameInput = document.getElementById("full-name").value;

  const transformedName = nameInput
    .split(" ")
    .map((word) => {
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");

  const inputs = document.querySelectorAll("input");
  // console.log(inputs);
  let isFilled = true;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      isFilled = false;
    }
  });

  if (!isFilled) {
    alert("Please fill all the forms");
    return;
  } else {
    formDiv.style.display = "none";
    ticket.style.display = "block";

    userName.forEach((name) => {
      name.textContent = transformedName;
    });
    emailAddr.textContent = emailInput;
    githubName.textContent = githubInput;
    profileImg.src = fileUrl;
    ticketNum.textContent = ticketDigit;
  }
});

download.addEventListener("click", () => {
  html2canvas(ticketImg).then((canvas) => {
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "my-ticket.png";
    link.click();
  });
});
