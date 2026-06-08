tab = {
  "id": Number,
  "title": String,
  "description": String,
  "done": Boolean
}

let tasks = [];

function render (tasks){
  return tasks
    console.log("Affichage mis à jour!");
}

function addTask(newTitle, newDescription) {
  nombre = tasks.length;
  const newTask = {
    id: nombre+1, 
    title: newTitle,
    description: newDescription,
    done: false
  };
  tasks.push(newTask);
  render(); 
}

function removeTask(taskIdToRemove) {
  tasks = tasks.filter(function(task) {
    return task.id !== taskIdToRemove; 
  });

  // 2. On met à jour l'affichage pour faire disparaître la carte de l'écran
  render(); 
}

const boutontask = document.getElementById("bouton-task");
boutontask.addEventListener("click", addTask.bind(null, "Nouvelle tâche", "Description de la nouvelle tâche"));

const boutonsupprimer = document.getElementById("bouton-supprimer");
boutonsupprimer.addEventListener("click", removeTask.bind(null, 123456)); // Remplacez 123456 par l'ID de la tâche à supprimer