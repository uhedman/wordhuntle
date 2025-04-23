import { useLoadUser } from "@/features/auth/hooks/useLoadUser";
import Game from "@/features/game/components/Game";
import { useLoadGame } from "@/features/game/hooks/useLoadGame";
import Modal from "@/features/modal/components/Modal";
import { useTheme } from "@/features/theme/hooks/useTheme";
import NavBar from "@/shared/components/NavBar";
import "@/App.css";

const App = () => {
  useTheme();
  useLoadGame();
  useLoadUser();

  return (
    <div id="App">
      <NavBar />
      <Game />
      <Modal />
    </div>
  );
};

export default App;
