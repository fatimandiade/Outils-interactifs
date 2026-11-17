const ecran = document.getElementById("ecran") as HTMLDivElement;
const boutons = document.querySelectorAll("button");

boutons.forEach((bouton) => {
    bouton.addEventListener("click", ()  => {
       const valeur = bouton.textContent;
        if(valeur === null){
            return;
        }

        if (valeur !== "" && !isNaN(Number(valeur))){
            ajouterChiffre(valeur);
        } else {
            switch(valeur){
                case "+" :
                case "-" :
                case "/" :
                case "*" :
                   choisirOperateur(valeur)
                    break;

                case "=":
                    calculer();
                    break;
               
                 case "AC" :
                    effacer();
                    break;

                case "⌫" :
                    supprimer();
                    break;                     

                case "+/-":
                    changerSigne();
                    break;

                case "%" :
                    pourcentage();
                    break;

                case "," :
                    ajouterVirgule();
                    break;
        
            }
                
        }
    });
});

let valeurActuelle = "0"; //nombre affiché a l 'écran
let premiereValeur = ""; //le 1 er nombre a l ecran
let operateur = "";
let nouvelleSaisie = false;

function actualiserEcran() {
    ecran.textContent = valeurActuelle;
    
}

function ajouterChiffre(chiffre : string){
    if(valeurActuelle === "0" || nouvelleSaisie){
        valeurActuelle = chiffre;
        nouvelleSaisie = false;
    } else {
        valeurActuelle += chiffre
    }

    actualiserEcran();

}

function choisirOperateur(signe : string){
    premiereValeur = valeurActuelle;
    operateur = signe;
    nouvelleSaisie = true;

    console.log("Operateur choisi :", operateur);
}

function calculer(){
    if(operateur === "" || nouvelleSaisie){
        return;
    }

    const nombre1 = parseFloat(premiereValeur.replace(",","."));
    const nombre2= parseFloat(valeurActuelle.replace(",","."));

    let resultat : number;

    switch (operateur){
        case("+"):
                resultat = nombre1 + nombre2;
        break;

        case("-"):
            resultat = nombre1 - nombre2;
        break;

          case("*"):
            resultat = nombre1 * nombre2;
        break;

          case("/"):
            if(nombre2 === 0){
                valeurActuelle = "Erreur";
                actualiserEcran();
                operateur = "";
                premiereValeur = ""
                nouvelleSaisie = true;
                return;
            }
            resultat = nombre1 / nombre2;
        break;

        default:
            return;
    }

    valeurActuelle = String(Number(resultat.toPrecision(10)));
    actualiserEcran();

    operateur = "";
    premiereValeur = "";
    nouvelleSaisie = true;
}

function effacer(){
    valeurActuelle = "0";
    premiereValeur = "";
    operateur = "";
    nouvelleSaisie = false;

    actualiserEcran();
}

function supprimer(){
    if(nouvelleSaisie){
        return;
    }

    valeurActuelle = valeurActuelle.slice(0,-1);

    if(valeurActuelle === "" || valeurActuelle === "-" ){
        valeurActuelle = "0";
    }

    actualiserEcran();
}

//changer le signe
function changerSigne(){
    if(valeurActuelle === "0"){
        return;
    }

    if(valeurActuelle.startsWith("-")){
        valeurActuelle = valeurActuelle.slice(1);
    } else {
        valeurActuelle = "-" + valeurActuelle;
    }

    actualiserEcran();
}

function ajouterVirgule(){
    if(nouvelleSaisie){
        valeurActuelle = "0,"
        nouvelleSaisie = false;
    } else if (!valeurActuelle.includes(",")){
        valeurActuelle += ",";
    }

    actualiserEcran();
}

function pourcentage(){
    const nombre = parseFloat(valeurActuelle.replace(",", "."));

    valeurActuelle = String(nombre / 100).replace(".",",");

    actualiserEcran();
}
