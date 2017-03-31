/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Dimensions
} from 'react-native';
import ActionSheet from 'ActionSheet';

export default class SucceLover extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.button1} onPress={this.chooseFruit}>选择喜欢的水果</Text>
                <Text style={styles.button2} onPress={this.chooseDrink}>选择喜欢的饮料</Text>
            </View>
        );
    }

    chooseFruit(){
        ActionSheet.showActionSheetWithOptions({
            title: '请选择您最喜欢的水果',
            options: ['苹果🍎', '梨🍐', '香蕉🍌', '橘子🍊', '都不喜欢'],
            cancelButtonIndex: 4
        },
            (buttonIndex) => {
                console.log('您的选择：', buttonIndex);
            }
        );
    }

    chooseDrink(){
        ActionSheet.showActionSheetWithOptions({
            title: '请选择您最喜欢的饮料',
            options: ['雪碧', '可口可乐', '脉动', '芬达', '不喜欢喝饮料'],
            cancelButtonIndex: 4,
            destructiveButtonIndex: 3,
            tintColor: 'green',
        },
            (buttonIndex) => {
                console.log('您的选择：', buttonIndex);
            }
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        paddingTop: 45
    },
    button1: {
        paddingVertical: 10,
        margin: 10,
        width: Dimensions.get('window').width - 20,
        backgroundColor: '#DB5149',
        color: 'white',
        textAlign: 'center',
        borderRadius: 4,
        overflow: 'hidden'
    },
    button2: {
        paddingVertical: 10,
        margin: 10,
        width: Dimensions.get('window').width - 20,
        backgroundColor: '#29A365',
        color: 'white',
        textAlign: 'center',
        borderRadius: 4,
        overflow: 'hidden'
    },
});

AppRegistry.registerComponent('ActionSheetExample', () => SucceLover);