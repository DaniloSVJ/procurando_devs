const Dev = require('../models/Dev')
const parseStringAsArray = require('../models/utils/ParseStringAsArray')
module.exports={
    async index(req,res){
        const {latitude,longitude,techs}= await req.query;
        const techsArray = await parseStringAsArray(techs);
        const devs = await Dev.find({
            techs: {
                $in: techsArray,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        });

        return await res.json({devs});
    }
}  