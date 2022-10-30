import Database from "./DBService";

const DB_EXEC = Database.getConnection();

// Get 
export const getCarrinho = async (id) => {
  let results = await DB_EXEC("SELECT * FROM Carrinho WHERE idCarrinho = ?;",     [id]);
  //console.log(id)

  return results.rows._array;
};

// Delete
export const deleteCarrinho = async (id) => {
  let results = await DB_EXEC('DELETE FROM Carrinho WHERE id=?;', [id]);

  return results.rowsAffected;
}

