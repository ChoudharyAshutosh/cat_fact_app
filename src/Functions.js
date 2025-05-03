import axios from "axios";

export const retrieveNotes = async(serverAddress)=>{
    try{
        let apiAddress = `http://${serverAddress}:4000/api/retrieveNotes`;
        var myHeaders = new Headers();
        myHeaders.append('Content-Type','application/json');

        const {data} = await axios.get(
            apiAddress,
            {
                headers:myHeaders.map
            }
        );
        
        if(data.status==false){
            throw data;
        }

        return data;
    }
    catch(error){
        if(error['message'] && error['message'] === 'Network Error'){
            throw 'Bad network connectivity';
        }
        else if(error.status==undefined){
            throw error;
        }
        else{
            throw error.msg;
        }
    }
}

export const createNote = async(serverAddress, dataObject)=>{
    try{
        let apiAddress = `http://${serverAddress}:4000/api/createNote`;
        var myHeaders = new Headers();
        myHeaders.append('Content-Type','application/json');

        const {data} = await axios.post(
            apiAddress,
            dataObject,
            {
                headers:myHeaders.map
            }
        );
        
        if(data.status==false){
            throw data;
        }

        return data;
    }
    catch(error){
        if(error['message'] && error['message'] === 'Network Error'){
            throw 'Bad network connectivity';
        }
        else if(error.status==undefined){
            throw error;
        }
        else{
            throw error.msg;
        }
    }
}

export const removeNote = async(serverAddress, dataObject)=>{
    try{
        let apiAddress = `http://${serverAddress}:4000/api/removeNote`;
        var myHeaders = new Headers();
        myHeaders.append('Content-Type','application/json');

        const {data} = await axios.delete(
            apiAddress,
            {
                data:dataObject
            },
            {
                headers:myHeaders.map
            }
        );
        
        if(data.status==false){
            throw data;
        }

        return data;
    }
    catch(error){
        if(error['message'] && error['message'] === 'Network Error'){
            throw 'Bad network connectivity';
        }
        else if(error.status==undefined){
            throw error;
        }
        else{
            throw error.msg;
        }
    }
}

export const searchNote = async(serverAddress, dataObject)=>{
    try{
        let apiAddress = `http://${serverAddress}:4000/api/searchNote`;
        var myHeaders = new Headers();
        myHeaders.append('Content-Type','application/json');

        const {data} = await axios.post(
            apiAddress,
            dataObject,
            {
                headers:myHeaders.map
            }
        );
        
        if(data.status==false){
            throw data;
        }

        return data;
    }
    catch(error){
        if(error['message'] && error['message'] === 'Network Error'){
            throw 'Bad network connectivity';
        }
        else if(error.status==undefined){
            throw error;
        }
        else{
            throw error.msg;
        }
    }
}