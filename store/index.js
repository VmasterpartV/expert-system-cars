import {
  getQuestions,
  findCar,
  newCar,
  updateCar,
  newCarFile,
  updateCarFile
} from '../api'

export const state = () => ({
  domain: process.env.BASE_API_URL
})

export const actions = {
  async getQuestions ({ commit }, data) {
    const res = await getQuestions(data)
    return res
  },
  async findCar ({ commit }, data) {
    const res = await findCar(data)
    return res
  },
  async newCar ({ commit }, data) {
    if (!data.id) {
      const res = await newCar(data)
      return res
    } else {
      const res = await updateCar(data, data.id)
      return res
    }
  },
  async newCarFile ({ commit }, data) {
    const form_data = new FormData()
    for (var c in data) {
      form_data.append(c, data[c])
    }
    if (!data.id) {
      const res = await newCar(form_data)
      return res
    } else {
      const res = await updateCar(form_data, data.id)
      return res
    }
  }
}
