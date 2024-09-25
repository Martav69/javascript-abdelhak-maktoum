const registerForm = document.querySelector("#formLogin");
const errorMessage = document.querySelector("#errorMessage");
const successMessage = document.querySelector("#successMessage");
const spinner = document.querySelector("#spinner");

registerForm.addEventListener("submit", async (event) => {
    event.preventDefault(); 

    // on réinitialise les messages d'erreur et de succès
    errorMessage.style.display = "none";
    errorMessage.textContent = "";
    successMessage.style.display = "none";
    successMessage.textContent = ""; // pas sur d'avoir besoin de cette ligne comme je n'ai qu'un seul msg de success 

    // on affiche le spinner
    spinner.style.display = "block";

    const formData = new FormData(registerForm);
    const email = formData.get("email");
    const password = formData.get("password");
    const passwordConfirm = formData.get("passwordConfirm");

    // Vérif longueur mdp
    if (password.length < 8) {
        errorMessage.textContent = "Le mot de passe doit contenir au moins 8 caractères.";
        errorMessage.style.display = "block"; 
        spinner.style.display = "none"; 
        return; // on sort pour éviter la soumission du formulaire
    }

    // verif de la correspondance des deux mdp
    if (password !== passwordConfirm) {
        errorMessage.textContent = "Les mots de passe ne correspondent pas !";
        errorMessage.style.display = "block"; 
        spinner.style.display = "none"; 
        return; 
    }

    // Simulation d'un délai pour afficher le spinner
    setTimeout(async () => {
        // Si toute les validations passe on peut envoyer la requete a l'API
        try {
            const res = await fetch("http://localhost:8000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email, 
                    password: password  
                }),
            });

            if (!res.ok) {
                console.error("Erreur survenue lors de l'inscription");
                const data = await res.json();
                errorMessage.textContent = `Erreur lors de l'inscription : ${data.message || 'Erreur inconnue'}`;
                errorMessage.style.display = "block";
                spinner.style.display = "none";
                return;
            }

            if (res.status === 201) {
                const data = await res.json(); // pas sur qu'on ai besoin de cette ligne vu que c'est ok et qu'on reutilise pas la data json mais si on voulait afficher un msg perso on pourrai l'utiliser comme sur l'exemple haut dessus en cas d'erreur
                successMessage.textContent = "Bravo chef tu as réussi; c'était dur je sais";
                successMessage.style.display = "block"; 
                registerForm.reset(); // reinitialisation du formulaire on pourrait faire un redirect ici
                spinner.style.display = "none"; 
            }

        } catch (err) {
            console.error("Erreur CATCH : ", err);
            errorMessage.textContent = "Erreur lors de la connexion à l'API";
            errorMessage.style.display = "block";
            spinner.style.display = "none";
        }
    }, 1000); 
});
