const fs = require('fs');
const path = require('path');

const files = [
    'src/view/auth/register/JS_register.js',
    'src/view/auth/JS_AuthForm.js',
    'src/view/Rol/JS_Rol.js',
    'src/Private/review/teacher/teachers.jsx',
    'src/Private/review/shared/NewCourse.jsx',
    'src/Private/review/shared/DetalleCurso.jsx',
    'src/Private/review/shared/Convocatorias.jsx',
    'src/Private/review/teacher/methods/foro/foro.jsx',
    'src/Private/review/teacher/GestionCursos.jsx',
    'src/Private/review/student/students.jsx',
    'src/utils/cleanConvocatorias.jsx'
];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        fs.writeFileSync(filePath, content, { encoding: 'utf8' });
        console.log(`✓ ${file} corregido`);
    } else {
        console.log(`✗ ${file} no existe`);
    }
});
