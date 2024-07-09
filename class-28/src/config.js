import * as url from "url";
import path from "path";
import {Command} from "commander";
import dotenv from "dotenv";

console.log(process.argv);

const commandLine = new Command();

commandLine
  .option("--mode <mode>")
  .option("--port <port>")

commandLine.parse();

const clOptions = commandLine.opts();
console.log(clOptions);

// busca por defecto archivo con nombre .env e inyecta todas las variables en el entorno del sistema disponivles a traves de process.env
dotenv.config();

// node --env-file .env src/app --port=8080 / para no levantar dotenv y hacerlo desde terminal

// const envPath = clOptions.mode === "prod" ? "env.prod" : ".env.devel";


// si lo tengo con otro nombre
// dotenv.config({ path: ruta_archivo_env});

const config = {
  APP_NAME: 'coderbackend-app',
  SERVER: "ATLAS_16",
  PORT: process.env.PORT || clOptions.port || 8080,
  DIRNAME: url.fileURLToPath(new URL(".", import.meta.url)),
  // UPLOAD_DIR : "public/img",
  get UPLOAD_DIR() {
    return `${this.DIRNAME}/public/img`;
  },
  MONGODB_URI: process.env.MONGODB_URI,
  MONGODB_ID_REGEX: /^[a-fA-F0-9]{24}$/,
  SECRET: "coder",
  PRODUCTS_PER_PAGE: 5,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  // secret key no deberia estar
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
  PERSISTENCE: process.env.PERSISTENCE || 'mongo'
};

export default config;
