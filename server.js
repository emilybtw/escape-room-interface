import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });
console.log("==========================================");
console.log("🚀 Escape Room Network Server is running on port 8080...");
console.log("==========================================");

wss.on('connection', (ws) => {
    console.log("📡 A digital screen has successfully connected to the game network!");

    ws.on('message', (data) => {
        const message = data.toString('utf8');
        console.log(`⚠️ Signal received from terminal: [${message}]`);

        wss.clients.forEach((client) => {
            if (client.readyState === 1) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log("🔌 A digital screen disconnected from the game network.");
    });
});