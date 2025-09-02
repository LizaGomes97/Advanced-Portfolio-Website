import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Github, 
  Linkedin, 
  Twitter,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Tipo para dados do formulário
interface DadosFormulario {
  nome: string;
  email: string;
  assunto: string;
  mensagem: string;
}

// Tipo para status do envio
type StatusEnvio = 'idle' | 'enviando' | 'sucesso' | 'erro';

// Componente da seção de contato
export const SecaoContato: React.FC = () => {
  const [dadosFormulario, setDadosFormulario] = useState<DadosFormulario>({
    nome: '',
    email: '',
    assunto: '',
    mensagem: ''
  });
  
  const [statusEnvio, setStatusEnvio] = useState<StatusEnvio>('idle');
  const [errosValidacao, setErrosValidacao] = useState<Partial<DadosFormulario>>({});

  // Validar campo individual
  const validarCampo = (nome: keyof DadosFormulario, valor: string): string => {
    switch (nome) {
      case 'nome':
        if (!valor.trim()) return 'Nome é obrigatório';
        if (valor.trim().length < 2) return 'Nome deve ter pelo menos 2 caracteres';
        return '';
      
      case 'email':
        if (!valor.trim()) return 'E-mail é obrigatório';
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regexEmail.test(valor)) return 'E-mail inválido';
        return '';
      
      case 'assunto':
        if (!valor.trim()) return 'Assunto é obrigatório';
        if (valor.trim().length < 3) return 'Assunto deve ter pelo menos 3 caracteres';
        return '';
      
      case 'mensagem':
        if (!valor.trim()) return 'Mensagem é obrigatória';
        if (valor.trim().length < 10) return 'Mensagem deve ter pelo menos 10 caracteres';
        return '';
      
      default:
        return '';
    }
  };

  // Lidar com mudanças no formulário
  const lidarComMudanca = (nome: keyof DadosFormulario, valor: string) => {
    setDadosFormulario(prev => ({ ...prev, [nome]: valor }));
    
    // Validar campo em tempo real
    const erro = validarCampo(nome, valor);
    setErrosValidacao(prev => ({ ...prev, [nome]: erro }));
  };

  // Validar formulário completo
  const validarFormulario = (): boolean => {
    const novosErros: Partial<DadosFormulario> = {};
    let formularioValido = true;

    (Object.keys(dadosFormulario) as Array<keyof DadosFormulario>).forEach(campo => {
      const erro = validarCampo(campo, dadosFormulario[campo]);
      if (erro) {
        novosErros[campo] = erro;
        formularioValido = false;
      }
    });

    setErrosValidacao(novosErros);
    return formularioValido;
  };

  // Enviar formulário
  const enviarFormulario = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    setStatusEnvio('enviando');

    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular sucesso (aqui você integraria com sua API)
      console.log('Dados do formulário:', dadosFormulario);
      
      setStatusEnvio('sucesso');
      
      // Limpar formulário após sucesso
      setTimeout(() => {
        setDadosFormulario({ nome: '', email: '', assunto: '', mensagem: '' });
        setStatusEnvio('idle');
      }, 3000);
      
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setStatusEnvio('erro');
      
      // Resetar status após 3 segundos
      setTimeout(() => setStatusEnvio('idle'), 3000);
    }
  };

  return (
    <section id="contato" className="py-20 px-6 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabeçalho da seção */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Entre em Contato</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Estou sempre aberto para discutir novas oportunidades, projetos interessantes 
            ou simplesmente trocar ideias sobre tecnologia.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Informações de contato */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">Informações de Contato</h3>
              
              {/* Lista de contatos */}
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-lg">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="font-medium">E-mail</p>
                    <a 
                      href="mailto:lizandraplacido@gmail.com" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      lizandraplacido@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-lg">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="font-medium">Telefone</p>
                    <a 
                      href="tel:+5511915959763" 
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      +55 (11) 91595-9763
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 text-primary rounded-lg">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="font-medium">Localização</p>
                    <p className="text-muted-foreground">São Paulo, SP - Brasil</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Redes sociais */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.linkedin.com/in/lizandra-ribeiro-p-santos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card border border-border rounded-lg hover:bg-accent 
                           transition-colors group"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} className="group-hover:text-primary transition-colors" />
                </a>
                
                <a
                  href="https://github.com/LizaGomes97"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card border border-border rounded-lg hover:bg-accent 
                           transition-colors group"
                  aria-label="GitHub"
                >
                  <Github size={24} className="group-hover:text-primary transition-colors" />
                </a>
                
                {/* <a
                  href="https://twitter.com/joaosilva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-card border border-border rounded-lg hover:bg-accent 
                           transition-colors group"
                  aria-label="Twitter"
                >
                  <Twitter size={24} className="group-hover:text-primary transition-colors" />
                </a> */}
              </div>
            </div>

            {/* Disponibilidade */}
            <div className="bg-card p-6 rounded-xl shadow-lg border border-border">
              <h4 className="text-lg font-semibold mb-3">Disponibilidade</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Status:</span>
                  <span className="text-green-500 font-medium">Disponível para projetos</span>
                </div>
                <div className="flex justify-between">
                  <span>Resposta:</span>
                  <span className="text-muted-foreground">Dentro de 24 horas</span>
                </div>
                <div className="flex justify-between">
                  <span>Fuso horário:</span>
                  <span className="text-muted-foreground">GMT-3 (Brasília)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Formulário de contato */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card p-8 rounded-xl shadow-lg border border-border"
          >
            <h3 className="text-2xl font-semibold mb-6">Envie uma Mensagem</h3>
            
            <form onSubmit={enviarFormulario} className="space-y-6">
              {/* Nome */}
              <div>
                <label htmlFor="nome" className="block text-sm font-medium mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  id="nome"
                  value={dadosFormulario.nome}
                  onChange={(e) => lidarComMudanca('nome', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary 
                            focus:border-transparent transition-colors ${
                    errosValidacao.nome 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-border bg-input-background'
                  }`}
                  placeholder="Seu nome completo"
                  disabled={statusEnvio === 'enviando'}
                />
                {errosValidacao.nome && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errosValidacao.nome}
                  </p>
                )}
              </div>

              {/* E-mail */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  value={dadosFormulario.email}
                  onChange={(e) => lidarComMudanca('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary 
                            focus:border-transparent transition-colors ${
                    errosValidacao.email 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-border bg-input-background'
                  }`}
                  placeholder="seu@email.com"
                  disabled={statusEnvio === 'enviando'}
                />
                {errosValidacao.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errosValidacao.email}
                  </p>
                )}
              </div>

              {/* Assunto */}
              <div>
                <label htmlFor="assunto" className="block text-sm font-medium mb-2">
                  Assunto *
                </label>
                <input
                  type="text"
                  id="assunto"
                  value={dadosFormulario.assunto}
                  onChange={(e) => lidarComMudanca('assunto', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary 
                            focus:border-transparent transition-colors ${
                    errosValidacao.assunto 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-border bg-input-background'
                  }`}
                  placeholder="Sobre o que você gostaria de falar?"
                  disabled={statusEnvio === 'enviando'}
                />
                {errosValidacao.assunto && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errosValidacao.assunto}
                  </p>
                )}
              </div>

              {/* Mensagem */}
              <div>
                <label htmlFor="mensagem" className="block text-sm font-medium mb-2">
                  Mensagem *
                </label>
                <textarea
                  id="mensagem"
                  rows={5}
                  value={dadosFormulario.mensagem}
                  onChange={(e) => lidarComMudanca('mensagem', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary 
                            focus:border-transparent transition-colors resize-vertical ${
                    errosValidacao.mensagem 
                      ? 'border-red-500 bg-red-50 dark:bg-red-900/20' 
                      : 'border-border bg-input-background'
                  }`}
                  placeholder="Conte-me mais sobre seu projeto ou ideia..."
                  disabled={statusEnvio === 'enviando'}
                />
                {errosValidacao.mensagem && (
                  <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle size={16} />
                    {errosValidacao.mensagem}
                  </p>
                )}
              </div>

              {/* Botão de envio */}
              <button
                type="submit"
                disabled={statusEnvio === 'enviando'}
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg 
                          transition-all duration-300 ${
                  statusEnvio === 'sucesso'
                    ? 'bg-green-500 text-white'
                    : statusEnvio === 'erro'
                    ? 'bg-red-500 text-white'
                    : statusEnvio === 'enviando'
                    ? 'bg-primary/50 text-primary-foreground cursor-not-allowed'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {statusEnvio === 'enviando' && (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
                {statusEnvio === 'sucesso' && <CheckCircle size={20} />}
                {statusEnvio === 'erro' && <AlertCircle size={20} />}
                {statusEnvio === 'idle' && <Send size={20} />}
                
                <span>
                  {statusEnvio === 'enviando' && 'Enviando...'}
                  {statusEnvio === 'sucesso' && 'Mensagem Enviada!'}
                  {statusEnvio === 'erro' && 'Erro ao Enviar'}
                  {statusEnvio === 'idle' && 'Enviar Mensagem'}
                </span>
              </button>

              {/* Mensagem de sucesso/erro */}
              {statusEnvio === 'sucesso' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                >
                  <p className="text-green-700 dark:text-green-300 text-sm">
                    Obrigado pela sua mensagem! Entrarei em contato em breve.
                  </p>
                </motion.div>
              )}

              {statusEnvio === 'erro' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
                >
                  <p className="text-red-700 dark:text-red-300 text-sm">
                    Ocorreu um erro ao enviar sua mensagem. Tente novamente ou entre em contato diretamente.
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};