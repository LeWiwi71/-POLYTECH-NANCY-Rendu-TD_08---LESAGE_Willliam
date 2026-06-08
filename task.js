tab = {
  "id": Number,
  "title": String,
  "description": String,
  "done": Boolean
}

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
        const carteHTML = `
            <div class="carte">
                <input type="checkbox" class="checkCarte" data-id="${task.id}" ${task.done ? "checked" : ""}>
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

    // 2. Rendu des tâches dans la poubelle
    trash.forEach(function(task) {
        const cartePoubelleHTML = `
            <div class="carte" style="opacity: 0.6;">
                <label>
                    <h3>${task.title} (Supprimée)</h3>
                    <p>${task.description}</p>
                    <p>Id: ${task.id}</p>
                    </label>
            </div>
        `;
        conteneurPoubelle.innerHTML += cartePoubelleHTML;
    });

    // 3. Écouteurs pour le bouton "Supprimer"
    const boutonsSupprimer = document.querySelectorAll(".btn-supprimer");
    boutonsSupprimer.forEach(function(bouton) {
        bouton.addEventListener("click", function() {
            const idTache = parseInt(bouton.getAttribute("data-id"));
            removeTask(idTache);
        });
    });

    // 4. Écouteurs pour mettre à jour l'objet JS quand on coche/décoche la case HTML
    const checkboxes = document.querySelectorAll(".checkCarte");
    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener("change", function() {
            const idTache = parseInt(checkbox.getAttribute("data-id"));
            // On cherche la tâche et on met à jour son statut 'done'
            const taskFound = tasks.find(t => t.id === idTache);
            if (taskFound) {
                taskFound.done = checkbox.checked;
                // Pas besoin de relancer render() ici car ton CSS gère déjà le visuel en direct !
            }
        });
    });
}

function addTask(id, title, description, done) {
    const newTask = {
        id: id, 
        title: title,
        description: description,
        done: done
    };
    tasks.push(newTask);
    render(); 
}

function removeTask(taskIdToRemove) {
    // Avant de la supprimer, on la trouve et on la copie dans la corbeille
    const taskToTrash = tasks.find(function(task) {
        return task.id === taskIdToRemove;
    });
    
    if (taskToTrash) {
        trash.push(taskToTrash);
    }

    // Ensuite, on la retire du tableau principal
    tasks = tasks.filter(function(task) {
        return task.id !== taskIdToRemove; 
    });
    
    render(); 
}

form.addEventListener("submit", function(event) {
    event.preventDefault(); 

    const idSaisi = parseInt(document.getElementById("input-id").value);
    const titreSaisi = document.getElementById("input-titre").value;
    const descSaisie = document.getElementById("input-desc").value;
    const estFaite = document.getElementById("input-done").checked;

    addTask(idSaisi, titreSaisi, descSaisie, estFaite);

    form.reset();
});