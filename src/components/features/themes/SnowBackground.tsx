import React, { useEffect, useRef, useState } from "react";
import { deveExibirEfeitoNatal } from "../../../lib/utils/temaUtils";

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
  wind: number;
}

interface SnowBackgroundProps {
  className?: string;
  dataLimiteCustomizada?: Date; // Para testes - permite definir uma data limite diferente
}

export const SnowBackground: React.FC<SnowBackgroundProps> = ({
  className = "",
  dataLimiteCustomizada,
}) => {
  const [deveExibir, setDeveExibir] = useState(
    deveExibirEfeitoNatal(dataLimiteCustomizada)
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const snowflakesRef = useRef<Snowflake[]>([]);

  // Verificar periodicamente se ainda deve exibir o efeito
  useEffect(() => {
    const verificarData = () => {
      setDeveExibir(deveExibirEfeitoNatal(dataLimiteCustomizada));
    };

    // Verificar a cada hora
    const interval = setInterval(verificarData, 60 * 60 * 1000);

    // Verificar também quando o componente monta
    verificarData();

    return () => clearInterval(interval);
  }, [dataLimiteCustomizada]);

  useEffect(() => {
    // Se não deve exibir, não inicializa a animação
    if (!deveExibir) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Configuração do canvas
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Observar mudanças no tamanho do container
    const resizeObserver = new ResizeObserver(resizeCanvas);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Criar flocos de neve
    const createSnowflake = (): Snowflake => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.3,
      wind: Math.random() * 0.5 - 0.25,
    });

    // Inicializar flocos
    const snowflakeCount = Math.min(
      100,
      Math.floor((canvas.width * canvas.height) / 15000)
    );
    snowflakesRef.current = Array.from(
      { length: snowflakeCount },
      createSnowflake
    );

    // Função de animação
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snowflakesRef.current.forEach((flake, index) => {
        // Atualizar posição
        flake.y += flake.speed;
        flake.x += flake.wind + Math.sin(flake.y * 0.01) * 0.5;

        // Resetar se sair da tela
        if (flake.y > canvas.height) {
          flake.y = -10;
          flake.x = Math.random() * canvas.width;
        }

        // Resetar se sair horizontalmente
        if (flake.x > canvas.width) {
          flake.x = 0;
        } else if (flake.x < 0) {
          flake.x = canvas.width;
        }

        // Desenhar floco de neve
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
        ctx.fill();

        // Desenhar pequenos detalhes para parecer mais realista
        ctx.beginPath();
        ctx.arc(
          flake.x - flake.radius * 0.3,
          flake.y,
          flake.radius * 0.5,
          0,
          Math.PI * 2
        );
        ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity * 0.5})`;
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      resizeObserver.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [deveExibir]);

  // Se não deve exibir, retorna null (não renderiza nada)
  if (!deveExibir) {
    return null;
  }

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      style={{ background: "transparent" }}
    />
  );
};
