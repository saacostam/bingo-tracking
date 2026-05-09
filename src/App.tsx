import {  Box, Tabs, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Cards, Game } from "./screens";

const client = new QueryClient();

function App() {
  return <QueryClientProvider client={client}>
    <Theme accentColor="indigo" grayColor="gray">
      <Tabs.Root defaultValue="game">
        <Tabs.List>
          <Tabs.Trigger value="game">Juego</Tabs.Trigger>
          <Tabs.Trigger value="cards">Cartones</Tabs.Trigger>
        </Tabs.List>

        <Box pt="3">
          <Tabs.Content value="game">
            <Game />
          </Tabs.Content>

          <Tabs.Content value="cards">
            <Cards />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Theme>
  </QueryClientProvider>;
}

export default App
