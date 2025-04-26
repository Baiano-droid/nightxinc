const express = require('express');
const path = require('path');
console.clear();

const app = express();
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/', require('./routes/index'))

app.listen(PORT, () => {
    console.log(`🚪 | Servidor rodando em: http://localhost:${PORT}`);
} )