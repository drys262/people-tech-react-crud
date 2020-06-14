/** eslint-disable */
import { firestore } from 'utils/firebase';
import R from 'ramda';

const getPeopleFromDB = async userId => {
  const documents = await firestore
    .collection('people')
    .doc(userId)
    .collection('devs')
    .get()
    .catch(error => {
      throw error;
    });

  return R.map(doc => doc.data())(documents.docs);
};

const streamPeopleFromDB = (userId, observer) =>
  firestore
    .collection('people')
    .doc(userId)
    .collection('devs')
    .onSnapshot(observer);

const deleteDevFromDB = (userId, devId) =>
  firestore
    .collection('people')
    .doc(userId)
    .collection('devs')
    .doc(devId)
    .delete()
    .catch(error => {
      throw error;
    });

export { getPeopleFromDB, streamPeopleFromDB, deleteDevFromDB };
