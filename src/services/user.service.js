import api from './api';

class UserService {
  getPublicContent() {
    return api.get('/test/all');
  }

  getUserBoard() {
    return api.get('/test/user');
  }

  // getModeratorBoard() {
  //   return api.get('/test/mod');
  // }

  getAdminBoard() {
    return api.get('/test/admin');
  }

  getNumberQuestions() {
    return api.get('/questions/total')
  }

  getQuestion(id) {
    return api.get(`/question/${id}`)
  }

  getAllQuestions() {
    return api.get('/questions')
  }

  saveResult(score, id) {
    return api.post('/saveResult', {score, id})
  }
}

export default new UserService();