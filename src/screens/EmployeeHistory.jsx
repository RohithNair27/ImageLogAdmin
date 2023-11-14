import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';

const EmployeeHistory = ({route}) => {
  const {Data, selectedId} = route.params;

  return (
    <View style={styles.modalStyle}>
      {Data.filter(element => {
        return Object.keys(element)[0] === selectedId;
      }).map(elements => {
        const values = Object.values(elements)[0];
        console.log(values);
        return (
          <ScrollView>
            <View style={styles.container}>
              <View style={styles.containerDates}>
                <Text style={styles.datesText}>{values['CheckIn'].Date}/ </Text>
                <Text style={styles.datesText}>
                  {values['CheckIn'].month}/{' '}
                </Text>
                <Text style={styles.datesText}>{values['CheckIn'].year}</Text>
              </View>
              <View style={styles.containerDates}>
                <Text style={{color: 'black', fontSize: 20, fontWeight: '700'}}>
                  Total hours worked :
                </Text>
                <Text style={{color: 'black', fontSize: 20}}> 9 hours</Text>
              </View>
              <View style={styles.ImageContainer}>
                <Image
                  source={{uri: values['CheckIn'].ImageUrl}}
                  style={styles.image}
                  resizeMode="contain"
                />
                <Image
                  source={{uri: values['CheckOut'].ImageUrl}}
                  style={styles.image}
                  resizeMode="contain"
                />
              </View>
            </View>
          </ScrollView>
        );
      })}
    </View>
  );
};

export default EmployeeHistory;
const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const styles = StyleSheet.create({
  modalStyle: {
    height: HEIGHT,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 17,
    fontWeight: '900',
    color: 'black',
    // borderWidth: 1,
  },
  container: {
    borderWidth: 1,
    height: HEIGHT * 0.3,
    width: WIDTH / 1.2,
    // elevation: 0.6,
    // // shadowOpacity: 0.1,
    borderRadius: 10,
    margin: '4%',
  },
  containerDates: {
    flex: 0.5,
    marginTop: '2%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  datesText: {
    color: 'black',
    fontWeight: '900',
    fontSize: 20,
  },
  image: {
    width: 70, // Set the desired width
    height: 70, // Set the desired height
    borderRadius: 70,
  },
  ImageContainer: {
    flex: 1,

    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
