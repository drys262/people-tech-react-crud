/** eslint-disable */
import { auth } from 'utils/firebase';

const signUpUserWithEmailAndPassword = async (username, password) => {
  const userCredentials = await auth
    .createUserWithEmailAndPassword(username, password)
    .catch(error => {
      throw error;
    });

  return userCredentials;
};

export { signUpUserWithEmailAndPassword };
