import "dotenv/config";

const PORT: number = Number(process.env.PORT) || 8800;
const HOST: string = process.env.HOST || "0.0.0.0";
const SECRET: string = process.env.SECRET || "";
const PRIVATE_KEY: string = process.env.PRIVATE_KEY || "";
const PUBLIC_KEY: string = process.env.PUBLIC_KEY || "";

export { PORT, HOST, SECRET, PRIVATE_KEY, PUBLIC_KEY };
