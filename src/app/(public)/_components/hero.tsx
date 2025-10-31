import { Button } from "@/components/ui/button";
import Image from "next/image";
import conectamais from '../../../../public/conectapluss.png';
import Link from 'next/link';

export function Hero() {
    return(
        
        <section className="relative w-full h-screen">
            
            
            <Image 
                className="hidden lg:block absolute inset-0 w-full h-full object-cover" 
                src={conectamais} 
                alt="foto ilustrativa pessoas no parque" 
            />
            
            
            <div className="hidden lg:block absolute inset-0 bg-black opacity-60"></div>
            
            
            <div className="lg:hidden absolute inset-0 bg-gray-900"></div>

            
            
            <main className="
                container mx-auto 
                px-8 sm:px-12 md:px-16         /* Padding horizontal para respirar */
                pt-20 pb-16                    /* Padding vertical para não colar */
                flex flex-col items-start justify-center 
                absolute inset-0 z-10 
            ">
                <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                    Conheça a sua cidade!
                </h1>
                
                <article className="text-base md:text-lg text-white font-semibold max-w-2xl">
                    <p className="pb-4">A sua plataforma de Cidade Inteligente e Acessível. Nosso objetivo é empoderar você a explorar a cidade com total autonomia.</p>
                    <p>Oferecemos informações detalhadas sobre estabelecimentos, garantindo que você saiba onde ir e o que esperar, seja você um cadeirante, um idoso, um pai com carrinho de bebê, ou qualquer pessoa que valoriza a acessibilidade.</p>
                </article>
                
                
                <Link href="#funcionalidades" passHref legacyBehavior>
                    <Button className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white">
                        Começar a Explorar
                    </Button>
                </Link>
            </main>
            
            
        </section>
    )
}