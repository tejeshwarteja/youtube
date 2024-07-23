import * as api from "../Api";
import { setcurrentuser } from "./currentuser";
export const login=(authdata)=>async(dispatch)=>{
    try {
        const {data}=await api.login(authdata);
        console.log(data)
        dispatch({type:"AUTH",data})
        dispatch(setcurrentuser(JSON.parse(localStorage.getItem('Profile'))))
    } catch (error) {
        alert(error)
    }
}