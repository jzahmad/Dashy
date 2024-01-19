import axios from 'axios'
const Token="cmlc3c1r01qmnetgopa0cmlc3c1r01qmnetgopag"
export default axios.create({
    baseURL:"https://finnhub.io/api/v1",
    params:{
        token: Token
    }
})