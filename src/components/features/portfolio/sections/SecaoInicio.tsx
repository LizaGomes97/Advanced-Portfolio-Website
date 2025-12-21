import React from "react";
import {
  Github,
  Linkedin,
  Mail,
  Download,
  MapPin,
  Calendar,
} from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../../../shared/ImageWithFallback";
import { SnowBackground } from "../../../themes/SnowBackground";

// Componente da seção inicial/sobre
export const SecaoInicio: React.FC = () => {
  // Função para baixar o currículo em PDF
  const baixarCurriculo = () => {
    const googleDocUrl =
      "https://docs.google.com/document/d/1vkECN2StZ2VWYzmdebCsjhkjcybZ5PGkqFUs4qY1rlQ/export?format=pdf";

    // Cria um link temporário e simula o clique para iniciar o download
    const link = document.createElement("a");
    link.href = googleDocUrl;
    link.setAttribute("download", "Curriculo_Lizandra_Santos.pdf"); // Nome do arquivo que será salvo
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Animações para entrada dos elementos
  const animacaoContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const animacaoItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      id="inicio"
      className="min-h-screen flex items-center justify-center p-6 relative"
    >
      {/* Background de neve animado */}
      <SnowBackground />

      <motion.div
        className="max-w-4xl mx-auto relative z-10"
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
                  src="public\meu-perfil-natal.png"
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
                Lizandra Santos
              </motion.h1>
              <motion.p
                variants={animacaoItem}
                className="text-xl text-muted-foreground mb-6"
              >
                Desenvolvedora de Software
              </motion.p>
            </div>

            {/* Informações básicas */}
            <motion.div
              variants={animacaoItem}
              className="flex flex-wrap gap-4 text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>São Paulo, Brasil</span>
              </div>
              {/* <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>2+ anos de experiência</span>
              </div> */}
            </motion.div>

            {/* Descrição */}
            <motion.div variants={animacaoItem} className="space-y-4">
              <p className="text-lg leading-relaxed">
                Desenvolvedora de Software Full Stack com foco em Automação de
                Processos.
              </p>
              <p className="text-muted-foreground">
                Apaixonada por tecnologia, atuo com desenvolvimento de software
                full stack e automação de processos, ajudando empresas a
                otimizar operações e ganhar eficiência. Gosto muito da frase
                "Nada se cria, tudo se copia", isso sempre me lembra que nao
                preciso reinventar a roda sempre. Porem, sim as vezes preciso
                criar a roda, e isso é o que eu faço.
              </p>
            </motion.div>

            {/* Botões de ação */}
            <motion.div
              variants={animacaoItem}
              className="flex flex-wrap gap-4"
            >
              <button
                onClick={baixarCurriculo}
                className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 
                         rounded-lg hover:bg-primary/90 transition-colors shadow-lg cursor-pointer"
                aria-label="Baixar currículo em PDF"
              >
                <Download size={20} />
                <span>Baixar Currículo</span>
              </button>

              <a
                href="#contato"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contato")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 border border-border px-6 py-3 rounded-lg 
                         hover:bg-accent transition-colors cursor-pointer"
              >
                <Mail size={20} />
                <span>Entre em Contato</span>
              </a>
            </motion.div>

            {/* Links sociais */}
            <motion.div variants={animacaoItem} className="flex gap-4 pt-4">
              <a
                href="https://www.linkedin.com/in/lizandra-ribeiro-p-santos/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
                aria-label="Perfil no LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="https://github.com/LizaGomes97"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
                aria-label="Perfil no GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="mailto:lizandraplacido@gmail.com"
                className="p-3 rounded-lg border border-border hover:bg-accent transition-colors cursor-pointer"
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
