import Api from '@/services/Api';

export default {
  fetchSessions() {
    return Api().get('sessions');
  },
  addSession(params) {
    return Api().post('sessions', params);
  },
  updateSession(params) {
    return Api().put(`sessions/${params.id}`, params);
  },
  endSession(id) {
    return Api().put(`sessions/end/${id}`);
  },
  getSession(id) {
    return Api().get(`sessions/${id}`);
  },
  findActiveSessions(teamId) {
    return Api().get(`sessions/active/${teamId}`);
  },
  deleteSession(id) {
    return Api().delete(`sessions/${id}`);
  },
};
