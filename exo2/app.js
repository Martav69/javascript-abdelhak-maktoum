class ThemeSwitcher {
    constructor() {
      
      this.body = document.querySelector('body');
      this.lightThemeBtn = document.querySelector('#lightThemeBtn');
      this.darkThemeBtn = document.querySelector('#darkThemeBtn');
  
      // ici on on recupere le theme sauvegarder dans le local storage
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        this.body.classList.add(savedTheme);  // si il existe on charge le theme existant 
      } else {
        this.body.classList.add('light');  // sinon il sera en light par défaut
      }
  
      // la on met en place les ecouteur pour setup les thêmes
      this.lightThemeBtn.addEventListener('click', () => this.setTheme('light'));
      this.darkThemeBtn.addEventListener('click', () => this.setTheme('dark'));
    }
  
    // Method pour changer le theme
    setTheme(theme) {
      // tout dabord on enleve les deux theme 
      this.body.classList.remove('light', 'dark');
  
      // ensuite on ajoute le theme choisis 
      this.body.classList.add(theme);
  
      // on le sauvegarde dans le local storage
      localStorage.setItem('theme', theme);
    }
  }

  // on instancie la classe au chargement du DOM 
  // la classe se charge elle meme de run le constructor pour recuperer les elements et charge le theme sauvegarder
  // elle executeras le setTheme seulement si on clique sur un bouton du au listeners
  document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = new ThemeSwitcher();
  });
  
  