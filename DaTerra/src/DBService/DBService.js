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
        'nome TEXT, dtNascimento TEXT, cpf TEXT, telefone TEXT)' +
        'rua TEXT, bairro TEXT, numCasa INT, cep INT, cidade TEXT' +
        'uf TEXT, complemento TEXT, email TEXT, senha TEXT, confSenha TEXT'+
        'tipoUsuario INT;');
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

