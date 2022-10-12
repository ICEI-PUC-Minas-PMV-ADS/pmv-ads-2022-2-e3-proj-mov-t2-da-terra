import Database from './DBServices';

const DB_EXEC = Database.getConnection();

//Será um metodo para  chamar quando renderizar a tela de loja do produtor,e mostrar todos os produtos daquele usuário de acordo com a sua ID.
export const getProdutosUsuario= async (idUsuario)=>{
let result = await DB_EXEC("SELECT *FROM Produtos WHERE id=?;",[idUsuario])



}