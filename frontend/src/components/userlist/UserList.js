import React, { useContext } from 'react'
import { socket } from '../../socket';
import { useNavigate } from 'react-router-dom'
import Navbar from '../navbar/navbar';
import { userlistContext } from '../../userlistContext';
import './userlist.css'


export default function UserList(props) {
    const navigate = useNavigate();
    const { userList } = useContext(userlistContext);

    const handleSelectedUser = (ele) => {
        navigate(`/chat/?q=${ele.email}`);
    }


    return (
        <div className='vh-100'>
            <Navbar />
            <div className='container-fluid backgroundforfullscreen'>
                <h1 className='h1 text-center heading py-1 my-2 container'>Chats</h1>
                <div className='d-flex flex-column p-3 border gap-2 chatlistdisplay container'>
                    {userList.map((ele) => {
                        return ele.id !== socket.id ? <button className='btn btn-transparent selectUserBtn' onClick={() => handleSelectedUser(ele)} key={ele.name}>
                            <div className='d-flex align-items-center gap-2'>
                                <i className='bx bxs-user-circle fs-1'></i>
                                <h3>{ele.name}</h3>
                            </div>
                            <span>{ele.id ? <div className='greendot'></div> : <div className='greydot'></div>}</span>
                        </button> : null
                    })}
                </div>
            </div>
        </div>
    )
}
