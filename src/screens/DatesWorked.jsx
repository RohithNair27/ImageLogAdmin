import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getUsers} from '../utils/Firebase';
import GetCurrentDay from '../utils/TimeUtils';
const DatesWorked = () => {
  const [peopleLogedIn, setPeopleLogedIn] = useState();

  const getDataFromFirebase = async () => {
    const data = await getUsers();
    console.log(data);
  };

  useEffect(() => {
    const Date = GetCurrentDay().date;
    const Month = GetCurrentDay().month;
    const Year = GetCurrentDay().year;
    const stringDate = JSON.stringify(Date + '-' + Month + '-' + Year);
    getDataFromFirebase(stringDate);
  }, []);

  return (
    <ScrollView style={styles.body}>
      {peopleLogedIn?.map(element => {
        // console.log(element);
        return (
          <TouchableOpacity
            style={styles.buttonBody}
            key={element.checkIn.EmployeeIdEntered}>
            <Text style={{color: 'black'}}>
              {element.checkIn.EmployeeIdEntered}
            </Text>

            {/* <Image
              source={{uri: element.CheckInImageUrl}}
              resizeMode="contain"
              style={{height: 65, width: 65, borderRadius: 50}}
            /> */}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default DatesWorked;

const styles = StyleSheet.create({});
