const dbConnection = require('./db');
const config = require('../config');


var atividade=  function(atividade){

    this.id_atividade = atividade.id_atividade
    this.nome_atividade = atividade.nome_atividade
    this.tipo = atividade.tipo
    this.descricao = atividade.descricao
    this.custo = atividade.custo
    this.local = atividade.local 
    this.local_inicio = atividade.local_inicio
    this.local_fim = atividade.local_inicio
    this.coordenadas = atividade.coordenadas
    this.data_inicio = atividade.data_inicio
    this.data_fim = atividade.data_fim
    this.url_local = atividade.url_local

}

atividade.getActivities = (result) => {
    dbConnection.query('select * from atividade'), (err, res) => {

        if (err){
            console.log("Erro a procurar por atividades ")
            result(err, null)
        }
        else {
            console.log('Atividades encontradas com sucesso ')
            result(null, res)
        }

    }
}

atividade.getActivityById =  (id, result) => {
    dbConnection.query('select * from atividade where id_atividade =' + id, (err, res) => {
        if(err){
            console.log("ERRO id nao encontrado na tabela")
            result(null, err)
        }
        else{
            console.log("ID encontrado com SUCESSO")
            result(null, res)
        }
    })
}

atividade.createActivity = (activityBody, result) => {
    dbConnection.query('insert into atividades set ? ', activityBody, (err, res) =>{
        if(err)
        {
            console.log("Erro ao tentar inserir novo elemento na tabela de atividade")
            result(null, {status: false, message: err})
        }else{
            console.log("Atividade criada com sucesso")
            result(null, {status: true, message: "Atividade criada com sucesso", insertID: res.id_atividade})
        }
    })
}


atividade.updateActivity = (id, activityBody, result) => {

    dbConnection.query('insert into atividade set nome_atividade = ?, tipo = ?, descricao = ?,\
     custo = ?, local = ?, local_inicio = ?, local_fim = ?, coordenadas = ?, data_inicio = ?, data_fim = ?\
     url_local = ?', [activityBody.nome_atividade, activityBody.tipo, activityBody.descricao, activityBody.custo, activityBody.local,
    activityBody.local_inicio, activityBody.local_fim, activityBody.coordenadas, activityBody.data_inicio, activityBody.data_fim, activityBody.url_local],
    (err, res) =>{
        if(err){
            console.log('Erro ao tentar atualizar\n 1-verfique se o id existe\n2- verifique os campos\n 3- cuidado com os campos <NULL>\n 4- provavel erro na API\n\
            5- contactar o Diogo do teu grupo')
            result(null, {status: false, message: "",} )
        }
        else{
            console.log('Atividade atualizada com sucesso\n Bom trabalho MIND OVERFLOW')
            result(null, {status: true, message : "Atividade atualizada com sucesso.",insertID: res.id_atividade})
        }
    })

}

atividade.deleteActivity = (id, result) => {
    dbConnection.query('delete from atividade where id_atividade = ' + id, (err, res) => {
        if(err) {
            console.log("ERROR ao apagar atividade\n 1- verifica o id")
        }
        else {
            console.log("SUCESSO ao apagar a atividade")
        }
    })
}