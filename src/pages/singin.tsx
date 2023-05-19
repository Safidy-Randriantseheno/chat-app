import { useRouter } from "next/router"
import { useState } from "react"

const Signin = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const router = useRouter()
    return(
        <div className= 'css1'>
            <form className='css2'>
                <div>
                    <h4>Sign in</h4>
                </div>
                <div className='flex flex-col mb-1'>
                    <label>Username: </label>
                    <input className='us1'
                        type='text'
                        value={username}
                        onChange={
                            (e) => {
                                setUsername(e.target.value)
                            }
                        }
                    />
                </div>
                <div className='us1'>
                    <label>Email: </label>
                    <input className='us1' 
                        type='email'
                    />
                </div>
                <div className='flex flex-col mb-1'>
                    <label>Password: </label>
                    <input className='us1' 
                        type='password'
                        value={password}
                        onChange={
                            (e) => {
                                setPassword(e.target.value)
                            }
                        }
                    />
                </div>
                <div className='us1'>
                    <label>Confirm password: </label>
                    <input className='us1'
                        type='password'
                        value={confirmPassword}
                        onChange={
                            (e) => {
                                setConfirmPassword(e.target.value)
                            }
                        }
                    />
                </div>
                <div className='bouton'
                    onClick={
                        () => {
                            if (username.trim(),password.trim() === '') {
                                throw new Error("Le label ne peut pas être vide.");
                              }
                              
                            if(password === confirmPassword){
                                localStorage.setItem(username as string, password as string)
                                localStorage.setItem("currentUser",username as string)
                                router.push('/chatpublic')
                            } else {
                                alert("please reenter your password")
                            }
                        }
                    }
                >
                    <p>Continue</p> 
                </div>
            </form>
        </div>
    )
}

export default Signin