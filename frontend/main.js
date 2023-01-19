import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Login from './modules/login'
//import './assets/css/style.css';

const login = new Login('.form-login')
const cadastro = new Login('.form-cadastro')

cadastro.init()
login.init()

