import temasData from "../../data/temas.json";

export interface Tema {
  id: string;
  nome: string;
  dataInicio: string;
  dataFim: string;
  ativo: boolean;
  componente: string;
}

/**
 * Busca o tema ativo no momento atual
 * @returns Tema ativo ou null se nenhum tema estiver ativo
 */
export const buscarTemaAtivo = (): Tema | null => {
  const hoje = new Date();
  const temas = temasData.temas as Tema[];

  // Buscar tema que está dentro do período de ativação
  const temaAtivo = temas.find((tema) => {
    if (!tema.ativo) return false;

    const dataInicio = new Date(tema.dataInicio);
    const dataFim = new Date(tema.dataFim);

    return hoje >= dataInicio && hoje <= dataFim;
  });

  return temaAtivo || null;
};

/**
 * Verifica se um tema específico está ativo
 * @param temaId - ID do tema a verificar
 * @returns true se o tema está ativo, false caso contrário
 */
export const verificarTemaAtivo = (temaId: string): boolean => {
  const tema = buscarTemaAtivo();
  return tema?.id === temaId;
};

/**
 * Verifica se o efeito de natal deve ser exibido
 * Mantido para compatibilidade com código existente
 * @param dataLimiteCustomizada - Data limite customizada (opcional, para testes)
 * @returns true se o efeito deve ser exibido, false caso contrário
 */
export const deveExibirEfeitoNatal = (
  dataLimiteCustomizada?: Date
): boolean => {
  // Se foi passada uma data customizada, usar ela
  if (dataLimiteCustomizada) {
    const hoje = new Date();
    return hoje <= dataLimiteCustomizada;
  }

  // Caso contrário, verificar se o tema natal está ativo
  return verificarTemaAtivo("natal");
};
