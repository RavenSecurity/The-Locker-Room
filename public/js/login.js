const loginEmail = document.querySelector('#login_email')
const loginPassword = document.querySelector('#login_password')

  


//login
export default function login(){
 fetch('http://localhost:5000/api/login',{
    method:"POST",
    body:JSON.stringify({
        "email":loginEmail.value,
        "password":loginPassword.value
    }),
    headers:{
        "Content-type":"application/json; charset=UTF-8"
        
    }
 })
 .then(res=>res.json())
 .then(data=>{
    console.log(data);
 })
}




