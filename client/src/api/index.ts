const useMock = import.meta.env.VITE_USE_MOCK === 'true';
export const api = useMock ? require('./mockAPI') : require('./realAPI');
