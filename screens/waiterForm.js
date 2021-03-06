import React,{useState} from 'react';
import { StyleSheet, Text, View,Alert,ScrollView,ImageBackground} from 'react-native';
import { Button ,TextInput} from 'react-native-paper';
import { globalStyles,images } from '../styles/global';
import { Formik,  Form, Field, ErrorMessage } from 'formik';
import FlatButton from '../shared/button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const image = { uri: "https://i.pinimg.com/originals/2e/e9/18/2ee918427712255bc116749e33616d33.png" };

export default function WaiterForm({navigation ,setModelOpen,setFoodItems,foodItems}) {
  const[name,setName]=useState("")
  const[password,setPassword]=useState("")
  const[email,setEmail]=useState("")
  const[contactNo,setContactNo]=useState("")
  const[nic,setNIC]=useState("")
  const[salary,setSalary]=useState("")
    
  const submitWaiter=async()=>{
    const data={
      name,
     password,
     email,contactNo,
     salary,nic
  }

  const token = await AsyncStorage.getItem("token")
  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if(data.name.length>2 && data.password.length>4 && data.email.length>9 && data.contactNo.length==12 && data.salary.length>0 && data.nic.length==10 && reg.test(data.email) === true){
    fetch('https://galaxy-rest-be.herokuapp.com/addWaiter/signup',{
      method: 'POST',
      headers:new Headers({
        'Content-Type': 'application/json',
        Authorization:"Bearer "+token
      }),
      body: JSON.stringify({
          name,
          email,
          password,
          contactNo,
          nic,
          salary
      })
    })
    .then(res=>res.text())
    .then(data=>{
      Alert.alert(`Waiter added, REFRESH THE PAGE`)
      setModelOpen(false)
    })
    .catch(err=>{
      Alert.alert(err)
    })
  }else {
    if(data.name && data.password && data.email && data.contactNo && data.salary && data.nic ){
    Alert.alert("Please add valid data")
   }
   else{
    Alert.alert("Please fill all the details")
   }
}
  }
    return (
      <View style={globalStyles.container}>
        <ScrollView>
        <Formik
            initialValues={{name:'',email:'',password:'',nic:'',salary:'',contactNo:''}}>
            {(props)=>(
                <View>
                    <TextInput style={globalStyles.input}
                        label='Name'
                        mode="outlined"
                        placeholder='Min 3 characters needed'
                        theme={
                          {
                            fonts: {
                              regular: {
                                fontFamily: 'nunito-bold'
                              }
                            },
                            colors:{
                              primary:'#08b8e1',
                              accent:'#03498f',
                              placeholder:'#03498f',
                              text:'#08b8e1'
                            }
                          }
                        }
                        onChangeText={text => setName(text)}
                        value={name}
                        testID="Waiter.usernameInput"
                        />
                    
                        <TextInput style={globalStyles.input}
                        label='Password'
                        mode="outlined"
                        placeholder='Min 3 characters needed'
                        theme={
                          {
                            fonts: {
                              regular: {
                                fontFamily: 'nunito-bold'
                              }
                            },
                            colors:{
                              primary:'#08b8e1',
                              accent:'#03498f',
                              placeholder:'#03498f',
                              text:'#08b8e1'
                            }
                          }
                        }
                        onChangeText={text => setPassword(text)}
                        testID="Waiter.passInput"
                        value={password}
                        />
                         <TextInput style={globalStyles.input}
                       
                        label='Email'
                        mode="outlined"
                        placeholder='Min 10 characters needed'
                       theme={
                          {
                            fonts: {
                              regular: {
                                fontFamily: 'nunito-bold'
                              }
                            },
                            colors:{
                              primary:'#08b8e1',
                              accent:'#03498f',
                              placeholder:'#03498f',
                              text:'#08b8e1'
                            }
                          }
                        }
                        onChangeText={text => setEmail(text)}
                        testID="Waiter.emailInput"
                        value={email}
                        />
                      
                     <TextInput style={globalStyles.input}
                        label='Phone'
                        mode="outlined"
                        placeholder='12 characters needed'
                       theme={
                          {
                            fonts: {
                              regular: {
                                fontFamily: 'nunito-bold'
                              }
                            },
                            colors:{
                              primary:'#08b8e1',
                              accent:'#03498f',
                              placeholder:'#03498f',
                              text:'#08b8e1'
                            }
                          }
                        }
                        onChangeText={text => setContactNo(text)}
                        testID="Waiter.numInput"
                        value={contactNo}
                        keyboardType='numeric'/>
                      
                   
                     <TextInput style={globalStyles.input}
                        
                        label='NIC'
                        mode="outlined"
                        placeholder='10 characters needed'
                       theme={
                          {
                            fonts: {
                              regular: {
                                fontFamily: 'nunito-bold'
                              }
                            },
                            colors:{
                              primary:'#08b8e1',
                              accent:'#03498f',
                              placeholder:'#03498f',
                              text:'#08b8e1'
                            }
                          }
                        }
                        onChangeText={text => setNIC(text)}
                        testID="Waiter.NICInput"
                        value={nic}
                        />
                       
                       
                    <TextInput style={globalStyles.input}
                        label='Salary'
                        mode="outlined"
                        placeholder='Should be a positive value'
                       theme={
                          {
                            fonts: {
                              regular: {
                                fontFamily: 'nunito-bold'
                              }
                            },
                            colors:{
                              primary:'#08b8e1',
                              accent:'#03498f',
                              placeholder:'#03498f',
                              text:'#08b8e1'
                            }
                          }
                        }
                        keyboardType='numeric'
                        onChangeText={text => setSalary(text)}
                        testID="Waiter.sala"
                        value={salary}
                        /> 
                    <FlatButton testID="book.Button" text='Add' onPress={submitWaiter}/>
                </View>
            )
            }
        </Formik>
        </ScrollView>
      </View>
    );
  }