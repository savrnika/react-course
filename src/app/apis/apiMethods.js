import axios from 'axios.js'
import React, { useEffect } from 'react'
export const _get = (url, token) => axios.get(url, { headers: { "Authorization": `${token}` } })
export const _post = (url, data = {}) => axios.post(url, data)
export const _put = (url, data = {}) => axios.put(url, data)
export const _patch = (url,update, values,token) => axios.patch(url, values, { headers: { "Authorization": token} })
export const _delete = (url) => axios.delete(url)

export const getUsers = async (id) => {
    var token = await JSON.parse(localStorage.getItem('accessToken')).accessToken
    console.log('this is', token);
    const response = await _get(`/user/profile/${id}`, token)
    return response.data
}
export const patchUsers = async (id,update,values) => {
    console.log('id,update,values',id,update,values)
    var token = await JSON.parse(localStorage.getItem('accessToken')).accessToken;
    console.log('this is users', token);
    const response = await _patch(`/user/${id}`,update, values,token)
    return response.data
}

export const postUsers = async (data) => {
    console.log('this is password')
    // var token = await JSON.parse(localStorage.getItem('accessToken')).accessToken;
    const response = await _post(`/user/forgotPassword`, data)
    return response.data
}

export const postClient = async (data) => {
    console.log('otpn send')
    const response = await _post(`/user/verifyEmail`, data)
    return response.data
}
export const putUsers = async (data) => {
    console.log('setpassword')
    const response = await _put(`/user/updatePassword`, data)
    return response.data
}

export const getexamList = async () => {
    console.log('examlist')
    var token = await JSON.parse(localStorage.getItem('accessToken')).accessToken;
    const response = await _get(`/user/examList`, token)
    return response.data
}

export const getexam = async (id,data) => {
    console.log('id...................',id)
    console.log('exam',data)
    var token = await JSON.parse(localStorage.getItem('accessToken')).accessToken;
    console.log('token',token)
    const response = await _get(`/user/exam/${id}`,token,data)
        return response.data.data
}


export const postanswer = async (data) => {
    //console.log('id...................',id)
    console.log('answer',data)
    var token = await JSON.parse(localStorage.getItem('accessToken')).accessToken;
    console.log('token',token)
    const response = await _post("/user/addAnswer",token,data)
    //console.log(response,"res")
     return response.data
    };