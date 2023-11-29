import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getUsers, getImageFromStorage} from '../utils/Firebase';
import {useIsFocused} from '@react-navigation/native';
import Modal from 'react-native-modal';
import SearchBar from '../components/SearchBar';

const DatesWorked = ({navigation}) => {
  const isFocused = useIsFocused();
  const [peopleLogedIn, setPeopleLogedIn] = useState();
  const [imagee, setImage] = useState();
  const [isModalVisible, setModalVisible] = useState(true);
  const [searched, setSearched] = useState('');

  const getDataFromFirebase = async () => {
    const data = await getUsers();

    setPeopleLogedIn(data);
  };

  const searchBarOnChange = text => {
    setSearched(text);
  };

  useEffect(() => {
    getDataFromFirebase();
  }, []);
  const uniqueSet = new Set();
  // useEffect(async () => {}, [peopleLogedIn]);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={isModalVisible ? 'black' : 'white'} />
      <View style={styles.SearchBar}>
        {/* <Icon name={'search'} size={30} color={'black'} /> */}
        <SearchBar
          info={searched}
          onType={searchBarOnChange}
          placeholder={'Search with Id'}
        />
      </View>
      <ScrollView style={styles.scrollView}>
        {!peopleLogedIn ? (
          <Modal
            isVisible={isModalVisible}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            animationInTiming={400}>
            <View style={styles.waitingModalStyle}>
              <ActivityIndicator size={60} />
            </View>
          </Modal>
        ) : (
          peopleLogedIn
            .filter(data => {
              if (uniqueSet.has(Object.keys(data)[0])) {
              } else {
                uniqueSet.add(Object.keys(data)[0]);
                console.log(
                  typeof Object.values(data)[0].CheckIn.EmployeeIdEntered,
                );

                const dataSent =
                  Object.values(data)[0].CheckIn.EmployeeIdEntered.includes(
                    searched,
                  );

                return dataSent;
              }
            })
            .map(element => {
              const values = Object.values(element)[0]['CheckIn'];

              return (
                <TouchableOpacity
                  style={styles.userButton}
                  key={Object.values(element)[0]['CheckIn'].EmployeeIdEntered}
                  onPress={() =>
                    navigation.navigate('EmployeeHistory', {
                      Data: Object.values(peopleLogedIn),
                      selectedId: Object.keys(element)[0],
                    })
                  }>
                  <Image
                    source={{uri: values['ImageUrl']}}
                    style={styles.image}
                    resizeMode="contain"
                  />
                  <Text style={{color: 'black'}}>{Object.keys(element)}</Text>
                  <Text
                    style={{color: 'black', fontSize: 30, fontWeight: '900'}}>
                    {'->'}
                  </Text>
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
    borderBottomWidth: 1,
    borderRadius: 10,
    width: '95%',
    height: HEIGHT * 0.15,
    alignSelf: 'center',
    marginBottom: '4%',

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    borderBottomColor: 'lightgray',
  },
  buttonBody: {
    borderBottomWidth: 1,
    height: HEIGHT * 0.1,
    //
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
  waitingModalStyle: {
    width: WIDTH * 0.5,
    backgroundColor: 'white',
    height: HEIGHT * 0.3,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SearchBar: {
    width: '80%',
    height: '7%',
    // borderWidth: 1,
    marginBottom: '1%',
    borderRadius: 10,
    backgroundColor: '#D3D3D3',
  },
});
