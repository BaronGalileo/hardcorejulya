import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import "./styles/index.scss";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

