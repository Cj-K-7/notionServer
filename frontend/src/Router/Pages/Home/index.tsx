import { useHomeIdle } from "./home";
import Layout from "../../../Layout/Layout";
import Menubar from "../../../Components/Menu/Menubar";

/**
 * minimum 'seconds' for set App to 'idle' state
 */
const idleTime: number = 60;

const Home = () => {
  //Hooks
  useHomeIdle(idleTime);

  return <Layout header={<Menubar />} />;
};

export default Home;
