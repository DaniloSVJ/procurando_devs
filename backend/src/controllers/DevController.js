const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../models/utils/ParseStringAsArray')
const {findConnections,sendMessage}= require('../webSocked')

module.exports={
    async index(request,response){
        const devs = await Dev.find();
        return response.json(devs)
    },
    async store(request,response){
        const {github_username,techs,latitude,longitude}= await request.body;
        let dev = await Dev.findOne({github_username});
        if(!dev){
            const resApi = await axios.get(`https://api.github.com/users/${github_username}`);
            let {name=login,avatar_url,bio} = resApi.data;
        // console.log(name,avatar_url,bio,github_username)
            const location={
                type: 'Point',
                coordinates:[latitude,longitude]
            }
            const techsArray = parseStringAsArray(techs)
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            })
        const sendSocketMessageTo = findConnections(
            {latitude,longitud},
            techsArray,
            sendMessage(sendSocketMessageTo,'new-dev',dev)
        )
       }    
       return response.json(dev)
    }
};


