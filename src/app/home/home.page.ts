import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public animalList = [
    {
      title: 'Vache',
      image: 'img/animals/cow-icon.png',
      desc: 'Meugle',
      file: '/sounds/cow.mp3',
      playing: false
    },
    {
      title: 'Dauphin',
      image: 'img/animals/dolphin-icon.png',
      desc: 'Siffle',
      file: '/sounds/dolphin.mp3',
      playing: false
    },
    {
      title: 'Grenouille',
      image: 'img/animals/frog-icon.png',
      desc: 'Coasse',
      file: '/sounds/frog.mp3',
      playing: false
    },
    {
      title: 'Oiseau',
      image: 'img/animals/bird-icon.png',
      desc: 'Chante',
      file: '/sounds/bird.mp3',
      playing: false
    },
    {
      title: 'Cochon',
      image: 'img/animals/pig-icon.png',
      desc: 'Grogne',
      file: '/sounds/pig.mp3',
      playing: false
    },
    {
      title: 'Chien',
      image: 'img/animals/puppy-icon.png',
      desc: 'Aboie',
      file: '/sounds/dog.mp3',
      playing: false
    },
    {
      title: 'Chat',
      image: 'img/animals/black-cat-icon.png',
      desc: 'Miaule',
      file: '/sounds/cat.mp3',
      playing: false
    },
    {
      title: 'Cheval',
      image: 'img/animals/horse-icon.png',
      desc: 'Hennit',
      file: '/sounds/horse.wav',
      playing: false
    },
    {
      title: 'Ane',
      image: 'img/animals/donkey-icon.png',
      desc: 'Brait',
      file: '/sounds/donkey.wav',
      playing: false
    }
  ];
  //stockage de animal choisi
  public chosenAnimal = null;

  //Le temps maxi pour la reponse
  private answerDelaySecound = 30;

  //Le temps restant pour une reponse
  public secoundLeft = null;
//le chrono pour les reponses
private timer = null;


  //stockage audio html objet qui sait lire un son
  private audio: HTMLAudioElement = null;
  constructor(private toastCtrl: ToastController) { }

  public play() {
    //choisir une image au hasard
    let alea = Math.floor(Math.random() * this.animalList.length);
    this.chosenAnimal = this.animalList[alea];

    //arrêter le son précédent(! not this audio ended si c'est pas terminé)
    if (this.audio && !this.audio.ended) {
      this.audio.pause();
    }
    //lancement du chrono
    this.startTimer();

    //Jouer un son
    //instanciation d'un objet audio avec le son que l'on veut jouer
    this.audio = new Audio('/assets' + this.chosenAnimal.file);
    //chargement du son
    this.audio.load();
    //lecture du son
    this.audio.play();
  }
  public async guessAnimal(clickedAnimal) {

    //si aucun son joue dans ce cas chosenAnimal et null
    if (!this.chosenAnimal) {
      return;
    }
    //le message à afficher
    let message;
    let toastColor = 'danger'

    //comparaison des animaux
    //celui sur lequel le joueur a cliqué
    //et ce lui dont on a joué le son
    //on relie le son à animal
    if (this.chosenAnimal.title == clickedAnimal.title) {
      message = 'gagné';
      toastColor = 'success'
      this.resetGame();
    } else {
      message ='essayé encore';
    }
    //Affichage du message
const toast = await this.toastCtrl.create({
  message: message,
  duration: 1000,
  position: 'top',
color: toastColor
});

toast.present();
  }
  //Mise à zero du jeu
  private resetGame(){
    this.chosenAnimal = null;
    this.audio = null;
    //arrete le chrono lorsque la reponse et bonne
    this.secoundLeft = 0;
    clearInterval(this.timer);

  }
private startTimer(){
  this.secoundLeft = this.answerDelaySecound;
//On definit le contenu du chronometre
  this.timer = setInterval(
    () => {
      //Décrémenter le temps restant
      this.secoundLeft--;
      //s'il reste plus de temps on met le jeu à zero
      if(this.secoundLeft ==0) {
        this.resetGame();
        //annulation du chrono
        clearInterval(this.timer);
      }
    },
    1000
  )
}
}
