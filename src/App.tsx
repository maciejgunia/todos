import Navbar from "./components/Navbar";
import Todos from "./components/Todos";
import AppProvider from "./providers/AppProvider";

const App = () => (
    <AppProvider>
        <Navbar></Navbar>
        <Todos />
    </AppProvider>
);

export default App;
