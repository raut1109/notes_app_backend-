import { createPool } from "mysql";

const pool = createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "notes",
});

export const createNote = (req, res) => {
  console.log(req.body);
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const query = `INSERT INTO notes (title, content) VALUES ('${title}', '${content}')`;
  pool.query(query, [title, content], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to create note" });
    }

    const newNote = { id: result.insertId, title, content };
    return res.status(201).json(newNote);
  });
};
  
export const getNotes = (req, res) => {
  pool.query("SELECT * FROM notes", (error, results, fields) => {
    if (error) {
      return res.status(500).json({ error });
    }

    return res.json({ results });
  });
};

export const getSingleNote = (req, res) => {
  const { id } = req.params;
  pool.query(
    `SELECT * FROM notes where id =${id}`,
    (error, results, fields) => {
      if (error) {
        return res.status(500).json({ error });
      }

      return res.json({ results });
    }
  );
};

export const updateNote = (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  const query = `UPDATE notes SET title = '${title}', content ='${content}'  WHERE id = ${id}`;
  pool.query(query, [title, content, id], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to update note" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res.status(204).end();
  });
};

export const deleteNote = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM notes WHERE id = ${id}`;

  pool.query(query, [id], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to delete note" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    return res.status(204).end();
  });
};

 
