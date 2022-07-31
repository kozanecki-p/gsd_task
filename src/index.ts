import { config as dotenvConfig } from "dotenv";
import { createApp } from "./app";

dotenvConfig();

const app = createApp();
const port = Number(process.env["PORT"]);
app.listen(port, () => console.log(`App listening on :${port}`));
