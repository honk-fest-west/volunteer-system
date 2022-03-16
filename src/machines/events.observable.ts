import { db } from '$config/firebase';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const q = query(collection(db, 'events'), where('status', '!=', 'archived'));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  const cities = [];
  querySnapshot.forEach((doc) => {
    cities.push(doc.data().name);
  });
  console.log('Current cities in CA: ', cities.join(', '));
});
