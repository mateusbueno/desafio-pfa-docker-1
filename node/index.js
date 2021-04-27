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

criaTabela = () => {
    return new Promise((resolve, reject) => {
        conn.query(`CREATE TABLE IF NOT EXISTS nodedb.course_modules(id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255) NOT NULL, PRIMARY KEY (id), UNIQUE INDEX (name)) DEFAULT CHARSET=utf8;`,  (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

populaDados = () => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT IGNORE INTO nodedb.course_modules(name) VALUES 
        ('Docker'),
        ('Fundamentos de Arquitetura de Software'),
        ('Comunicação'),
        ('RabbitMQ'),
        ('Autenticação e Keykloak'),
        ('Domain Driven Design e Arquitetura hexagonal'),
        ('Arquitetura do projeto prático - Codeflix'),
        ('Microsserviço: Catálogo de vídeos com Laravel (Back-end)'),
        ('Microsserviço: Catálogo de vídeos com React (Front-end)');`,  (error, elements) => {
            if (error) {
                return reject(error);
            }
            return resolve(elements);
        });
    });
};

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
        await criaTabela();
        await populaDados();
        const resultSelect = await buscaRegistros();
        let listaModulos = '';
        for (let i = 0; i < resultSelect.length ; i++) {
            listaModulos+='<p><b>User:</b> ' + resultSelect[i].name + ' - <b>Id:</b> ' + resultSelect[i].id + '</p>';
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
