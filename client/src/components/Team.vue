<template>
  <div v-if="team != null && user != null" class="my-container off-white">
    <div class="sidepanel">
      <div class="box">
      <h1 class="title">{{team.teamName}}</h1>
      <h5>Signed in as {{user.firstName}}</h5>
      <a href="#" @click="signOut">Sign out</a>
      |
      <a href="/">Back to Landing</a>
      </div>
    </div>
    <b-card class="my-card">
      <div class="box">
        <b-table :fields="['firstName', 'lastName']" 
        striped hover outlined :items="teammates">
        </b-table>
      </div>
    </b-card> 
  </div>
</template>

<script>
import UserService from '@/services/UserService';
import TeamService from '@/services/TeamService';

export default {
  name: 'Team',
  data() {
    return {
      user: null,
      team: null,
      teammates: [],
    };
  },
  mounted() {
    const userId = sessionStorage.getItem('xbcc');
    const teamId = sessionStorage.getItem('ybcc');
    if (userId != null && teamId != null) {
      UserService.getUser(userId).then((res) => {
        this.user = res.data;
      });
      TeamService.getTeam(teamId).then((res) => {
        this.team = res.data;
      });
      UserService.findByTeam(teamId).then((res) => {
        this.teammates = res.data.users;
      });
    } else {
      this.$router.push({ name: 'Landing' });
    }
  },
  methods: {
    signOut() {
      this.user = null;
      this.team = null;
      sessionStorage.removeItem('xbcc');
      sessionStorage.removeItem('ybcc');
      this.$router.push({ name: 'Landing' });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sidepanel {
  height: 100vh;
  background-color: #34495e;
  color: #FFFFFF;
  max-width: 25%;
  margin-right: 5px;
}
.box {
  padding: 15px 20px;
}
.my-card {
  margin: 5px;
}
.my-container {
  display: flex;
  flex-direction: row;
}
.off-white {
  background-color: #ecf0f1;
}
</style>
