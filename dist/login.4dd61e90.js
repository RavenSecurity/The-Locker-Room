const loginEmail = document.querySelector("#login_email");
const loginPassword = document.querySelector("#login_password");
const loginButton = document.querySelector(".login_button");
//login
function login() {
    fetch("http://localhost:5000/api/login", {
        method: "POST",
        body: JSON.stringify({
            "email": loginEmail.value,
            "password": loginPassword.value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8,authorization"
        }
    }).then((res)=>res.json()).then((data)=>{
        console.log(data);
    });
}
loginButton.addEventListener("click", ()=>{
    // login()
    alert("connected");
    parent.location = "./group.html";
});

//# sourceMappingURL=login.4dd61e90.js.map
