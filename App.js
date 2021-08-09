import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {Header} from 'react-native-elements';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default class App extends React.Component {

constructor(){
  super();
  this.state ={
    text:'',
    isSearchPressed:false,
    wordtype:'No Word Found',
    description:'No Word Found',
    word:'Write Any Word for Result.'
    }
}

getWord=(word)=>{
  var searchKeyword = word.toLowerCase();
  var url = 'https://rupinwhitehatjr.github.io/dictionary/'+searchKeyword+'.json';
  
  return fetch(url)
  .then ((data)=>{
    if(data.status === 200)
    {
      return data.json();
    }
    else
    {
      return null;
    }
  })
  .then((response)=>{
    var responseObject = response
    if(responseObject)
    {
      var wordData = responseObject.definitions[0]

      var definition = wordData.description
      var wordType = wordData.wordtype

      this.setState({
        word:this.state.text,
        description:definition,
        wordtype : wordType
      })
    }
    else{
      this.setState({
        word:this.state.text,
      description:'Not found',
      wordtype: 'Not found'
      })
    }
  })
}


  render() {
    return (
      <SafeAreaProvider style={styles.container}>
      <Header
      backgroundColor ={'#322e2f'}
      centerComponent={{text:'Dictionary App',style:{color:'#ffffff', fontSize:20,fontWeight:'bolder'}}}
      />
      <TextInput onChangeText = {text =>{
        this.setState({text:text})
      }}
      
      value = {this.state.text} 
      
      style = {{borderWidth:2,
                 marginTop:40,
                 alignSelf:'center',
                 width:250,
                 backgroundColor:'white'}}
      />
      <TouchableOpacity style ={{
        backgroundColor:'#f5f0e1',
        alignSelf:'center',
        width:90,
        height:50,
        marginTop:25,
        borderWidth:2,
        borderRadius:30

      }}
      
      onPress ={()=>{
        this.getWord(this.state.text);
        
      }}>
      <Text style ={{ 
        textAlign:'center',
        fontSize:20,
        fontWeight:'bold',
        marginTop:7.5,
        color:'#1e3d59'
      }}>Enter</Text>
      </TouchableOpacity>
      <View style={styles.infoContainer}>
      <Text style={styles.info}>Word: {this.state.word}</Text>
      <Text style={styles.info}>WordType: {this.state.wordtype}</Text>
      <Text style={styles.info}>Description: {this.state.description}</Text>
      </View>
      
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#1e3d59',
  },
  info:{
    margin:10,
    fontSize:22,
    fontFamily:'Italic Playfair Display',
    fontWeight:900,
    fontStyle:'Italic',
    backgroundColor:'#1868ae',
    color:'white',
    textAlign:'center'
  },

infoContainer:{
    margin:20,
    backgroundColor: '#d9a5b3',
}
})

