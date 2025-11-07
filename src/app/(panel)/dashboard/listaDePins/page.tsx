'use client'; 

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { EditPinDialog } from '../_components/editPinDialog';
import { PinAcessibilidade } from '@prisma/client';

type UserPin = PinAcessibilidade; 
export default function ListaPinsDeUsuario() {
  const [pins, setPins] = useState<UserPin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  //MODAIS STATE
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingPinId, setEditingPinId] = useState<string | null>(null);

  // FUNÇÃO DE BUSCA
  const fetchUserPins = async () => {
    try {
      const response = await fetch('/api/pins/user'); 
      
      if (response.status === 401) {
           setError('Sessão expirada. Faça o login novamente.');
           return;
      }

      if (!response.ok) {
        throw new Error('Falha ao buscar pins.');
      }

      const data = await response.json();
      setPins(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPins();
  }, []); 

  // FUNÇÃO DE EXCLUSÃO
  const handleDeletePin = async (pinId: string, nomeLocal: string) => {
    
    if (!confirm(`Tem certeza que deseja excluir o Pin "${nomeLocal}"?`)) {
        return;
    }

    try {
        const response = await fetch(`/api/pins/${pinId}`, {
            method: 'DELETE', // ChamaAPI Route DELETE
        });

        if (response.ok) {
            alert(`Pin "${nomeLocal}" excluído com sucesso!`);
            
            //Atualizar a lista de Pins na tela (melhorando a UX)
            //Filtra o Pin excluído sem precisar recarregar a página inteira
            setPins(currentPins => currentPins.filter(pin => pin.id !== pinId));
             

        } else {
            const errorData = await response.json();
            alert(`Erro ao excluir Pin: ${errorData.message}`);
        }
    } catch (error) {
        console.error('Erro de rede/servidor:', error);
        alert('Erro ao se comunicar com o servidor. Tente novamente.');
    }
  };

  const handleEditClick = (pinId: string) => {
    setEditingPinId(pinId); // Diz ao modal qual Pin editar
    setIsEditDialogOpen(true); // Abre o modal
  };
  
  const handlePinUpdated = () => {
      fetchUserPins(); // Recarrega a lista após o modal fechar (sucesso)
  }

  if (loading) {
    return <div className="p-8">Carregando seus locais...</div>;
  }
  // código de erro...
  if (error) {
    return <div className="p-8 text-red-600">Erro: {error}</div>;
  }


  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">📍 Meus Locais de Acessibilidade ({pins.length})</h1>
      
      {pins.length === 0 ? (
        // ... (Mensagem se não houver pins) ...
        <p className="text-gray-500">Você ainda não criou nenhum Pin. Vá ao mapa para começar!</p>
      ) : (
        <ul className="space-y-4">
          {pins.map((pin) => (
            <li key={pin.id} className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{pin.nome_local}</p>
                <p className="text-sm text-gray-600">{pin.endereco}</p>
                <p className="text-xs text-gray-400">Criado em: {new Date(pin.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="flex space-x-2">
                <button 
            onClick={() => handleEditClick(pin.id)} 
            className="text-sm text-blue-500 hover:underline"
        >
            Editar
        </button>
                {/* Botão de Excluir AGORA CONECTADO */}
                <button 
                  onClick={() => handleDeletePin(pin.id, pin.nome_local)} // Liga a função
                  className="text-sm text-red-500 hover:underline hover:font-semibold"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <EditPinDialog 
        pinId={editingPinId}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen} // Usa o setter do estado para abrir/fechar
        onPinUpdated={handlePinUpdated} // Chama a função para recarregar a lista
      />
    </div>
  );
}