import { useHomeIdle } from "./home";
import Layout from "../../../Layout/Layout";
import Menubar from "../../../Components/Menubar/Menubar";
import Main from "../../../Components/Main/Main";

/**idle-timeout to navigate Canvas */
const idleTimeout = 0;
/**home page configs*/
const homeConfig = {
  header: <Menubar />,
  main: <Main />,
  footer: null,
};

const Home = () => {
  //Hooks
  useHomeIdle(idleTimeout);
  return <Layout {...homeConfig} />;
};

export default Home;
