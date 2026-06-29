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

      <div className="relative z-10 pb-[calc(env(safe-area-inset-bottom)+112px)] sm:pb-0">
        <Navbar />
        <Hero />
        <Services />
        <RequestForm />

        {/* Зона взаимодействия с фоном */}
<div className="relative w-full h-screen pointer-events-auto -mb-[calc(env(safe-area-inset-bottom)+112px)] sm:-mb-0 overflow-hidden">
  {/* Светящаяся рамка */}
  <div
    className="
      absolute inset-0
      rounded-t-[40px] sm:rounded-t-[60px]
      border border-cyan-400/20
      bg-gradient-to-b
      from-transparent
      via-transparent
      to-black/10
    "
    style={{
      boxShadow: `
        0 0 20px rgba(34,211,238,0.08),
        0 0 60px rgba(34,211,238,0.05),
        inset 0 0 30px rgba(255,255,255,0.03)
      `
    }}
  />

  {/* Заголовок сверху */}
  <div
    className="
      absolute
      top-10
      left-1/2
      -translate-x-1/2
      text-center
      text-white/70
      text-sm
      sm:text-base
      max-w-[700px]
      px-6
      z-20
      tracking-wide
    "
  >
    Расслабьтесь в 2-мерной проекции 5-мерного пространства
  </div>
</div>
      </div>
    </div>
 );
}

export default App;
