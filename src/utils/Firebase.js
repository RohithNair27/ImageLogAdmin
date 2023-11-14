import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export const getUsers = async () => {
  try {
    const usersCollection = await firestore().collection('1234').get();
    const usersData = [];

    if (!usersCollection.empty) {
      for (const doc of usersCollection.docs) {
        let imageUrlCheckIn = '';
        let imageUrlCheckOut = '';
        let updatedObject = {};

        for (const elementKey of Object.keys(doc.data())) {
          const element = doc.data()[elementKey];

          if (element['CheckIn']) {
            const imageStorage = element['CheckIn'].ImageUrl;
            const EmployeeIdEntered = element['CheckIn'].EmployeeIdEntered;
            const date = element['CheckIn'].Date;

            imageUrlCheckIn = await getImageFromStorage(
              imageStorage,
              EmployeeIdEntered,
              date,
            );

            updatedObject = {
              ...element,
              CheckIn: {
                ...element['CheckIn'],
                ImageUrl: imageUrlCheckIn,
              },
            };
          }

          if (element['CheckOut']) {
            const imageStorage = element['CheckOut'].ImageUrl;
            const EmployeeIdEntered = element['CheckOut'].EmployeeIdEntered;
            const date = element['CheckOut'].Date;

            imageUrlCheckOut = await getImageFromStorage(
              imageStorage,
              EmployeeIdEntered,
              date,
            );

            updatedObject = {
              ...updatedObject,
              CheckOut: {
                ...element['CheckOut'],
                ImageUrl: imageUrlCheckOut,
              },
            };
          }
          const requiredObject = {
            [element['CheckIn'].EmployeeIdEntered]: updatedObject,
          };

          usersData.push(requiredObject);
        }
      }

      return usersData;
    } else {
      console.log('No data found');
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getImageFromStorage = async (
  imageStorage,
  EmployeeIdEntered,
  date,
) => {
  try {
    const filenameWithPrefix = imageStorage.split('/').pop();
    const reference = `1234/${date}/${filenameWithPrefix}`;
    const url = await storage().ref(reference).getDownloadURL();
    return url;
  } catch (error) {
    console.error('Error fetching image from storage:', error);
    return ''; // You might want to handle this differently based on your use case
  }
};
