import { Button, Flex, Text, Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";


function App() {
  return <Theme accentColor="indigo" grayColor="gray">
    <Flex direction="column" gap="2">
      <Text>Hello from Radix Themes :)</Text>
			<Button>Let's go</Button>
    </Flex>
  </Theme>;
}

export default App
