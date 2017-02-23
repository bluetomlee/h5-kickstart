import {mount} from 'riot';
import route from 'riot-route';
import './tags/home.tag';

route.start(true);
route((id, sub) => {
    mount('#app', 'home');
});
