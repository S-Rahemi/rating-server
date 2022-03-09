const express = require('express');
const helmet = require('helmet');


const app = express();
app.use(express.json());
app.use(helmet({crossOriginEmbedderPolicy: false}));
const ratings = [];
 app.get('/', (req,res)=>{
    res.send('Rating System V1.0');
}); 
app.get('/api/rate', (req,res)=>{
    console.log(ratings); 
    res.send(ratings); 
});

app.post('/api/rate',(req,res)=>{
    res.set('Access-Control-Allow-Origin', '*');
    if (ratings.find(x=>
        (x.email === req.body.email & x.sessionId === req.body.sessionId))) {
        res.status(200).send({error: 'User gave rate before'});
        return;
    }
    if (!req.body.email) return res.status(400).send('bad request');
    const rate = {
        id: ratings.length,
        sessionId: req.body.sessionId,
        email: req.body.email,
        comment: req.body.comment,
        rate: req.body.rate
    };
    ratings.push(rate);
    console.log(ratings); 
    res.send(rate);
});
 app.listen(3110,()=>{
    console.log('listening port 3110 ...')
 });