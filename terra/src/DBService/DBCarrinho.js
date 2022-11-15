import Database from "./DBService";

const DB_EXEC = Database.getConnection();

export const insertCarrinho = async (carrinho) => {
  let results = await DB_EXEC(
    "INSERT INTO Carrinho" +
    "(idCliente, idProdutor, idProduto, quantidadeProduto, precoTotal) VALUES(?,?,?,?,?);",
    [
      carrinho.idCliente,
      carrinho.idProdutor,
      carrinho.idProduto,
      carrinho.quantidadeProduto,
      carrinho.precoTotal
    ]
  ); 
  console.log(results)
  return results.rowsAffected;
};

// Get 
export const getCarrinho = async (id) => {
  let results = await DB_EXEC("SELECT * FROM Carrinho WHERE idCliente=?;", [id]);

  return results.rows._array;
};

// Deleta o item do carrinho de acordo com id do produto
export const deleteCarrinho = async (id) => {
  let results = await DB_EXEC('DELETE FROM Carrinho WHERE idProduto=?;', [id]);

  return results.rowsAffected;
}

