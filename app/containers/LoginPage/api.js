/** eslint-disable */
import { auth } from 'utils/firebase';

const loginUserWithEmailAndPassword = async (username, password) => {
  const userCredentials = await auth
    .signInWithEmailAndPassword(username, password)
    .catch(error => {
      throw error;
    });

  return userCredentials;
};

export { loginUserWithEmailAndPassword };
