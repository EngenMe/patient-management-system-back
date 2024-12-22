import app from "./app";
import initDB from "./models";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await initDB();
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

if (process.env.NODE_ENV !== "test") {
  startServer();
}

export default app;
