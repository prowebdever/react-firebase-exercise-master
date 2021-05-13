import app from '@firebase/app'
import '@firebase/firestore'
import '@firebase/auth'

const config = {
    apiKey: 'AIzaSyCLALdrHuJWWObrw58QvHV475FJja7QOsQ',
    authDomain: 'testexercise-6dbb2.firebaseapp.com',
    databaseURL: 'https://testexercise-6dbb2.firebaseio.com',
    projectId: 'testexercise-6dbb2',
    storageBucket: 'testexercise-6dbb2.appspot.com',
    messagingSenderId: '912877209734',
  };

const TRAIN_COLLECTION_KEY = 'training';
const TRAIN_DOCUMENT_KEY = 'trainingPlan';


class Firebase {
    constructor() {
        app.initializeApp(config);

        this.emailAuthProvider = app.auth.emailAuthProvider;

        this.googleProvider = new app.auth.GoogleAuthProvider();
        this.googleProvider.setCustomParameters({
            promt: "select_account"
        });

        this.auth = app.auth();
        this.db = app.firestore();
    }
    
    // Auth API
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.doSignInWithEmailAndPassword(email, password);
        
    doSignInAnonymously = () =>
        this.auth.signInAnonymously();

    doSignInWithGoogle = () =>
    this.auth.signInWithPopup(this.googleProvider);

    onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.user(authUser.uid)
          .once('value')
          .then(snapshot => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = {};
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
              providerData: authUser.providerData,
              ...dbUser,
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

    // *** User API ***

    user = uid => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

    // *** Message API ***

    message = uid => this.db.ref(`messages/${uid}`);

    messages = () => this.db.ref('messages');

    // *** Train API ***
    oldData = {};

    getTrainData = (callback) => {
        let query = this.db.collection(TRAIN_COLLECTION_KEY).doc(TRAIN_DOCUMENT_KEY);
        query.onSnapshot((querySnapShot) => {
            let data = querySnapShot.data();
            this.oldData = data;
            let setsData = data.trainingDays[0].sets;
            callback(setsData);
        })
    }

    updateTrainData = (setsData) => {
        let query = this.db.collection(TRAIN_COLLECTION_KEY).doc(TRAIN_DOCUMENT_KEY);
        let data = this.oldData;
        data.trainingDays[0].sets = setsData;
        query.update({"trainingDays": data.trainingDays});
    }
}

export default Firebase;