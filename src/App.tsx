import { useInitClient } from "./hooks/useInitClient.ts"
import { useLoadAssets } from "./hooks/useLoadAssets.ts"
import { GameOver } from "./screens/GameOver.tsx"
import { Lobby } from "./screens/Lobby.tsx"
import { Play } from "./screens/Play.tsx"
import { useGameStore } from "./store/useGameStore.ts"
import { GameScreen } from "./types.ts"

function App() {
  const currentScreen = useGameStore((state) => state.game.currentScreen)
  const assetsLoaded = useLoadAssets()
  useInitClient(assetsLoaded)

  if (!assetsLoaded) {
    return null
  }

  const Screen = SCREEN[currentScreen]

  return <Screen />
}

const SCREEN: Record<GameScreen, () => React.JSX.Element> = {
  lobby: Lobby,
  play: Play,
  gameOver: GameOver,
}

export default App
