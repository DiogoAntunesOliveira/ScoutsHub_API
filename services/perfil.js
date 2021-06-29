const dbConnection = require('./db');
const config = require('../config');

/*
    Dear Diogo quando tentares vir aqui ver como fizeste isto lembra te le sempre 
    a documentacao foi assim que isto funcionou corretamente.
*/


async function getMutiple(){

    console.log("test 2: passed")
    //console.log(dbConnection.query('select * from perfil'))

    // Realizar query para slecionar todos os elementos na perfil
    const perfis = await dbConnection.query('SELECT * FROM Perfil');
    console.log("test 3: passed")

    return {
        perfis
    }
}

async function getById(id_user){

    console.log("test 2: passed")
    //console.log(dbConnection.query('select * from perfil'))
    
    // Selecionar os elementos da tabela perfil por ID
    const perfis = await dbConnection.query('SELECT * FROM Perfil WHERE id_utilizador = ?', [id_user]);
    console.log("test 3: passed")

    return {
        perfis
    }
}

async function create(id_user ,perfilBody){
    console.log(perfilBody.id)
    console.log(perfilBody)

    // Criar novo elemento para a tabela perfil
    // nesta tabela o id e automaticamente incrementado
    const result = await dbConnection.query(
        'INSERT INTO Perfil (nome, imagem, dt_nasc, genero,\
            contacto, morada, codigo_postal, nin, total_atividades_part, id_equipa, id_utilizador) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [
                perfilBody.nome, perfilBody.imagem, perfilBody.dt_nasc, perfilBody.genero, perfilBody.contacto, perfilBody.morada,
                perfilBody.codigo_postal, perfilBody.nin, perfilBody.total_atividades_part, perfilBody.id_equipa, id_user
            ],
    )

    let message = 'Error creating perfil'

    if (result.affectedRows){
        message = 'perfil created successfully'
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
async function update(id_user, perfilBody){

    // Realizar a atualizacao de um elemento na tabela perfil
    const result = await dbConnection.query(
        'UPDATE Perfil SET nome = ?, imagem = ?, dt_nasc = ?, genero = ?,\
         contacto = ?, morada = ?, codigo_postal = ?, nin = ?, total_atividades_part = ?, id_equipa = ?, id_utilizador = ?\
          WHERE id_utilizador = ?',
         [
            perfilBody.nome, perfilBody.imagem, perfilBody.dt_nasc, perfilBody.genero, perfilBody.contacto, perfilBody.morada,
            perfilBody.codigo_postal, perfilBody.nin, perfilBody.total_atividades_part, perfilBody.id_equipa, perfilBody.id_utilizador,
             id_user
         ]
    )
    let message = 'Error updating Perfil'

    if (result.affectedRows){
        message = 'Perfil updated successfully'
    }

    return {
        message
    }
}

// Aqui recebemos o id por argumento -> <req.params.id>
async function remove(id){

    // Remover elemento da tabela perfil
    const result = await dbConnection.query(
        'DELETE FROM Perfil WHERE id_perfil = ?',
        [id]
    )

    let message = 'Error deleting Perfil'

    if (result.affectedRows){
        message = 'Perfil deleted successfully'
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