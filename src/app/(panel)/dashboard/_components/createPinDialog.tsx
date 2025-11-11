
'use client';

import { useState, FormEvent } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface CreatePinDialogProps {
  // Coordenadas passadas pelo mapa
  coords: { lat: number; lng: number } | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPinCreated: () => void; // Função para recarregar ou atualizar o mapa/lista
}

export const CreatePinDialog = ({ coords, open, onOpenChange, onPinCreated }: CreatePinDialogProps) => {
  const [formData, setFormData] = useState({
    nome_local: '',
    descricao: '',
    endereco: '',
    tipoAcessibilidade: 'Geral', // Valor padrão, pode ser um Select/Dropdown
    cidade: 'Sorocaba'
  });
  const [loading, setLoading] = useState(false);

  // Zera o estado quando o modal abre para garantir um formulário limpo
  // Note: Você pode usar useEffect para carregar o nome da cidade via API aqui
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!coords) return;

    setLoading(true);

    try {
      const payload = {
        ...formData,
        latitude: coords.lat,
        longitude: coords.lng,
      };

      const response = await fetch('/api/pins', {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload), 
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao criar Pin.');
      }

      // Sucesso!
      alert('Pin criado com sucesso!'); // Você pode remover este alert depois
      onPinCreated();
      onOpenChange(false); // Fecha o modal
      setFormData({ // Reseta o formulário
          nome_local: '',
          descricao: '',
          endereco:'',
          tipoAcessibilidade: 'Geral',
          cidade: 'Sorocaba'
      });
      
    } catch (error) {
      alert(`Erro: ${error instanceof Error ? error.message : 'Desconhecido'}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] z-[1000]">
        <DialogHeader>
          <DialogTitle>Novo Ponto de Acessibilidade</DialogTitle>
          <DialogDescription>
            Crie um novo Pin em: Lat: {coords?.lat.toFixed(4)}, Lng: {coords?.lng.toFixed(4)}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          
          
          <div className="grid gap-2">
            <Label htmlFor="nome_local">Nome do Local/Estabelecimento</Label>
            <Input
              id="nome_local"
              name="nome_local"
              value={formData.nome_local}
              onChange={handleChange}
              placeholder="Ex: Biblioteca Municipal"
              required // Tornar obrigatório
            />
          </div>

          {/*ENDEREÇO */}
          <div className="grid gap-2">
            <Label htmlFor="endereco">Endereço (Rua e Número)</Label>
            <Input
              id="endereco"
              name="endereco"
              value={formData.endereco} // Lendo o novo estado
              onChange={handleChange}
              placeholder="Ex: Rua da Acessibilidade, 123"
            />
          </div>
          
          {/* CAMPO DESCRIÇÃO*/}
          <div className="grid gap-2">
            <Label htmlFor="descricao">Descrição da Acessibilidade</Label>
            <Textarea 
              id="descricao"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              placeholder="Ex: Rampa com corrimão e vagas exclusivas."
              required
            />
          </div>
          
          {/* CAMPO TIPO (Exemplo Simples) */}
          <div className="grid gap-2">
            <Label htmlFor="tipoAcessibilidade">Tipo</Label>
            <select
              id="tipoAcessibilidade"
              name="tipoAcessibilidade"
              value={formData.tipoAcessibilidade}
              onChange={handleChange}
              className="p-2 border rounded-md"
            >
              <option value="Geral">Geral</option>
              <option value="Banheiro">Banheiro</option>
              <option value="Rampa">Rampa/Acesso</option>
              <option value="Rampa">Elevador</option>
              {/* Adicione outros tipos */}
            </select>
          </div>

          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? 'Criando Pin...' : 'Salvar Pin'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};