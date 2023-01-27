function submit() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    fetch('http://localhost:5678/api/users/login'), {
        method: 'POST',
        body: JSON.stringify({email: email, password: password}),
        headers: { 'Content-Type': 'application/json' }
    }
    .then(res => res.json())
    .then(data => {
        if (data.success) {                        
            // Connexion réussie
            localStorage.setItem('access_token', token);
            window.location.href = '\FrontEnd\index.html';
            
        } else {
            // Erreur d'identification
            alert("Erreur dans l`identifiant ou le mot de passe");
        }
    })
    .catch(error => console.error('Error:', error));
    
};

   
