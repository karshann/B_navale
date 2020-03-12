var USERNAME='Test';


// Permet l'affichage

function render(){
  
  // Si l'on n'est pas connecté, on affiche le formulaire.
  
  if(USERNAME==''){
  let div=document.querySelector('#connection');
  div.innerHTML= 'Username : ';
  
  let username=document.createElement("input");
  username.setAttribute("type","text");
  username.setAttribute("id","usernameId");
  username.setAttribute("value","Username");
  
  let tab=div.appendChild(username);
  
  document.write("\t Password : ");
  let password=document.createElement("input");
  password.setAttribute("type","text");
  password.setAttribute("id","passwordId");
  password.setAttribute("value","Password");
  
  tab=div.appendChild(password);
  
  let submit=document.createElement("input")
  submit.setAttribute("type","button");
  submit.setAttribute("value","Confirmer")
  submit.setAttribute("onclick","check();");
  
  tab=div.appendChild(submit);
  }
  
  // Sinon on affiche "Bonjour".
  
  else
  {
  let div=document.querySelector('#connection');
  div.innerHTML= 'Bonjour, <b>'+ USERNAME+'</b>.'; 
  }
  
}


// Vérifie si les informations sont bonnes et établi la connection.

function check() {
  let inputs = document.getElementsByTagName('input'),
      inputsLength = inputs.length;
  
  /*
  let arg='';
  for(let i = 0;i<inputsLength-1;i++) { 
    arg+=inputs[i].value;
  }
  */
  
  // ICI FAIRE LES VERIFIFICATIONS DE CONNEXION SERVEUR
  
  USERNAME=inputs[0];
  document.location.href="index.html"
  
}

render();