import { NavigationContainer } from "@react-navigation/native";
import { AuthProvider } from "./src/contexts/autenticacao";
import Main from "./src/Navegacoes/Main";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </NavigationContainer>
  );
}
