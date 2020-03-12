var USERNAME='CO';

function render(){
  if(USERNAME==''){
  let div=document.querySelector('#inscription');
  div.innerHTML= '<br> Username : ';
  
  let username=document.createElement("input");
  username.setAttribute("type","text");
  username.setAttribute("id","usernameId");
  username.setAttribute("value","Username");
  
  let tab=div.appendChild(username);
  
  document.write("<br>  \t Password : ");
  let password=document.createElement("input");
  password.setAttribute("type","text");
  password.setAttribute("id","passwordId");
  password.setAttribute("value","Password");
  
  tab=div.appendChild(password);
    
  document.write("<br>  \t Confirmation Password : ");
  let password2=document.createElement("input");
  password2.setAttribute("type","text");
  password2.setAttribute("id","passwordId");
  password2.setAttribute("value","Password");
  
  tab=div.appendChild(password2);
  
  document.write('<br>')
  let submit=document.createElement("input")
  submit.setAttribute("type","button");
  submit.setAttribute("value","S'incrire")
  submit.setAttribute("onclick","check();");
  
  tab=div.appendChild(submit);
  }
  else
  {
  }
  
}


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