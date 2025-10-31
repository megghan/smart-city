export function FuncionalidadesSection() {
    return (
        <section 
            id="funcionalidades" 
            className="py-16 bg-white"
        >
            <div className="container mx-auto px-8 sm:px-12 md:px-16">
                <h2 className="text-4xl font-bold mb-8 text-indigo-600">
                    O que você pode fazer no Conecta+
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1: Localizar Estabelecimentos */}
                    <div className="p-6 border rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-3">Busca por Acessibilidade</h3>
                        <p>Encontre restaurantes, lojas e serviços que atendem às suas necessidades específicas de acesso (rampas, banheiros adaptados, etc.).</p>
                    </div>

                    {/* Card 2: Detalhes em Tempo Real */}
                    <div className="p-6 border rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-3">Informações Detalhadas</h3>
                        <p>Veja avaliações focadas em acessibilidade e detalhes sobre a estrutura do local antes mesmo de sair de casa.</p>
                    </div>

                    {/* Card 3: Colaboração */}
                    <div className="p-6 border rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-3">Avalie e Contribua</h3>
                        <p>Ajude a comunidade avaliando e adicionando informações sobre a acessibilidade de novos locais.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}