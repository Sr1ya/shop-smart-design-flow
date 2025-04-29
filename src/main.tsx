
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set the default document title
document.title = "TataCliq - Fashion, Electronics & More";

createRoot(document.getElementById("root")!).render(<App />);
