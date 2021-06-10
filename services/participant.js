const dbConnection = require('./db');
const config = require('../config');

/*
    Dear Diogo quando tentares vir aqui ver como fizeste isto lembra te le sempre 
    a documentacao foi assim que isto funcionou corretamente.
*/


async function getMutiple(id, id_utilizador){

    console.log("test 2: passed")
    //console.log(dbConnection.query('select * from Participante'))
    console.log(id, id_utilizador)

    // Realizar query para slecionar todos os elementos na Participante
    const participante = await dbConnection.query('SELECT * FROM Participante p\
    WHERE p.id_atividade = ? AND p.id_utilizador = ?', [id, id_utilizador]);
    console.log("test 3: passed")

    return {
        participante
    }
}

async function create(participanteBody){
    console.log(participanteBody.id)
    console.log(participanteBody)

    // Criar novo elemento para a tabela Participante
    // nesta tabela o id e automaticamente incrementado
    const result = await dbConnection.query(
        'INSERT INTO Participante (confirmacao) VALUES (?)', 
            [
                participanteBody.confirmacao
            ],
    )

    let message = 'Error creating Participante'

    if (result.affectedRows){
        message = 'Participante created successfully'
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
async function update(id, id_utilizador, participanteBody){

    // Realizar a atualizacao de um elemento na tabela Participante
    const result = await dbConnection.query(
        'UPDATE Participante SET confimacao = ?\
          WHERE id_atividade = ? AND id_utilizador = ?', 
         [
             participanteBody.confirmacao, 
             id, id_utilizador
         ]
    )
    let message = 'Error updating Participante'

    if (result.affectedRows){
        message = 'Participante updated successfully'
    }

    return {
        message
    }
}

// Aqui recebemos o id por argumento -> <req.params.id>
async function remove(id, id_utilizador){

    // Remover elemento da tabela Participante
    const result = await dbConnection.query(
        'DELETE FROM Participante WHERE id_atividade = ? AND id_utlizador = ?',
        [id, id_utilizador]
    )

    let message = 'Error deleting Participante'

    if (result.affectedRows){
        message = 'Participante deleted successfully'
    }

    return {
        message
    }
}

module.exports = {
    getMutiple,
    create,
    update,
    remove
}