import "dotenv/config";

const PORT: number = Number(process.env.PORT) || 8800;
const HOST: string = process.env.HOST || "0.0.0.0";
const SECRET: string = process.env.SECRET || "";

export { PORT, HOST, SECRET };
