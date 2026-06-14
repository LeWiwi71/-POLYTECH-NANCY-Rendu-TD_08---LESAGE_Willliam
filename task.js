// Nos deux tableaux de données
let tasks = [];
let trash = [];

const form = document.getElementById("form-tache");
const conteneurListe = document.getElementById("liste-taches");
const conteneurPoubelle = document.getElementById("liste-poubelle");

function render() {
    conteneurListe.innerHTML = "";
    conteneurPoubelle.innerHTML = "";

    tasks.forEach(function(task) {
        // On vérifie si la tâche est faite pour lui donner sa classe CSS
        const classeCSS = task.done ? "tache-faite" : "";

        const carteHTML = `
            <div class="carte ${classeCSS}">
                <label>
                    <h3>${task.title}</h3>
                    <p>${task.description}</p>
                    <p>Id: ${task.id}</p>
                    <p><button class="btn-supprimer" data-id="${task.id}">🗑️ Supprimer</button></p>
                </label>
            </div>
        `;
        conteneurListe.innerHTML += carteHTML;
    });

    trash.forEach(function(task) {
        const cartePoubelleHTML = `
            <div class="carte-faite" style="opacity: 0.6;">
                <label>
                    <h3>${task.title} (Supprimée)</h3>
                    <p>${task.description}</p>
                    <p>Id: ${task.id}</p>
                </label>
            </div>
        `;
        conteneurPoubelle.innerHTML += cartePoubelleHTML;
    });

    // Écouteurs pour le bouton "Supprimer"
    const boutonsSupprimer = document.querySelectorAll(".btn-supprimer");
    boutonsSupprimer.forEach(function(bouton) {
        bouton.addEventListener("click", function() {
            const idTache = parseInt(bouton.getAttribute("data-id"));
            removeTask(idTache);
        });
    });

    // Écouteurs pour la case à cocher (fait / pas fait)
    const checkboxes = document.querySelectorAll(".checkCarte");
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener("change", function() {
            const idTache = parseInt(checkbox.getAttribute("data-id"));
            const taskFound = tasks.find(t => t.id === idTache);
            if (taskFound) {
                taskFound.done = checkbox.checked;
                render(); // On relance l'affichage pour appliquer le CSS
            }
        });
    });
}

// Retrait du paramètre 'done'
function addTask(id, title, description) {
    const newTask = {
        id: id, 
        title: title,
        description: description,
        done: false // Forcé à false par défaut lors de la création
    };
    tasks.push(newTask);
    render(); 
}

function removeTask(taskIdToRemove) {
    const taskToTrash = tasks.find(function(task) {
        return task.id === taskIdToRemove;
    });
    
    if (taskToTrash) {
        trash.push(taskToTrash);
    }
    
    tasks = tasks.filter(function(task) {
        return task.id !== taskIdToRemove; 
    });
    
    render(); 
}

form.addEventListener("submit", function(event) {
    event.preventDefault(); 

    const idSaisi = parseInt(document.getElementById("input-id").value);
    // On ajoute .trim() pour ignorer les espaces vides
    const titreSaisi = document.getElementById("input-titre").value.trim(); 
    const descSaisie = document.getElementById("input-desc").value.trim();

    // --- LA VÉRIFICATION ---
    // Si le titre est vide, OU que l'ID n'est pas un nombre valide (champ laissé vide)
    if (titreSaisi === "" || isNaN(idSaisi)) {
        // Optionnel : Tu peux afficher un petit message d'erreur
        // alert("Veuillez au moins renseigner un ID et un titre !");
        
        // Le mot-clé 'return' est magique ici : il stoppe net la fonction.
        // La tâche ne sera jamais créée.
        return; 
    }

    // Si on arrive ici, c'est que les champs sont bien remplis !
    addTask(idSaisi, titreSaisi, descSaisie);

    form.reset();
});