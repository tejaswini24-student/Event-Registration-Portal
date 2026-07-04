const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());

let users = [];

let events = [
  {
    id: 1,
    name: "Mega Tech Fest"
  },
  {
    id: 2,
    name: "AI Summit"
  },
  {
    id: 999,
    name: "THIS IS A TEST EVENT"
  }
];

// Register User
app.post("/signup", (req, res) => {

  const { name, email, password } = req.body;

  const userExists = users.find(
    user => user.email === email
  );

  if(userExists){
    return res.json({
      success:false,
      message:"User already exists"
    });
  }

  users.push({
    name,
    email,
    password
  });

  res.json({
    success:true,
    message:"Account Created"
  });
});

// Login User
app.post("/login", (req,res)=>{

  const { email,password } = req.body;

  const user = users.find(
    u =>
      u.email === email &&
      u.password === password
  );

  if(!user){
    return res.json({
      success:false,
      message:"Invalid Credentials"
    });
  }

  res.json({
    success:true,
    message:"Login Successful",
    user
  });
});

// Events
// Events
app.get("/events",(req,res)=>{
  res.json(events);
});

app.get("/test", (req,res)=>{
  res.json({
    message:"Signup server active"
  });
});

console.log("EVENTS ARRAY =", events);

app.listen(5000,()=>{
  console.log("MY NEW LOGIN SERVER RUNNING");
});