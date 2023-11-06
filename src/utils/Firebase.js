import firestore from '@react-native-firebase/firestore';

// export

export const getUsers = async date => {
  const users = await firestore().collection(date).get();
  console.log(users);
};
