import './App.css';
import RootRouter from './routes';
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Provider store={store}>
      <RootRouter />
      <ToastContainer position='top-center' autoClose={2000} />
    </Provider>
  );
}

export default App;
