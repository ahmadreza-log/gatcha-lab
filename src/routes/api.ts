import { Router } from '@/lib/router'

import { AuthController } from '@/controllers/auth.controller'

const router = new Router()

router.resource('/auth', AuthController)

export default router.init()