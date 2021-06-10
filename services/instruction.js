const dbConnection = require('./db');
const config = require('../config');

/*
    Dear Diogo quando tentares vir aqui ver como fizeste isto lembra te le sempre 
    a documentacao foi assim que isto funcionou corretamente.
*/


async function getMutiple(){

    console.log("test 2: passed")
    //console.log(dbConnection.query('select * from Instrucao'))

    // Realizar query para slecionar todos os elementos na Instrucao
    const instrucao = await dbConnection.query('SELECT * FROM Instrucao');
    console.log("test 3: passed")

    return {
        instrucao
    }
}

async function getById(id){

    console.log("test 2: passed")
    //console.log(dbConnection.query('select * from instrucao'))
    
    // Selecionar os elementos da tabela Instrucao por ID
    const instrucao = await dbConnection.query('SELECT * FROM Instrucao WHERE id_instrucao = ?', [id]);
    console.log("test 3: passed")

    return {
        instrucao
    }
}

async function create(instrucaoBody){
    console.log(instrucaoBody.id)
    console.log(instrucaoBody)

    // Criar novo elemento para a tabela Instrucao
    // nesta tabela o id e automaticamente incrementado
    const result = await dbConnection.query(
        'INSERT INTO Instrucao (titulo, descricao, imagem) VALUES (?, ?, ?)', 
            [
                instrucaoBody.titulo, instrucaoBody.descricao, instrucaoBody.imagem
            ],
    )

    let message = 'Error creating Instrucao'

    if (result.affectedRows){
        message = 'Instrucao created successfully'
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
async function update(id, instrucaoBody){

    // Realizar a atualizacao de um elemento na tabela Instrucao
    const result = await dbConnection.query(
        'UPDATE Instrucao SET titulo = ?, descricao = ?, imagem = ?\
          WHERE id_instrucao = ?', 
         [
            instrucaoBody.titulo, instrucaoBody.descricao, instrucaoBody.imagem,
             id
         ]
    )
    let message = 'Error updating Instrucao'

    if (result.affectedRows){
        message = 'Instrucao updated successfully'
    }

    return {
        message
    }
}

// Aqui recebemos o id por argumento -> <req.params.id>
async function remove(id){

    // Remover elemento da tabela Instrucao
    const result = await dbConnection.query(
        'DELETE FROM Instrucao WHERE id_instrucao = ?',
        [id]
    )

    let message = 'Error deleting Instrucao'

    if (result.affectedRows){
        message = 'Instrucao deleted successfully'
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