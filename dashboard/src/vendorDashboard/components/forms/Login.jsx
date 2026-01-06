import React,{useState} from 'react'
import './Login.css';
import{API_URL} from '../../data/apiPath'

const Login = ({showWelcomeHandler}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async(e)=>{
    e.preventDefault()
    try{
      const response = await fetch(`${API_URL}/vendor/login`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email,password})
      })
      const data = await response.json()
      if(response.ok){
        alert('Login Success');
        setEmail('')
        setPassword('')
        localStorage.setItem('loginToken',data.token)
        
        const vendorId = data.vendorId
        const vendorResponse = await fetch(`${API_URL}/vendor/single-vendor/${vendorId}`);
        const vendorData = await vendorResponse.json();
        if(vendorResponse.ok){
          const vendorFirmId = vendorData.vendorFirmId;
          const vendorFirmName = vendorData.vendor.firm[0].firmName;
          localStorage.setItem('firmId',vendorFirmId);
          localStorage.setItem('firmName',vendorFirmName);
          showWelcomeHandler();
          window.location.reload();
        } else {
          alert('Failed to fetch vendor details')
        }
      } else {
        alert('Login failed')
      }

    }catch(error){
      alert('login fail')
      console.error(error)
    }
  }

  return (
    <div className="loginSection">
        
        <form className='authForm' onSubmit={loginHandler}>
            <h3>Vendor Login</h3>
            <label>Email</label>
            <input type = 'text' placeholder='enter your email' name= "email" value= {email} onChange={(e)=>setEmail(e.target.value)}></input><br/>
            <label>Password</label>
            <input type = 'text' placeholder='enter your password' name ='password' value={password} onChange={(e)=>setPassword(e.target.value)}></input><br/>
            <div className="btnSubmit">
                <button type = 'submit'>Submit</button>
            </div>
        </form>
    </div>

  )
}

export default Login