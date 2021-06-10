const dbConnection = require('./db');
const config = require('../config');

/*
    Dear Diogo quando tentares vir aqui ver como fizeste isto lembra te le sempre 
    a documentacao foi assim que isto funcionou corretamente.
*/


async function getMutiple(){

    console.log("test 2: passed")
    //console.log(dbConnection.query('select * from Seccao'))

    // Realizar query para slecionar todos os elementos na Seccao
    const user = await dbConnection.query('SELECT * FROM Seccao');
    console.log("test 3: passed")

    return {
        user
    }
}

async function getById(id){

    console.log("test 2: passed")
    //console.log(dbConnection.query('select * from user'))
    
    // Selecionar os elementos da tabela Seccao por ID
    const user = await dbConnection.query('SELECT * FROM Seccao WHERE id_seccao = ?', [id]);
    console.log("test 3: passed")

    return {
        user
    }
}

async function create(seccaoBody){
    console.log(seccaoBody.id)
    console.log(seccaoBody)

    // Criar novo elemento para a tabela Seccao
    // nesta tabela o id e automaticamente incrementado
    const result = await dbConnection.query(
        'INSERT INTO Seccao (nome_seccao) VALUES (?)', 
            [
                seccaoBody.nome_seccao
            ],
    )

    let message = 'Error creating Seccao'

    if (result.affectedRows){
        message = 'Seccao created successfully'
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
async function update(id, seccaoBody){

    // Realizar a atualizacao de um elemento na tabela Seccao
    const result = await dbConnection.query(
        'UPDATE Seccao SET nome_seccao = ?\
          WHERE id_seccao = ?', 
         [
            seccaoBody.nome_seccao, 
             id,
         ]
    )
    let message = 'Error updating Seccao'

    if (result.affectedRows){
        message = 'Seccao updated successfully'
    }

    return {
        message
    }
}

// Aqui recebemos o id por argumento -> <req.params.id>
async function remove(id){

    // Remover elemento da tabela Seccao
    const result = await dbConnection.query(
        'DELETE FROM Seccao WHERE id_seccao = ?',
        [id]
    )

    let message = 'Error deleting Seccao'

    if (result.affectedRows){
        message = 'Seccao deleted successfully'
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