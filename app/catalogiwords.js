import React, { Component } from "react";
import { Container, StyleSheet, View, Text, StatusBar, ListItem, ListView } from 'react-native';

import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: "AIzaSyDWedZY1svNHxPUi2ReQJTlCf9Q60407E8",
    authDomain: "streetfrench-a84df.firebaseapp.com",
    databaseURL: "https://streetfrench-a84df.firebaseio.com",
    projectId: "streetfrench-a84df",
    storageBucket: "streetfrench-a84df.appspot.com",
    messagingSenderId: "551358813028"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);


export default class Catalogi extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
        this.itemsRef = this.getRef().child('words');
    }

    getRef() {
        return firebaseApp.database().ref();
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    french: child.val().french,
                    english: child.val().english,
                    _key: child.key
                });
            });

            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(items)
            });

        });
    }

    componentDidMount() {
        this.listenForItems(this.itemsRef);
    }

    render() {
        return (
            <View style={styles.container}>

                <StatusBar title="Dictionary" />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this._renderItem.bind(this)}
                    enableEmptySections={true}
                    style={styles.listview} />


            </View>
        )
    }
    _renderItem(item) {

        return (
            <ListItem item={item} />
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