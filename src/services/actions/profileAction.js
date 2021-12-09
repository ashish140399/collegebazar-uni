import { phone_update_success, phone_update_failed, phone_update_loader,rollno_update_success, rollno_update_failed, rollno_update_loader } from '../types'
import { toast } from 'react-toastify'
import Axios from 'axios'
import FormData from 'form-data'
import { updatePhoneURL , updateRollNumber, updateProfileimg , updateStreamURL} from '../../API/api'


// update phone
export const updatePhone = (phone) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify({ phone })
    
    try {
        dispatch({
            type: phone_update_loader
        })
        const res = await Axios.put(updatePhoneURL, body, config)
        dispatch({
            type: phone_update_success
        })
        toast(res.data.msg)
    } catch (err) {
        dispatch({
            type: phone_update_failed
        })
        toast("Phone Update Failed")
    }
}

export const updateRollnumber = (rollno) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify({ rollno })

    try {
        dispatch({
            type: phone_update_loader
        })
        const res = await Axios.put(updateRollNumber, body, config)
        dispatch({
            type: rollno_update_success
        })
        toast(res.data.msg)
    } catch (err) {
        dispatch({
            type: rollno_update_failed
        })
        toast("Roll no Update Failed")
    }
}


export const updateStream = (stream) => async dispatch => {
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    const body = JSON.stringify({ stream })
    console.log(body,"action")
    try {
        dispatch({
            type: phone_update_loader
        })
        const res = await Axios.put(updateStreamURL, body, config)
        dispatch({
            type: rollno_update_success
        })
        toast(res.data.msg)
    } catch (err) {
        dispatch({
            type: rollno_update_failed
        })
        toast("Stream Update Failed")
    }
}

export const updateProfileImage = (data) => async dispatch => {
console.log("hi ashih")
    const config = {
        headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        }
    }
    let form = new FormData();
    const {files} = data;
    
    form.append("title", "ashish")
    form.append("image", files[0].file)
    console.log(files[0].file)
    try {
        dispatch({
            type: phone_update_loader
        })
        const res = await Axios.put(updateProfileimg, form, config)
        dispatch({
            type: phone_update_success
        })
        toast(res.data.msg)
    } catch (err) {
        dispatch({
            type: phone_update_failed
        })
        toast("Image Update Failed")
    }
}