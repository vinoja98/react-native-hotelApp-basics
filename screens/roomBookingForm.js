import React,{useState} from 'react';
import { StyleSheet, Text, View, Platform,Button,TouchableOpacity,Modal,TouchableWithoutFeedback,Keyboard,Alert} from 'react-native';
import { TextInput} from 'react-native-paper';
import { globalStyles,images } from '../styles/global';
import { Formik,  Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup'
import FlatButton from '../shared/button';
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function RoomBookingForm({navigation ,setModelOpen}) {
  const[customerName,setName]=useState("")
  const[startDate,setDate]=useState(new Date())
    const[endDate,setDate2]=useState(new Date())
    const[room,setRoom]=useState("")

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    // console.warn("A date has been picked: ", date);
    setDate(date)
    hideDatePicker();
  };

  const [isDatePickerVisible2, setDatePickerVisibility2] = useState(false);

  const showDatePicker2 = () => {
    setDatePickerVisibility2(true);
  };

  const hideDatePicker2 = () => {
    setDatePickerVisibility2(false);
  };

  const handleConfirm2 = date => {
    // console.warn("A date has been picked: ", date);
    setDate2(date)
    hideDatePicker2();
  };


    
  const submitBooking=()=>{
    fetch('http://10.0.2.2:5000/booking/add',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        customerName,
        startDate,endDate,room
          // rating,
         
      })
    })
    .then(res=>res.json())
    .then(data=>{
      // setFoodItems((prevFood)=>{
      //   return [data, ...prevFood]
      //  })
      Alert.alert(`food item ${data.name} added`)
      setModelOpen(false)
    
    })
    .catch(err=>{
      Alert.alert(err)
    })
  }
    return (
      <View style={globalStyles.container}>
       
        <Formik
            initialValues={{name:'',email:'',password:''}}>
            {/* validationSchema={foodSchema}
            onSubmit={(values,actions)=>{
                    onsubmit(values)
                    actions.resetForm()
            }}
       */}
            {(props)=>(
                <View>
                    <TextInput style={globalStyles.input}
                        label="Customer's Name"
                        mode="outlined"
                        theme={{colors:{primary:"#08b8e1"}}}
                        onChangeText={text => setName(text)}
                        value={customerName}
                        
                        />
                    
                        <TextInput style={globalStyles.input}
                        label='Room'
                        mode="outlined"
                        theme={{colors:{primary:"#08b8e1"}}}
                        onChangeText={text => setRoom(text)}
                        value={room} //here put a dropdown to select entire room object from db, this dropdown should be taken from the backend
                        keyboardType='numeric'
                        />
                     <Button title="Show Start Date Picker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
        date={startDate}
        onDateChange={date1=>setDate(date1)}
      />
      <Button title="Show End Date Picker" onPress={showDatePicker2} />
       <DateTimePickerModal
        isVisible={isDatePickerVisible2}
        mode="date"
        onConfirm={handleConfirm2}
        onCancel={hideDatePicker2}
        minimumDate={startDate}
        date={endDate}
        onDateChange={date1=>setDate2(date1)}
      />
                   
                
                    <FlatButton text='Add' onPress={submitBooking}/>
                </View>
            )
            }
        </Formik>
      </View>
    );
  }