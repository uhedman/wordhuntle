import Game from "@/features/game/components/Game";
import Modal from "@/features/modal/components/Modal";
import { useTheme } from "@/features/theme/hooks/useTheme";
import NavBar from "@/shared/components/NavBar";
import { useInitializeApp } from "@/shared/hooks/useInitializeApp";
import "@/App.css";

const App = () => {
  useTheme();
  useInitializeApp();

  return (
    <div id="App">
      <NavBar />
      <Game />
      <Modal />
    </div>
  );
};

export default App;
