import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signInWithPopup,
  signOut as _signOut,
  GoogleAuthProvider,
  TwitterAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { db, auth } from '$config/firebase';
import { deleteDoc, doc, onSnapshot, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import type { User } from '$types';
import type { AuthCtx, AuthEvt } from './auth.machine';
import { userMapper } from './user.mapper';
import { collectionData } from 'rxfire/firestore';
import { map, catchError, tap } from 'rxjs/operators';
import { from } from 'rxjs';

function initServices(useRedirect = false, { auth, db }) {
  const loginWithEmailPassword = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();

    return useRedirect
      ? signInWithRedirect(auth, provider)
      : signInWithPopup(auth, provider);
  };

  const loginWithTwitter = () => {
    const provider = new TwitterAuthProvider();
    return useRedirect
      ? signInWithRedirect(auth, provider)
      : signInWithPopup(auth, provider);
  };

  const loginWithFacebook = () => {
    const provider = new FacebookAuthProvider();
    return useRedirect
      ? signInWithRedirect(auth, provider)
      : signInWithPopup(auth, provider);
  };

  return {
    authChecker: () =>
      // wrap the onAuthStateChanged hook in a promise and
      // immediately unsubscribe when triggered
      new Promise((resolve, reject) => {
        const unsub = onAuthStateChanged(auth, () => {
          unsub();
          return auth?.currentUser ? resolve(auth) : reject();
        });
      }),
    emailChecker: (_: never, evt: AuthEvt) => {
      const emailQuery = query(
        collection(db, 'users'),
        where('email', '==', evt.data)
      )
      return from(getDocs(emailQuery)).pipe(
        map((querySnapshot) => ({ type: querySnapshot.empty ? 'VIEW_SIGN_UP' : 'VIEW_SIGN_IN', data: evt.data })),
        catchError((err) => [{ type: 'ERROR', data: err }])
      );
    },
    authenticator: (_: never, evt: AuthEvt) => {
      const event = evt as unknown as {
        provider: string;
        email: string;
        password: string;
      };
      if (event.provider === 'email_password') {
        return loginWithEmailPassword(event.email, event.password);
      } else if (event.provider === 'google') {
        return loginWithGoogle();
      } else if (event.provider === 'twitter') {
        return loginWithTwitter();
      } else if (event.provider === 'facebook') {
        return loginWithFacebook();
      }
    },
    userLoader: (ctx: AuthCtx, _) =>
      new Promise((resolve) => {
        // auth object is already set on the app context
        // by authChecker service
        const unsub = ctx.auth.onIdTokenChanged((claims: User) => {
          unsub();
          const user = claims ? userMapper(claims) : {};
          resolve(user);
        });
      }),
    profileLoader: (ctx: AuthCtx, _) =>
      new Promise((resolve) => {
        const profileRef = doc(db, 'users', ctx.auth.currentUser?.uid);
        const unsub = onSnapshot(profileRef, (profile) => {
          unsub();
          if (profile.exists()) {
            const profileData = userMapper(profile.data());
            setDoc(profileRef, profileData);
            resolve(profileData);
          } else {
            const profileData = userMapper(ctx.user);
            setDoc(profileRef, profileData);
            resolve(profileData);
          }
        });
      }),
    profileUpdater: (ctx: AuthCtx, _) =>
      new Promise((resolve) => {
        const profileRef = doc(db, 'users', ctx.auth.currentUser?.uid);
        const profileData = userMapper(ctx.user);
        setDoc(profileRef, profileData);
        resolve(profileData);
      }),
    accountCreator: (ctx: AuthCtx, evt: AuthEvt) => {
      const { displayName, email, phoneNumber, password } = evt.data as {
        displayName: string;
        email: string;
        phoneNumber: string;
        password: string;
      };
      return createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const profileRef = doc(db, 'users', userCredential.user.uid);
          const profileData = userMapper({
            ...userCredential.user,
            displayName,
            phoneNumber,
          });
          return setDoc(profileRef, profileData).then(() => profileData);
        }
      );
    },
    accountDeleter: (ctx: AuthCtx, _) =>
      deleteDoc(doc(db, 'users', ctx.auth.currentUser?.uid)),
    logout: () => auth.signOut(),
  };
}

export const services = initServices(false, { auth, db });
