const dbConnection = require('./db');
const config = require('../config');

/*
    Dear Diogo quando tentares vir aqui ver como fizeste isto lembra te le sempre 
    a documentacao foi assim que isto funcionou corretamente.
*/


async function getMutiple(){

    console.log("test 2: passed")
    //console.log(dbConnection.query('select * from Atividade'))

    // Realizar query para slecionar todos os elementos na atividade
    const activities = await dbConnection.query('SELECT * FROM Atividade');
    console.log("test 3: passed")

    return {
        activities
    }
}

async function getById(id){

    console.log("test 2: passed")
    //console.log(dbConnection.query('select * from Atividade'))
    
    // Selecionar os elementos da tabela atividade por ID
    const activities = await dbConnection.query('SELECT * FROM Atividade WHERE id_atividade = ?', [id]);
    console.log("test 3: passed")

    return {
        activities
    }
}

async function create(activityBody){
    console.log(activityBody.id)
    console.log(activityBody)

    // Criar novo elemento para a tabela atividade
    // nesta tabela o id e automaticamente incrementado
    const result = await dbConnection.query(
        'INSERT INTO Atividade (nome, tipo, descricao,\
            custo, local, local_inicio, local_fim, coordenadas, data_inicio, data_fim) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [
                activityBody.nome, activityBody.tipo, activityBody.descricao, activityBody.custo, activityBody.local,
                activityBody.local_inicio, activityBody.local_fim, activityBody.coordenadas, activityBody.data_inicio,
                activityBody.data_fim
            ],
    )

    let message = 'Error creating Atividade'

    if (result.affectedRows){
        message = 'Atividade created successfully'
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
async function update(id, activityBody){

    // Realizar a atualizacao de um elemento na tabela atividade
    const result = await dbConnection.query(
        'UPDATE Atividade SET nome = ?, tipo = ?, descricao = ?,\
         custo = ?, local = ?, local_inicio = ?, local_fim = ?, coordenadas = ?, data_inicio = ?, data_fim = ?\
          WHERE id_atividade = ?', 
         [
             activityBody.nome, activityBody.tipo, activityBody.descricao, activityBody.custo, activityBody.local,
             activityBody.local_inicio, activityBody.local_fim, activityBody.coordenadas, activityBody.data_inicio, activityBody.data_fim,
             id
         ]
    )
    let message = 'Error updating Atividade'

    if (result.affectedRows){
        message = 'Atividade updated successfully'
    }

    return {
        message
    }
}

// Aqui recebemos o id por argumento -> <req.params.id>
async function remove(id){

    // Remover elemento da tabela atividade
    const result = await dbConnection.query(
        'DELETE FROM Atividade WHERE id_atividade = ?',
        [id]
    )

    let message = 'Error deleting Atividade'

    if (result.affectedRows){
        message = 'Atividade deleted successfully'
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