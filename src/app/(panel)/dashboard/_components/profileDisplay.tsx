'use client'; 

import { useState, FormEvent } from 'react';
interface UserDataProps {
    name: string;
    email: string;
}
// Este componente recebe os dados do Server Component
export default function ProfileDisplay({ userData }: { userData: UserDataProps }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(userData.name); // Estado para o novo nome
    const [statusMessage, setStatusMessage] = useState(''); // Estado para mensagens de feedback
    
    // Simples função de envio (o fetch real virá depois)
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        
        // Verifica se o nome realmente mudou
        if (newName.trim() === userData.name) {
            setStatusMessage('O nome é o mesmo que o atual.');
            return;
        }

        setStatusMessage('Salvando...');

        try {
            const response = await fetch('/api/profile/update-name', { // CHAMA A ROTA QUE ACABAMOS DE CRIAR
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newName: newName.trim() }),
            });

            if (response.ok) {
                // Se o banco de dados salvou
                setStatusMessage('Nome atualizado com sucesso! Recarregando...');
                
                // Recarrega a página para que o getServerSession mostre o novo nome
                setTimeout(() => {
                    window.location.reload(); 
                }, 1000); 

            } else {
                // Se a API retornar erro (400, 401, 500, etc.)
                const errorData = await response.json(); // Tenta ler a mensagem de erro
                setStatusMessage(`Erro: ${errorData.message || 'Falha ao salvar o nome.'}`);
            }

        } catch (error) {
            console.error("Erro de rede:", error);
            setStatusMessage('Erro de conexão ao tentar salvar.');
        } finally {
             // Não fecha a edição automaticamente em caso de erro para que o usuário tente novamente
             // setIsEditing(false); // Remova esta linha
        }
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Meu Perfil</h1>
            
            {/* Exibição dos Dados e Botão "Alterar Dados" */}
            {!isEditing && (
                <div className="mb-6">
                    <p className="text-gray-700">
                        **Nome:** {userData.name}
                    </p>
                    <p className="text-gray-700">
                        **Email:** {userData.email}
                    </p>
                    
                    <button
                        onClick={() => {
                            setIsEditing(true);
                            setStatusMessage(''); // Limpa mensagens anteriores
                            setNewName(userData.name); // Define o input com o nome atual
                        }}
                        className="mt-4 px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 transition duration-150"
                    >
                        Alterar Dados
                    </button>
                </div>
            )}

            {/* MODO DE EDIÇÃO*/}
            {isEditing && (
                <form onSubmit={handleSubmit} className="border p-4 rounded-lg bg-gray-50 max-w-sm">
                    <h2 className="text-2xl font-semibold mb-4">
                        Editar Nome
                    </h2>
                    
                    <label htmlFor="newNameInput" className="block text-sm font-medium text-gray-700 mb-2">
                        Novo Nome
                    </label>
                    <input
                        id="newNameInput"
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:ring-blue-500 focus:border-blue-500"
                        required
                        minLength={2}
                    />
                    
                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 flex-grow text-white font-semibold rounded hover:bg-blue-600 transition duration-150"
                        >
                            Salvar Alterações
                        </button>
                        <button
                            type="button" // Use type="button" para evitar submissão
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-150"
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            )}
            
            
            {statusMessage && (
                <p className="mt-4 text-sm font-medium text-blue-600">
                    {statusMessage}
                </p>
            )}
        </div>
    );
}