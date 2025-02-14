
const URL=require('../model/url');
const shortid = require('shortid');



async function handleGenerateNewShortUrl(req,res){
    const body=req.body;
    if(!body.url){
        return res.status(400).json({
            error:'URL is required'
        })
    }
    const shortID=shortid(8);
    await URL.create({
        shortId:shortID,
        redirectUrl:body.url,
        visitHistory:[],
    });
    return res.json({
        id:shortID
    })
}

module.exports={
    handleGenerateNewShortUrl
}