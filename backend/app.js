// Importacion delos módulos necesarios
const express = require('express');       
const cors = require('cors');            
const mysql = require('mysql2');          
const multer = require('multer');         
const fs = require('fs');                 
const pdfParse = require('pdf-parse');    

// Creacion la app de Express
const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());            
app.use(express.json());     

// Configuración de multer
const upload = multer({ dest: 'uploads/' });

// Configuración de conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'prueba'
});

// conexion a la base de datos
db.connect(err => {
  if (err) throw err;
  console.log('Conexión exitosa a MySQL');
});


// Ruta para subir un PDF, extraer su texto y guardarlo en la base de datos
app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file; // Obtenemos el archivo del request

  
  if (!file) return res.status(400).json({ error: 'No se subió ningún archivo' });

  try {
  
    const dataBuffer = fs.readFileSync(file.path);

    
    const pdfData = await pdfParse(dataBuffer);

    // insercion en la base de datos: nombre del archivo y contenido extraído
    db.query(
      'INSERT INTO documentos (nombre, contenido) VALUES (?, ?)',
      [file.originalname, pdfData.text],
      (err, result) => {
        if (err) return res.status(500).json({ error: 'Error al insertar en la base de datos', err });

        return res.status(200).json({ message: 'Archivo subido y procesado correctamente' });
      }
    );
  } catch (error) {
    // Error al leer o procesar el PDF
    return res.status(500).json({ error: 'Error al procesar el PDF', error });
  }
});


// obtencion de lista de documentos
app.get('/documentos', (req, res) => {
  // Consulta ordenada por fecha
  db.query('SELECT * FROM documentos ORDER BY fecha_subida DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener documentos' });

    // Envio de lista como respuesta
    return res.json(results);
  });
});


// Ruta para obtener el contenido textual de un PDF por ID
app.get('/documentos/contenido/:id', (req, res) => {
  const { id } = req.params;

  db.query('SELECT contenido FROM documentos WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener contenido' });
    if (results.length === 0) return res.status(404).json({ error: 'Documento no encontrado' });

    // Devolucion del contenido textual extraído
    return res.json({ contenido: results[0].contenido });
  });
});


// Ruta para eliminar un documento por ID
app.delete('/documentos/:id', (req, res) => {
  const { id } = req.params;

  db.query('DELETE FROM documentos WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar' });

    return res.status(200).json({ message: 'Documento eliminado' });
  });
});

// Inicialización del servidor en el puerto especificado
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
