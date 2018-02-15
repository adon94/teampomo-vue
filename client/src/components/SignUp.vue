<template>
  <div>
    <div class='title-container'>
        <a href='/'><h1 class='title'>Tiger Time</h1></a>
    </div>
    <b-container>
      <h2>First, tell us about you</h2>
      <b-form @submit.prevent="onSubmit" @reset="onReset">
        <b-row>
          <b-col>
            <b-form-group id="firstNameL"
                          label="First Name"
                          label-for="firstName">
              <b-form-input id="firstName"
                            type="text"
                            v-model="form.firstName"
                            required
                            placeholder="Your first name">
              </b-form-input>
            </b-form-group>
          </b-col>
          <b-col>
            <b-form-group id="lastNameL"
                          label="Last Name"
                          label-for="lastName">
              <b-form-input id="lastName"
                            type="text"
                            v-model="form.lastName"
                            required
                            placeholder="Your last name">
              </b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-form-group id="jobTitleL"
                      label="Job Title"
                      label-for="jobTitle">
          <b-form-input id="jobTitle"
                        type="text"
                        v-model="form.jobTitle"
                        required
                        placeholder="Your job title">
          </b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup2"
                      label="Email"
                      label-for="exampleInput2">
          <b-form-input id="exampleInput2"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Your work email">
          </b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup3"
                      label="Password"
                      label-for="exampleInput3">
          <b-form-input id="exampleInput3"
                        type="password"
                        v-model="form.password"
                        required
                        placeholder="Enter password">
          </b-form-input>
        </b-form-group>
        <b-form-group id="exampleInputGroup4"
                      label="Confirm Password"
                      label-for="exampleInput4">
          <b-form-input id="exampleInput4"
                        type="password"
                        v-model="confirmPassword"
                        required
                        placeholder="Confirm password">
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import UserService from '@/services/UserService';

export default {
  name: 'SignUp',
  data() {
    return {
      form: {
        email: '',
        jobTitle: '',
        password: '',
        firstName: '',
        lastName: '',
      },
      confirmPassword: '',
    };
  },
  methods: {
    onSubmit() {
      UserService.addUser(this.form)
        .then((response) => {
          // eslint-disable-next-line
          sessionStorage.setItem('xbcc', response.data.user._id);
          this.$router.push({ name: 'CreateTeam' });
        });
    },
    onReset() {
      this.form = {
        email: '',
        jobTitle: '',
        password: '',
        firstName: '',
        lastName: '',
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
