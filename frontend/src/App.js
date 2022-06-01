import 'antd/dist/antd.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './App.scss';
import Layout from './layout/Layout';
function App() {
  return (
    <>
      <ToastContainer />
      <Layout />
    </>

  );
}

export default App;
