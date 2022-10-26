// import * as SQLite from "expo-sqlite";

// const Database = {
//   getConnection: () => {
//     const db = SQLite.openDatabase("DaTerra.db");

//     db.transaction((tx) => {
//       tx.executeSql(
//         "CREATE TABLE IF NOT EXISTS Usuarios" +
//         "(id INTEGER PRIMARY KEY," +
//         "nome TEXT NOT NULL," +
//         "dtNascimento TEXT NOT NULL," +
//         "cpf TEXT NOT NULL," +
//         "telefone TEXT NOT NULL," +
//         "rua TEXT NOT NULL," +
//         "bairro TEXT NOT NULL," +
//         "numCasa INT NOT NULL," +
//         "cep INT NOT NULL," +
//         "cidade TEXT NOT NULL," +
//         "uf TEXT NOT NULL," +
//         "complemento TEXT NULL," +
//         "email TEXT NOT NULL," +
//         "senha TEXT NOT NULL," +
//         "tipoUsuario INT NOT NULL);"
//       );
//       tx.executeSql(
//         "CREATE TABLE IF NOT EXISTS Produtos (id INTEGER PRIMARY KEY," +
//         "nome TEXT NOT NULL," +
//         "preco REAL NOT NULL," +
//         "embalagem TEXT NOT NULL," +
//         "estoque INTEGER NOT NULL," +
//         "categoria TEXT NOT NULL," +
//         "descricao TEXT NOT NULL);"
//       );
//     });

//     const ExecuteQuery = (sql, params = []) =>
//       new Promise((resolve, reject) => {
//         db.transaction((tx) => {
//           tx.executeSql(
//             sql,
//             params,        
//             (__, results) => {
//               resolve(results);
//               console.log('RESOLVE: ' + sql, params)  
//             },
//             (error) => {
//               reject(error);
//               console.log('REJECT: ' + sql, params)
//             }
//           ); // tx.executeSql        
//         }); //db.transactiom
//       }); // Promise
//     return ExecuteQuery;
//   } // getConnection
// };

// export default Database;
