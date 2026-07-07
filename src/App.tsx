import Background from "./components/Background";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import RequestForm from "./sections/RequestForm";
import Services from "./sections/Services";

function App() {
 return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Background />
      <div className="pointer-events-none fixed inset-0 z-[1] bg-gradient-to-br from-gray-900/40 via-transparent to-blue-900/25" />

      <div className="relative z-10 pb-[calc(env(safe-area-inset-bottom)+112px)] sm:pb-24 md:pb-28 lg:pb-32">
        <Navbar />
        <Hero />
        <Services />
        <RequestForm />
      </div>
    </div>
 );
}

export default App;