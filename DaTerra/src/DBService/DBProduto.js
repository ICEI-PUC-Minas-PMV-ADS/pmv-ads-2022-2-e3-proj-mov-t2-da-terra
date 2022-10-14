import Database from "./DBService";
const DB_EXEC = Database.getConnection();

export const insertProduto = async (produto) => {
  let results = await DB_EXEC(
    "INSERT INTO Produtos" +
      "(nome, preco, embalagem, estoque," +
      "categoria, descricao) VALUES(?,?,?,?,?,?);",
    [
      produto.nome,
      produto.preco,
      produto.embalagem,
      produto.estoque,
      produto.categoria,
      produto.descricao,
    ]
  );
  console.log(results); //TESTE OK
  return results.rowsAffected;
};

//Será um metodo para  chamar quando renderizar a tela de loja do produtor,e mostrar todos os produtos daquele usuário de acordo com a sua ID.
export const getProdutos = async () => {
  let results = await DB_EXEC("SELECT *FROM Produtos");
  return results.rows._array;

  //WHERE id=?;", [idUsuario]
};
