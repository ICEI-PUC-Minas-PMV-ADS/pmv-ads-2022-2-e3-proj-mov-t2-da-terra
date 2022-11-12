import Database from "./DBService";

const DB_EXEC = Database.getConnection();



export const insertCarrinho = async (carrinho) => {
  let results = await DB_EXEC(
    "INSERT INTO Carrinho" +
    "(idCliente,idProdutor,idProduto,quantidadeProduto,precoTotal) VALUES(?,?,?,?,?);",
    [
    carrinho.idCliente,
    carrinho.idProdutor,
    carrinho.idProduto,
    carrinho.quantidadeProduto,
    carrinho.precoTotal

    ]
  );
  // console.log(results); //TESTE OK
  console.log(results)
  return results.rowsAffected;
};

// Get 
export const getCarrinho = async (id) => {
  let results = await DB_EXEC("SELECT * FROM Carrinho WHERE idCliente = ?;",     [id]);
  //console.log(id)

  return results.rows._array;
};

// Delete
export const deleteCarrinho = async (id) => {
  let results = await DB_EXEC('DELETE FROM Carrinho WHERE id=?;', [id]);

  return results.rowsAffected;
}

