import index from '../App';
import firstView from '../views/firstView';
import myMusic from '../views/myMusic'
import discoverMusic from '../views/discoverMusic'

export const routerConfig = [
  {
    path:'/',
    component:index,
    //auth:true,
  },{
    path:'/myMusic',
    component:myMusic,
  },{
    path:'/discoverMusic',
    component:discoverMusic,
  },{
    path:'/firstView',
    component:firstView,
    children: []
  }
];