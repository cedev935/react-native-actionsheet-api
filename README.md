# react-native-actionsheet-api

提供Android和iOS平台通用的的`showActionSheetWithOptions()`API。统一使用`ActionSheet`。调用时，如果是iOS，调用`ActionSheetIOS.showActionSheetWithOptions()`。

# Why react-native-actionsheet-api

IOS有`ActionSheetIOS.showActionSheetWithOptions()`，但是在Android中没有这个方法可以使用，
虽然在Android中使用ActionSheet有人会感觉很别扭，但是有时候确实需要使用（可以把样式改成Android风格的）。

当我们必须**要使用ActionSheet**，并且希望跟IOS一样，**通过API调用来展示，而不是每次通过渲染一个组件**来展示，
基本上就是提供Native提供组件，比如[react-native-actionsheet-native](https://www.npmjs.com/package/react-native-actionsheet-native)，但是需要导入Native代码，而我不希望导入，所以开发出这个组件。

**这个组件并不完美，使用之前，需要先在页面中渲染**

# ScreenShot




# Useage

## Step 0:

```
# install
```

## Step 1:
```js
import ActionSheet from 'ActionSheet';
```

## Step 2:

```js
// 在页面中渲染
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
```js
// 然后在任何地方，都可以使用直接调用这个方法了
// IOS和Android都可以使用下面的代码
ActionSheet.showActionSheetWithOptions({
      options: BUTTONS,
      cancelButtonIndex: CANCEL_INDEX,
      destructiveButtonIndex: DESTRUCTIVE_INDEX,
      tintColor: 'green',
    },
    (buttonIndex) => {
      this.setState({ clicked: BUTTONS[buttonIndex] });
    }
);
```

# Todo
[-] Android样式完善  
[-] 添加最终截图  
[-] 提供Example  