import React,{useState} from 'react';
import { StyleSheet, Text, View,Image,FlatList,TouchableOpacity,Alert,ScrollView,ImageBackground} from 'react-native';
import { Provider,Button ,TextInput} from 'react-native-paper';
import { globalStyles,images } from '../styles/global';
import { Formik,  Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup'
import FlatButton from '../shared/button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDown from "react-native-paper-dropdown";
const image = { uri: "https://i.pinimg.com/originals/2e/e9/18/2ee918427712255bc116749e33616d33.png" };

export default function FoodForm({navigation ,setModelOpen,setFoodItems,foodItems}) {
  const[name,setName]=useState("")
    const[price,setPrice]=useState("")
    const[description,setDescription]=useState("")
    const[status,setStatus]=useState("")
    const[discount,setDiscount]=useState("")
    const[category,setCategory]=useState("");
    const[img,setImg]=useState("")
    const[code,setCode]=useState("")
    const [showDropDown, setShowDropDown] = useState(false);
    const [showDropDown2, setShowDropDown2] = useState(false);
  
 const data1=[{label:'Available',value:'Available',},
 {label:'Not Available',value:'Not Available',},]

 const data2=[{label:'Pizza',value:'Pizza',},{label:'Drinks',value:'Drinks',},{label:'Fried Rice',value:'Fried Rice',},{label:'Other',value:'Other',},]
    
 const submitFood = async()=>{
  const data={
          name,
          price,
          description,
          status,
          discount,
          category,
          img,
          code
  }
  const token = await AsyncStorage.getItem("token")
  if(data.name && data.price && data.description && data.status && data.discount && data.category && data.img && data.code ){
  fetch("https://galaxy-rest-be.herokuapp.com/food/add",{
        method:"POST",
        headers:new Headers({
          'Content-Type': 'application/json',
          Authorization:"Bearer "+token
        }),
        body:JSON.stringify({
          
            name,
            price,
            description,
            status,
            discount,
            category,
            img,
            code
        })
    })
    .then(res=>res.json())
    .then(data=>{
      Alert.alert(`food item ${data.name} added, REFRESH HOME PAGE`)
        setModelOpen(false)
    })
    .catch(err=>{
      Alert.alert("something went wrong")
  })}
  else {
   Alert.alert("Please fill all the details")
  }
 }
  
    return (
      // <ImageBackground source={image} resizeMode="cover" style={globalStyles.image}>
      <Provider>
      <View style={globalStyles.container}>
        <ScrollView>
        <Formik
            initialValues={{name:'',price:'',description:'',category:'',status:'',discount:'',status:'',img:''}}>
            {/* validationSchema={foodSchema}
            onSubmit={(values,actions)=>{
                    onsubmit(values)
                    actions.resetForm()
            }}
       */}
            {(props)=>(
                <View>
                    <TextInput style={globalStyles.input}
                        label='Food Item'
                        mode="outlined"
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
                        testID="FoodForm.food"
                        />
                        {/* <Dropdown 
                          label="Category"
                          data={data2}
                          style = {{color:'#08b8e1',fontFamily:'nunito-bold' }} //for changed text color
                          baseColor='#03498f' //for initial text color
                          textColor='#03498f'
                          itemColor='blue'
                          selectedItemColor='#08b8e1'
                          itemTextStyle={{paddingLeft:30,fontFamily:'nunito-bold'}}
                          pickerStyle={{backgroundColor:'#dcbbdb'}}
                         
                          onChangeText={text => setCategory(text)}
                        value={category}
                        /> */}
                         <DropDown
              label={"Category"}
              mode={"outlined"}
              visible={showDropDown}

              showDropDown={() =>  setShowDropDown(true)}

              onDismiss={() =>  setShowDropDown(false)}
              value={category}
              activeColor={"#08b8e1"}
              dropDownItemTextStyle={{fontFamily:'nunito-bold',color:'blue'}}
              setValue={setCategory}
              list={data2}
            />
              <DropDown
              label={"Status"}
              mode={"outlined"}
              visible={showDropDown2}

              showDropDown={() =>  setShowDropDown2(true)}

              onDismiss={() =>  setShowDropDown2(false)}
              value={status}
              activeColor={"#08b8e1"}
              dropDownItemTextStyle={{fontFamily:'nunito-bold',color:'blue'}}
              setValue={setStatus}
              list={data1}
            />
                        <TextInput style={globalStyles.input}
                        label='Food Item Code'
                        mode="outlined"
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
                        onChangeText={text => setCode(text)}
                        value={code}
                        testID="FoodForm.code"
                        />
                         <TextInput style={globalStyles.input}
                        label='Image link'
                        mode="outlined"
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
                        onChangeText={text => setImg(text)}
                        value={img}
                        testID="FoodForm.img"
                        />
                    
                     <TextInput style={globalStyles.input}
                        label='Price'
                        mode="outlined"
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
                        onChangeText={text => setPrice(text)}
                        value={price}
                        testID="FoodForm.price"
                        
                        // onBlur={props.handleBlur('price')}
                        keyboardType='numeric'/>
                    {/* <Text style={globalStyles.errorText}>{props.touched.price && props.errors.price}</Text> */}
                     <TextInput style={globalStyles.input}
                        multiline minHeight={50}
                        label='Description'
                        mode="outlined"
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
                        onChangeText={text => setDescription(text)}
                        testID="FoodForm.desc"
                        value={description}/>
                       
                    <TextInput style={globalStyles.input}
                   testID="Percentage"
                        label='Discount Percentage'
                        mode="outlined"
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
                        onChangeText={text => setDiscount(text)}
                        value={discount}
             
                        testID="FoodForm.dis"
                        // onBlur={props.handleBlur('price')}
                        
                        // onChangeText={text => setPrice(text)}
                        // value={price}
                        
                        // onBlur={props.handleBlur('price')}
                        /> 
                         
                         
                          {/* <Dropdown 
                          label="Status"
                          data={data1}
                          onChangeText={text => setStatus(text)}
                          style = {{color:'#08b8e1' }} //for changed text color
                          baseColor='#03498f' //for initial text color
                          itemColor='blue'
                          pickerStyle={{backgroundColor:'#dcbbdb'}}
                         
                          selectedItemColor='#08b8e1'
                          itemTextStyle={{paddingLeft:30,fontFamily:'nunito-bold'}}
                        value={status}/> */}
                    <FlatButton testID="food.Button" text='Add' onPress={submitFood}/>
                </View>
            )
            }
        </Formik>
        </ScrollView>
      </View>
      </Provider>
    );
  }