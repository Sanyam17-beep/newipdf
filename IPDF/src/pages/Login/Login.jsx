import React, { useRef, useState } from 'react'
import './style.css'
import { useNavigate } from 'react-router-dom';
import { Toaster,toast } from 'react-hot-toast';
import LoadingBar from 'react-top-loading-bar'
function Login() {
    const navigate=useNavigate();
    const ref = useRef(null);
    const [username, setUsername] = useState('');
    const [pass,setpass]=useState('');
    const handleInputChange = (e) => {
      setUsername(e.target.value);
    };
    
    const handleSubmit = async(e) => {
        ref.current.continuousStart();
      e.preventDefault();
      const UserData = {username:username,password:pass};
    const res = await fetch("http://localhost:8000/signin",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(UserData)
    });
    console.log(res);
    if(res.status===201){
      const {user:data} = await res.json();
      console.log(data);
      ref.current.complete()
      toast('User signed in successfully',
      {
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      console.log(res);
      const newuser={
        img:data?.image,
        id:data?._id,
        name:data?.name,
        email:data?.email,
        password:data?.password,
        bio:data?.bio,
        occupation:data?.occupation
      };
      localStorage.setItem("user",JSON.stringify(newuser));
        navigate('/home');

      
    }else{
        toast.error('Email or Password is incorrect',
        {
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }
        );
    }
    };
  
    return (
        <>
       <Toaster></Toaster>
       <LoadingBar color='white' ref={ref} />

    <div className='Login-container'>
    <div className="twitter-container">
        <h1 style={{color:"aliceblue"}}>Query Me</h1>
        <button className="twitter-button">
            <img
                src="https://img.icons8.com/color/48/undefined/google-logo.png"
                alt="google logo"
                className="img"
            />
            <p>Sign in with Google</p>
        </button>
        <button className="twitter-button">
            <img
                src="https://img.icons8.com/?size=100&id=118497&format=png&color=000000"
                alt="apple logo"
                className="img"
            />
            <p>Sign in with Facebook</p>
        </button>
        <p style={{color:"aliceblue"}}>or</p>
        <form className="twitter-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Email"
                size="22"
                value={username}
                onChange={handleInputChange}
                className="twitter-input"
            />
             <input
                type="text"
                placeholder="Password"
                size="22"
                value={pass}
                onChange={(e)=>setpass(e.target.value)}
                className="twitter-input"
            />
            <input id="next" type="submit" value="Sign in" />
            <input id="forgot" type="submit" value="Forgot Password?" />
        </form>
        <p id="signup">
            Don't have an account ? <a onClick={() => navigate(`/signup`)}>Sign up</a>
        </p>
    </div>
    </div>
    </>
    );
  
}

export default Login
