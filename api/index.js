import request from '../services/api'

export const getQuestions = (params) => {
  return request({
    url: '/api/questions/',
    method: 'GET',
    params
  })
}

export const findCar = (data) => {
  return request({
    url: '/api/cars/find_car/',
    method: 'POST',
    data
  })
}

export const newCar = (data) => {
  return request({
    url: '/api/cars/',
    method: 'POST',
    data
  })
}

export const updateCar = (data, id) => {
  return request({
    url: '/api/cars/' + id + '/',
    method: 'PATCH',
    data
  })
}

export const newCarFile = (data) => {
  return request({
    url: '/api/cars/',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}

export const updateCarFile = (data, id) => {
  return request({
    url: '/api/cars/' + id + '/',
    method: 'PATCH',
    headers: { 'Content-Type': 'multipart/form-data' },
    data
  })
}
