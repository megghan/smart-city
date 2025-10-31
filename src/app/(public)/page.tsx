import { Footer } from "./_components/footer";
import { Header } from "./_components/header";
import { Hero } from "./_components/hero";
import {CidadesSection} from "./_components/cidadesSection";
import { FuncionalidadesSection } from "./_components/funcionalidadeSection";

export default function Home(){
  return(
    <div>
      <Header />
      
      <Hero />

      <CidadesSection />

      <FuncionalidadesSection />

      <Footer />

    </div>
  )
}