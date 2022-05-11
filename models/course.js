const { v4: uuid } = require('uuid');
const fs = require('fs')
const path = require('path')

class Course {
  constructor(title, price, image) {
    this.title = title
    this.price = price
    this.image = image
    this.id = uuid()
  }

  static async update(course) {
    const courses = await Course.getAll()
    const index = courses.findIndex(c => c.id === course.id)
    courses[index] = course

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        JSON.stringify(courses),
        (error) => {
          if(error) reject(error)
          else {
            resolve()
          }    
        }
      )
    })
  }

  async save() {
    const courses = await Course.getAll()
    courses.push(this.toJSON())

    return new Promise((resolve, reject) => {
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        JSON.stringify(courses),
        (error) => {
          if(error) reject(error)
          else {
            resolve()
          }    
        }
      )
    })

  }

  toJSON() {
    return {
      title: this.title,
      price: this.price,
      image: this.image,
      id: this.id,
    }
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, '..', 'data', 'courses.json'),
        'utf-8', 
        (error, content) => {
          if(error) reject(error)
          else {
            resolve(JSON.parse(content))
          }
        }
      )
    })
  }

  static async getById(id) {
    const courses = await Course.getAll()
    return courses.find(course => course.id === id)
  }
}

module.exports = Course
