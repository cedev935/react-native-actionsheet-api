/**
 * @file
 * @author zdying
 */

'use strict';

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },

    body: {
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 10
    },

    header: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: '#f0eff5',
        height: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },

    headerText: {
        fontSize: 14,
        color: '#8F8F8F',
    },

    buttonContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'hidden'
    },

    button: {
        height: 58,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#f0eff5',
        alignItems: 'center',
        justifyContent: 'center'
    },

    buttonText: {
        fontSize: 18
    },

    buttonLast: {
        borderBottomWidth: 0
    },

    red: {
        color: 'red'
    }
});