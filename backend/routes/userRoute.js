const express = require('express')
const router = express.Router()
const { controllerUserCreate, controllerUserAllData, controllerUserDelete, controllerUserUpdate } = require('../controller/userController')

router.post('/user/create', controllerUserCreate)
router.get('/user/allData', controllerUserAllData)
router.delete('/user/delete/:id', controllerUserDelete)
router.put('/user/update', controllerUserUpdate)

module.exports = router