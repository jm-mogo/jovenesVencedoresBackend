import "dotenv/config";
const PORT = Number(process.env.PORT) || 8800;
const HOST = process.env.HOST || "0.0.0.0";
const SECRET = process.env.SECRET || "";
const PRIVATE_KEY = process.env.PRIVATE_KEY || "";
const PUBLIC_KEY = process.env.PUBLIC_KEY || "";
export { PORT, HOST, SECRET, PRIVATE_KEY, PUBLIC_KEY };
//# sourceMappingURL=config.js.map