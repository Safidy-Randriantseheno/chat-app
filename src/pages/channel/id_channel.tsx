import Channels from "@/types/channels"
import Messages from "@/types/messages"
import Users from "@/types/users"
import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const GetChannelById = () => {
    const router = useRouter()
    const {channel_id} = router.query
    const [usersChannel, setUsersChannel] = useState<Users[]>()
    const [messageList, setMessageList] = useState<Messages[]>()
    const [currentChannel, setCurrentChannel] = useState<Channels>()
    useEffect(() => {
        const fetchData = async() => {
            try {
                const resChannel = await axios.get(`http://127.0.0.1:8080/channel/${channel_id}`,{
                    headers:{
                      Authorization:`Bearer ${localStorage.getItem("tokken")}`,
                      AccessControlAllowOrigin: "http://127.0.0.1:8080"
                    }
                  })
    
                if(resChannel.status === 200){
                    setCurrentChannel(resChannel.data)
                }
            } catch (error) {
                console.log(error)
            }
        };
        fetchData();
    },[])
    return(
        <>
        <div >
            <div >
                Channel {currentChannel?.name}
            </div>
            <div >
                <div>
                    <div>
                        All users
                    </div>
                    <div >
                        {
                            usersChannel?.map(
                                (user : Users) => (
                                    <div
                                        onClick={
                                            () => (
                                                router.push(`/message/${user.id}`)
                                            )
                                        }
                                    >{user.name}</div>
                                )
                            )
                        }
                    </div>
                </div>
                <div>
                    {
                        messageList?.map(
                            (message : Messages) => (
                                <div  >
                                    <div>
                                        <p >{(message.created_at).toLocaleDateString()}</p>
                                        <p></p>
                                    </div>
                                    <div >
                                        <p>{message.content}</p>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
            </div>
            <div >
                <input 
                    type='text' 
                    placeholder='Type your message here' 
                />
                <div 
                >
                    <button >Send</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default GetChannelById