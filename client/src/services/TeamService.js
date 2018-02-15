import Api from '@/services/Api';

export default {
  fetchTeams() {
    return Api().get('teams');
  },
  addTeam(params) {
    return Api().post('teams', params);
  },
  joinTeam(params) {
    return Api().post('teams/join', params);
  },
  updateTeam(params) {
    return Api().put(`teams/${params.id}`, params);
  },
  getTeam(id) {
    return Api().get(`teams/${id}`);
  },
  findTeams(teamName) {
    return Api().get(`teams/find/${teamName}`);
  },
  deleteTeam(id) {
    return Api().delete(`teams/${id}`);
  },
};
