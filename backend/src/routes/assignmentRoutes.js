const express = require("express");
const pool = require("../config/postgres");

const router = express.Router();


router.get("/", async (req, res) => {
  const { difficulty } = req.query;

  try {
    let result;

    if (difficulty) {
      result = await pool.query(
        "SELECT * FROM assignments WHERE difficulty = $1",
        [difficulty]
      );
    } else {
      result = await pool.query("SELECT * FROM assignments");
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});



// GET assignment by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const assignmentResult = await pool.query(
      `SELECT id, title, description, difficulty, hint, created_at
       FROM assignments
       WHERE id = $1`,
      [id],
    );

    if (assignmentResult.rows.length === 0) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    res.json(assignmentResult.rows[0]);
  } catch (err) {
    console.error("Error fetching assignment:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/run", async (req, res) => {
  const { query } = req.body;

  if (!query || !query.trim().toLowerCase().startsWith("select")) {
    return res.status(400).json({
      error: "Only SELECT queries are allowed.",
    });
  }

  try {
    const result = await pool.query(query);
    res.json({ rows: result.rows });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/submit", async (req, res) => {
  const { query, assignmentId } = req.body;

  try {
    const assignment = await pool.query(
      "SELECT expected_query FROM assignments WHERE id = $1",
      [assignmentId],
    );

    if (assignment.rows.length === 0) {
      return res.status(404).json({ error: "Assignment not found" });
    }

    const expectedResult = await pool.query(assignment.rows[0].expected_query);

    const userResult = await pool.query(query);

    const sortRows = (rows) =>
      rows.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));

    const isCorrect =
      JSON.stringify(sortRows(expectedResult.rows)) ===
      JSON.stringify(sortRows(userResult.rows));

  

    res.json({ isCorrect});

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/filter", async (req, res) => {
  const { difficulty } = req.query;

  try {
    let result;

    if (difficulty) {
      result = await pool.query(
        "SELECT * FROM assignments WHERE difficulty = $1",
        [difficulty]
      );
    } else {
      result = await pool.query("SELECT * FROM assignments");
    }

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
