import { useRouter } from "next/router";
import { type } from "os";
import React, { useState, useEffect } from "react";

type message = {
    user : string
    time : string
    text : string
}
type message1 = {
    user1 : string
    time : string
    text : string
}
const Channel = () => {
    const [users, setUsers] = useState(['']);
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    const storedUsers = localStorage.getItem('channel_users');

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('channel_users', JSON.stringify(users));
  }, [users]);

  const addUser = () => {
    if (newUser) {
      setUsers([...users, newUser]);
      setNewUser('');
    }
  };

    const usersString = localStorage.getItem('users');
    const username = localStorage.getItem("currentUser")
    const router = useRouter()
    const [messageList, setMessageList] = useState<message[]>([])
    const [textMessage, setTextMessage] = useState("")
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState<message1[]>([]);
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
    const handleSendMessage1 = () => {
        const newMessage1:message1 = {
            user1 :usersString as string,
            time : dateString,
            text : newMessage as string
        }
        setMessages(messages.concat([newMessage1]))
        setNewMessage("")
    }

    return(
        <div className='chat'>
            <div className='chat1'>
            <h3>{username} </h3>
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
            <div className="lol">
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

            <div className="adduser" >
                <ul>
                    {users.map((user, index) => (
                    <li key={index}>{user}</li>
                    ))}
                </ul>

                <input
                    type="text"
                    value={newUser}
                    onChange={(e) => setNewUser(e.target.value)}
                />
                <button onClick={addUser}>
                    Ajouter un utilisateur
                </button>
            <div className="adduser" >
            <div className="go">
                {messages?.map(
                    (Message1) => (
                        <div >
                            <div >
                                <p >{Message1.user1}</p>
                                <p>{Message1.time}</p>
                            </div>
                            <div >
                                <p>{Message1.text}</p>
                            </div>
                        </div>
                    )
                )}
            </div>
            </div>
            <div>
            <input 
                type='text' 
                placeholder='write your mes' 
                className='chat2'
                value={newMessage}
                onChange={
                    (e) => {
                        setNewMessage(e.target.value)
                    } 
                }
                onKeyDown={
                    (e) => {
                        if(e.key === 'Enter') {
                            handleSendMessage1()
                        }
                    }
                }
            />
            </div>
            
                <div 
                    onClick={
                        () => {
                            handleSendMessage1()
                        }
                    }
                >
                    <button >Send</button>
                
                </div>

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
            
        </div>
    )
}

export default Channel