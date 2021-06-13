let loginBtn = document.getElementById("loginBtn");
let registrationBtn = document.getElementById("registerBtn");
let loginForm = document.getElementById("login_form");
let registrationForm = document.getElementById("registration_form");

let loginText = document.getElementById("login_text");
let registrationText = document.getElementById("registration_text");

registrationForm.style.display = "none";

loginText.addEventListener("click", function(){
  registrationForm.style.display = "none";
  loginForm.style.display = "block";
  if(!loginText.classList.contains("active")){
    registrationText.classList = [];
    loginText.classList.add("active");
  }
});

registrationText.addEventListener("click", function(){
  loginForm.style.display = "none";
  registrationForm.style.display = "block";
  if(!registrationText.classList.contains("active")){
    loginText.classList = [];
    registrationText.classList.add("active");
  }
});

loginBtn.addEventListener("click", function(){
  let email = document.getElementById("email_log").value;
  let password = document.getElementById("password_log").value;

  $.ajax({
    url: "https://carrent-backend.herokuapp.com/login",
    type: "post",
    data: {
      email: email,
      password: password
    },
    success: function(result){
      let currentUser = {
        id: result[0].id,
        email: result[0].email,
        password: result[0].password,
        name: result[0].name,
        number: result[0].number,
        address: result[0].address
      }
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      location.href = "discover.html"
    },
    error: function(){
      console.log("error while login");
    }
  });
})

registrationBtn.addEventListener("click", function(){
  let email = document.getElementById("email_reg").value;
  let password = document.getElementById("password_reg").value;
  let name = document.getElementById("name_reg").value;
  let address = document.getElementById("address_reg").value;
  let number = document.getElementById("number_reg").value;

  console.log("register btn click");

  $.ajax({
    url: "https://carrent-backend.herokuapp.com/customers",
    type: "post",
    data: {
      email: email,
      password: password,
      name: name,
      address: address,
      number: number
    },
    success: function(){
      console.log("register success");

      registrationForm.style.display = "none";
      loginForm.style.display = "block";
      if(!loginText.classList.contains("active")){
        registrationText.classList = [];
        loginText.classList.add("active");
      }
    },
    error: function(){
      console.log("error while login");
    }
  });
})