const dbConnection = require('./db');
const config = require('../config');

/*
    Dear Diogo quando tentares vir aqui ver como fizeste isto lembra te le sempre 
    a documentacao foi assim que isto funcionou corretamente.
*/


async function getMutiple(){

    console.log("test 2: passed")
    //console.log(dbConnection.query('select * from equipa'))

    // Realizar query para slecionar todos os elementos na equipa
    const materials = await dbConnection.query('SELECT * FROM Material_usado_atividade');
    console.log("test 3: passed")

    return {
        materials
    }
}

async function getById(id){

    console.log("test 2: passed")
    //console.log(dbConnection.query('select * from team'))
    
    // Selecionar os elementos da tabela material usado por ID
    const materials = await dbConnection.query('SELECT * FROM Material_usado_atividade WHERE id_atividade = ?', [id]);
    console.log("test 3: passed")

    return {
        materials
    }
}

async function create(materialBody){
    console.log(materialBody.id)
    console.log(materialBody)

    // Criar novo elemento para a tabela material usado
    // nesta tabela o id e automaticamente incrementado
    const result = await dbConnection.query(
        'INSERT INTO Material_usado_atividade (quantidade) VALUES (?)', 
            [
                materialBody.quantidade
            ],
    )

    let message = 'Error creating team'

    if (result.affectedRows){
        message = 'team created successfully'
    }

    return {
        result,
        message
    }
}

/* 
    argumentos:
    id por argumento -> <req.params.id> 
    team body -> <req.body> 
 */
async function update(id, materialBody){

    // Realizar a atualizacao de um elemento na tabela material usado
    const result = await dbConnection.query(
        'UPDATE Material_usado_atividade SET quantidade = ?\
          WHERE id_atividade = ?, id_material = ?', 
         [
            materialBody.quantidade,
             id, id
         ]
    )
    let message = 'Error updating team'

    if (result.affectedRows){
        message = 'team updated successfully'
    }

    return {
        message
    }
}

// Aqui recebemos o id por argumento -> <req.params.id>
async function remove(id, id_material){

    // Remover elemento da tabela atividade
    const result = await dbConnection.query(
        'DELETE FROM Material_usado_atividade WHERE id_equipa = ? AND id_material = ?',
        [id, id_material]
    )

    let message = 'Error deleting team'

    if (result.affectedRows){
        message = 'team deleted successfully'
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