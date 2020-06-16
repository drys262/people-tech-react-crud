/** eslint-disable */
import { firestore } from 'utils/firebase';
import axios from 'axios';
import R from 'ramda';
import { v4 as uuidv4 } from 'uuid';
import { filterDataUrl } from './constants';

const getPeopleFromDB = async userId => {
  const documents = await firestore
    .collection('people')
    .doc(userId)
    .collection('devs')
    .orderBy('name', 'asc')
    .orderBy('githubHandle', 'asc')
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
    .orderBy('name', 'asc')
    .orderBy('githubHandle', 'asc')
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

const saveDevFromDB = ({ name, techStack, githubHandle, userId }) => {
  const devId = uuidv4();
  return firestore
    .collection('people')
    .doc(userId)
    .collection('devs')
    .doc(devId)
    .set({
      devId,
      name,
      techStack,
      githubHandle,
    });
};

const updateDevFromDB = ({ name, techStack, githubHandle, userId, devId }) =>
  firestore
    .collection('people')
    .doc(userId)
    .collection('devs')
    .doc(devId)
    .update({
      name,
      techStack,
      githubHandle,
    });

const filterData = ({ userId, filter }) =>
  axios.get(`${filterDataUrl}?userId=${userId}&filter=${filter}`);

export {
  getPeopleFromDB,
  streamPeopleFromDB,
  deleteDevFromDB,
  saveDevFromDB,
  updateDevFromDB,
  filterData,
};
