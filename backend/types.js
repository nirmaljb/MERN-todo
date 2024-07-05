const zod = require('zod')

const schema = zod.object({
    title: zod.string(),
    description: zod.string(),
})

const idSchema = zod.object({
    id: zod.number()
})

module.exports = {
    schema,
    idSchema
}

