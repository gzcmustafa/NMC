import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import HomePage from "./pages/HomePage";
import CustomerJourney from "./pages/CustomerJourney";
import Overview from "./components/overview/Overview";

function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard/*" element={<Dashboard />}>
              <Route index element={<Overview/>}/>
              <Route path="customer-journey" element={<CustomerJourney />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
