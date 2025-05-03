import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import LoadingModal from '../components/LoadingModal';
import SnackBar from '../components/SnackBar';
import Button from '../components/Button';
import { retrieveNotes, removeNote, searchNote } from '../Functions';
import Store from '../Store';
import NoteCard from '../components/NoteCard';
import SearchBox from '../components/SearchBox';

const NotesList = ({navigation, route})=>{
    const tailwind = tw.style;
    const [notes, setNotes] = useState(null);
    const [loading, setLoading] = useState(false);
    const [snackMsg, setSnackMsg] = useState(null);
    const fetchingNote = useRef(false);
    const { store, setStore } = useContext(Store);
    const [searchedString, setSearchedString] = useState('');
    const [isFilteredData, setIsFilteredData] = useState(false);

    const addNote = ()=>{
        navigation.navigate('AddNote');
    }

    const fetchNotes = async()=>{
        if(fetchingNote.current) return;

        fetchingNote.current = true;
        setNotes(null);

        try{
            let response = await retrieveNotes(store.serverAddress);
            setNotes([...response.data]);
        }
        catch(error){
            if(typeof error != 'string'){
                error = error.toString();
            }

            setSnackMsg(error);
        }

        fetchingNote.current = false;
    }

    const deleteNote = async(noteId)=>{
        setLoading(true);

        try{
            let data = {
                id: noteId
            }
            let response = await removeNote(store.serverAddress, data);
            fetchNotes();
        }
        catch(error){
            if(typeof error != 'string'){
                error = error.toString();
            }

            setSnackMsg(error);
        }

        setLoading(false);
    }

    const clearSearch = ()=>{
        setSearchedString('');
        setIsFilteredData(false);
        fetchNotes();
    }

    const searchString = async()=>{
        setNotes(null);
        try{
            let data = {
                string: searchedString.trim()
            }
            let response = await searchNote(store.serverAddress, data);
            setNotes([...response.data]);
            setIsFilteredData(true);
        }
        catch(error){
            if(typeof error != 'string'){
                error = error.toString();
            }

            setSnackMsg(error);
        }
    }

    useEffect(()=>{
        if(store.serverAddress){
            fetchNotes();
        }
    }, [store, route])

    return(
        <SafeAreaView style={[tailwind('flex-1')]}>
            <View style={[tailwind('flex-1')]}>
                <View style={[tailwind('w-full p-3 bg-rose-500'), {elevation:5}]}>
                    <Text style={[tailwind('text-2xl font-semibold text-white')]}>
                        Existing Notes
                    </Text>
                </View>
                <View style={[tailwind('flex-1')]}>
                    {
                        !notes && (
                            <View style={[tailwind('flex-1 justify-center items-center')]}>
                                <ActivityIndicator size={'large'} color={'blue'}/>
                            </View>
                        )
                    }
                    {
                        notes && notes.length == 0 && !isFilteredData && (
                            <View style={[tailwind('flex-1 justify-center')]}>
                                <View style={[tailwind('m-8 p-5 bg-white'), {borderRadius:5, elevation:5}]}>
                                    <Text style={[tailwind('text-2xl text-center font-semibold text-rose-500 mb-0')]}>No Note Found</Text>
                                    <Text style={[tailwind('text-2xl text-center font-semibold text-rose-500 mb-5')]}>Start By Adding Your First Note</Text>
                                    <Button title={'Add Note'} action={addNote}/>
                                </View>
                            </View>
                        )
                    }
                    {
                        notes && (notes.length > 0 || isFilteredData) && (
                            <View style={[tailwind('flex-1 justify-center')]}>
                                <ScrollView contentContainerStyle={{flex:(isFilteredData ? 1: 0)}}>
                                    <View style={[tailwind('p-5 flex-1')]}>
                                        <View style={[tailwind('mb-3')]}>
                                            <SearchBox
                                                onChangeText={setSearchedString}
                                                value={searchedString}
                                                performSearch={searchString}
                                                searchDone={isFilteredData}
                                                clearSearch={clearSearch}
                                            />
                                        </View>
                                        {
                                            isFilteredData && notes.length == 0 && (
                                                <View style={[tailwind('flex-1 justify-center')]}>
                                                    <Text style={[tailwind('text-2xl text-center font-semibold text-gray-500 mb-0')]}>No Note Found</Text>
                                                </View>
                                            )
                                        }
                                        {
                                            notes.map((note, index)=>{
                                                return(
                                                    <View style={[tailwind('my-2')]} key={`note_${index+1}`}>
                                                        <NoteCard data={note} deleteAction={deleteNote}/>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>
                                </ScrollView>
                                {
                                    !isFilteredData && (
                                        <View style={[tailwind('p-4 bg-white border-t-2 border-gray-300')]}>
                                            <Button title={'Add Note'} action={addNote}/>
                                        </View>
                                    )
                                }
                            </View>
                        )
                    }
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

export default NotesList;