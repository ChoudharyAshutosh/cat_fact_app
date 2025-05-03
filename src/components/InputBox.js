import React from 'react';
import { TextInput } from 'react-native';
import tw from 'twrnc';

const InputBox = ({cutomCSS = 'Submit', value = '',onChangeText = ()=>{}, placeholder = '', multiline = false, numberOfLines = 1})=>{
    const tailwind = tw.style;

    return(
        <TextInput
            style={[tailwind(`bg-gray-300 text-lg my-5 px-3 border-2 border-rose-500 ${cutomCSS}`), {borderRadius:5, textAlignVertical:(multiline ? 'top' : 'auto'), minHeight:(multiline?200:'auto')}]}
            onChangeText={onChangeText}
            value={value}
            placeholder={placeholder}
            multiline={multiline}
            numberOfLines={numberOfLines}
        />
    )
}

export default InputBox;