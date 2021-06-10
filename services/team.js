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
    const teams = await dbConnection.query('SELECT * FROM Equipa');
    console.log("test 3: passed")

    return {
        teams
    }
}

async function getById(id){

    console.log("test 2: passed")
    //console.log(dbConnection.query('select * from team'))
    
    // Selecionar os elementos da tabela equipa por ID
    const teams = await dbConnection.query('SELECT * FROM Equipa WHERE id_equipa = ?', [id]);
    console.log("test 3: passed")

    return {
        teams
    }
}

async function create(teamBody){
    console.log(teamBody.id)
    console.log(teamBody)

    // Criar novo elemento para a tabela equipa
    // nesta tabela o id e automaticamente incrementado
    const result = await dbConnection.query(
        'INSERT INTO Equipa (nome, id_seccao) VALUES (?, ?)', 
            [
                teamBody.nome, teamBody.id_seccao
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
async function update(id, teamBody){

    // Realizar a atualizacao de um elemento na tabela equipa
    const result = await dbConnection.query(
        'UPDATE Equipa SET nome = ?, id_seccao = ?\
          WHERE id_equipa = ?', 
         [
             teamBody.nome, teamBody.id_seccao,
             id
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
async function remove(id){

    // Remover elemento da tabela atividade
    const result = await dbConnection.query(
        'DELETE FROM Equipa WHERE id_equipa = ?',
        [id]
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