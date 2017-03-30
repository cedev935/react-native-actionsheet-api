# react-native-actionsheet-api

React Native API Andorid polyfill

# Why react-native-actionsheet-api

# ScreenShot



# Useage

## Step 1:
```js
import ActionSheet from 'ActionSheet';
```

## Step 2:

```
# in your page component's render()

class MyPage extends React.component {
    // ...

    render(){
        return (
            <View>
                <ActionSheet />
                {/* ... */}
            </View>
        )
    }
}
```

## Step 3:
```
# you can use the api anywhere

ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      tintColor: 'green',
    },
    (buttonIndex) => {
      this.setState({ clicked: BUTTONS[buttonIndex] });
    });
```

# Todo
[ ] Android样式完善