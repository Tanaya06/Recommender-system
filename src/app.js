const express=require("express")
const app=express();
const path=require("path")
const hbs=require("hbs")

require("./db/conn")
const Register=require("./models/registers")
const port=process.env.PORT || 3000
const static_path=path.join(__dirname,"../public")
const template_path=path.join(__dirname,"../templates/views")
const partial_path=path.join(__dirname,"../templates/partials")
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(express.static(static_path))
app.set("view engine","hbs")
app.set("views",template_path)
hbs.registerPartials( partial_path)

app.get("/",(req,res)=>{
    res.render("index")
})
app.get("/register",(req,res)=>{
    res.render("register")
})
app.post("/register",async (req,res)=>{
    try{
        const password=req.body.password
        const cpassword=req.body.confirmpassword
        if(password==cpassword){
            const registerCustomer=new Register({
                firstname:req.body.firstname,
                lastname:req.body.lastname,
                email:req.body.email,
                address:req.body.address,
                phone:req.body.phone,
                password:password,
                confirmpassword:cpassword,
                


            })
           const registered= await registerCustomer.save();
           res.status(201).render("index")
        }
        else{
            res.send("passwords not matching")
        }
    }
    catch(error){
        res.status(400).send(error)
    }

})
app.get("/login",(req,res)=>{
    res.render("login")
})
app.post("/login",async (req,res)=>{
    try{
        const email=req.body.email
        const password=req.body.password
       const useremail=await Register.findOne({email:email})
       if(useremail.password===password)
       {
           res.status(201).render("index")
       }
       else{
           res.send("password not matching")
       }

    }catch(error){
            res.status(400).send("invalid email")
    }
})

app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})