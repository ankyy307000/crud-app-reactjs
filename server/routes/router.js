const express = require("express");
const router = express.Router();
const users = require("../models/userSchema");
// const header = require("../../client/src/Navbar");


// router.get("/",(req,res)=>{
//     console.log("connect");
// });

router.post("/register",async(req,res)=> {
    // console.log(req.body);

    //variables to store all values of the user
    const {name,email,age,mobile,work,add,desc} = req.body;

    // in case user has not entered any data
    if(!name|| !email|| !age|| !mobile|| !work|| !desc|| !add){
        res.status(422).json("plz enter all the data");
    }

    try {
        const preuser = await users.findOne({email:email});
        // const pu = await users.findOne({mobile:mobile});
        console.log(preuser);

        if(preuser){
            res.status(422).json("this user is already present");
        }
        else{
            const addusers = new users({
                name,email,age,mobile,work,desc,add
            });

            await addusers.save();
            res.status(201).json(addusers);
            console.log(addusers);

        }

    } catch (error) {
        console.log(error);
        res.status(422).json("error");
    }

});

//get userdata (data from beckend)

router.get("/getdata",async(req,res)=>{
    try {
        const userdata = await users.find();
        console.log(userdata);
        res.status(201).json(userdata)


    } catch (error) {
        console.log(error);
        res.status(422).json("error");
    }
});


//get individual user

router.get("/getuser/:id",async(req,res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await users.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual);

    } catch (error) {
        res.status(422).json("error");
    }
});

//update user data

router.patch("/updateuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await users.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json("error");
    }
});


//delete user

router.delete("/deleteuser/:id",async(req,res)=>{
    try {
        const {id} = req.params;

        const deleteduser = await users.findByIdAndDelete({_id:id});

        console.log(deleteduser);
        res.status(201).json(deleteduser);
    } catch (error) {
        res.status(422).json("error");
    }
})







module.exports = router;