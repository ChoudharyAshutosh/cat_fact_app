import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import LoadingModal from '../components/LoadingModal';
import SnackBar from '../components/SnackBar';
import Button from '../components/Button';
import { createNote } from '../Functions';
import Store from '../Store';
import InputBox from '../components/InputBox';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const AddNote = ({route, navigation})=>{
    const tailwind = tw.style;
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const { store, setStore } = useContext(Store);
    const [snackMsg, setSnackMsg] = useState(null);

    const goBack = ()=>{
        navigation.navigate('NotesList', {
            rand: Math.random()
        });
    }

    const saveNote = async()=>{
        if(!store.serverAddress){
            setSnackMsg('Server Not Addedd');
            return;
        }

        setLoading(true);

        try{
            let data = {
                title: title.trim(),
                content: content.trim()
            }
            let response = await createNote(store.serverAddress, data);
            goBack();
        }
        catch(error){
            if(typeof error != 'string'){
                error = error.toString();
            }

            setSnackMsg(error);
        }

        setLoading(false);
        setTitle('');
        setContent('');
    }

    return(
        <SafeAreaView style={[tailwind('flex-1')]}>
            <View style={[tailwind('flex-1')]}>
                <View style={[tailwind('w-full bg-rose-500 flex-row items-center'), {elevation:5}]}>
                    <TouchableOpacity 
                        style={[tailwind('border-r-2 border-white p-3')]}
                        onPress={goBack}
                    >
                        <AntDesignIcon name={'arrowleft'} color={'white'} size={28}/>
                    </TouchableOpacity>
                    <View style={[tailwind('ml-2 flex-1 p-3')]}>
                        <Text style={[tailwind('text-2xl font-semibold text-white')]}>
                            Add Note
                        </Text>
                    </View>
                </View>
                <View style={[tailwind('flex-1')]}>
                    <ScrollView>
                        <View style={[tailwind('p-5')]}>
                            <View>
                                <Text style={[tailwind('text-xl font-semibold')]}>Title <Text style={[tailwind('text-rose-500')]}>*</Text></Text>
                                <InputBox
                                    cutomCSS={`mt-3 mb-1 ${title != '' && title.length > 15 ? 'border-rose-500' : 'border-gray-400'}`}
                                    onChangeText={setTitle}
                                    value={title}
                                />
                                {
                                    title != '' && title.length > 15 && (
                                        <Text style={[tailwind('text-sm font-semibold text-rose-500')]}>Title should contain atmost 15 characters</Text>
                                    )
                                }
                            </View>
                            <View style={[tailwind('mt-3')]}>
                                <Text style={[tailwind('text-xl font-semibold')]}>Content <Text style={[tailwind('text-rose-500')]}>*</Text></Text>
                                <InputBox
                                    cutomCSS={`mt-3 mb-1 ${content != '' && content.length <= 20 ? 'border-rose-500' : 'border-gray-400'}`}
                                    onChangeText={setContent}
                                    value={content}
                                    multiline={true}
                                    numberOfLines={7}
                                />
                                {
                                    content != '' && content.length <= 20 && (
                                        <Text style={[tailwind('text-sm font-semibold text-rose-500')]}>Title should contain atleast 20 characters</Text>
                                    )
                                }
                            </View>
                        </View>
                    </ScrollView>
                    <View style={[tailwind('p-4 bg-white border-t-2 border-gray-300')]}>
                        <Button title={'Save Note'} action={saveNote}/>
                    </View>
                </View>
                {
                    loading && (
                        <LoadingModal/>
                    )
                }
                <SnackBar show={snackMsg ? true : false} msg={snackMsg} hideAction={()=>{setSnackMsg(null)}}/>
            </View>
        </SafeAreaView>
    )
}

export default AddNote;

