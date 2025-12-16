# PW CAKES - Nodejs, React
C'est une application web de stack MERN permettant aux clients de commander des gâteaux personnalisés, de demander des devis pour des événements et à l'admin de gérer les commandes et le catalogue.

## Installation 
### Pour le Backend
Il faut avoir Node d'installé et un compte MongoDB Atlas de configuré

Une fois cloné, il faut se rendre dans le répertoire backend et installer les dépendances :

<pre>
  cd backend
  npm install
</pre>

Il faudra ensuite créer un fichier .env à la racine du projet backend : 

<pre>
  touch .env
</pre>

Et à l'intérieur de ce fichier, il faudra rajouter ceci avec vos données : 

<pre>
  PORT=5001
  MONGODB_URI=votre_url_mongodb_atlas
  JWT_SECRET=votre_phrase_secrete_complexe
  NODE_ENV=development
</pre>

Et pour lancer le projet backend, toujours rester dans le répertoire backend et taper ceci dans le Terminal : 

<pre>
  node server.js
</pre>

Le reste des informations seront affichés dans le Terminal.

### Pour le Frontend
Pas encore mis en place. 🚧
