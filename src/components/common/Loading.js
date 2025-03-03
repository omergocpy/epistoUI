import { jsx as _jsx } from "react/jsx-runtime";
import { useLoading } from '../../context/LoadingContext';
const Loading = () => {
    const { isLoading } = useLoading();
    if (!isLoading)
        return null;
    return (_jsx("div", { style: overlayStyle, children: _jsx("div", { style: spinnerStyle, children: "Loading..." }) }));
};
const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};
const spinnerStyle = {
    padding: '20px',
    background: '#fff',
    borderRadius: '5px',
    fontSize: '1.2rem',
};
export default Loading;
