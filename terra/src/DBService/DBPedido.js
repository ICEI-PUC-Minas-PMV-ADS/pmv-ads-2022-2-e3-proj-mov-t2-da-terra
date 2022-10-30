import Database from "./DBService";

const DB_EXEC = Database.getConnection();


// Get 
export const getPedido = async (id) => {
  let results = await DB_EXEC("SELECT * FROM Pedido WHERE idPedido LIKE ?;",     [id]);
  //console.log(id)

  return results.rows._array;
};

// Insert
export const insertPedido = async (pedido) => {
  let results = await DB_EXEC(
    "INSERT INTO Pedido" +
    "(idProdutor, idCliente, status, dataPedido) VALUES(?,?,?,?);",
    [
      pedido.idProdutor,
      pedido.idCliente,
      pedido.status,
      pedido.dataPedido
    ]
  );
  // console.log(results); 
  return results.rowsAffected;
};

// Update
export const updatePedido = async (pedido) => {
  let results = await DB_EXEC(
    'UPDATE Pedido SET ' +
    'status=?, '+
    'WHERE id=?;',
    [
      pedido.status
    ]
  );
  return results.rowsAffected;
}

// Delete
export const deletePedido = async (id) => {
  let results = await DB_EXEC('DELETE FROM Pedido WHERE id=?;', [id]);

  return results.rowsAffected;
}

