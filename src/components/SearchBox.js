import React from 'react';
import { TextInput, View, TouchableOpacity, Text } from 'react-native';
import tw from 'twrnc';

const SearchBox = ({value = '', onChangeText = ()=>{}, performSearch = ()=>{}, clearSearch = ()=>{}, searchDone = false})=>{
    const tailwind = tw.style;

    return(
        <View style={[tailwind('flex-row items-center')]}>
            <TextInput
                style={[tailwind(`flex-1 ${searchDone ? 'bg-gray-400' : 'bg-gray-300'} text-lg px-3`), {borderTopLeftRadius:5,borderBottomLeftRadius:5}]}
                onChangeText={onChangeText}
                value={value}
                placeholder={'Search Here'}
                editable={!searchDone}
            />
            {
                searchDone && (
                    <TouchableOpacity 
                        style={[tailwind('px-5 bg-gray-800 h-full flex-row items-center'), {borderTopRightRadius:5,borderBottomRightRadius:5}]}
                        onPress={clearSearch}
                    >
                        <Text style={[tailwind('text-lg text-white')]}>
                            Clear
                        </Text>
                    </TouchableOpacity>
                )
            }
            {
                !searchDone && (
                    <TouchableOpacity 
                        style={[tailwind('px-3 bg-blue-500 h-full flex-row items-center'), {borderTopRightRadius:5,borderBottomRightRadius:5}]}
                        onPress={performSearch}
                    >
                        <Text style={[tailwind('text-lg text-white')]}>
                            Search
                        </Text>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

export default SearchBox;