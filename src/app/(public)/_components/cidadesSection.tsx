export function CidadesSection() {
    return (
        <section 
            id="cidades" 
            className="py-12 bg-gray-50" // Remova o pt-24 se for a primeira seção após o header
        >
            <div className="container mx-auto px-8 sm:px-12 md:px-16"> 
                <h2 className="text-4xl font-bold mb-6">Cidades Implementadas</h2>
                <p className="text-lg">
                    Atualmente, a única cidade implementada e monitorada é <span className="font-bold">Sorocaba</span>.
                    Novas cidades serão adicionadas em breve!
                </p>
            </div>
        </section>
    );
}