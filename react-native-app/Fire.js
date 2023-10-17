import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class Fire {
  constructor() {
    this.init();
    this.checkAuth();
  }

  init = () => {
    if (!firebase.apps.length) { // Corrected the typo here
      firebase.initializeApp({
        apiKey: 'AIzaSyDzj-WN3n11H73nGMhDNNdtzFJcC_GxWU4',
        authDomain: 'chatapp-c1888.firebaseapp.com',
        projectId: 'chatapp-c1888',
        storageBucket: 'chatapp-c1888.appspot.com',
        messagingSenderId: '993238950219',
        appId: '1:993238950219:web:e32b55b2ce356eb6fd48ce',
        measurementId: 'G-W38E0LG4CM',
      });
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
    });
  };

  send = (messages) => {
    messages.forEach((item) => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };

      this.db.push(message);
    });
  };

  parse = (message) => {
    const { user, text, timestamp } = message.val();
    const { key: _id } = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  get = (callback) => {
    this.db.on('child_added', (snapshot) => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref('messages');
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Fire();
