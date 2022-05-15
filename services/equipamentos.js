const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, id_antiga, equipamento, modelo, fabricante, capacidade,
    resolução, localização, serviço, bancada, localização_na_bancada,
    erro_máximo, periodicidade_de_calibração, eq_status 
    FROM equipamentos LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(equipamento){
    const result = await db.query(
      `INSERT INTO equipamentos 
      (id_atual, id_antiga, equipamento, modelo, fabricante, capacidade,
        resolução, localização, serviço, bancada, localização_na_bancada,
        erro_máximo, periodicidade_de_calibração, eq_status) 
      VALUES 
      (${equipamento.id_atual}, ${equipamento.id_antiga}, ${equipamento.equipamento},
        ${equipamento.modelo}, ${equipamento.fabricante}, ${equipamento.capacidade},
        ${equipamento.resolução}, ${equipamento.localização}, ${equipamento.serviço},
        ${equipamento.bancada}, ${equipamento.localização_na_bancada}
        ${equipamento.erro_máximo}, ${equipamento.periodicidade_de_calibração}
        ${equipamento.eq_status})`
    );
  
    let message = 'Erro ao criar equipamento';
  
    if (result.affectedRows) {
      message = 'Equipamento criado com sucesso';
    }
  
    return {message};
  }

  async function update(id, equipamento){
    const result = await db.query(
      `UPDATE equipamentos 
      SET id_atual="${equipamento.id_atual}", id_antiga=${equipamento.id_antiga},
      equipamento=${equipamento.equipamento}, modelo=${equipamento.modelo},
      fabricante=${equipamento.fabricante}, capacidade=${equipamento.capacidade},
      resolução=${equipamento.resolução}, localização=${equipamento.localização},
      serviço=${equipamento.serviço}, bancada=${equipamento.bancada},
      localização_na_bancada=${equipamento.localização_na_bancada},
      erro_máximo=${equipamento.erro_máximo},
      periodicidade_de_calibração=${equipamento.periodicidade_de_calibração},
      eq_status=${equipamento.eq_status}
      WHERE id=${id}` 
    );
  
    let message = 'Erro ao atualizar equipamento';
  
    if (result.affectedRows) {
      message = 'Equipamento atualizado com sucesso';
    }
  
    return {message};
  }

  async function remove(id){
    const result = await db.query(
      `DELETE FROM equipamentos WHERE id=${id}`
    );
  
    let message = 'Erro ao remover equipamento';
  
    if (result.affectedRows) {
      message = 'Equipamento removido com sucesso';
    }
  
    return {message};
  }

module.exports = {
  getMultiple,
  create,
  update,
  remove,
}