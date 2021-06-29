const dbConnection = require('./db');
const config = require('../config');

/*
    Dear Diogo quando tentares vir aqui ver como fizeste isto lembra te le sempre 
    a documentacao foi assim que isto funcionou corretamente.
*/


async function getMutiple(){

    console.log("test 2: passed")
    //console.log(dbConnection.query('select * from Tipo_utilizador'))

    // Realizar query para slecionar todos os elementos na Tipo_utilizador
    const user = await dbConnection.query('SELECT * FROM Tipo_utilizador');
    console.log("test 3: passed")

    return {
        user
    }
}

async function getById(id){

    console.log("test 2: passed")
    //console.log(dbConnection.query('select * from user'))
    
    // Selecionar os elementos da tabela Tipo_utilizador por ID
    const user = await dbConnection.query('SELECT * FROM Tipo_utilizador WHERE id_tipo = ?', [id]);
    console.log("test 3: passed")

    return {
        user
    }
}

async function create(userBody){
    console.log(userBody.id)
    console.log(userBody)

    // Criar novo elemento para a tabela Tipo_utilizador
    // nesta tabela o id e automaticamente incrementado
    const result = await dbConnection.query(
        'INSERT INTO Tipo_utilizador (designacao) VALUES (?)', 
            [
                userBody.designacao
            ],
    )

    let message = 'Error creating Tipo_utilizador'

    if (result.affectedRows){
        message = 'Tipo_utilizador created successfully'
    }

    return {
        result,
        message
    }
}

/* 
    argumentos:
    id por argumento -> <req.params.id> 
    activity body -> <req.body> 
 */
async function update(id, userBody){

    // Realizar a atualizacao de um elemento na tabela Tipo_utilizador
    const result = await dbConnection.query(
        'UPDATE Tipo_utilizador SET designacao = ?\
          WHERE id_tipo = ?', 
         [
            userBody.designacao, 
             id,
         ]
    )
    let message = 'Error updating Tipo_utilizador'

    if (result.affectedRows){
        message = 'Tipo_utilizador updated successfully'
    }

    return {
        message
    }
}

// Aqui recebemos o id por argumento -> <req.params.id>
async function remove(id){

    // Remover elemento da tabela Tipo_utilizador
    const result = await dbConnection.query(
        'DELETE FROM Tipo_utilizador WHERE id_tipo = ?',
        [id]
    )

    let message = 'Error deleting Tipo_utilizador'

    if (result.affectedRows){
        message = 'Tipo_utilizador deleted successfully'
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