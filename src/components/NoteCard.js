import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import Button from './Button';

const NoteCard = ({data, deleteAction})=>{
    const tailwind = tw.style;

    const removeNote = ()=>{
        deleteAction(data.id)
    }

    return(
        <View style={[tailwind('bg-white'), {borderRadius:5, elevation:5}]}>
            <View style={[tailwind('p-3 border-b-2 border-gray-300')]}>
                <Text style={[tailwind('text-2xl text-center font-semibold text-gray-800 mb-0')]}>
                    {data.title}
                </Text>
            </View>
            <View style={[tailwind('p-3 border-b-2 border-gray-300')]}>
                <Text style={[tailwind('text-lg font-semibold text-gray-500 mb-0')]}>
                    {data.content}
                </Text>
                <View style={[tailwind('mt-2')]}>
                    <Text style={[tailwind('text-lg font-semibold text-rose-900 mb-0')]}>Fact : </Text>
                    <Text style={[tailwind('text-sm font-semibold text-rose-500 mb-0')]}>
                        {data.catfact}
                    </Text>
                </View>
            </View>
            <View style={[tailwind('p-3')]}>
                <Button
                    customBtnCSS={'bg-gray-600'}
                    title={'Remove'}
                    action={removeNote}
                />
            </View>
        </View>
    )
}

export default NoteCard;