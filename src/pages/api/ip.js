export default function handler(req, res) {
    res.status(200).json({ ip: req.headers['x-real-ip'] || req.socket.remoteAddress });
}