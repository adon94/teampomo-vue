<template>
  <div>
    <div class='title-container'>
        <a href='/'><h1 class='title'>Tiger Time</h1></a>
    </div>
    <b-container>
      <h2>Sign in</h2>
      <b-form @submit.prevent="onSubmit" @reset="onReset">
        <b-form-group id="emailL"
                      label="Email"
                      label-for="email">
          <b-form-input id="email"
                        type="email"
                        v-model="form.email"
                        required
                        placeholder="Enter email">
          </b-form-input>
        </b-form-group>
        <b-form-group id="passwordL"
                      label="Password"
                      label-for="password">
          <b-form-input id="password"
                        type="password"
                        v-model="form.password"
                        required
                        placeholder="Enter password">
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
  name: 'SignIn',
  data() {
    return {
      form: {
        email: 'adambfad@gmail.com',
        password: 'password',
      },
    };
  },
  methods: {
    onSubmit() {
      UserService.signIn(this.form)
        .then((response) => {
          // eslint-disable-next-line
          sessionStorage.setItem('xbcc', response.data.user._id);
          sessionStorage.setItem('ybcc', response.data.user.teamId);
          if (response.data.user.teamId != null) {
            this.$router.push({ name: 'Workspace' });
          } else {
            this.$router.push({ name: 'Landing' });
          }
        });
    },
    onReset() {
      this.form = {
        email: '',
        password: '',
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
