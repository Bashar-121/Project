import "./form.css"
import React, { useEffect, useState } from "react";
import axios from "axios";
const Form = ()=>{
  const[userName,setuserName]=useState("");
  const[email,setemail]=useState("");
  const[password,setpassword]=useState("");
  const[lemail,setlemail]=useState("");
  const[lpassword,setlpassword]=useState("");
  const[data,setdata]=useState([]);
  const [active, setActive] = useState(false);
  
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get("http://localhost:3001/Users");
        setdata(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error fetching data. Please try again later.");
      }
    };
    fetchdata();
    },[]);

    const compare = (inpe,inpp) => {
      return data.some(
        (item) => item.email === inpe && item.password === inpp
      );
    };

    const handleLoginb = (e)=>{
      e.preventDefault();
      if(lemail && lpassword)
      {if (compare(lemail,lpassword))
        {
          
          alert("Welcome User");
          setlemail("");
          setlpassword("");
        }
      
      else
      { 
        alert("You entered wronge info or You didn t regester");
        setActive(true);
        alert("Regester then Try to login");
      }}
      else 
      {
        alert("all fields are requierd")
      }
    }


  const handleRegisterb = (e) => {
    e.preventDefault();
  
    if(userName  && password && email)
      {
        axios
        .post("http://localhost:3001/Users" , {
          userName,
          email,
          password          
        })
        .then(()=>{
          alert("thank you for submiting");
          alert("You are user now");
          setuserName("");
          setpassword("");
          setemail("");
          alert("Try to LogIn");
          setActive(false);
        }
        )
        .catch((error)=>{
          console.error("The error is :" ,error);
        });
      }
    else
    {alert("all fields are requierd")}

    
    
    
  };


  return(
    <div className={`container ${active ? 'active' : ''}`} id="container">
        
<div class="form-container sign-up"> 
       <form >
        <h1>Create Account</h1>
        <div class="social-icons">
            <a href="#" class="icon"><i class="fa-brands fa-google"></i></a>
            <a href="#" class="icon"><i class="fa-brands fa-facebook"></i></a>
            <a href="#" class="icon"><i class="fa-brands fa-github"></i></a>
            <a href="#" class="icon"><i class="fa-brands fa-linkedin"></i></a>
        </div>
        <span>or use your email for registeration</span>
        <input 
        type="text" 
        placeholder="Name" 
        value={userName}
        onChange={(e)=>{setuserName(e.target.value)}}
        /> 
        <input 
        type="email" 
        placeholder="Email" 
        value={email}
        onChange={(e)=>{setemail(e.target.value)}}
        /> 
        <input 
        type="password" 
        placeholder="Password" 
        value={password}
        onChange={(e)=>{setpassword(e.target.value)}}/> 
        <button onClick={handleRegisterb} >Sign Up</button>
       </form>
 </div> 
 <div class="form-container sign-in"> 
 <form >
  <h1>Sign In</h1>
  <div class="social-icons">
      <a href="#" class="icon"><i class="fa-brands fa-google"></i></a>
      <a href="#" class="icon"><i class="fa-brands fa-facebook"></i></a>
      <a href="#" class="icon"><i class="fa-brands fa-github"></i></a>
      <a href="#" class="icon"><i class="fa-brands fa-linkedin"></i></a>
  </div>
  <span> using your email password</span>
  <input type="email" placeholder="Email" value={lemail} onChange={(e)=>{setlemail(e.target.value)}}/> 
  <input type="password" placeholder="Password" value={lpassword} onChange={(e)=>setlpassword(e.target.value)}/> 
  <a href="#">Forget your password?</a>
  <button onClick={handleLoginb}>Sign In</button>
 </form>
</div> 
<div class="toggle-container">
<div class="toggle"> 
 <div class="toggle-panel toggle-left"> 
     <h1>Welccome Back!</h1>
     <p>Enter your personal details to use all site features</p>
     <button class="hidden" id="login" onClick={() => setActive(false)}>sign In</button>
 </div>

 <div class="toggle-panel toggle-right"> 
     <h1>Hello ,Friend!</h1>
     <p>Register with your personal details to use all site features</p>
     <button class="hidden" id="register" onClick={() => setActive(true)}  >sign Up</button>
 </div>



</div>
</div>
</div>
  );  
}
export default Form;