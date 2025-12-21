/**
 * Teste simples para verificar a lógica do efeito de natal
 * Este arquivo pode ser executado no console do navegador ou como script Node.js
 */

import { deveExibirEfeitoNatal } from './natalUtils';

// Função auxiliar para criar uma data específica (para testes)
const criarData = (ano: number, mes: number, dia: number, hora: number = 0, minuto: number = 0): Date => {
  return new Date(ano, mes - 1, dia, hora, minuto);
};

// Função de teste que simula diferentes datas
export const testarLogicaNatal = () => {
  console.log('🧪 Testando lógica do efeito de natal...\n');

  // Salvar a data atual
  const dataAtualOriginal = new Date();
  
  // Mock da função Date para testar diferentes cenários
  const testarComData = (dataTeste: Date, descricao: string) => {
    // Substituir temporariamente a função deveExibirEfeitoNatal
    const dataLimite = new Date('2025-12-27T23:59:59');
    const resultado = dataTeste <= dataLimite;
    
    const status = resultado ? '✅ ATIVO' : '❌ DESATIVADO';
    console.log(`${status} - ${descricao}`);
    console.log(`   Data teste: ${dataTeste.toLocaleString('pt-BR')}`);
    console.log(`   Data limite: ${dataLimite.toLocaleString('pt-BR')}`);
    console.log(`   Resultado: ${resultado ? 'Deve exibir' : 'Não deve exibir'}\n`);
    
    return resultado;
  };

  // Teste 1: Data antes do limite (deve exibir)
  console.log('📅 TESTE 1: Data antes do limite');
  testarComData(
    criarData(2025, 12, 25, 10, 0),
    '25 de dezembro de 2025 (2 dias antes do limite)'
  );

  // Teste 2: Data no limite (deve exibir)
  console.log('📅 TESTE 2: Data no limite');
  testarComData(
    criarData(2025, 12, 27, 23, 59),
    '27 de dezembro de 2025 às 23:59 (último minuto)'
  );

  // Teste 3: Data após o limite (não deve exibir)
  console.log('📅 TESTE 3: Data após o limite');
  testarComData(
    criarData(2025, 12, 28, 0, 0),
    '28 de dezembro de 2025 (1 dia após o limite)'
  );

  // Teste 4: Data muito no futuro (não deve exibir)
  console.log('📅 TESTE 4: Data muito no futuro');
  testarComData(
    criarData(2026, 1, 1, 0, 0),
    '1 de janeiro de 2026 (ano seguinte)'
  );

  // Teste 5: Data atual real
  console.log('📅 TESTE 5: Data atual do sistema');
  const resultadoAtual = deveExibirEfeitoNatal();
  const statusAtual = resultadoAtual ? '✅ ATIVO' : '❌ DESATIVADO';
  console.log(`${statusAtual} - Data atual: ${dataAtualOriginal.toLocaleString('pt-BR')}`);
  console.log(`   Resultado: ${resultadoAtual ? 'Deve exibir' : 'Não deve exibir'}\n`);

  console.log('✅ Testes concluídos!');
  
  return {
    dataAtual: dataAtualOriginal,
    resultadoAtual,
    dataLimite: new Date('2025-12-27T23:59:59')
  };
};

// Executar automaticamente se estiver no navegador
if (typeof window !== 'undefined') {
  // Expor a função globalmente para poder testar no console
  (window as any).testarLogicaNatal = testarLogicaNatal;
  console.log('💡 Para testar, execute: testarLogicaNatal()');
}

