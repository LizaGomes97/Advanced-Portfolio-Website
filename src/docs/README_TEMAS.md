# Sistema de Temas Automáticos

Este sistema permite que você adicione temas sazonais ao seu portfólio que são ativados e desativados automaticamente baseado em datas.

## Como Funciona

Os temas são gerenciados através do arquivo `temas.json`. Cada tema tem:
- **id**: Identificador único do tema
- **nome**: Nome do tema (ex: "Natal", "Halloween", "Páscoa")
- **dataInicio**: Data e hora de início (formato ISO: `YYYY-MM-DDTHH:mm:ss`)
- **dataFim**: Data e hora de fim (formato ISO: `YYYY-MM-DDTHH:mm:ss`)
- **ativo**: Se o tema está habilitado (true/false)
- **componente**: Nome do componente React a ser renderizado

## Como Adicionar um Novo Tema

### 1. Criar o Componente do Tema

Crie um novo componente React para o efeito visual do tema. Exemplo:

```tsx
// src/components/HalloweenBackground.tsx
import React from 'react';

export const HalloweenBackground: React.FC = () => {
  // Seu código de efeito aqui
  return <div>Efeito Halloween</div>;
};
```

### 2. Adicionar ao JSON de Temas

Edite o arquivo `src/data/temas.json` e adicione o novo tema:

```json
{
  "temas": [
    {
      "id": "natal",
      "nome": "Natal",
      "dataInicio": "2025-12-01T00:00:00",
      "dataFim": "2025-12-27T23:59:59",
      "ativo": true,
      "componente": "SnowBackground"
    },
    {
      "id": "halloween",
      "nome": "Halloween",
      "dataInicio": "2025-10-25T00:00:00",
      "dataFim": "2025-11-02T23:59:59",
      "ativo": true,
      "componente": "HalloweenBackground"
    }
  ]
}
```

### 3. Integrar nas Seções

Adicione o componente do tema nas seções desejadas. O sistema verifica automaticamente se o tema está ativo:

```tsx
import { buscarTemaAtivo } from '../utils/temaUtils';
import { HalloweenBackground } from './HalloweenBackground';

// No componente da seção:
const temaAtivo = buscarTemaAtivo();
if (temaAtivo?.id === 'halloween') {
  return <HalloweenBackground />;
}
```

Ou use o sistema de verificação automática:

```tsx
import { verificarTemaAtivo } from '../utils/temaUtils';
import { HalloweenBackground } from './HalloweenBackground';

// No componente da seção:
{verificarTemaAtivo('halloween') && <HalloweenBackground />}
```

## Exemplo Completo: Tema de Halloween

1. **Criar componente** (`src/components/HalloweenBackground.tsx`)
2. **Adicionar ao JSON** (`src/data/temas.json`)
3. **Usar nas seções** (similar ao SnowBackground)

## Formato de Data

Use o formato ISO 8601:
- `YYYY-MM-DDTHH:mm:ss`
- Exemplo: `2025-12-27T23:59:59` (27 de dezembro de 2025, 23:59:59)

## Funções Úteis

- `buscarTemaAtivo()`: Retorna o tema ativo no momento atual
- `verificarTemaAtivo(temaId)`: Verifica se um tema específico está ativo
- `deveExibirEfeitoNatal()`: Verifica especificamente o tema natal (compatibilidade)

## Dicas

- Você pode ter múltiplos temas, mas apenas um será ativo por vez (o primeiro que encontrar dentro do período)
- Para desativar um tema temporariamente, mude `ativo` para `false`
- As datas são verificadas a cada hora automaticamente
- Os temas são ativados/desativados automaticamente sem necessidade de deploy

