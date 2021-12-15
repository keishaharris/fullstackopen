import axios from "axios";
const baseURL = "http://localhost:3001/persons";

const getContact = () => {
    const request = axios.get(baseURL)
    return request.then(res => res.data)
    
}

const create = newObj => {
    const request = axios.post(baseURL, newObj)
    return request.then(res => res.data)

}

const update = (id, newObj) => {
    const request = axios.put(`${baseURL}/${id}`, newObj)
    return request.then(res => res.data)
}

const deletePerson = id => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(res => res.data)

}
export default { getContact, create, update, deletePerson }