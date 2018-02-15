<template>
  <div>
    <div class='title-container'>
        <a href='/'><h1 class='title'>Tiger Time</h1></a>
    </div>
    <b-container>
      <h2>Find your team</h2>
      <b-form-group id="teamNameL"
                    label="Team Name"
                    label-for="teamName">
        <b-form-input id="teamName"
                      type="text"
                      autocomplete="off"
                      v-model="searchTerm"
                      value=""
                      required
                      placeholder="eg, 'Tiger Time Devs'"
                      @input="search">
        </b-form-input>
      </b-form-group>
        <ul id="example-1">
          <b-button @click="selectedTeam = item" variant="outline-orange" v-b-modal.modal1 v-for="item in teams" :key="item._id">
            {{ item.teamName }}
          </b-button>
        </ul>
      <b-modal ref="myModalRef" hide-footer id="modal1" title="Access Password">
        <b-form-group id="accessPasswordL"
                      label="Access Password"
                      label-for="accessPassword">
          <b-form-input id="accessPassword"
                        type="password"
                        v-model="form.accessPassword"
                        required>
          </b-form-input>
        </b-form-group>
        <b-btn class="mt-3" variant="outline-success" block @click="onSubmit">Submit</b-btn>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import TeamService from '@/services/TeamService';

export default {
  name: 'FindTeam',
  data() {
    return {
      form: {
        accessPassword: 'password',
      },
      teams: [],
      searchTerm: '',
      selectedTeam: {},
    };
  },
  methods: {
    hideModal() {
      this.$refs.myModalRef.hide();
    },
    search() {
      if (this.searchTerm.length > 2) {
        TeamService.findTeams(this.searchTerm).then((response) => {
          this.teams = response.data;
        });
      }
    },
    onSubmit() {
      TeamService.joinTeam({ form: this.form, team: this.selectedTeam, userId: sessionStorage.getItem('xbcc') })
        .then((response) => {
          this.$refs.myModalRef.hide();
          // eslint-disable-next-line
          sessionStorage.setItem('ybcc', response.data.team._id);
          this.$router.push({ name: 'Workspace' });
        });
    },
    onReset() {
      this.form = {
        accessPassword: '',
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
