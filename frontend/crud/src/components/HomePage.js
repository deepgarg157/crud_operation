import React, { useEffect, useState } from 'react'
import { IoMdCloseCircle } from "react-icons/io";
import axios from 'axios'
import toast from 'react-hot-toast'

const HomePage = () => {

    const [closeForm, setCloseForm] = useState(false)
    const [editForm, setEditForm] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: ''
    })
    const [userList, setUserList] = useState([])
    const [editData, setEditData] = useState({
        name: '',
        email: '',
        number: '',
        _id:''
    })

    const handleClose = () => {
        setCloseForm(false)
        setEditForm(false)
    }

    const handleOpenForm = () => {
        setCloseForm(true)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { name, email, number } = formData
            const res = await axios.post('http://localhost:4000/user/v1/api/user/create', { name, email, number })
            if (res.data.success) {
                toast.success(res.data.message)
                setFormData({
                    name: '',
                    email: '',
                    number: ''
                })
                setCloseForm(false)
                getAllUserData()
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    //    get all user data
    const getAllUserData = async () => {
        try {
            const res = await axios.get('http://localhost:4000/user/v1/api/user/allData')
            setUserList(res.data.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        getAllUserData()
    }, [])

    // delete the user
    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:4000/user/v1/api/user/delete/${id}`)
            if (res.data.success) {
                toast.success(res.data.message)
                getAllUserData()
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    // change the input edit user data
    const handleEditChange = (e) => {
        const { name, value } = e.target
        setEditData({ ...editForm, [name]: value })
    }

    // Edit the user data
    const handleEdit = (data) => {
        setEditForm(true)
        setEditData(data)
    }

    // update the user data
    const handleUpdate = async (e) => {
        e.preventDefault()
        try {
            const { name, email, number, _id } = editData
            const res = await axios.put('http://localhost:4000/user/v1/api/user/update', {name, email, number, _id})
            if(res.data.success){
                toast.success(res.data.message)
                setEditForm(false)
                getAllUserData()
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <div className='flex justify-center items-center mt-10 flex-col w-6/12 m-auto'>

                <div>
                    <button className='bg-black text-white py-2 px-4 hover:font-semibold rounded-lg' onClick={handleOpenForm}>Add User</button>
                </div>

                <div className='mt-5'>
                    <thead className=''>
                        <tr className='bg-gray-500 text-white'>
                            <th className='py-2 px-20'>Name</th>
                            <th className='py-2 px-20'>Email</th>
                            <th className='py-2 px-20'>Mobile</th>
                            <th ></th>
                            <th></th>
                        </tr>
                    </thead>
                    {userList.length === 0 ? <p className='mt-5'>Add the user data.......</p> : userList.map((data, index) => {
                        return (
                            <tbody key={index} className=''>
                                <tr className=''>
                                    <td className='py-2 px-4 border-b-2 border-gray-300'>{data.name}</td>
                                    <td className='py-2 px-4 border-b-2 border-gray-300'>{data.email}</td>
                                    <td className='py-2 px-4 border-b-2 border-gray-300'>{data.number}</td>
                                    <button className='bg-gray-500 text-white px-2 py-1 mt-1 mr-1' onClick={() => handleEdit(data)}>Edit</button>
                                    <button className='bg-red-500 px-2 py-1 mt-1' onClick={() => handleDelete(data._id)}>Delete</button>
                                </tr>
                            </tbody>
                        )

                    })}


                </div>

                {editForm &&
                    <form className='w-4/12 border border-black p-10 mt-5 bg-white absolute top-20' onSubmit={handleUpdate}>
                        <IoMdCloseCircle className='float-end text-2xl cursor-pointer' onClick={handleClose} />
                        <div className='mt-5'>
                            <label>Name:</label>
                            <input className='w-full px-4 py-2 bg-gray-50 text-black border border-gray-400' type='text' placeholder='Name' name='name' value={editData.name} onChange={handleEditChange}></input>
                        </div>
                        <div className='mt-5'>
                            <label>Email:</label>
                            <input className='w-full px-4 py-2 bg-gray-50 text-black border border-gray-400' type='email' placeholder='Email' name='email' value={editData.email} onChange={handleEditChange}></input>
                        </div>
                        <div className='mt-5'>
                            <label>Mobile:</label>
                            <input className='w-full px-4 py-2 bg-gray-50 text-black border border-gray-400' type='text' placeholder='Mobile Number' name='number' value={editData.number} onChange={handleEditChange}></input>
                        </div>
                        <button className='bg-black text-white py-2 px-4 mt-5 hover:bg-gray-600 hover:text-white'>Update</button>
                    </form>
                }

                {closeForm &&
                    <form className='w-4/12 border border-black p-10 mt-5 bg-white absolute top-20' onSubmit={handleSubmit}>
                        <IoMdCloseCircle className='float-end text-2xl cursor-pointer' onClick={handleClose} />
                        <div className='mt-5'>
                            <label>Name:</label>
                            <input className='w-full px-4 py-2 bg-gray-50 text-black border border-gray-400' type='text' placeholder='Name' name='name' onChange={handleOnChange}></input>
                        </div>
                        <div className='mt-5'>
                            <label>Email:</label>
                            <input className='w-full px-4 py-2 bg-gray-50 text-black border border-gray-400' type='email' placeholder='Email' name='email' onChange={handleOnChange}></input>
                        </div>
                        <div className='mt-5'>
                            <label>Mobile:</label>
                            <input className='w-full px-4 py-2 bg-gray-50 text-black border border-gray-400' type='text' placeholder='Mobile Number' name='number' onChange={handleOnChange}></input>
                        </div>
                        <button className='bg-black text-white py-2 px-4 mt-5 hover:bg-gray-600 hover:text-white'>Submit</button>
                    </form>
                }

            </div>
        </>
    )
}

export default HomePage
