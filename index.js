const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Basic request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
});

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to the Express server' });
});

// app.get('/health', (req, res) => {
//     res.json({ status: 'ok', uptime: process.uptime() });
// });

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
});

const server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

// Graceful shutdown
// function shutdown(signal) {
//     console.log(`Received ${signal}, shutting down...`);
//     server.close(() => {
//         console.log('Server closed');
//         process.exit(0);
//     });
//     // Force exit after 10s
//     setTimeout(() => process.exit(1), 10000).unref();
// }

// process.on('SIGINT', () => shutdown('SIGINT'));
// process.on('SIGTERM', () => shutdown('SIGTERM'));