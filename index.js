
    fetch('https://lokkeroom.herokuapp.com/api/login', {
       method:"POST",
       body:JSON.stringify({
           "email": "tes",
           "password":"test"
       }),
       headers:{
           "Content-type":"application/json; charset=UTF-8"
   
       }
    })
    .then(res=>res.json())
    .then(data=>{
       console.log(data);
    })
   