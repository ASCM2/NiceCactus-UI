# Rock Paper Scissor Tournament UI

## Démarrage

Après avoir cloné le projet sur Github, se rendre dans le répertoire NiceCactus-UI et lancer:

### `npm install`

Nous utilisons Create React App, l'installation des modules associés peut prendre un peu de temps.
Une fois l'installation terminée, vous pouvez lancer l'application avec:

### `npm start`

Aussi, le front-end est préconfiguré pour se connecter au microservice Rounds sur le port 3001 (la UI est elle accessible en local sur le port 3000).  

Si vous souhaitez changer ce fonctionnement pour une raison quelconque, allez dans le fichier src/services/rounds et changez la variable BASE_URL.  

Pour construire la UI, nous avons utilisé de simples composants Material Design ainsi que la librairie de styles de la bibliothèque Material UI qui fournit des composants Material Design dans un environnement React. Au cas où vous ne seriez pas familier avec ces environnements, nous avons inclus des commentaires très détaillés dans le code source de telle sorte que n'importe qui lisant le code et familier de React puisse le comprendre.

## Principe de fonctionnement du jeu

Il y a deux modes de jeu:

- Un mode joueur contre ordinateur dans lequel vous pourrez affronter l'ordinateur à Pierre Feuille Ciseaux.
- Un mode ordinateur contre ordinateur dans lequel vous pouvez faire s'affronter l'ordinateur contre lui-même.

Au début du jeu, deux cartes sont affichées et rien dans ces cartes n'est affiché, mais dès que vous cliquerez sur le bouton "Play !" ou sur le bouton "New Round !" selon votre mode de jeu, les cartes se rempliront avec les choix aléatoires qui vous auront été attribués simulant ainsi le jeu comme dans la vie réelle.  

En dessous des cartes, une descriptif apparaît pour indiquer lequel des deux joueurs est le vainqueur de la partie.  
Vous pouvez ainsi jouer plusieurs parties de suite. Si vous jouez deux parties ou plus, un bouton "Last Round" apparaît vous permettant de visualiser les parties précédentes.  
Si vous cliquez sur ce bouton, le bouton "Next Round" apparaît vous permettant de revenir aux parties les plus récentes.  
Par contre, si vous n'êtes pas à la dernière partie jouée et que vous cliquez sur les boutons "Play !" ou "New Round !", vous créez une nouvelle partie et vous revenez automatiquement à cette dernière partie que vous venez de créer.  

Vous pouvez changer de mode, mais ce changement supprime automatiquement toutes les parties précédentes.  
Vous pouvez naviguer l'hitorique dans un mode donné, mais au changement de mode, l'hitorique est supprimé.

## Extension du jeu au jeu Rock Paper Scissor Lizard Spock

Pour étendre la UI pour ce jeu, il suffira juste d'inclure les nouvelles valeurs de coups possibles dans le tableau des coups possibles présent dans le fichier src/possible-moves.js.
