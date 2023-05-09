import { useState } from "react";
import { useRouter } from "next/router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleSubmit = (event:any) => {
    event.preventDefault();
  }
  return (
    <div className='log1'>
      <form className='log2' onSubmit={handleSubmit}>
        <div className="log">
          <label>
            Username:
            <input 
              type='text'
              value={username}
              onChange={(e) => {setUsername(e.target.value)}}
            />
          </label>
        </div>
        <div className='log'>
          <label>
            PassWord:
            <input 
              type="password"
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
            />
          </label>
        </div>
        <div className='bouton1' 
        onClick={
            () => {
                if(localStorage.getItem(username as string) === password){
                    localStorage.setItem("currentUser",username as string)
                    router.push('/chatpublic')
                } else {
                        alert('user not found')
                        }
                    }
                }>
          <button>
            se connecter
          </button>
        </div>
      </form>
    </div>
  
  );
};

export default Login;
