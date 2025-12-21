/**
 * Script de teste simples para verificar a lógica do efeito de natal
 * Execute com: node teste-natal.js
 */

// Simular a função deveExibirEfeitoNatal
function deveExibirEfeitoNatal(dataTeste) {
  const dataLimite = new Date('2025-12-27T23:59:59');
  return dataTeste <= dataLimite;
}

// Função auxiliar para criar uma data específica
function criarData(ano, mes, dia, hora = 0, minuto = 0) {
  return new Date(ano, mes - 1, dia, hora, minuto);
}

// Função de teste
function testarLogicaNatal() {
  console.log('🧪 Testando lógica do efeito de natal...\n');

  // Teste 1: Data antes do limite (deve exibir)
  console.log('📅 TESTE 1: Data antes do limite');
  const teste1 = criarData(2025, 12, 25, 10, 0);
  const resultado1 = deveExibirEfeitoNatal(teste1);
  console.log(`   Data teste: ${teste1.toLocaleString('pt-BR')}`);
  console.log(`   Data limite: 27/12/2025 23:59:59`);
  console.log(`   Resultado: ${resultado1 ? '✅ ATIVO - Deve exibir' : '❌ DESATIVADO - Não deve exibir'}\n`);

  // Teste 2: Data no limite (deve exibir)
  console.log('📅 TESTE 2: Data no limite');
  const teste2 = criarData(2025, 12, 27, 23, 59);
  const resultado2 = deveExibirEfeitoNatal(teste2);
  console.log(`   Data teste: ${teste2.toLocaleString('pt-BR')}`);
  console.log(`   Data limite: 27/12/2025 23:59:59`);
  console.log(`   Resultado: ${resultado2 ? '✅ ATIVO - Deve exibir' : '❌ DESATIVADO - Não deve exibir'}\n`);

  // Teste 3: Data após o limite (não deve exibir)
  console.log('📅 TESTE 3: Data após o limite');
  const teste3 = criarData(2025, 12, 28, 0, 0);
  const resultado3 = deveExibirEfeitoNatal(teste3);
  console.log(`   Data teste: ${teste3.toLocaleString('pt-BR')}`);
  console.log(`   Data limite: 27/12/2025 23:59:59`);
  console.log(`   Resultado: ${resultado3 ? '✅ ATIVO - Deve exibir' : '❌ DESATIVADO - Não deve exibir'}\n`);

  // Teste 4: Data muito no futuro (não deve exibir)
  console.log('📅 TESTE 4: Data muito no futuro');
  const teste4 = criarData(2026, 1, 1, 0, 0);
  const resultado4 = deveExibirEfeitoNatal(teste4);
  console.log(`   Data teste: ${teste4.toLocaleString('pt-BR')}`);
  console.log(`   Data limite: 27/12/2025 23:59:59`);
  console.log(`   Resultado: ${resultado4 ? '✅ ATIVO - Deve exibir' : '❌ DESATIVADO - Não deve exibir'}\n`);

  // Teste 5: Data atual do sistema
  console.log('📅 TESTE 5: Data atual do sistema');
  const dataAtual = new Date();
  const resultadoAtual = deveExibirEfeitoNatal(dataAtual);
  const dataLimite = new Date('2025-12-27T23:59:59');
  const diasRestantes = Math.ceil((dataLimite.getTime() - dataAtual.getTime()) / (1000 * 60 * 60 * 24));
  
  console.log(`   Data atual: ${dataAtual.toLocaleString('pt-BR')}`);
  console.log(`   Data limite: ${dataLimite.toLocaleString('pt-BR')}`);
  console.log(`   Resultado: ${resultadoAtual ? '✅ ATIVO - Deve exibir' : '❌ DESATIVADO - Não deve exibir'}`);
  if (resultadoAtual) {
    console.log(`   Dias restantes: ${diasRestantes > 0 ? `${diasRestantes} dias` : 'Último dia!'}`);
  }
  console.log('');

  // Resumo
  console.log('📊 RESUMO DOS TESTES:');
  console.log(`   ✅ Teste 1 (antes do limite): ${resultado1 ? 'PASSOU' : 'FALHOU'}`);
  console.log(`   ✅ Teste 2 (no limite): ${resultado2 ? 'PASSOU' : 'FALHOU'}`);
  console.log(`   ✅ Teste 3 (após limite): ${!resultado3 ? 'PASSOU' : 'FALHOU'}`);
  console.log(`   ✅ Teste 4 (futuro): ${!resultado4 ? 'PASSOU' : 'FALHOU'}`);
  console.log(`   ✅ Teste 5 (atual): ${resultadoAtual ? 'ATIVO' : 'DESATIVADO'}`);
  console.log('\n✅ Testes concluídos!');
}

// Executar os testes
testarLogicaNatal();

