const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json());

const sessions = new Map();

app.get("/", (req, res) => {
  res.send("My Phone Control Server is running.");
});

app.post("/pair", (req, res) => {
  const code = crypto.randomInt(100000, 1000000).toString();

  sessions.set(code, {
    createdAt: Date.now(),
    approved: false
  });

  res.json({
    success: true,
    code,
    message: "Pairing code created. Waiting for approval."
  });
});

app.post("/approve", (req, res) => {
  const { code, consent } = req.body;

  if (consent !== true) {
    return res.status(403).json({
      success: false,
      message: "Explicit permission is required."
    });
  }

  const session = sessions.get(String(code));

  if (!session || Date.now() - session.createdAt > 5 * 60 * 1000) {
    return res.status(404).json({
      success: false,
      message: "Invalid or expired code."
    });
  }

  session.approved = true;

  res.json({
    success: true,
    message: "Pairing approved."
  });
});

app.get("/status/:code", (req, res) => {
  const session = sessions.get(req.params.code);

  if (!session || Date.now() - session.createdAt > 5 * 60 * 1000) {
    return res.status(404).json({ approved: false });
  }

  res.json({ approved: session.approved });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
