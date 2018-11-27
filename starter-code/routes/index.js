const express         = require('express');
const router          = express.Router();
const axios           = require('axios')
const Event           = require('../models/Events');


router.get("/showEvent/:id",(req,res,next)=>{

    var eventId = req.params.id;

    Event.findById(eventId)
        .then(event =>{
            res.render('event', event);
        })

    
})



module.exports = router;