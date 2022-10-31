import { NavigationContainer } from "@react-navigation/native";

import Main from "./src/Navegacoes/Main";

import { AuthProvider } from "./src/contexts/AuthProvider";
import ProdutoProvider from "./src/contexts/webapi.ProdutoProvider";
import UsuarioProvider from "./src/contexts/webapi.CadastroUsuario";



export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <UsuarioProvider>
          <ProdutoProvider>
            <Main />
          </ProdutoProvider>
        </UsuarioProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
