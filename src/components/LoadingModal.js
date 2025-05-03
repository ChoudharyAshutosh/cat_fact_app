import React from "react";
import { View, ActivityIndicator} from 'react-native';
import tw from 'twrnc';

const LoadingModal = ()=>{
    const tailwind = tw.style;

    return(
        <View style={[tailwind('absolute justify-center items-center h-full w-full'), {backgroundColor:'rgba(0,0,0,0.5)'}]}>
            <View style={[tailwind('p-4 bg-white'), {borderRadius:5, elevation:5}]}>
                <ActivityIndicator size={'large'} color={'blue'}/>
            </View>
        </View>
    )
}

export default LoadingModal;