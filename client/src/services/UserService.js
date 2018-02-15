import Api from '@/services/Api';

export default {
  fetchUsers() {
    return Api().get('users');
  },
  addUser(params) {
    return Api().post('users', params);
  },
  signIn(params) {
    return Api().post('users/signin', params);
  },
  findByTeam(teamId) {
    return Api().get(`users/team/${teamId}`);
  },
  updateUser(params) {
    return Api().put('users', params);
  },
  getUser(id) {
    return Api().get(`users/${id}`);
  },
  deleteUser(id) {
    return Api().delete(`users/${id}`);
  },
  joinSession(params) {
    return Api().put('users/join', params);
  },
};
