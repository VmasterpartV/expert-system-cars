import request from '../services/api'

export const getQuestions = (params) => {
  return request({
    url: '/api/questions/',
    method: 'GET',
    params
  })
}
