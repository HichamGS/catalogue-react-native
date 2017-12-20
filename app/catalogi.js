import React, { Component } from "react";
import { Container, StyleSheet, Spinner, View, Text, StatusBar, ListItem, ListView } from 'react-native';

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

export default class Catalogi extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
        this.itemsRef = this.getRef();
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
                    price: child.val().price,
                    image: child.val().img,
                    _key: child.key
                });
            });
            
            this.setState({
                loaded: true,
                dataSource: this.state.dataSource.cloneWithRows(items)
            });
            
        });
    }
    
    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }
    
    
    render() {
        console.log(this.state.loaded);
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return this.renderListView();
    }
    renderLoadingView(){
        return (
            <Spinner /> 
        )
    }
    renderListView(){
        return (
                <View style={styles.container}>
                    <ListView
                        dataSource={this.state.dataSource}
                        renderRow={this._renderItem.bind(this)}
                        style={styles.listview} />
                </View>
        )
    }
    _renderItem(item) {
        return (
            <ListItem item={item}/>
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