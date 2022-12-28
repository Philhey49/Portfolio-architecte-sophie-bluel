fetch('http://localhost:5678/api/users/login')
    let user {
        "email": "string",
        "password": "string"
      }
    
    let response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'accept: application/json' \
        'Content-Type: application/json' \
      },
      body: JSON.stringify(user)
    });
    
    let result = await response.json();
    alert(result.message);