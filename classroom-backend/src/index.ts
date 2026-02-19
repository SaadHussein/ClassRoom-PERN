import express from "express";
import subjectsRouter from "./routes/subject";
import cors from "cors";

const app = express();
const PORT = 8000;

const frontendUrl = process.env.FRONTEND_URL;
if (!frontendUrl) {
  throw new Error(
    "FRONTEND_URL must be set when CORS credentials are enabled.",
  );
}
app.use(
  cors({
    origin: frontendUrl,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

app.use("/api/subjects", subjectsRouter);

app.get("/", (_req, res) => {
  res.send("Classroom backend is running.");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Root URL: http://localhost:${PORT}/`);
});
