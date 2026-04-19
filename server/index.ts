import dotenv from "dotenv";
dotenv.config();

import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";

const app = express();

/* CORS */
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

/* Body parser */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* Logger */
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;

  let captured: any;

  const originalJson = res.json;

  res.json = function (body, ...args) {
    captured = body;
    return originalJson.apply(res, [body, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;

    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;

      if (captured) {
        logLine += ` :: ${JSON.stringify(captured)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      console.log(logLine);
    }
  });

  next();
});

/* Routes */
(async () => {
  const server = await registerRoutes(app);

  /* Error handler */
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    res.status(err.status || 500).json({
      error: err.message || "Internal Server Error",
    });
  });

  const port = Number(process.env.PORT) || 5000;

  server.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
  });
})();