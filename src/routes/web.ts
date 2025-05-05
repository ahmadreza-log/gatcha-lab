import express from "express"

const routes = express.Router()

routes.get("/", (req, res) => {
    res.render('home', {
        name: 'AhmadReza Ebrahimi',
        title: 'Welcome Page'
    })
})

export default routes