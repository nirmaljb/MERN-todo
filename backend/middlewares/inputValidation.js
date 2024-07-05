const { schema, idSchema } = require('../types')

function inputMiddleWare(req, res, next) {
    const createPayLoad = req.body
    const parsedPayLoad = schema.safeParse(createPayLoad)

    if(!parsedPayLoad.success) {
        return res.status(411).json({
            msg: 'Invalid inputs'
        })
    }
    next()
}

function idMiddleWare(req, res, next) {
    const createPayLoad = parseFloat(req.params.id)
    const parsedPayLoad = idSchema.safeParse({id: createPayLoad})

    if(!parsedPayLoad.success) {
        return res.status(411).json({
            msg: 'Invalid id'
        })
    }
    next()
}

module.exports = {
    inputMiddleWare,
    idMiddleWare
}