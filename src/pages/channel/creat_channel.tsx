import Users from "@/types/users";
import axios from "axios";
import { useEffect, useState } from "react";

const CreateChannel = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
    const [userList, setUserList] = useState<any>()
    const handleAddMembersClick = () => {
        setShowModal(true);
      }
      
    const handleCloseModal = () => {
        setShowModal(false);
    }

    useEffect(() => {
        const fetchData = async() => {
            try {
                const resListUsers = await axios.get("http://127.0.0.1:8080/users/", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })

                if(resListUsers.status === 200){
                    setUserList(resListUsers.data.users)
                }
            } catch (error) {
                console.log(error)
            }
        };
        fetchData()
    }, [])
    return(
        <>
        <div >
            <form >
                <div>
                    <h4 >Create an channel</h4>
                </div>
                <div>
                    <label>Name:</label>
                    <input 
                        type='text'
                    />
                </div>
                <div className='flex flex-col mb-1'>
                    <label>Type:</label>
                    <select 
                    >
                        <option value="public">public</option>
                        <option value="private">private</option>
                    </select>
                </div>
                <div 
                    
                    onClick={
                        () => (handleAddMembersClick())
                    }
                >
                    <p>Add members</p> 
                </div>
                <div>
                    <p>Continue</p> 
                </div>
                {showModal && (
                    <div>
                        <div >
                            <h4 >Add members</h4>
                            {
                                userList?.map(
                                    (user : Users) => (
                                        <label key={user.id}>
                                            <input 
                                            type="checkbox"
                                            value={user.email}
                                            key={user.id}
                                            onClick={
                                                () => {
                                                    setSelectedMembers(selectedMembers.concat(user.email))
                                                }
                                            }
                                            /> {user.email}
                                        </label>
                                    )
                                )
                            }
                            <div 
                               onClick={
                                    () => handleCloseModal()
                                }
                            >
                                <p>Continue</p> 
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </div>
        </>
    )
}

export default CreateChannel