const dbConnection = require('./db');
const config = require('../config');

/*
    Dear Diogo quando tentares vir aqui ver como fizeste isto lembra te le sempre 
    a documentacao foi assim que isto funcionou corretamente.
*/


async function getMutiple(){

    console.log("test 2: passed")
    //console.log(dbConnection.query('select * from Atividade'))

    // Realizar query para slecionar todos os elementos na utilizador
    const users = await dbConnection.query('SELECT * FROM Utilizador');
    console.log("test 3: passed")

    return {
        users
    }
}

async function getById(id){

    console.log("test 2: passed")
    //console.log(dbConnection.query('select * from User'))
    
    // Selecionar os elementos da tabela utilizador por ID
    const users = await dbConnection.query('SELECT * FROM Utilizador WHERE id_utilizador = ?', [id]);
    console.log("test 3: passed")

    return {
        users
    }
}

async function create(userBody){
    console.log(userBody.id)
    console.log(userBody)

    // Criar novo elemento para a tabela utilizador
    // nesta tabela o id e automaticamente incrementado
    const result = await dbConnection.query(
        'INSERT INTO Utilizador (email_utilizador, palavra_pass, id_tipo,\
            id_perfil) VALUES (?, ?, ?, ?)', 
            [
                userBody.email_utilizador, userBody.palavra_pass, userBody.id_tipo, userBody.id_perfil
            ],
    )

    let message = 'Error creating User'

    if (result.affectedRows){
        message = 'User created successfully'
    }

    return {
        result,
        message
    }
}

/* 
    argumentos:
    id por argumento -> <req.params.id> 
    user body -> <req.body> 
 */
async function update(id, userBody){

    // Realizar a atualizacao de um elemento na tabela utilizador
    const result = await dbConnection.query(
        'UPDATE Utilizador SET email_utilizador = ?, palavra_pass = ?, id_tipo = ?,\
         id_perfil = ?\
          WHERE id_utilizador = ?', 
         [
             userBody.email_utilizador, userBody.palavra_pass, userBody.id_tipo, userBody.id_perfil,
             id
         ]
    )
    let message = 'Error updating User'

    if (result.affectedRows){
        message = 'User updated successfully'
    }

    return {
        message
    }
}

// Aqui recebemos o id por argumento -> <req.params.id>
async function remove(id){

    // Remover elemento da tabela atividade
    const result = await dbConnection.query(
        'DELETE FROM Utilizador WHERE id_utilizador = ?',
        [id]
    )

    let message = 'Error deleting User'

    if (result.affectedRows){
        message = 'User deleted successfully'
    }

    return {
        message
    }
}

module.exports = {
    getMutiple,
    getById,
    create,
    update,
    remove
}