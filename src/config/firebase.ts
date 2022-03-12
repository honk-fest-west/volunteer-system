import firebaseConfig from './firebaseConfig';
import {
  initializeApp,
  getApps,
  getApp,
  type FirebaseOptions,
} from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { variables } from './variables';
import {
  connectFirestoreEmulator,
  getFirestore,
  initializeFirestore,
} from 'firebase/firestore';
import { connectAuthEmulator, getAuth } from 'firebase/auth';

export const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig as FirebaseOptions)
    : getApp();

initializeFirestore(app, {
  experimentalForceLongPolling: !!variables.FIRE_USE_EMULATORS,
});

export const db = getFirestore(app);
if (variables.FIRE_USE_EMULATORS)
  connectFirestoreEmulator(db, 'localhost', 8080);

export const auth = getAuth(app);
if (variables.FIRE_USE_EMULATORS)
  connectAuthEmulator(auth, 'http://localhost:9099');

if (self) {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = variables.APPCHECK_DEBUG_TOKEN;
}
export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6LdwQJceAAAAAK9I-ZbhVThD9Uu3Z6zKImEyq3BV'),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  // Ref: https://firebase.google.com/docs/reference/js/firebase.appcheck.AppCheck
  // isTokenAutoRefreshEnabled: true,
});
