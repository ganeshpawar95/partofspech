import React from 'react';
import { TextInput,Modal, Portal, Button, DataTable} from 'react-native-paper';
import {  ScrollView, Text, View,StyleSheet ,TouchableOpacity} from 'react-native';
import axios from 'axios';
import {api_base_url, post_paragraph } from '../Helper/Constant'
import AnimatedLoader from "react-native-animated-loader";
import { SketchPicker } from 'react-color';


class Home extends React.Component{
    constructor(){
        super();
        this.state={
            textdata:'',
            message:'',
            loading:false,
            responseapistatus:false,
            responsedata:[],
            showmodlss:false,
            str:'',
            partofspeech:'',
            showresponsemodel:false,
            colromodle:false,
            crruntword:''
        }

    }
onsubmit= async () => {
    this.setState({
        message:"",
        loading:true,

    })
    if(!this.state.textdata){
        this.setState({
            message:"Please Enter Your Paragraph",
            loading:false,
        })
        return false;
    }
    
    try{
        let response = await axios({
            method  :'post',
            url : api_base_url + post_paragraph,
            headers : {
                Accept : "application/json",
                "Content-Type" : "application/json",
            },
            data : {
                "paragraph" : this.state.textdata,
            }
        })
        let data = await response.data;
        
        // console.log('data',data)
        this.setState({
            responsedata:data,
            loading:false,
            responseapistatus:true,
            showresponsemodel:true
    
        })
        // this.state.responsedata.map((str, index) => {
        //     var strv=str.word
        //    this.setState({
        //        [strv]:''
        //    })
        // }
        // )
        // console.log('response',response)
    }catch(err)
    {
        console.log('err_',err)
        this.setState({status : err.message,  loading : false});
    }
}
resetstate=()=>{
    this.state.responsedata.map((str, index) => {
            var strv=str.word
           this.setState({
               [strv]:''
           })
        }
        )
    this.setState({
        str:'',
        partofspeech:'',
        textdata:'',
        message:'',
        loading:false,
        crruntword:'',
        responseapistatus:false,
        showresponsemodel:false

    })
}
  CheckWord=(words,explain,e)=>{
      console.log('wprds',e)
      const nameji=words
    this.setState({
        str:words,
        partofspeech:explain,
        showmodlss:true,
        // colromodle:true,
        crruntword:words
    })
    
  }
  hideModal=()=>{
      this.setState({
          showmodlss:false
      })
  }
  hideModal1=()=>{
    this.setState({
        showresponsemodel:false,
        showmodlss:false
    })
}
hideModalcolor=()=>{
    this.setState({
        colromodle:false
    })
}
collonmap=(value)=>{
this.setState({
    [value]:value
})
return value
}
  
changeclor=(color)=>{
    console.log('color',color)

}
    render(){
        console.log('responsedata',this.state)
        
        
        return(

            // <ScrollView >
                <View style={{height:'100%'}}>
        <ScrollView  style={{margin:'2%'}}>
           {!this.state.loading && !this.state.responseapistatus &&
           <View>
            <TextInput
            mode="outlined"
            label="Paragraph"
            numberOfLines={10}
            placeholder="Enter Your Paragraph"
            multiline={true}
            value={this.state.textdata}
            onChangeText={value => this.setState({ message:"",textdata:value})}
            />
            <Text style={{color:'red'}} style={{textAlign:'center',color:'red'}} >{this.state.message}</Text>
            <View style={{marginTop:'5%'}}>
            <Button style={{alignSelf:'center',backgroundColor:'black'}}  mode="contained" onPress={this.onsubmit}>
               Process
            </Button>
            </View>
            </View>}
            <View>
            <AnimatedLoader
            visible={this.state.loading}
            overlayColor="rgba(255,255,255,0.75)"
            source={require('../assets/loders.json')}
            animationStyle={{width: 100,
                height: 150
            }}
            speed={1}
            >
            </AnimatedLoader>
            </View>
            {this.state.responseapistatus && <View >
            <Text style={{paddingRight:10}} selectable={true} selectionColor="#f78da7">

            {
            this.state.responsedata.map((str, index) => {
                console.log('dddddddddd',str)
                var vlsdd=' '
                if(str.pos=='PUNCT'){
                     vlsdd=''

                }
                const vals=this.state[str.word]
                return (
                <Text key={index} onPress={(e) => this.CheckWord(str.word, str.explain,e)} style={{fontSize:20, backgroundColor:vals ,paddingLeft:10}}>{str.word}{vlsdd}</Text>
                )
            }
            )
            }

        </Text>
        <View style={{marginTop:'5%'}}>
            <Button style={{alignSelf:'center',backgroundColor:'red'}}  mode="contained" onPress={this.resetstate}>
               reset
            </Button>
            </View>
            </View>}
            </ScrollView>
            <Modal visible={this.state.showmodlss} onDismiss={this.hideModal} contentContainerStyle={{backgroundColor:'white',height:'20%',marginLeft:'4%',marginRight:'4%',borderRadius:20}}>
            <Text style={{textAlign:'center',fontSize:22}}>{this.state.str} : {this.state.partofspeech}</Text>
            </Modal>

           
            <Modal visible={this.state.showresponsemodel} onDismiss={this.hideModal1} contentContainerStyle={{backgroundColor:'white',height:'60%',marginLeft:'4%',marginRight:'4%',borderRadius:20}}>
            {/* <Text style={{textAlign:'center',fontSize:22}}>{this.state.str} : {this.state.partofspeech}</Text> */}
            <ScrollView>
            <DataTable style={{fontSize:30}}>
            <DataTable.Header>
            <DataTable.Title >Words</DataTable.Title>
            <DataTable.Title >Part Of Speech</DataTable.Title>
            </DataTable.Header>

            {this.state.responsedata.map((value,index)=>(
            <DataTable.Row>
            <DataTable.Cell>{value.word}</DataTable.Cell>
            <DataTable.Cell >{value.explain}</DataTable.Cell>
            </DataTable.Row>
            ))}
            </DataTable>
            </ScrollView>
            </Modal>   

            <Modal visible={this.state.colromodle} onDismiss={this.hideModalcolor} contentContainerStyle={{backgroundColor:'white',height:'10%',marginLeft:'4%',marginRight:'4%',borderRadius:20}}>
            <View style={{justifyContent:'space-between',flexDirection:'row',width:'80%',marginLeft:15}}>
                <TouchableOpacity onPress={(e)=>this.setState({[this.state.crruntword]:'#f78da7',colromodle:false,showmodlss:true})} style={{height:30,width:30,borderRadius:15,backgroundColor:'#f78da7'}}>

                </TouchableOpacity>
                <TouchableOpacity onPress={(e)=>this.setState({[this.state.crruntword]:'#03a9f4',colromodle:false,showmodlss:true})}  style={{height:30,width:30,borderRadius:15,backgroundColor:'#03a9f4'}}>

                </TouchableOpacity>
                <TouchableOpacity onPress={(e)=>this.setState({[this.state.crruntword]:'#ffeb3b',colromodle:false,showmodlss:true})} style={{height:30,width:30,borderRadius:15,backgroundColor:'#ffeb3b'}}>

                </TouchableOpacity>
                <TouchableOpacity onPress={(e)=>this.setState({[this.state.crruntword]:'#ffc107',colromodle:false,showmodlss:true})} style={{height:30,width:30,borderRadius:15,backgroundColor:'#ffc107'}}>

                </TouchableOpacity>
            </View>
            </Modal>
</View>)
    }
    }
export default Home;