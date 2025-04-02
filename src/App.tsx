import atmHeader from "./assets/atm_sign.png";
import graffiti from "./assets/graffiti.png";
import Footer from "./components/Footer";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Customer from "./components/Customer";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="container">
      <div className="atm-title">
        <img className="atm-header" src={atmHeader} alt="" />
        <img className="graffiti" src={graffiti} alt="" />
      </div>
      <QueryClientProvider client={queryClient}>
        <Customer />
      </QueryClientProvider>
      <Footer />
    </div>
  );
}

export default App;
