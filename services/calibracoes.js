const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, id_atual, certificado, calibrado_por, local_calibração, data_1, num_análise,
    responsável, data_2, conclusão, observação, erro, U, erro_1, U_1, erro_2, U_2, erro_3,
    U_3, erro_4, U_4, erro_5, U_5, erro_6, U_6, erro_7, U_7, próxima_calibração 
    FROM calibracoes LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function create(calibracao){
    const result = await db.query(
      `INSERT INTO calibracoes 
      (id_atual, certificado, calibrado_por, local_calibração, data_1, num_análise,
        responsável, data_2, conclusão, observação, erro, U, erro_1, U_1, erro_2, U_2, erro_3,
        U_3, erro_4, U_4, erro_5, U_5, erro_6, U_6, erro_7, U_7, próxima_calibração) 
      VALUES 
      (${calibracao.id_atual}, ${calibracao.certificado}, ${calibracao.calibrado_por},
        ${calibracao.local_calibração}, ${calibracao.data_1}, ${calibracao.num_análise},
        ${calibracao.responsável}, ${calibracao.data_2}, ${calibracao.conclusão},
        ${calibracao.observação}, ${calibracao.erro}, ${calibracao.U}, ${calibracao.erro_1},
        ${calibracao.U_1},  ${calibracao.erro_2},  ${calibracao.U_2}, ${calibracao.erro_3},
        ${calibracao.U_3}, ${calibracao.erro_4}, ${calibracao.U_4}, ${calibracao.erro_5},
        ${calibracao.U_5}, ${calibracao.erro_6}, ${calibracao.U_6}, ${calibracao.erro_7}, 
        ${calibracao.U_7}, ${calibracao.próxima_calibração})`
    );
  
    let message = 'Erro ao criar calibração';
  
    if (result.affectedRows) {
      message = 'Calibração criada com sucesso';
    }
  
    return {message};
  }

  async function update(id, calibracao){
    const result = await db.query(
      `UPDATE calibracoes 
      SET id_atual="${calibracao.id_atual}", certificado=${calibracao.certificado},
      calibrado_por=${calibracao.calibrado_por}, local_calibração=${calibracao.local_calibração},
      data_1=${calibracao.data_1}, num_análise=${calibracao.num_análise},
      responsável=${calibracao.responsável}, data_2=${calibracao.data_2},
      conclusão=${calibracao.conclusão}, observação=${calibracao.observação},
      erro=${calibracao.erro}, U=${calibracao.U}, erro_1=${calibracao.erro_1},
      U_1=${calibracao.U_1}, erro_2=${calibracao.erro_2}, U=${calibracao.U_2},
      erro_3=${calibracao.erro_3}, U_3=${calibracao.U_3}, erro_4=${calibracao.erro_4},
      U_4=${calibracao.U_4}, erro_5=${calibracao.erro_5}, U_5=${calibracao.U_5},
      erro_6=${calibracao.erro_6}, U_6=${calibracao.U_6}, erro_7=${calibracao.erro_7},
      U_7=${calibracao.U_7}, próxima_calibração=${calibracao.próxima_calibração}
      WHERE id=${id}` 
    );
  
    let message = 'Erro ao atualizar calibração';
  
    if (result.affectedRows) {
      message = 'Calibração atualizada com sucesso';
    }
  
    return {message};
  }

  async function remove(id){
    const result = await db.query(
      `DELETE FROM calibracoes WHERE id=${id}`
    );
  
    let message = 'Erro ao remover calibração';
  
    if (result.affectedRows) {
      message = 'Calibração removida com sucesso';
    }
  
    return {message};
  }

module.exports = {
  getMultiple,
  create,
  update,
  remove,
}