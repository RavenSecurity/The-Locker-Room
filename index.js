    emailInput = document.getElementById('email')
    passwordInput = document.getElementById('password')
    
    function login() {
        fetch('https://lokkeroom.herokuapp.com/api/login', {
       method:"POST",
       body:JSON.stringify({
           "email": emailInput.value,
           "password": passwordInput.value
       }),
       headers:{
           "Content-type":"application/json; charset=UTF-8"
   
       }
    })
    .then(res=>res.json())
    .then(data=>{
       console.log(data);

       if (data.error) {
        alert(data.error)
       } else { 
        window.location = "/app.html";
        document.cookie = "AccessToken=" + Object.values(data)[0] + "; max-age=7200; path=/;";
        document.cookie = "RefreshToken=" + Object.values(data)[1] + "; max-age=7200; path=/;";
       }
    //    data.token = true
    })
    
}
   
    document.getElementById('signin').addEventListener('click',(e)=>{
        e.preventDefault();
        login();
       })

    //    1: Store le token valide dans un cookie
    //    2: Redirection vers app.html
    // 3: au chargement de logun checker si le cookie est créé
    // 4: si le cooki est là => redirection
    // 5: Cookie date d'exp doit = Token date exp (24 heures)