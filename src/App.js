import { jsx as _jsx } from "react/jsx-runtime";
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { LoadingProvider } from './context/LoadingContext';
const App = () => {
    return (_jsx(LoadingProvider, { children: _jsx(Router, { children: _jsx(AppRoutes, {}) }) }));
};
export default App;
