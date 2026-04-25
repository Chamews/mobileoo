// API Client
const API = {
    base: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'http://localhost:3000' : '',
    isStatic: !(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'),

    async get(url) {
        if (this.isStatic && url.startsWith('/api')) {
            console.warn(`[API] Static mode: skipping request to ${url}`);
            return { success: false, data: null, snapshots: [], zones: [] };
        }
        try {
            const res = await fetch(`${this.base}${url}`);
            return res.json();
        } catch (e) {
            return { success: false, error: e.message };
        }
    },

    async put(url, data) {
        if (this.isStatic) return { success: true, message: 'Simulated' };
        try {
            const res = await fetch(`${this.base}${url}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return res.json();
        } catch (e) { return { success: false }; }
    },

    async post(url, data = {}) {
        if (this.isStatic) return { success: true, message: 'Simulated' };
        try {
            const res = await fetch(`${this.base}${url}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            return res.json();
        } catch (e) { return { success: false }; }
    },

    // Settings
    getSettings: () => API.get('/api/settings'),
    updateSettings: (data) => API.put('/api/settings', data),

    // Trades
    getTrades: (params = '') => API.get(`/api/trades?${params}`),
    getStats: () => API.get('/api/trades/stats'),
    getScalpSignals: () => API.get('/api/trades/scalps'),

    // Bot
    getBotStatus: () => API.get('/api/bot/status'),
    triggerBot: () => API.post('/api/bot/trigger'),
    triggerScalpPipeline: () => API.post('/api/bot/scalp/trigger'),
    toggleSignalB: () => API.post('/api/bot/signalb/toggle'),
    getLimitEntries: () => API.get('/api/bot/limitentry/list'),
    resetBot: () => API.post('/api/bot/reset'),

    // Health
    getHealth: () => API.get('/api/health')
};
