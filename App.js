import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./navigation/DrawerNavigator";
import { FavoritesProvider } from "./context/FavoritesContext";
 

export default function App() {
  return (
    <FavoritesProvider>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </FavoritesProvider>
  );
}
