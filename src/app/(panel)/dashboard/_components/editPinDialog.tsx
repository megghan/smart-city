'use client'
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Pin {
  id: string;
  nome_local: string;
  descricao: string;
  endereco: string | null;
  tipoAcessibilidade: string;
  // otros campos
}

interface EditPinDialogProps {
  pinId: string | null; // ID do Pin que será editado (null se não estiver aberto)
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPinUpdated: () => void; // Função para atualizar a lista após o sucesso
}

export const EditPinDialog = ({ pinId, open, onOpenChange, onPinUpdated }: EditPinDialogProps) => {
  const [formData, setFormData] = useState<Partial<Pin>>({}); // Estado para o formulário
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Efeito para carregar os dados do Pin quando o modal abre
  useEffect(() => {
    if (pinId && open) {
      setLoading(true);
      setError(null);
      fetch(`/api/pins/${pinId}`) // Rota GET que criamos
        .then(res => res.json())
        .then(data => {
          if (data.message) throw new Error(data.message);
          setFormData(data); // Preenche o formulário com os dados atuais
        })
        .catch(err => {
          console.error(err);
          setError('Falha ao carregar os dados do Pin.');
        })
        .finally(() => setLoading(false));
    } else {
      setFormData({}); // Limpa o formulário quando fecha
    }
  }, [pinId, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pinId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/pins/${pinId}`, {
        method: 'PATCH', // Chama sua API Route PATCH
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData), // Envia os dados editados
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao salvar edição.');
      }

      alert('Pin atualizado com sucesso!');
      onOpenChange(false); // Fecha o modal
      onPinUpdated();      // Atualiza a lista de pins na tela mãe

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao tentar editar.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Pin</DialogTitle>
          <DialogDescription>
            Faça alterações no Pin de Acessibilidade. Clique em Salvar quando terminar.
          </DialogDescription>
        </DialogHeader>
        
        {loading && <p className="text-center py-4">Carregando dados...</p>}
        {error && <p className="text-red-500 text-center py-4">{error}</p>}
        
        {!loading && (
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            
            <div className="grid gap-2">
              <Label htmlFor="nome_local">Nome do Local</Label>
              <Input
                id="nome_local"
                name="nome_local"
                value={formData.nome_local || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="endereco">Endereço</Label>
              <Input
                id="endereco"
                name="endereco"
                value={formData.endereco || ''}
                onChange={handleChange}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="descricao">Descrição/Comentário</Label>
              {/* Você pode substituir este Input por um TextArea para descrições longas */}
              <Input
                id="descricao"
                name="descricao"
                value={formData.descricao || ''}
                onChange={handleChange}
              />
            </div>
            
            {/* Adicione outros campos editáveis aqui (como tipoAcessibilidade) */}
            
            <Button type="submit" disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};