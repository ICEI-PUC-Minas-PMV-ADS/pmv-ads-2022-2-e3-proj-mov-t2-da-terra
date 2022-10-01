import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/contexts/autenticacao";

import ProdutoProvider from "./src/contexts/ProdutoProvider";
import Main from "./src/Navegacoes/Main";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <ProdutoProvider>
          <Main />
        </ProdutoProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
