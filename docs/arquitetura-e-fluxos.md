# 📐 Arquitetura de Software e Fluxos Transacionais — ReVeste

> **Documento Técnico de Engenharia: Diagramas de Sequência, Máquina de Estados e Fluxos de Concorrência**  
> *Projeto Integrador II — ReVeste: Brechó Digital*

[ ⬅️ Voltar à Central de Documentação ](./README.md)

---

## 🏛️ 1. Arquitetura Geral da Solução

O ReVeste adota uma arquitetura em camadas desacopladas (**Client-Server RESTful**), orientada a transações seguras e consistência de dados:

```mermaid
graph TD
    subgraph "Camada de Apresentação (Front-End)"
        A[Navegador Desktop / Mobile] --> B[Interface Responsiva & Catálogo]
        B --> C[Painel do Cliente / Vendedor / Admin]
    end

    subgraph "Camada de Negócio e Serviços (Back-End API)"
        D[API Gateway / Middlewares RBAC]
        E[Módulo de Concorrência e Reserva]
        F[Módulo de Sacolinha & Checkout]
        G[Módulo de Auditoria & Logs]
        H[Módulo Eco-Dashboard]
    end

    subgraph "Camada de Persistência (Banco Relacional)"
        I[(Banco de Dados PostgreSQL / MySQL)]
    end

    subgraph "Serviços e APIs Externas"
        J[API ViaCEP - Endereçamento]
        K[Gateway de Pagamento - PIX / Cartão]
        L[Serviço de Frete & Notificações]
    end

    B <-->|HTTPS / JSON REST API| D
    D --> E
    D --> F
    D --> G
    D --> H
    E <-->|Transações ACID & Locks| I
    F <--> I
    G <--> I
    H <--> I
    D <--> J
    D <--> K
    D <--> L
```

---

## ⏱️ 2. Fluxo de Reserva Concorrencial de Peça Única (Anti-Overselling)

Por se tratar de **SKU de unidade única**, duas pessoas não podem comprar a mesma peça. O fluxo a seguir detalha o mecanismo de lock e expiração por timer:

```mermaid
sequenceDiagram
    autonumber
    actor Comprador A as 👤 Comprador A
    actor Comprador B as 👤 Comprador B
    participant Front as 🖥️ Front-End (Web)
    participant API as ⚙️ Back-End API
    participant DB as 🗄️ Banco de Dados Relacional

    Note over Comprador A, DB: Tentativa de Compra Simultânea
    Comprador A->>Front: Clica em "Comprar Agora" (Peça #101)
    Front->>API: POST /api/reservas (peca_id: 101)
    
    API->>DB: Inicia Transação (SELECT * FROM pecas WHERE id=101 FOR UPDATE)
    DB-->>API: Retorna peça (status: 'DISPONIVEL')
    
    API->>DB: UPDATE pecas SET status='RESERVADO', reservado_ate = NOW() + INTERVAL '15 min'
    API->>DB: Commit Transação
    DB-->>API: Sucesso
    API-->>Front: Retorna 200 OK (Reserva confirmada, timer: 900s)
    Front-->>Comprador A: Exibe cronômetro regressivo de 15:00 min
    
    Note over Comprador B, API: Comprador B tenta reservar a mesma peça
    Comprador B->>Front: Clica em "Comprar Agora" (Peça #101)
    Front->>API: POST /api/reservas (peca_id: 101)
    API->>DB: Verifica status da peça #101
    DB-->>API: Retorna status: 'RESERVADO' (reservado_ate ativo)
    API-->>Front: Retorna 409 Conflict ("Peça reservada no carrinho de outro cliente")
    Front-->>Comprador B: Exibe aviso amigável: "Peça reservada. Deseja ser avisado se liberar?"

    alt Cenário A: Comprador A paga dentro dos 15 minutos
        Comprador A->>Front: Conclui pagamento via PIX
        Front->>API: Webhook / Confirmação de Pagamento
        API->>DB: UPDATE pecas SET status='VENDIDO'
        DB-->>API: Commit
        API-->>Front: Pedido Confirmado!
    else Cenário B: Tempo esgota sem pagamento (TTL Expirado)
        Note over API, DB: Job em Background / Verificação
        API->>DB: UPDATE pecas SET status='DISPONIVEL', reservado_ate=NULL WHERE reservado_ate < NOW()
        DB-->>API: Peça liberada!
        API-->>Comprador B: Dispara notificação: "A peça #101 voltou a ficar disponível!"
    end
```

---

## 🛍️ 3. Fluxo de Consolidação de Frete: "Abrir Sacolinha"

A Sacolinha permite ao cliente acumular itens exclusivos do mesmo vendedor ao longo de até 30 dias para pagar um frete único:

```mermaid
sequenceDiagram
    autonumber
    actor Cliente as 👤 Cliente
    actor Vendedor as 👗 Vendedor (Brechó)
    participant Sistema as ⚙️ Plataforma ReVeste
    participant Frete as 🚚 API de Frete

    Note over Cliente, Sistema: Compra 1 (Dia 01)
    Cliente->>Sistema: Adiciona Peça #101 e escolhe "Abrir Sacolinha"
    Cliente->>Sistema: Paga o valor da Peça #101 (sem frete)
    Sistema->>Sistema: Registra Peça #101 como 'VENDIDO_EM_SACOLINHA'
    Sistema->>Vendedor: Notifica: "Nova peça vendida na Sacolinha #42. Guarde-a!"
    
    Note over Cliente, Sistema: Compra 2 (Dia 10 - Mesmo Vendedor)
    Cliente->>Sistema: Garimpa Peça #205 e escolhe "Adicionar à Sacolinha Existente"
    Cliente->>Sistema: Paga o valor da Peça #205 (sem frete adicional)
    Sistema->>Sistema: Agrupa Peça #205 na Sacolinha #42
    Sistema->>Vendedor: Notifica: "Mais um item adicionado à Sacolinha #42!"

    Note over Cliente, Vendedor: Finalização (Dia 20 ou até 30 dias)
    Cliente->>Sistema: Clica em "Fechar e Enviar Sacolinha"
    Sistema->>Frete: Calcula frete consolidado (Peso e Volume somados)
    Frete-->>Sistema: Retorna valor do frete único
    Cliente->>Sistema: Paga o frete unificado
    Sistema->>Vendedor: Emite Etiqueta de Envio e Declaração de Conteúdo com todos os itens
    Vendedor->>Sistema: Despacha o pacote único nos Correios e insere rastreio
    Sistema->>Cliente: Código de rastreamento enviado!
```

---

## 🔄 4. Máquina de Estados: Ciclo de Vida da Peça de Brechó

Cada roupa física passa por um ciclo de vida rigorosamente controlado pelo sistema:

```mermaid
stateDiagram-v2
    [*] --> RASCUNHO: Vendedor cria anúncio
    RASCUNHO --> EM_ANALISE: Submetido para moderação
    EM_ANALISE --> RECUSADO: Rejeitado pela moderação (notifica motivo)
    RECUSADO --> RASCUNHO: Vendedor ajusta fotos/descrição
    EM_ANALISE --> DISPONIVEL: Aprovado pelo Admin (visível no catálogo)

    DISPONIVEL --> RESERVADO: Adicionado ao checkout (Timer 15 min ativo)
    RESERVADO --> DISPONIVEL: Timer de 15 min expirou sem pagamento
    RESERVADO --> VENDIDO: Pagamento aprovado (envio imediato)
    RESERVADO --> VENDIDO_EM_SACOLINHA: Pagamento aprovado com opção de Sacolinha

    VENDIDO_EM_SACOLINHA --> AGUARDANDO_ENVIO: Cliente fecha a sacolinha e paga o frete
    VENDIDO --> AGUARDANDO_ENVIO: Aguardando etiqueta do vendedor

    AGUARDANDO_ENVIO --> EM_TRANSITO: Vendedor posta nos Correios (Código de Rastreio)
    EM_TRANSITO --> ENTREGUE: Confirmado pelos Correios / Transportadora

    ENTREGUE --> FINALIZADO: 48h após entrega sem contestação (Repasse liberado)
    ENTREGUE --> EM_DISPUTA: Cliente abre solicitação de devolução em até 7 dias
    EM_DISPUTA --> DEVOLVIDO: Devolução confirmada (Estorno processado)
    EM_DISPUTA --> FINALIZADO: Disputa resolvida a favor do vendedor
```

---

## 🛡️ 5. Fluxo de Custódia Financeira (*Escrow*) e Segurança

Para proteger ambas as partes nas transações de segunda mão:

```mermaid
flowchart TD
    A[Comprador Efetua o Pagamento] --> B[Valor fica retido em Custódia Segura pela Plataforma]
    B --> C[Vendedor recebe etiqueta e posta a encomenda]
    C --> D[Rastreamento detecta 'Objeto Entregue']
    D --> E{Comprador abre disputa em até 48h?}
    E -- Não --> F[Plataforma libera repasse ao Vendedor com desconto da taxa de intermediação]
    E -- Sim --> G[Administrador avalia fotos e evidências da contestação]
    G -- Devolução Aceita --> H[Gera logística reversa e estorna valor ao Comprador após devolução]
    G -- Contestação Improcedente --> F
```
