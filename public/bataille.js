// Nombre de lignes et de colonnes dans notre table de jeu
var rows = 10;
var cols = 10;

//taille d'une case en pixels
//var squareSize = 50;

// récupérer le container
var BoardContainer = document.getElementById("board");

// Création de notre table de jeu dans le html
function render(){
  BoardContainer.innerHTML='';
  let tableHtml = document.createElement("table");
  BoardContainer.appendChild(tableHtml);
  for (let i = 0; i < rows; i++) {
    let tr = document.createElement("tr");
    tableHtml.appendChild(tr);
    for (let j = 0; j < cols; j++) {
      // on crée des td dans notre fichier html
      let carre = document.createElement("td");
      tr.appendChild(carre);

      // pour chaque td qu'on crée, on lui donne deux attributs représentant son numéro de ligne et de colonne
      carre.dataset.row = i;
      carre.dataset.column = j;
      
      if(table[i][j] == -1)
        carre.className = "manque";
      else if(table[i][j] == 2)
        carre.className = "touche";
      else if(table[i][j] == 3)
        carre.className = "coule";

      //on défini pour chaque carré ses coordonnées en pixel d'après sa postition dans la matrice et on les envoie au css
      /*var haut = j * squareSize;
      var gauche = i * squareSize;
      carre.style.top = haut + "px";
      carre.style.left = gauche + "px";*/
    }
  }
}

// récupérer le container
var BoardContainer2 = document.getElementById("board2");

function render2(){
  BoardContainer2.innerHTML='';
  let tableHtml2 = document.createElement("table");
  BoardContainer2.appendChild(tableHtml2);
  for (let i = 0; i < rows; i++) {
    let tr = document.createElement("tr");
    tableHtml2.appendChild(tr);
    for (let j = 0; j < cols; j++) {
      // on crée des td dans notre fichier html
      let carre = document.createElement("td");
      tr.appendChild(carre);

      // pour chaque td qu'on crée, on lui donne deux attributs représentant son numéro de ligne et de colonne
      carre.dataset.row = i;
      carre.dataset.column = j;
      
      if(table2[i][j] == -1)
        carre.className = "manque";
      else if(table2[i][j] == 2)
        carre.className = "touche";
      else if(table2[i][j] == 3)
        carre.className = "coule";

      //on défini pour chaque carré ses coordonnées en pixel d'après sa postition dans la matrice et on les envoie au css
      /*var haut = j * squareSize;
      var gauche = i * squareSize;
      carre.style.top = haut + "px";
      carre.style.left = gauche + "px";*/
    }
  }
}



// cette variable sera utile pour savoir quand un joueur aura gagner (ex: si on prend 5 bateaux de taille 3cases, la partie sera gagnée quand cette variable sera égale à 15)
var nombreDeCoups = 0;
var nombreDeCoups2 = 0;

//création de la matrice contenant nos bateaux
// -1 = tir raté
// 0 = pas de bateau
// 1 = bateau
// 2 = une fois qu'on touche une partie d'un bateau, le 1 se transforme en 2
// 3 = bateau coulé, une fois que la totalité du bateau touchée

// POUR L'INSTANT JE LE FAIS MANUELLEMENT MAIS VA FALLOIR FAIRE UNE FONCTION POUR LES PLACER ALEATOIREMENT PLUS TARD!!!!

var table = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 1, 0, 1, 1, 0],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
];

var table2 = [
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 1, 0, 1, 1, 0],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 1, 1, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
];



render();
render2();

//On défini cet event listener sur Onclick pour lancer la fonction tirer dès qu'on click sur notre table de jeu
BoardContainer.addEventListener("click", tirer, false);
BoardContainer2.addEventListener("click", tirer2, false);

function inBound(i,j){
  if(i>=0 && i<rows && j>=0 && j<cols)
    return true
  else
    return false
}

//Teste si le bateau touché à (row,col) a été entièrement touché
function testCoule(tab,row,col){
  let y, x;
  let dir = {"gauche":[0,-1],
            "droite":[0,1],
            "haut":[-1,0],
            "bas":[1,0]};
  for(let d in dir){
    x=row+dir[d][0];
    y=col+dir[d][1];
    while(inBound(x,y) && tab[x][y]>0){ //tant qu'on ne sort pas du plateau et qu'on regarde le bateau (1, 2 ou 3)
      if(tab[x][y]==1){ //partie du bateau non touchée
        return false;
      }
      x+=dir[d][0];
      y+=dir[d][1];
    }
  }
  return true;
}

//Change tab pour que toutes les parties du bateau en (row,col) soient coulées.
function coule(tab,row,col){
  let y, x;
  tab[row][col]=3;
  let dir = {"gauche":[0,-1],
            "droite":[0,1],
            "haut":[-1,0],
            "bas":[1,0]};
  for(let d in dir){
    x=row+dir[d][0];
    y=col+dir[d][1];
    while(inBound(x,y) && tab[x][y]>0){ //tant qu'on ne sort pas du plateau et qu'on regarde le bateau (1, 2 ou 3)
      tab[x][y]=3;
      x+=dir[d][0];
      y+=dir[d][1];
    }
  }
  return true;
}

// fonction tirer, e est notre event et cette fonction sera appelée à chaque clic
function tirer(e) {
  // sans ce if il n'ya pas du tout d'affichage, je n'ai pas compris pourquoi et j'ai trouvé ça sur stackoverflow maintenant ça marche mais je sais pas si il rique de poser problème par la suite
  if ((e.target !== e.currentTarget) 
      && ("row" in e.target.dataset) && ("column" in e.target.dataset)){   // Verifie si le clic se situe bien sur une case
    //on extrait le numéro de ligne et de colonne depuis les attributs du carré sur lequel on a cliqué
    let row = e.target.dataset.row;
    let col = e.target.dataset.column;

    // si le tir est raté on change la valeur de la case à -1 et on grise cette case pour qu'il ne puisse plus cliquer dessus
    if (table[row][col] == 0) {
      //e.target.className = "manque";
      table[row][col] = -1;

      // si le tir fait mouche on change la valeur de la case à 2 et on la colori pour montrer qu'il y avait bien une partie d'un bateau à cette case
      //si le tir touche alors on incrémente le nombre de coup
    } else if (table[row][col] == 1) {
      //e.target.className = "touche";
      table[row][col] = 2;
      nombreDeCoups++;
      
      //teste si le bateau a été entièrement touché, et si oui, le coule (valeur à 3)
      if(testCoule(table,parseInt(row),parseInt(col))){
        console.log("coulé");
        coule(table,parseInt(row),parseInt(col));
        //e.target.className = "coule";
      }

      //va falloir changer ça par un affichage au milieu de la grille (un truc plus joli quoi)
      if (nombreDeCoups == 18) {
        alert("GG WP");
      }
    }
    render();
  }

  // si jamai on aura un problème par la suite on pourra essayé de stoper la propagation de cet évènement avec e.stopPropagation();
}


// fonction tirer, e est notre event et cette fonction sera appelée à chaque clic
function tirer2(e) {
  // sans ce if il n'ya pas du tout d'affichage, je n'ai pas compris pourquoi et j'ai trouvé ça sur stackoverflow maintenant ça marche mais je sais pas si il rique de poser problème par la suite
  if ((e.target !== e.currentTarget) 
      && ("row" in e.target.dataset) && ("column" in e.target.dataset)){   // Verifie si le clic se situe bien sur une case
    //on extrait le numéro de ligne et de colonne depuis les attributs du carré sur lequel on a cliqué
    let row = e.target.dataset.row;
    let col = e.target.dataset.column;

    // si le tir est raté on change la valeur de la case à -1 et on grise cette case pour qu'il ne puisse plus cliquer dessus
    if (table2[row][col] == 0) {
      //e.target.className = "manque";
      table2[row][col] = -1;

      // si le tir fait mouche on change la valeur de la case à 2 et on la colori pour montrer qu'il y avait bien une partie d'un bateau à cette case
      //si le tir touche alors on incrémente le nombre de coup
    } else if (table2[row][col] == 1) {
      //e.target.className = "touche";
      table2[row][col] = 2;
      nombreDeCoups2++;
      
      //teste si le bateau a été entièrement touché, et si oui, le coule (valeur à 3)
      if(testCoule(table2,parseInt(row),parseInt(col))){
        console.log("coulé");
        coule(table2,parseInt(row),parseInt(col));
        //e.target.className = "coule";
      }

      //va falloir changer ça par un affichage au milieu de la grille (un truc plus joli quoi)
      if (nombreDeCoups2 == 18) {
        alert("GG WP");
      }
    }
    render2();
  }

  // si jamai on aura un problème par la suite on pourra essayé de stoper la propagation de cet évènement avec e.stopPropagation()
}
