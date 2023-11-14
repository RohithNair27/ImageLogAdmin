import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getUsers, getImageFromStorage} from '../utils/Firebase';
import {useIsFocused} from '@react-navigation/native';
import Modal from 'react-native-modal';
import EmployeeHistory from './EmployeeHistory';
const DatesWorked = ({navigation}) => {
  const isFocused = useIsFocused();
  const [peopleLogedIn, setPeopleLogedIn] = useState();
  const [imagee, setImage] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const getDataFromFirebase = async () => {
    const data = await getUsers();

    setPeopleLogedIn(data);
  };

  useEffect(() => {
    getDataFromFirebase();
    // console.log(peopleLogedIn);
  }, []);

  // useEffect(async () => {}, [peopleLogedIn]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Employees</Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {!peopleLogedIn ? (
          <View style={styles.container}>
            <ActivityIndicator size={90} />
          </View>
        ) : (
          peopleLogedIn?.map(element => {
            const values = Object.values(element)[0]['CheckIn'];

            return (
              <TouchableOpacity
                style={styles.userButton}
                key={Object.keys(element)}
                onPress={() =>
                  navigation.navigate('EmployeeHistory', {
                    Data: Object.values(peopleLogedIn),
                    selectedId: Object.keys(element)[0],
                  })
                }>
                <Text style={{color: 'black'}}>{Object.keys(element)}</Text>
                <Image
                  source={{uri: values['ImageUrl']}}
                  style={styles.image}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default DatesWorked;
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,

    width: '100%',
  },

  userButton: {
    // borderWidth: 1,
    borderRadius: 10,
    width: '85%',
    height: HEIGHT * 0.15,
    alignSelf: 'center',
    marginBottom: '4%',
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonBody: {
    borderBottomWidth: 1,
    height: HEIGHT * 0.1,
    borderBottomColor: 'lightgray',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  image: {
    width: 70, // Set the desired width
    height: 70, // Set the desired height
    borderRadius: 70,
  },
  header: {
    backgroundColor: 'lightblue',
    width: '100%',
    height: HEIGHT * 0.1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    marginBottom: '2%',
  },
  headerText: {
    fontSize: 17,
    fontWeight: '900',
    color: 'black',
    // borderWidth: 1,
  },
});
