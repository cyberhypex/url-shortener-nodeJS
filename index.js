const express=require('express');

const app=express();
const port=8001;
const { connectToMongoDB } =require('./connect')

const urlRoute=require('./routes/uri');
const URL=require('./model/url');

connectToMongoDB("mongodb://localhost:27017/short-url").then(()=>{
    console.log("db connected");
    
}

);

app.use(express.json());
app.use("/url",urlRoute);

app.get('/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;
        console.log("Received shortID:", shortId);
        const entry = await URL.findOneAndUpdate(
            { shortId }, // Use 'shortId' instead of 'shortID'
            { $push: { visHistory: { timestamp: Date.now() } } },
            { new: true }
        );
        
        console.log("Database result:", entry);

        if (!entry) {
            return res.status(404).send("Short URL not found");
        }

        res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error("Error fetching URL:", error);
        res.status(500).send("Internal Server Error");
    }
});






app.listen(port,()=>{
    console.log('Server running on Port : ',port );
    
})