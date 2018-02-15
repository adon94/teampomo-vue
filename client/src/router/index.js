import Vue from 'vue';
import Router from 'vue-router';
import Landing from '@/components/Landing';
import SignUp from '@/components/SignUp';
import SignIn from '@/components/SignIn';
import CreateTeam from '@/components/CreateTeam';
import FindTeam from '@/components/FindTeam';
import Workspace from '@/components/Workspace';
import Team from '@/components/Team';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Landing',
      component: Landing,
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignIn,
    },
    {
      path: '/createteam',
      name: 'CreateTeam',
      component: CreateTeam,
    },
    {
      path: '/findteam',
      name: 'FindTeam',
      component: FindTeam,
    },
    {
      path: '/workspace',
      name: 'Workspace',
      component: Workspace,
      meta: { title: 'Workspace' },
    },
    {
      path: '/team',
      name: 'Team',
      component: Team,
      meta: { title: 'Team' },
    },
  ],
});
