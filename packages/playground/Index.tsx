import { App } from './src/App';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
container?.style.setProperty('background-color', 'lightgray');
createRoot(container!).render(<App />);