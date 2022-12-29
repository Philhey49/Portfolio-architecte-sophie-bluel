let user ={
    'email': email,
    'password': password,
  };
  (async function main () {
    // You can use await inside this function block
    let response = await fetch('http://localhost:5678/api/users/login', {
	method: 'POST',
	headers: { 
    'Accept': 'application/json', 
    'Content-Type': 'application/json' 
    },
	body: JSON.stringify(user)
    }); 
    let result = await response.json();
    alert(result.message);
})();  
   
