<template>
      <div>
        <div class='backimg'>
          <div class='overlay'>
            <h1 class='title-light'>Tiger Time</h1>
            <p class='text'>Synchronized Teamwork</p>
            <div v-if="user != null">
              <p class="signin">Welcome back, {{user.firstName}}.</p>
              <p v-if="user.teamId == null" class="signin">It looks like you're not on a team yet. Please select an option below :)</p>
            </div>
            <div v-if="user == null || user.teamId == null">
              <b-button @click='createTeam' variant="outline-orange" size="lg" block>Create a team</b-button>
              <b-button @click='findTeam' variant="outline-orange" size="lg" block>Find your team</b-button>
              <p v-if="user == null" class="signin">Already using Tiger Time? Sign in <a href='/signin'>here</a></p>
            </div>
            <b-button v-if="user != null && user.teamId != null" @click='openWorkspace' variant="outline-orange" size="lg" block>Open workspace</b-button>
            <p v-if="user != null" class="signin">Not {{user.firstName}}? <a href="#" @click="signOut">Sign out</a></p>
          </div>
        </div>
        <div class="info">
          <h1 class='text'>Why Pomodoro?</h1>
          <ol>
            <li>Helps measure a <em>real amount of work done</em>.  </li>
            <li>Trains your focus and focus on <a href="http://www.fastcompany.com/3034157/the-future-of-work/how-single-tasking-boosts-your-productivity">a single task</a>.  </li>
            <li>Trains <em>planning and prioritisation</em>.  </li>
            <li>Helps to <em>make breaks and rest</em> (you feel much better in the evening).</li>
          </ol>
          <p>Pomodoro is a set of <strong>focused micro-deadlines</strong>. And having a deadline is a pretty good <a href="http://www.nytimes.com/2013/04/21/jobs/deadline-pressure-the-great-motivator.html?_r=0">motivator for getting things done</a>, as you may know.</p>
          <p>Every 4 pomodoros form a <strong>Deep Work</strong> block. This is a state, where you can be <a href="http://knowledge.wharton.upenn.edu/article/deep-work-the-secret-to-achieving-peak-productivity/">on top of productivity peak</a> making things happen!</p>
          <blockquote>
            <p>Do not measure your efficiency only by the number of pomodoros!</p>
          </blockquote>
        </div>
      </div>
</template>

<script>
import UserService from '@/services/UserService';

export default {
  name: 'Landing',
  data() {
    return {
      user: null,
      title: 'Tiger Time',
    };
  },
  mounted() {
    const userId = sessionStorage.getItem('xbcc');
    if (userId != null) {
      UserService.getUser(userId).then((res) => {
        this.user = res.data;
      });
    }
  },
  methods: {
    signOut() {
      this.user = null;
      sessionStorage.removeItem('xbcc');
      sessionStorage.removeItem('ybcc');
    },
    createTeam() {
      if (this.user == null) {
        this.$router.push({ name: 'SignUp' });
      } else if (this.user.teamId == null) {
        this.$router.push({ name: 'CreateTeam' });
      }
    },
    findTeam() {
      if (this.user == null) {
        this.$router.push({ name: 'SignUp' });
      } else if (this.user.teamId == null) {
        this.$router.push({ name: 'FindTeam' });
      }
    },
    openWorkspace() {
      this.$router.push({ name: 'Workspace' });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.backimg {
  background-image:
  linear-gradient(
    rgba(20, 20, 20, 1),
    rgba(20, 20, 20, 0),
    rgba(20, 20, 20, 1)
  ),
  url('../assets/tiger.jpg');
  background-size: cover;
  height: 100vh;
  padding: 35px;
}

@media only screen and (min-width: 768px) {
  .overlay {
    width: 35%;
  }
}

.title-light {
  font-family: helvetica;
  font-weight: bold;
  color: white;
  font-size: 50px;
}

@media only screen and (min-width: 768px) {
  .title-light {
    font-family: helvetica;
    font-weight: bold;
    color: white;
    font-size: 70px;
  }
}

.text {
  color: white;
  font-size: 30px;
}

.signin {
  color: white;
}

.info {
  padding: 35px;
  background-color: #141414;
  color: #ffffff;
}

li {
  margin: 5px;
}
</style>
