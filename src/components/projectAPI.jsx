import React from 'react';
import Project from './Project';

const baseUrl = "http://localhost:4000";
const url = `${baseUrl}/projects`;


const translateStatusToErrorMessage = (status) => {
  switch (status) {
    case 401:
        return " Please login again."
        break;
    case 403 :
        return "You don't have a permission to view the projects"
        default:
            return " There was an error retrieving the projects. please try again"
  }
}

const checkStatus = (response) => {
    if (response.ok){
        return response;
    }else{
        const httpErrorInfo = {
            status : response.status,
            statusText : response.statusText,
            url : response.url
        }

        console.log(`log server http error : ${JSON.stringify (httpErrorInfo)}`);

        let errorMsg = translateStatusToErrorMessage
        (httpErrorInfo.status)
        throw new Error (errorMsg)
    }
}

const parseJSON = (response) => {
    return response.json()
}

const delay = (ms) => {
    return (x) => {
        return new Promise (resolve => setTimeout(()=> resolve (x), ms ))
    }
}

const convertToProjectModels = (data) => {
    let projects = data.data.map (convertToProjectModel);
    return projects
}

const convertToProjectModel = (item) => {
    return new Project(item);
}

const projectAPI = {
    get(page, limit){
        return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
        .then(delay(600))
        .then(checkStatus)
        .then(parseJSON)
        .then(convertToProjectModels)
        .catch((error) => {
            console.log('Log client error' + error);
            throw new Error(
                'There was an errror retrieving the projects, please try again'
            )
        })
    },
    put (project) {
        return fetch(`${url}/${project.id}`,{
            method: 'PUT',
            body: JSON.stringify(project),
            headers :{
                'Content-Type' : 'application/json'
                },
        })
        .then(checkStatus)
        .then(parseJSON)
        .catch((error)=>{
            console.log('log client  error' + error);
            throw new Error(
                'there was an error updating the project. please try again'
            );
        });
    },

    finc(id){
        return fetch(`${url}/${id}`)
        .then(checkStatus)
        .then(parseJSON)
        .then(convertToProjectModel);
    }
}

export {projectAPI}