Gestor de PDFs con React y Node.js

Proyecto desarrollado por Diego Arismendi para subir, ver, extraer contenido y eliminar archivos PDF.


Tecnologías usadas

- **Frontend**: React.js
- **Backend**: Node.js + Express
- **Base de datos**: MySQL
- **Librerías**: Axios, pdf-parse, multer, mysql2


Estructura del Proyecto
├── backend/ # Servidor Node.js
│ ├── app.js # Lógica del servidor
│ ├── uploads/ # Carpeta de archivos subidos
├── frontend/ # Interfaz React
│ └── src/ # Componentes React
└── README.md

Cómo ejecutar el proyecto

#1. Clona el repositorio
git clone https://github.com/tuusuario/gestor-pdf-react.git
cd gestor-pdf-react

#2. Configura y ejecuta el backend
cd backend
npm install
node app.js

#3. Configura y ejecuta el frontend
cd ../frontend
npm install
npm start

Base de datos
Usa esta tabla en MySQL:

CREATE TABLE documentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  contenido LONGTEXT,
  fecha_subida TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Funcionalidades
 *Subida de archivos PDF

 *Extracción del texto interno del PDF
 *Visualización del contenido desde la base de datos
 *Visualización completa del PDF como archivo
 *Eliminación de documentos
 *Registro automático de fecha de subida

Hecho por Diego Arismendi – Bogotá, Colombia
arismendiguzman7@gmail.com
