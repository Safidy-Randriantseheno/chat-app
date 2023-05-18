import { useRouter } from "next/router";
import { type } from "os";
import React, { useState } from "react";

type message = {
    user : string
    time : string
    text : string
}

const Chatpublic = () => {
    const username = localStorage.getItem("currentUser")
    const router = useRouter()
    const [messageList, setMessageList] = useState<message[]>([])
    const [textMessage, setTextMessage] = useState("")
    const now = new Date()
    const dateString = now.toLocaleString()
    const handleSendMessage = () => {
        const newMessage:message = {
            user:username as string,
            time : dateString,
            text : textMessage as string
        }
        setMessageList(messageList.concat([newMessage]))
        setTextMessage("")
    }

    return(
        <div className='chat'>
            <div className='chat1'>
            <h3>{username}</h3>
            <h3>Public chat</h3>
            <h3
                onClick={
                    () => {
                        router.push('/login')
                    }
                }
            >
                Logout
            </h3>
            </div>
            <div>
                {messageList?.map(
                    (Message) => (
                        <div className="flex flex-col justify-start items-end text-white mx-7 mt-1 mb-2">
                            <div className="flex flex-row text-xs text-3xs">
                                <p className="mr-2">{Message.user}</p>
                                <p>{Message.time}</p>
                            </div>
                            <div className="bg-teal-400 p-4 rounded-xl">
                                <p>{Message.text}</p>
                            </div>
                        </div>
                    )
                )}
            </div>
            <div >
            <input 
                type='text' 
                placeholder='write your message here' 
                className='chat2'
                value={textMessage}
                onChange={
                    (e) => {
                        setTextMessage(e.target.value)
                    } 
                }
                onKeyDown={
                    (e) => {
                        if(e.key === 'Enter') {
                            handleSendMessage()
                        }
                    }
                }
            />
            </div>
            <div 
                className='chat3'
                onClick={
                    () => {
                        handleSendMessage()
                    }
                }
            >
                <button >Send</button>
            
            </div>
            <div  onClick={
                    () => {
                        router.push('/adduser')
                    }
                }>
                    <button type="submit" >Ajouter</button>
                </div>
            
        </div>
    )
}

export default Chatpublic