import React from 'react';
import { Github, Linkedin, Mail, Download, MapPin, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Componente da seção inicial/sobre
export const SecaoInicio: React.FC = () => {
  
  // Função para simular download do currículo
  const baixarCurriculo = () => {
    alert('Download do currículo iniciado!');
  };

  // Animações para entrada dos elementos
  const animacaoContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const animacaoItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center p-6">
      <motion.div 
        className="max-w-4xl mx-auto"
        variants={animacaoContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Foto de perfil */}
          <motion.div 
            variants={animacaoItem}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl border-4 border-primary/20">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1622169804256-0eb6873ff441?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdCUyMGRldmVsb3BlcnxlbnwxfHx8fDE3NTY3MTgwOTh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Foto de perfil profissional"
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Indicador de status online */}
              <div className="absolute bottom-8 right-8 w-6 h-6 bg-green-500 rounded-full border-4 border-background animate-pulse"></div>
            </div>
          </motion.div>

          {/* Conteúdo textual */}
          <motion.div variants={animacaoItem} className="space-y-6">
            <div>
              <motion.p 
                variants={animacaoItem}
                className="text-primary text-lg mb-2"
              >
                Olá, eu sou
              </motion.p>
              <motion.h1 
                variants={animacaoItem}
                className="text-4xl lg:text-5xl font-bold mb-4"
              >
                João Silva
              </motion.h1>
              <motion.p 
                variants={animacaoItem}
                className="text-xl text-muted-foreground mb-6"
              >
                Desenvolvedor Full Stack
              </motion.p>
            </div>

            {/* Informações básicas */}
            <motion.div variants={animacaoItem} className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>São Paulo, Brasil</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>5+ anos de experiência</span>
              </div>
            </motion.div>

            {/* Descrição */}
            <motion.div variants={animacaoItem} className="space-y-4">
              <p className="text-lg leading-relaxed">
                Desenvolvedor apaixonado por criar soluções digitais inovadoras e experiências 
                de usuário excepcionais. Especializado em React, Node.js e tecnologias modernas 
                de desenvolvimento web.
              </p>
              <p className="text-muted-foreground">
                Sempre em busca de novos desafios e oportunidades para crescer profissionalmente, 
                contribuindo com projetos que fazem a diferença na vida das pessoas.
              </p>
            </motion.div>

            {/* Botões de ação */}
            <motion.div variants={animacaoItem} className="flex flex-wrap gap-4">
              <button
                onClick={baixarCurriculo}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 
                         rounded-lg hover:bg-primary/90 transition-colors shadow-lg"
                aria-label="Baixar currículo em PDF"
              >
                <Download size={20} />
                <span>Baixar Currículo</span>
              </button>
              
              <a
                href="#contato"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="flex items-center gap-2 border border-border px-6 py-3 rounded-lg 
                         hover:bg-accent transition-colors"
              >
                <Mail size={20} />
                <span>Entre em Contato</span>
              </a>
            </motion.div>

            {/* Links sociais */}
            <motion.div variants={animacaoItem} className="flex gap-4 pt-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                aria-label="Perfil no LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                aria-label="Perfil no GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="mailto:contato@exemplo.com"
                className="p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                aria-label="Enviar e-mail"
              >
                <Mail size={24} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};