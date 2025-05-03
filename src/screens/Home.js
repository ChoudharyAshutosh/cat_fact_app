import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingModal from '../components/LoadingModal';
import SnackBar from '../components/SnackBar';
import Button from '../components/Button';
import InputBox from '../components/InputBox';
import Store from '../Store';

const Home = ({navigation, })=>{
    const tailwind = tw.style;
    const [snackMsg, setSnackMsg] = useState(null);
    const [serverAdrress, setServerAddress] = useState('');
    const { store, setStore } = useContext(Store);

    const saveIpAddress = ()=>{
        let ipRegEx = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;

        if(ipRegEx.test(serverAdrress)){
            let data = {...store};
            data.serverAddress = serverAdrress;
            setStore({...data});
            navigation.navigate('NotesList', {
                rand: Math.random()
            });
        }
        else{
            setSnackMsg('Invalid ip address');
        }
    }
    
    return(
        <SafeAreaView style={[tailwind('flex-1 justify-center')]}>
            <View style={[tailwind('flex-1 justify-center items-center bg-gray-500')]}>
                <View style={[tailwind('m-4 p-5 bg-white'), {borderRadius:5, elevation:5}]}>
                    <Text style={[tailwind('text-2xl text-center font-semibold')]}>Please Enter Server Address</Text>
                    <InputBox
                        cutomCSS={'my-5'}
                        onChangeText={setServerAddress}
                        value={serverAdrress}
                        placeholder={"Ex. 192.168.27.204"}
                    />
                    <Button title={'Proceed'} action={saveIpAddress}/>
                </View>
            </View>
            {
                false && (
                    <LoadingModal/>
                )
            }
            <SnackBar show={snackMsg ? true : false} msg={snackMsg} hideAction={()=>{setSnackMsg(null)}}/>
        </SafeAreaView>
    )
}

export default Home;