import Database from "./DBService";

const DB_EXEC = Database.getConnection();

// Get 
export const getItem = async (id) => {
  let results = await DB_EXEC("SELECT * FROM Item WHERE idItem =  ?;",     [id]);

  return results.rows._array;
};

// Insert
export const insertItem = async (item) => {
  let results = await DB_EXEC(
    "INSERT INTO Item" +
    "(idProduto, idPedido, idCarrinho, precoUnitario," +
    "qtdUnitario) VALUES(?,?,?,?,?);",
    [
        item.idProduto,
        item.idPedido,
        item.idCarrinho,
        item.precoUnitario,
        item.qtdUnitario
    ]
  );
  // console.log(results); 
  return results.rowsAffected;
};

// Update
export const updateItem = async (item) => {
  let results = await DB_EXEC(
    'UPDATE Item SET ' +
    'idProduto=?, idPedido=?, idCarrinho=?, ' +
    'precoUnitario=?, qtdUnitario=? ' +
    'WHERE id=?;',
    [
        item.idProduto,
        item.idPedido,
        item.idCarrinho,
        item.precoUnitario,
        item.qtdUnitario
    ]
  );
  return results.rowsAffected;
}

// Delete
export const deleteItem = async (id) => {
  let results = await DB_EXEC('DELETE FROM Item WHERE id=?;', [id]);

  return results.rowsAffected;
}

