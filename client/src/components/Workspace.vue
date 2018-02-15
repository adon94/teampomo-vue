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
      <div class="box">
        <a href="/team">Team</a>
      </div>
    </div>
    <div class="main">
      <div class="my-container">
        <b-card class="my-card">
          <div class="bubble" v-bind:style="{ backgroundColor: activeColor }">
            <div class="time-text">
              {{ this.displayTime }}
            </div>
            <div>
              <b-button v-if="!newSession.isPlaying" @click="addSession" variant="outline-white">Start</b-button>
              <b-button v-if="newSession.isPlaying" @click="dropOut" variant="outline-white">Drop out</b-button>
              <b-button v-if="newSession.isPlaying" @click="endTimer" variant="outline-white">End</b-button>
              <b-button v-if="!newSession.isPlaying" @click="showModal" variant="outline-white">Edit</b-button>
            </div>
          </div>
        </b-card>
        <b-card class="my-card my-container">
          <div v-for="session in activeSessions" :key="session._id">
            <div class="bubble small" :id="session._id" v-if="activeSession._id != session._id">
              <b-button variant="outline-white" v-on:click="joinSession(session._id)">Join</b-button>
            </div>
            <div class="bubble small" v-else>
              <h5>My Session</h5>
            </div>
            <b-tooltip :target="session._id" placement="bottom">
              {{ session.workMinutes }} minutes work, with  {{ session.breakMinutes }} minutes break
            </b-tooltip>
          </div>
          <div class="bubble small red" v-if="activeSessions.length == 0">
            <h5>None :(</h5>
          </div>
        </b-card>
        </div>
        <b-card class="my-card">
          <div class="box">
            <b-table :fields="['firstName', 'lastName']" 
            striped hover outlined :items="teammates">
            </b-table>
          </div>
        </b-card>            
        <b-modal ref="myModalRef" hide-footer id="modal1" title="Session Profile">
          <b-form-group id="minutesL"
            label="Duration in minutes"
            label-for="minutes">
            <b-form-input id="minutes"
              type="number"
              v-model="form.workMinutes"
              required>
            </b-form-input>
          </b-form-group>
          <b-form-group id="breakL"
            label="Duration in minutes"
            label-for="break">
            <b-form-input id="break"
              type="number"
              v-model="form.breakMinutes"
              required>
            </b-form-input>
          </b-form-group>
          <b-btn class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-btn>
        </b-modal>
      </div>
  </div>
  <div v-else>
    lols
  </div>
</template>

<script>
import UserService from '@/services/UserService';
import TeamService from '@/services/TeamService';
import SessionService from '@/services/SessionService';
import moment from 'moment';
import ding from '../assets/ding.mp3';

export default {
  name: 'Workspace',
  data() {
    return {
      title: 'stuff',
      user: null,
      team: null,
      teammates: [],
      activeSessions: [],
      activeSession: {},
      newSession: {
        workDuration: 19500,
        breakDuration: 3000,
        startedAt: null,
        isPlaying: false,
      },
      form: {
        workMinutes: 25,
        breakMinutes: 5,
      },
      displayTime: '',
      activeColor: '#e67e22',
      schedule: [],
      currentIndex: 0,
    };
  },
  metaInfo() {
    return {
      title: 'Tiger Time',
      titleTemplate: `${this.displayTime} - %s`,
    };
  },
  mounted() {
    this.resetDisplayTime();
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
      SessionService.findActiveSessions(teamId).then((res) => {
        this.activeSessions = res.data.sessions;
        if (this.user.activeSessionId) {
          this.activeSessions.forEach((currentSession) => {
            // eslint-disable-next-line
            if (this.user.activeSessionId === currentSession._id) {
              this.activeSession = currentSession;
              this.setSchedule(10);
              this.startTimer();
            }
          });
        }
        setTimeout(this.findActiveSessions, 5000);
      });
    } else {
      this.$router.push({ name: 'Landing' });
    }
  },
  methods: {
    findActiveSessions() {
      // eslint-disable-next-line
      SessionService.findActiveSessions(this.team._id).then((res) => {
        this.activeSessions = res.data.sessions;
        setTimeout(this.findActiveSessions, 5000);
      });
    },
    hideModal() {
      this.$refs.myModalRef.hide();
      this.resetDisplayTime();
    },
    resetDisplayTime() {
      const hours = moment.duration(this.form.workMinutes * 60, 'seconds').hours();
      const minutes = moment.duration(this.form.workMinutes * 60, 'seconds').minutes();
      const seconds = moment.duration(this.form.workMinutes * 60, 'seconds').seconds();
      this.displayTime = `${hours > 0 ? `${hours}:` : ''}${minutes.toString().length === 1 ? '0' : ''}${minutes}:${seconds.toString().length === 1 ? '0' : ''}${seconds}`;
    },
    signOut() {
      this.user = null;
      this.team = null;
      sessionStorage.removeItem('xbcc');
      sessionStorage.removeItem('ybcc');
      this.$router.push({ name: 'Landing' });
    },
    addSession() {
      // eslint-disable-next-line
      this.form.createdById = this.user._id;
      // eslint-disable-next-line
      this.form.teamId = this.team._id;
      SessionService.addSession(this.form).then((res) => {
        this.activeSession = res.data.session;
        this.setSchedule(3);
        this.startTimer();
      });
    },
    joinSession(sessionId) {
      this.user.activeSessionId = sessionId;
      UserService.joinSession(this.user).then((res) => {
        this.activeSession = res.data;
        this.setSchedule(3);
        this.startTimer();
      });
    },
    dropOut() {
      this.user.activeSessionId = null;
      UserService.updateUser(this.user).then((res) => {
        this.user = res.data.user;
        this.handleEndSession();
      });
    },
    setSchedule(slots) {
      const schedule = [];
      const startTime = this.activeSession.startedAt;
      const workMinutes = this.activeSession.workMinutes;
      const breakMinutes = this.activeSession.breakMinutes;
      let elapsedMinutes = 0;
      let isBreak = true;
      for (let i = 0; i < slots; i += 1) {
        const time = moment(startTime).add(elapsedMinutes, 'minutes').format();
        isBreak = !isBreak;
        if (!isBreak) {
          elapsedMinutes += workMinutes;
        } else {
          elapsedMinutes += breakMinutes;
        }
        schedule.push({ time, isBreak });
      }
      this.schedule = schedule;
    },
    findIndex() {
      const now = moment().format();
      let currentIndex = 0;
      this.schedule.every((element, index) => {
        if (element.time > now) {
          currentIndex = index - 1;
          return false;
        }
        return true;
      });
      this.currentIndex = currentIndex;
    },
    startTimer() {
      this.activeColor = this.schedule[this.currentIndex].isBreak ? '#27ae60' : '#e67e22';
      // const start = moment(this.schedule[this.currentIndex].time);
      this.newSession.isPlaying = true;
      this.timeInterval = setInterval(() => {
        if (this.getRemaning().asMilliseconds() <= 0) {
          const audio = new Audio(ding);
          audio.play();
          this.currentIndex += 1;
          this.activeColor = this.schedule[this.currentIndex].isBreak ? '#27ae60' : '#e67e22';
          if (this.currentIndex > this.schedule.length - 2) {
            this.setSchedule(this.currentIndex + 5);
          }
        }
      }, 1000);
    },
    startBreak() {
      this.activeColor = '#27ae60';
      const start = moment(this.activeSession.newStart);
      this.timeInterval = setInterval(() => {
        if (this.getRemaning(start).asMilliseconds() <= 0) {
          clearInterval(this.timeInterval);
          const audio = new Audio(ding);
          audio.play();
          this.activeSession.newStart = Date.now();
          this.startTimer();
        }
      }, 1000);
    },
    endTimer() {
      // eslint-disable-next-line
      SessionService.endSession(this.activeSession._id).then((res) => {
        this.handleEndSession();
      });
    },
    handleEndSession() {
      this.activeSession = {};
      this.activeColor = '#e67e22';
      this.newSession.isPlaying = false;
      clearInterval(this.timeInterval);
      this.resetDisplayTime();
    },
    getRemaning() {
      const rem = (moment(this.schedule[this.currentIndex + 1].time)).diff(moment(), 'seconds');
      const remaining = moment.duration(rem, 'seconds');
      this.displayTime = `${remaining.minutes()}:${remaining.seconds().toString().length === 1 ? '0' : ''}${remaining.seconds()}`;
      return remaining;
    },
    showModal() {
      this.$refs.myModalRef.show();
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
.main {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 5px; 
}
.box {
  padding: 15px 20px;
}
.separator {
  background-color: #314152;
  height: 2px;
  width: 100%;
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
.bubble {
  height: 300px;
  width: 300px;
  border-radius: 150px;
  margin: 10px;
  background-color: #e67e22;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.small {
  height: 150px;
  width: 150px;
}
.red {
  background-color: #e74c3c;
}
.time-text {
  font-weight: bold; 
  font-size: 30px;
}
.title {
  font-weight: bold;
}
</style>
