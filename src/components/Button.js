import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';

const Button = ({title = 'Submit', action = ()=>{}, customBtnCSS = '', customTextCSS = ''})=>{
    const tailwind = tw.style;

    return(
        <TouchableOpacity
            style={[tailwind(`bg-green-800 p-2 ${customBtnCSS}`), {borderRadius: 5}]}
            onPress={action}
        >
            <Text style={[tailwind(`text-lg text-white text-center font-semibold ${customTextCSS}`)]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default Button;