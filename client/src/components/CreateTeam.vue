<template>
  <div>
    <div class='title-container'>
        <a href='/'><h1 class='title'>Tiger Time</h1></a>
    </div>
    <b-container>
      <h2>Your team</h2>
      <b-form @submit.prevent="onSubmit" @reset="onReset">
        <b-form-group id="companyNameL"
                      label="Company Name"
                      label-for="companyName">
          <b-form-input id="companyName"
                        type="text"
                        v-model="form.companyName"
                        required
                        placeholder="eg, 'Tiger Time'">
          </b-form-input>
        </b-form-group>
        <b-form-group id="teamNameL"
                      label="Team Name"
                      label-for="teamName">
          <b-form-input id="teamName"
                        type="text"
                        v-model="form.teamName"
                        required
                        placeholder="eg, 'Tiger Time Devs'">
          </b-form-input>
        </b-form-group>
        <b-form-group id="accessPasswordL"
                      label="Access Password"
                      label-for="accessPassword"
                      description="Your teammates will need this to join">
          <b-form-input id="accessPassword"
                        type="password"
                        v-model="form.accessPassword"
                        required
                        placeholder="Don't forget this">
          </b-form-input>
        </b-form-group>
        <b-form-group id="confirmPasswordL"
                      label="Confirm Password"
                      label-for="confirmPassword">
          <b-form-input id="confirmPassword"
                        type="password"
                        v-model="confirmPassword"
                        required
                        placeholder="Confirm password">
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
      <p>Does your team already exist on Tiger Time? Find it <a href="/findteam">here</a></p>
    </b-container>
  </div>
</template>

<script>
import TeamService from '@/services/TeamService';

export default {
  name: 'CreateTeam',
  data() {
    return {
      form: {
        accessPassword: 'password',
        companyName: 'Tiger Time',
        teamName: 'Tiger Time Devs',
        createdById: sessionStorage.getItem('xbcc'),
      },
      confirmPassword: 'password',
    };
  },
  methods: {
    onSubmit() {
      TeamService.addTeam(this.form)
        .then((response) => {
          // eslint-disable-next-line
          sessionStorage.setItem('ybcc', response.data.team._id);
          this.$router.push({ name: 'Landing' });
        });
    },
    onReset() {
      this.form = {
        accessPassword: '',
        companyName: '',
        teamName: '',
      };
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.title {
  font-family: helvetica;
  font-weight: bold;
  color: rgb(51, 51, 51);
  font-size: 30px;
}

.title-container {
  margin: 2%;
}

.btn-container {
  margin-top: 30px;
}

.box {
  width: 30%;
}
</style>
