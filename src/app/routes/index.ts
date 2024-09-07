import Router from 'express'
import { studentRoutes } from '../modules/Student/student.routes'
import { userRoutes } from '../modules/user/user.routes'

const router = Router()

const moduleRouters = [
    {
        path:'/users',
        route: userRoutes
    },
    {
        path:'/students',
        route:studentRoutes
    }
]

moduleRouters.forEach(route=>router.use(route.path, route.route))

router.use('/users',userRoutes)
router.use('/students',studentRoutes)


export default router;