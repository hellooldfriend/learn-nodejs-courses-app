const { Router } = require('express')
const Course = require('../models/course')

const router = Router()

router.get('/', (request, response) => {
  response.render('add', {
    title: 'Add course',
    isAdd: true,
  })
})

router.post('/', async (request, response) => {
  const { title, price, image } = request.body
  const course = new Course(title, price, image)

  await course.save()

  response.redirect('/courses')
})

module.exports = router