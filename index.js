require('dotenv').config()
const express =  require('express');
require('./DataStore/DbBase.js');
const app =  express();
const cors = require('cors')
const port = process.env.PORT
const TaskController = require('./Controllers/TaskController/controller')
const UserController = require('./Controllers/UserController/controller')
const AdminController = require('./Controllers/AdminController/controller')
const AuthMiddleware = require('./Middlewares/AuthMiddlware')
const RoleMiddleware = require('./Middlewares/RoleMiddleware')
const AdminRoleMiddlware = new RoleMiddleware('Admin')

app.use(cors())
app.use(express.json())
app.use('/api/Tasks',AuthMiddleware,TaskController)
app.use('/api/User',UserController)
app.use('/api/Admin',AuthMiddleware,AdminRoleMiddlware.VerifyRoleAsync,AdminController)


app.listen(port, () => {
    console.log(`hosted on port ${port}`)
})
