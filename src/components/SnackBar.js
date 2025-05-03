import React,{ useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const SnackBar = ({msg='', show=false, hideAction, showTime=2,customStyle})=>{
    const [shown, setShown] = useState(false);
    const tailwind = tw.style;

    useEffect(()=>{
        showBar();
    },[show])

    const showBar = ()=>{
        if(shown==false && show){
            setShown(true);
            if(showTime){
                setTimeout(()=>{
                    setShown(false);
                    hideAction();
                },(showTime*1000))
            }
        }
    }

    const hideBar = ()=>{
        setShown(false);
        hideAction();
    }

    return (
        <View style={[tailwind('w-full p-2'), {position:'absolute',bottom:50},customStyle]}>
            {
                shown && (
                    <View style={[tailwind('p-3 flex-row bg-gray-800') ,{elevation:5,borderRadius:5}]}>
                        <View style={[tailwind('flex-1 pr-2')]}>
                            <Text style={[{fontSize:16,color:'#FFFFFF'}]}>
                                {msg}
                            </Text>
                        </View>
                        <View style={[tailwind('justify-center')]}>
                            <View style={[tailwind('px-2')]}>
                                <Text style={[tailwind('text-rose-500 font-semibold'), {fontSize:16}]} onPress={hideBar}>
                                    Close
                                </Text>
                            </View>
                        </View>
                    </View>
                )
            }
        </View>
    )
}

export default SnackBar;