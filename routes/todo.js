const router=require('express').Router()
const Todo_model=require('../models/todo')


router.post('/add/todo',(req,res)=>{
    const {todo}=req.body;
    console.log(todo);
    const {email_}=req.user.email;
    const newTodo=new Todo_model({todo,email_:req.user.email,done:"0"})
    if(todo==""){
        res.redirect('/')
    }
    newTodo.save()
    .then(()=>{
        console.log("done")
        res.redirect('/')
    })
    .catch(err=>console.log(err))

})
.get("/delete/todo/:_id",(req,res)=>{
    const {_id}=req.params;
    Todo_model.deleteOne({_id})
    .then(()=>{
        console.log("deleted")
        res.redirect('/')
    })
    .catch((err)=>console.log(err));
})

.get("/done/todo/:_id",(req,res)=>{
    const {_id}=req.params;
    const info=Todo_model.find();
    console.log(info)
    Todo_model.updateOne({_id}, { done:"1"})
    .then(()=>{
        console.log("Done")
        res.redirect('/')
    })
    .catch((err)=>console.log(err));
})

.post("/update/todo/:_id",(req,res)=>{
    const {_id}=req.params;
    const info=Todo_model.find();
    var doneval;
    if(req.body.done)
        doneval="1"
    else
        doneval="0"
    Todo_model.updateOne({_id}, { todo:req.body.todo,done:doneval })
    .then(()=>{
        console.log("Updated")
        res.redirect('/')
    })
    .catch((err)=>console.log(err));
})


;

module.exports=router;