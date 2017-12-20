import React, { Component } from "react";
import { StyleSheet, Image, AsyncStorage } from "react-native";
import { Container, Header, View, DeckSwiper, Card, CardItem, Button, Thumbnail, List, ListItem, Fab, Text, Left, Right, Body , Content, Icon, Title, Spinner } from 'native-base';

import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyC82f1r-8meLl8mDq7VOQtf_nJ2UQMqNlY",
    authDomain: "catalogi-3fa90.firebaseapp.com",
    databaseURL: "https://catalogi-3fa90.firebaseio.com",
    projectId: "catalogi-3fa90",
    storageBucket: "catalogi-3fa90.appspot.com",
    messagingSenderId: "742055360723"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default class Catalog extends Component {
    
    constructor(props) {
        super(props);
        const date = new Date();
        this.state = {
            loaded: false,
            results: [],
            today: date.getDate() + "_" + parseInt(date.getMonth() + 1) + "_" + date.getFullYear()
        };
        this.itemsRef = this.getRef();
        console.ignoredYellowBox = [
            'Setting a timer'
        ];
    }
    
    getRef() {
        return firebaseApp.database().ref().child('products');
    }
    
    //listener to get data from firebase and update listview accordingly
    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {
            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    code: child.val().code,
                    designation: child.val().designation,
                    description: child.val().description,
                    price: child.val().price,
                    image: child.val().img,
                    size: child.val().size,
                    _key: child.key
                });
            });
            
            this.setState({
                loaded: true,
                results: items
            });
            AsyncStorage.setItem('catalog_' + this.state.today, JSON.stringify(items));
        });
    }
    
    componentDidMount() {
        AsyncStorage.getItem('catalog_' + this.state.today, (err, items) => {
            if (items !== null) {
                this.setState({
                    results: JSON.parse(items),
                    loaded: true
                });
            } else {
                this.listenForItems(this.itemsRef);
            }
        });
    }
    
    
    render() {
        return(
            <Container>
                <Header style={{backgroundColor:"#792557"}}>
                    <Left>
                        <Image source={require('./assets/images/logo.png')} style={{width:40, height: 40}}/>
                    </Left>
                    <Body>
                        <Title>Catalogue</Title>
                    </Body>
                </Header>
                <Content>
                    { !this.state.loaded ? <Spinner /> : 
                        <View style = {{flex: 1,flexDirection: "column",height: 550, backgroundColor:"transparent"}} >
                            <DeckSwiper
                                ref={(c) => this._deckSwiper = c}
                                dataSource={this.state.results}
                                renderItem={item =>
                                <Card style={{shadowColor: 'transparent'}}>
                                    <CardItem cardBody>
                                        <Image style={{ height: 300, flex: 1 }} source={{uri: item.image}} />
                                    </CardItem>
                                    <CardItem>
                                        <Left style={{ flexDirection: 'row' }}>
                                            <Body>
                                                <Text style = {{color: "#6F89C2"}} > 
                                                    {item.designation.toUpperCase()} 
                                                </Text>
                                                <Text note>{item.code}</Text>
                                            </Body>
                                        </Left>
                                        <Right><Text style={{fontSize: 20}}>{item.price} DH</Text></Right>

                                    </CardItem>
                                    <CardItem>
                                        <Left>
                                            <Text>{ item.description }</Text>
                                        </Left>
                                    </CardItem>
                                    <CardItem style={{flex:1}}>
                                        <Left>
                                        <Text>Tailles : </Text>
                                        {item.size.map((value, index) => {
                                            return (
                                                <Text circle key={index} style={{ fontSize: 10, borderWidth:1 , textAlign:'center',borderColor:"#AA98AE", paddingTop: 7,width:30, height:30, borderRadius:30/2}}> {value} </Text>
                                            )
                                        })}
                                        </Left>
                                    </CardItem>
                                </Card>
                            }
                            />
                        </View>
                    }
                </Content>
            </Container>
        );
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});