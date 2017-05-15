/**
 * @file ActionSheet API
 * @author zdying
 * @providesModule ActionSheet
 */
import React, {Component} from 'react';
import {
    Modal, Text, View, Animated, TouchableWithoutFeedback, TouchableOpacity,
    Platform, ActionSheetIOS, StyleSheet, Button
} from 'react-native';
import styles from './styles';

const isIOS = Platform.OS === 'ios';
const TITLE_HEIGHT = 40;
const BUTTON_HEIGHT = 58;
const GROUP_SPACE_WIDTH = 10;

export default class ActionSheet extends Component {
    constructor(props, state){
        super(props, state);

        global.__action_sheet = this;
        this.state = {
            sheets: [],
            marginBottomValue: new Animated.Value(0)
        };

        this.state.marginBottomValue.addListener(({value}) => this._value = value);
    }

    show(opts, callback){
        let sheets = this.state.sheets;
        let height = this.getHeight(opts);

        this.state.marginBottomValue.setValue(-height);

        this.setState({
            sheets: [...sheets, {
                opts,
                callback
            }],
            height
        })
    }

    hide(){
        Animated.timing(
            this.state.marginBottomValue,
            {toValue: -this.state.height, duration: 210, delay: 0}
        ).start(()=>{
            this.setState({
                sheets: this.state.sheets.slice(0, -1)
            });
        });
    }

    getHeight(opts){
        let {title, cancelButtonIndex, options, destructiveButtonIndex} = opts;

        let height = options.length * BUTTON_HEIGHT + 10;

        if(title){
            height += TITLE_HEIGHT;
        }

        if(cancelButtonIndex < options.length && cancelButtonIndex !== destructiveButtonIndex){
            height += GROUP_SPACE_WIDTH;
        }

        return height
    }

    render(){
        if(/*isIOS || */this.state.sheets.length === 0){
            return null
        }

        Animated.timing(
            this.state.marginBottomValue,
            {toValue: 0, duration: 210, delay: 10}
        ).start();

        let onMaskPress = this.onMaskPress.bind(this);

        return (
            <Modal visible={true} transparent={true} animationType="fade" onRequestClose={onMaskPress}>
                <TouchableWithoutFeedback onPress={onMaskPress}>
                    <Animated.View style={[
                        styles.main, {marginBottom: this.state.marginBottomValue}
                    ]}>
                        <View style={styles.body}>
                            {this.renderActionButtons()}
                        </View>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }

    renderActionButtons(){
        let {sheets} = this.state;
        let lastSheet = sheets.slice(-1)[0];
        let {buttonList, cancelButton, title} = this.parseOpitons(lastSheet);

        return [
            this.renderButtonList(buttonList, {}, title),
            cancelButton && this.renderButtonList([cancelButton], {marginTop: 10})
        ]
    }

    parseOpitons(sheet){
        let {opts, callback} = sheet;
        let buttonList = [];
        let cancelButton = null;
        let {title, options=[], tintColor='#157EFB', cancelButtonIndex, destructiveButtonIndex} = opts;

        (options).forEach((option, index) => {
            let btnObj = {
                title: option,
                index,
                callback
            };

            if(index === destructiveButtonIndex){
                btnObj.color = 'red';
            }else{
                btnObj.color = tintColor;
            }

            if(index === cancelButtonIndex && cancelButtonIndex !== destructiveButtonIndex){
                btnObj.fontWeight = 'bold';
                cancelButton = btnObj;
            }else{
                btnObj.fontWeight = 'normal';
                buttonList.push(btnObj)
            }
        });

        return {
            buttonList,
            cancelButton,
            title
        }
    }

    renderButtonList(list, style, title){
        return (
            <View style={[styles.buttonContainer, style]} key={"button_list_" + Math.random()}>
                {title ? <View style={styles.header}><Text style={styles.headerText}>{title}</Text></View> : null}
                {
                    list.map((button, bIndex) => {
                        let {index, title, color, fontWeight, callback} = button;
                        let borderBottomWidth = Number(bIndex !== list.length - 1);

                        return (
                            <TouchableOpacity
                                style={[styles.button, {borderBottomWidth}]}
                                key={'button_' + button.index}
                                onPress={this.onButtonPress.bind(this, index, callback)}
                                activeOpacity={0.9}
                            >
                                <Text style={[styles.buttonText, {color, fontWeight}]}>{title}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        );
    }

    onButtonPress(index, callback){
        callback(index);
        this.hide();
    }

    onMaskPress(){
        let {sheets} = this.state;
        let lastSheet = sheets.slice(-1)[0] || {};
        let {opts, callback} = lastSheet;

        if(!opts || !callback){
            return
        }

        let {options=[], cancelButtonIndex, destructiveButtonIndex} = lastSheet.opts;

        if(cancelButtonIndex < options.length && cancelButtonIndex !== destructiveButtonIndex){
            callback(cancelButtonIndex);
            this.hide();
        }
    }
}

/**
 * Display an action sheet. The `opts` object must contain one or more
 * of:
 *
 * - `options` (array of strings) - a list of button titles (required)
 * - `cancelButtonIndex` (int) - index of cancel button in `options`
 * - `destructiveButtonIndex` (int) - index of destructive button in `options`
 * - `title` (string) - a title to show above the action sheet
 * - `message` (string) - a message to show below the title
 * - `tintColor` (string) - button color
 */
ActionSheet.showActionSheetWithOptions = (
    opts,
    callback
) => {
    if(isIOS){
        // IOS 直接调用API
        ActionSheetIOS.showActionSheetWithOptions(opts, callback)
    }else{
        // Android
        if(global.__action_sheet instanceof ActionSheet){
            global.__action_sheet.show(opts, callback);
        }else{
            throw 'ActionSheet has not been initialized. To initialize ActionSheet, you should put `<ActionSheet />` to your render().';
        }
    }
};

ActionSheet.hide = () => {
    global.__action_sheet.hide();
};

global.ActionSheet = ActionSheet;