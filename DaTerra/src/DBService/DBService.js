import * as SQLite from 'expo-sqlite';

export const DataBase = {
  getConnection: () => {

    const db = SQLite.openDatabase('cadastros.db');

    // nome, data nascimentom, cpf, telefone
    // email, senha, confirmar senha, tipousuario
    // endereco(rua, bairro, numero, cep, cidade, uf, complemento)
    // data cadastro

    // Cadastro Usuário
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS Usuarios' +
        '(id INTEGER PRIMARY KEY AUTOINCREMENT,' +
        'nome TEXT NOT NULL, dtNascimento TEXT NOT NULL, cpf TEXT NOT NULL,' +
        'telefone TEXT NOT NULL, rua TEXT NOT NULL, bairro TEXT NOT NULL,' +
        'numCasa INT NOT NULL, cep INT NOT NULL, cidade TEXT NOT NULL,' +
        'uf TEXT NOT NULL, complemento TEXT NULL, email TEXT NOT NULL,' +
        'senha TEXT NOT NULL, tipoUsuario INT NOT NULL;');
    });

    const ExecuteQuery = (sql, params = []) => {
      return new Promise((resolve, reject) => {
        db.transaction(tx => {
          tx.executeSql(
            sql,
            params,
            (__, results) => {
              resolve(results);
            },
            (error) => {
              reject(error);
            }
          );    // tx.executeSql
        });   //db.transactiom
      });   // return Promise
    }    // ExecuteQuery
    return ExecuteQuery;
  }   // getConnection
}

export default DataBase;

