// Neste ficheiro vai conter as credenciais para o acesso a base de dados

const env = process.env

const config = {
    db:{
        host: 'mysql',
        user: 'root',
        password: 'root',
        database: 'scoutshub'
    }
}

module.exports = config