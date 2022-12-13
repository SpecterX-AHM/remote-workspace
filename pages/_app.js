import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from "../Components/layout";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) =>{
  return(
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;