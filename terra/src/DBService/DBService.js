import * as SQLite from "expo-sqlite";

const Database = {
  getConnection: () => {
    const db = SQLite.openDatabase("DaTerra.db");

    db.transaction((tx) => {
      // tx.executeSql(
      //   "CREATE TABLE IF NOT EXISTS Usuarios" +
      //   "(id INTEGER PRIMARY KEY," +
      //   "nome TEXT NOT NULL," +
      //   "dtNascimento TEXT NOT NULL," +
      //   "cpf TEXT NOT NULL," +
      //   "telefone TEXT NOT NULL," +
      //   "rua TEXT NOT NULL," +
      //   "bairro TEXT NOT NULL," +
      //   "numCasa INT NOT NULL," +
      //   "cep INT NOT NULL," +
      //   "cidade TEXT NOT NULL," +
      //   "uf TEXT NOT NULL," +
      //   "complemento TEXT NULL," +
      //   "email TEXT NOT NULL," +
      //   "senha TEXT NOT NULL," +
      //   "tipoUsuario INT NOT NULL);"
      // );
      // tx.executeSql(
      //   "CREATE TABLE IF NOT EXISTS Produtos (id INTEGER PRIMARY KEY," +
      //   "nome TEXT NOT NULL," +
      //   "preco REAL NOT NULL," +
      //   "embalagem TEXT NOT NULL," +
      //   "estoque INTEGER NOT NULL," +
      //   "categoria TEXT NOT NULL," +
      //   "descricao TEXT NOT NULL)"
      // );
      tx.executeSql(
       "CREATE TABLE IF NOT EXISTS Carrinho (id INTEGER PRIMARY KEY," +
          "idCliente` INTEGER NOT NULL,"+
          "idProdutor` INTEGER NOT NULL,"+
          "idProduto`INTEGER NOT NULL"+
          "quantidadeProduto INTEGER NULL"+
          "precoTotal` REAL NOT NULL,"
         
      );
    //   tx.executeSql(
    //     "CREATE TABLE IF NOT EXISTS Pedido (idPedido INTEGER PRIMARY KEY,"+
    //       "idPedido INT NOT NULL,"+
    //       "status  VARCHAR(10) NOT NULL,"+
    //       "dataPedido DATE NOT NULL,"+
    //       "idCliente INT NULL,"+
    //       "idProdutor INT NULL,"+
    //       "INDEX `FK_Pedido_Produtor_idx` (`idProdutor` ASC) VISIBLE,,"+
    //       "CONSTRAINT `FK_Pedido_Produtor`,"+
    //       "FOREIGN KEY (`idProdutor`),"+
    //       "REFERENCES `Usuario` (`idUsuario`),"+
    //       "ON DELETE NO ACTION,"+
    //       " ON UPDATE NO ACTION,"+
    //       "CONSTRAINT `FK_Pedido_Cliente`,"+
    //       " FOREIGN KEY (idCliente),"+
    //       " REFERENCES Usuario (idUsuario),"+
    //       " ON DELETE NO ACTION,"+
    //       " ON UPDATE NO ACTION)"
    //   );
    //   tx.executeSql(
    //     "CREATE TABLE IF NOT EXISTS Item (idItem INTEGER PRIMARY KEY,"+
    //       "idItem INT NOT NULL,"+
    //       "idProduto INT NOT NULL,"+
    //       "idPedido INT NOT NULL,"+
    //       "idCarrinho INT NOT NULL,"+
    //       "precoUnitario DOUBLE NOT NULL,"+
    //       "qtdUnitario DOUBLE NOT NULL,"+
    //       "INDEX `FK_Item_Produto_idx` (`idProduto` ASC) VISIBLE,"+
    //       "INDEX `FK_Item_Pedido_idx` (`idPedido` ASC) VISIBLE,"+
    //       "INDEX `FK_Item_Carrinho_idx` (`idCarrinho` ASC) VISIBLE,"+
    //       "CONSTRAINT `FK_Item_Produto`,"+
    //       " FOREIGN KEY (`idProduto`),"+
    //       " REFERENCES `produto` (`idProduto`),"+
    //       " ON DELETE NO ACTION,"+
    //       " ON UPDATE NO ACTION,"+
    //       "CONSTRAINT `FK_Item_Pedido`,"+
    //       " FOREIGN KEY (idPedido),"+
    //       " REFERENCES pedido (idPedido),"+
    //       " ON DELETE NO ACTION,"+
    //       " ON UPDATE NO ACTION,"+
    //       "CONSTRAINT `FK_Item_Carrinho`,"+
    //       " FOREIGN KEY (idCarrinho),"+
    //       " REFERENCES carrinho (idCarrinho),"+
    //       " ON DELETE NO ACTION,"+
    //       " ON UPDATE NO ACTION)"
    //   );
     });

    const ExecuteQuery = (sql, params = []) =>
      new Promise((resolve, reject) => {
        db.transaction((tx) => {
          tx.executeSql(
            sql,
            params,        
            (__, results) => {
              resolve(results);
              console.log('RESOLVE: ' + sql, params)  
            },
            (error) => {
              reject(error);
              console.log('REJECT: ' + sql, params)
            }
          ); // tx.executeSql        
        }); //db.transactiom
      }); // Promise
    return ExecuteQuery;
  } // getConnection
};

export default Database;
