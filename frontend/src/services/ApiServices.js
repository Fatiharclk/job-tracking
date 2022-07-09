import axios from "axios"

export const GetJobData = () => {
    return axios.get('http://localhost:3001/jobdata')
}

export default GetJobData