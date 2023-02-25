import Auth from "./components/auth";
import Questionnaire from "./components2/questionnaire";
import { useUserContext } from "./context/userContext";
import Dashboard from "./dashboard"



function App() {
  const { user, loading, error } = useUserContext();
  return (
    <div className="App">
      {error && <p className="error">{error}</p>}
      {loading ? <h2>Loading...</h2> : <> {user ? <Questionnaire /> : <Auth />} </>}
    </div>
    
  );
}


export default App;
