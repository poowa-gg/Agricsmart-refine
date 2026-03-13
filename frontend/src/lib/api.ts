import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const farmersApi = {
    getAll: () => api.get('/farmers'),
    register: (data: any) => api.post('/farmers/register', data),
};

export const vendorsApi = {
    getAll: () => api.get('/vendors'),
    apply: (data: any) => api.post('/vendors/apply', data),
};

export const programsApi = {
    getAll: () => api.get('/programs'),
    create: (data: any) => api.post('/programs', data),
    issueVouchers: (id: string, data: any) => api.post(`/programs/${id}/issue`, data),
};

export const vouchersApi = {
    getAll: () => api.get('/vouchers'),
    redeem: (data: any) => api.post('/vouchers/redeem', data),
};

export const reportsApi = {
    getSummary: () => api.get('/reports/summary'),
};

export const settlementsApi = {
    generateBatch: () => api.post('/settlements/generate-batch'),
};

export const academyApi = {
    completeBlock: (data: any) => api.post('/academy/complete-block', data),
    ussdMock: (data: any) => api.post('/academy/ussd', data),
    getProgress: (farmerId: string) => api.get(`/academy/progress/${farmerId}`)
};

export default api;
