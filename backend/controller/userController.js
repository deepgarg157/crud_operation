const userModel = require('../model/userModel')

async function controllerUserCreate(req, res) {
    const { name, email, number } = req.body
    try {

        if (!name || !email || !number) {
            return res.status(200).json({
                success: false,
                message: 'All fields is required'
            })
        }

        const userData = new userModel({ name, email, number })
        await userData.save()
        return res.status(201).json({
            success: true,
            message: 'new user created successfully',
            data: userData
        })

    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function controllerUserAllData(req, res) {
    try {
        const allUserData = await userModel.find()
        return res.status(201).json({
            success: true,
            message: 'User Data',
            data: allUserData
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

async function controllerUserDelete(req, res) {
    const { id } = req.params
    try {
        const deleteUser = await userModel.findByIdAndDelete(id)
        return res.status(201).json({
            success: true,
            message: 'user Deleted Successfully',
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}


async function controllerUserUpdate(req, res) {
    const { _id, name, email,number } = req.body
    try {
        const updateUser = await userModel.updateOne({name, email, number, _id})
        return res.status(201).json({
            success: true,
            message: 'user update successfully',
            data: updateUser
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { controllerUserCreate, controllerUserAllData, controllerUserDelete, controllerUserUpdate }