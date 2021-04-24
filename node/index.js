const express = require('express')
const utf8 = require('utf8')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const conn = mysql.createConnection(config)

buscaRegistros = () => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT * FROM course_modules ORDER BY id`,  (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

app.get('/', async(req, res) => {
    try {
        const resultSelect = await buscaRegistros();
        let listaModulos = '';
        for (let i = 0; i < resultSelect.length ; i++) {
            listaModulos+='<p><b>User:</b> ' + utf8.decode(resultSelect[i].name) + ' - <b>Id:</b> ' + resultSelect[i].id + '</p>';
        }
        res.send('<h1>Lista de módulos do curso Full Cycle</h1>' + listaModulos)
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})
