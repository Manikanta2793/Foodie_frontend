import React,{useState} from 'react'
import './Register.css'
import{API_URL} from '../../data/apiPath'

const Register = ({showLoginHandler}) => {
  const[userName, setUserName] = useState('');
  const[email,setEmail] = useState('');
  const[password,setPassword] = useState('');
  const[error,setError] = useState('');
  const[loading,setLoading] = useState(true);
  

const handleSubmit = async(e)=>{
    e.preventDefault();
    try{
      const response = await fetch(`${API_URL}/vendor/register`,{
        method:'POST',
        headers:{
          'Content-Type' :'application/json'
        },
        body:JSON.stringify({username: userName,email,password})
      });


      const data = await response.json()


    if(response.ok){
      console.log(data);
      setUserName('');
      setEmail('');
      setPassword('');
      alert('vendor registered successfully')
      showLoginHandler();
    }



    }catch(error){
      console.error('registration failed',error);
      alert('Registration failed')

    }


}

  return (
    <div className="registerSection">
        <form className='authForm' onSubmit={handleSubmit}>
            <h3>Vendor Register</h3>
            <label>UserName</label>
            <input type = 'text' placeholder='enter your Name'name= 'userName' value={userName}onChange={(e)=>setUserName(e.target.value)

            }></input><br/>
            <label>Email</label>
            <input type = 'text' placeholder='enter your email'name = 'email' value={email} onChange={(e)=>setEmail(e.target.value)}></input><br/>
            <label>Password</label>
            <input type = 'text' placeholder='enter your password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input><br/>
            <div className="btnSubmit">
                <button type='submit'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default Register