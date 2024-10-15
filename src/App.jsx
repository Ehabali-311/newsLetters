import "./App.css";
import { useTranslation } from "react-i18next";
import { useApiQuery } from "./Services/useApiQuery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewLetters from "./pages/newsLetters/NewLetters";

function App() {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const { data, isLoading } = useApiQuery("getNews", lang);

  if (isLoading) {
    toast.info("Loading news, please wait...", { autoClose: 2000 });
  }
  
  return (
    <>
      <ToastContainer />
      <div className="container container-main">
        <NewLetters data={data} />
         </div>
    </>
  );
}

export default App;
