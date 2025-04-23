import NavBar from "@/shared/components/NavBar";
import Game from "@/features/game/components/Game";
import Modal from "@/features/modal/components/Modal";
import "@/App.css";
import { useTheme } from "@/features/theme/hooks/useTheme";
import { useLoadGame } from "@/features/game/hooks/useLoadGame";
import { useLoadUser } from "@/features/auth/hooks/useLoadUser";

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
