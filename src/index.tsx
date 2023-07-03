import { createRoot } from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/AuthContext';
import { SocketProvider } from './contexts/SocketContext';
import 'react-toastify/dist/ReactToastify.css';
import './global.css';
import App from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <AuthProvider>
    <SocketProvider>
      <App />
      <ToastContainer />
    </SocketProvider>
  </AuthProvider>,
);
