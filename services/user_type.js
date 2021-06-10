const dbConnection = require('./db');
const config = require('../config');

/*
    Dear Diogo quando tentares vir aqui ver como fizeste isto lembra te le sempre 
    a documentacao foi assim que isto funcionou corretamente.
*/


async function getMutiple(){

    console.log("test 2: passed")
    //console.log(dbConnection.query('select * from Tipo_Utilizador'))

    // Realizar query para slecionar todos os elementos na Tipo_Utilizador
    const user = await dbConnection.query('SELECT * FROM Tipo_Utilizador');
    console.log("test 3: passed")

    return {
        user
    }
}

async function getById(id){

    console.log("test 2: passed")
    //console.log(dbConnection.query('select * from user'))
    
    // Selecionar os elementos da tabela Tipo_Utilizador por ID
    const user = await dbConnection.query('SELECT * FROM Tipo_Utilizador WHERE id_tipo = ?', [id]);
    console.log("test 3: passed")

    return {
        user
    }
}

async function create(userBody){
    console.log(userBody.id)
    console.log(userBody)

    // Criar novo elemento para a tabela Tipo_Utilizador
    // nesta tabela o id e automaticamente incrementado
    const result = await dbConnection.query(
        'INSERT INTO Tipo_Utilizador (designacao) VALUES (?)', 
            [
                userBody.designacao
            ],
    )

    let message = 'Error creating Tipo_Utilizador'

    if (result.affectedRows){
        message = 'Tipo_Utilizador created successfully'
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

    // Realizar a atualizacao de um elemento na tabela Tipo_Utilizador
    const result = await dbConnection.query(
        'UPDATE Tipo_Utilizador SET designacao = ?\
          WHERE id_tipo = ?', 
         [
            userBody.designacao, 
             id,
         ]
    )
    let message = 'Error updating Tipo_Utilizador'

    if (result.affectedRows){
        message = 'Tipo_Utilizador updated successfully'
    }

    return {
        message
    }
}

// Aqui recebemos o id por argumento -> <req.params.id>
async function remove(id){

    // Remover elemento da tabela Tipo_Utilizador
    const result = await dbConnection.query(
        'DELETE FROM Tipo_Utilizador WHERE id_tipo = ?',
        [id]
    )

    let message = 'Error deleting Tipo_Utilizador'

    if (result.affectedRows){
        message = 'Tipo_Utilizador deleted successfully'
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