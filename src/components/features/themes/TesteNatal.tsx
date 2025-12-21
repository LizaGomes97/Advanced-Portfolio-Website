import React, { useState, useEffect } from "react";
import {
  buscarTemaAtivo,
  deveExibirEfeitoNatal,
} from "../../../lib/utils/temaUtils";

/**
 * Componente de teste visual para verificar a lógica do efeito de natal
 * Pode ser adicionado temporariamente em qualquer página para testar
 */
export const TesteNatal: React.FC = () => {
  const [deveExibir, setDeveExibir] = useState(deveExibirEfeitoNatal());
  const [dataAtual, setDataAtual] = useState(new Date());
  const [temaAtivo, setTemaAtivo] = useState(buscarTemaAtivo());

  useEffect(() => {
    // Atualizar a cada segundo para ver mudanças em tempo real
    const interval = setInterval(() => {
      setDataAtual(new Date());
      setDeveExibir(deveExibirEfeitoNatal());
      setTemaAtivo(buscarTemaAtivo());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const dataLimite = temaAtivo ? new Date(temaAtivo.dataFim) : null;
  const diasRestantes = dataLimite
    ? Math.ceil(
        (dataLimite.getTime() - dataAtual.getTime()) / (1000 * 60 * 60 * 24)
      )
    : 0;

  return (
    <div className="fixed bottom-4 left-4 bg-card border border-border rounded-lg p-4 shadow-lg z-50 max-w-sm">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">🧪</span>
        <h3 className="font-semibold text-lg">Teste de Natal</h3>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium">Status:</span>
          <span
            className={`px-2 py-1 rounded text-xs font-semibold ${
              deveExibir
                ? "bg-green-500/20 text-green-600 dark:text-green-400"
                : "bg-red-500/20 text-red-600 dark:text-red-400"
            }`}
          >
            {deveExibir ? "✅ ATIVO" : "❌ DESATIVADO"}
          </span>
        </div>

        <div>
          <span className="font-medium">Data atual:</span>
          <p className="text-muted-foreground text-xs">
            {dataAtual.toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })}
          </p>
        </div>

        {temaAtivo && (
          <>
            <div>
              <span className="font-medium">Tema ativo:</span>
              <p className="text-muted-foreground text-xs">{temaAtivo.nome}</p>
            </div>
            <div>
              <span className="font-medium">Data limite:</span>
              <p className="text-muted-foreground text-xs">
                {dataLimite?.toLocaleString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </>
        )}

        {deveExibir && (
          <div>
            <span className="font-medium">Dias restantes:</span>
            <p className="text-muted-foreground text-xs">
              {diasRestantes > 0 ? `${diasRestantes} dias` : "Último dia!"}
            </p>
          </div>
        )}

        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground">
            {deveExibir
              ? "O efeito de neve está ativo"
              : "O efeito de neve foi desativado automaticamente"}
          </p>
        </div>
      </div>
    </div>
  );
};
