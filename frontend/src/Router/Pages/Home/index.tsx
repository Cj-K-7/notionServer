import { useHomeIdle } from "./home";
import Layout from "../../../Layout/Layout";
import Menubar from "../../../Components/Menu/Menubar";
import Fieldset from "../../../Components/Base/FieldSet";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

/**
 * minimum 'seconds' for set App to 'idle' state
 */
const idleTime: number = 80;

const Home = () => {
  //Hooks
  useHomeIdle(idleTime);

  return <Layout header={<Menubar />} />;
};

export default Home;
