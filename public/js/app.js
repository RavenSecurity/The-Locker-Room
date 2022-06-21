const loginButton=document.querySelector('.login_button')
const registerOverlay=document.querySelector('.register-overlay')
const loginOverlay=document.querySelector('.login-overlay')
const registerOverlayButton=document.querySelector('.overlay-register-button')
const loginOverlayButton=document.querySelector('.overlay-login-button')
const lobby =document.querySelector('.lobby')


import login from './login'

loginButton.addEventListener('click',(e)=>{
    e.preventDefault();
    login();
    lobby.style.display="flex"
    loginOverlay.style.display="none"
   

    
   })
   

   registerOverlayButton.addEventListener('click',()=>{
    registerOverlay.style.display="flex"
    loginOverlay.style.display='none'
   })
   loginOverlayButton.addEventListener('click',()=>{
    registerOverlay.style.display="none"
    loginOverlay.style.display='flex'
   })


