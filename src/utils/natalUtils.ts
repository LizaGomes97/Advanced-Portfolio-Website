/**
 * Verifica se o efeito de natal deve ser exibido
 * O efeito será desativado automaticamente após 27 de dezembro de 2025
 * @param dataLimiteCustomizada - Data limite customizada (opcional, para testes)
 * @returns true se o efeito deve ser exibido, false caso contrário
 */
export const deveExibirEfeitoNatal = (dataLimiteCustomizada?: Date): boolean => {
  const hoje = new Date();
  const dataLimite = dataLimiteCustomizada || new Date('2025-12-27T23:59:59');
  
  // Se a data atual for antes ou igual à data limite, exibe o efeito
  return hoje <= dataLimite;
};

