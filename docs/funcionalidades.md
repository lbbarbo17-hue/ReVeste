# ReVeste — Especificação Completa de Funcionalidades e Arquitetura do Sistema

> **Documento Integral de Requisitos, Módulos Operacionais, Regras de Negócio e Diferenciais Inovadores**  
> *Projeto Integrador II — ReVeste: Brechó Digital para Consumo Consciente*

[ ⬅️ Voltar à Central de Documentação ](./README.md)

---

## 🧭 1. Visão Geral do Sistema e Arquitetura de Módulos

O **ReVeste** é uma plataforma transacional de comércio circular completa e moderna, desenvolvida para solucionar as complexidades operacionais e técnicas de pequenos brechós e vendedores autônomos.

O núcleo do sistema diferencia-se radicalmente do e-commerce tradicional por operar sob a premissa de **estoque de peças físicas únicas (1 produto = 1 unidade física = 1 SKU exclusivo)**, implementando controle rigoroso de concorrência transacional, módulos dedicados à confiança da procedência das roupas, consolidação de frete e rastreamento de impacto socioambiental em tempo real.

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                              ECOSSISTEMA REVESTE                             │
├───────────────────┬───────────────────┬───────────────────┬──────────────────┤
│ Módulo do Cliente │ Módulo Vendedor   │ Módulo Admin      │ Módulo Eco & BI  │
│ (Comprador)       │ (Brechó/Desapego) │ (Governança/Logs) │ (Sustentabilidade│
├───────────────────┴───────────────────┴───────────────────┴──────────────────┤
│  NÚCLEO TRANSACIONAL: Travas de Concorrência (Anti-Overselling) & Peça Única │
├──────────────────────────────────────────────────────────────────────────────┤
│  SERVIÇOS INTEGRADOS: ViaCEP, Gateway de Pagamento, Cálculo de Frete, E-mail │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔐 2. Módulo de Autenticação, Perfis e Segurança (RBAC)

### 2.1 Cadastro, Acesso e Gestão de Identidade
- **Múltiplos Métodos de Cadastro e Autenticação:**
  - Cadastro nativo por e-mail, CPF/CNPJ e senha com validação em tempo real.
  - Login social integrado (Google e redes sociais) para redução de fricção.
- **Segurança de Credenciais:**
  - Criptografia hash unidirecional para senhas com algoritmo **BCrypt** (salt rounds 10+).
  - Autenticação stateless baseada em **JSON Web Tokens (JWT)** com tempo de expiração curto (ex: 15 min) e mecanismo de renovação automática via **Refresh Tokens** seguros (`HttpOnly`, `SameSite=Strict`).
- **Recuperação Segura de Conta:**
  - Fluxo de recuperação de senha via e-mail com token criptográfico de uso único com TTL de 30 minutos.
- **Validação Cadastral Integrada:**
  - Validação estrita de CPF/CNPJ com máscara e algoritmo verificador de dígitos.
  - Validação automática de CEP integrada com a API **ViaCEP**, preenchendo automaticamente logradouro, bairro, cidade e UF.

### 2.2 Controle de Acesso Baseado em Papéis (*Role-Based Access Control* - RBAC)
O sistema conta com três perfis principais bem delimitados por middlewares de autorização:

| Perfil | Escopo de Acesso e Permissões |
| :--- | :--- |
| **Cliente (Comprador)** | Navegar pelo catálogo, aplicar filtros, salvar favoritos, comparar medidas corporais com a peça, usar carrinho com reserva, abrir/gerenciar Sacolinha, negociar via ofertas, efetuar pagamentos, rastrear entregas, emitir avaliações e visualizar seu eco-impacto pessoal. |
| **Vendedor (Brechó / Desapego)** | Todas as funções do cliente + onboarding de vendedor, cadastro guiado de peças com fotos e medidas em cm, precificação assistida, gestão de estoque de peças únicas, recebimento de ofertas, geração de etiquetas de envio e extrato financeiro de repasses. |
| **Administrador (Governança)** | Visão analítica global da plataforma, fila de moderação e aprovação de produtos, mediação de disputas/devoluções, gestão de usuários (bloqueios/desbloqueios), concessão de selos de verificação, auditoria completa de logs e relatórios executivos de BI. |

### 2.3 Perfis Públicos e Customização
- **Perfil do Brechó / Vendedor:**
  - Foto de avatar e banner customizável.
  - Minibiografia com história do brechó, localização e políticas próprias (ex: prazos de envio).
  - Vitrine exclusiva com todas as peças ativas daquele vendedor.
  - Indicador de reputação (estrelas, número de vendas concluídas e tempo médio de resposta).
  - Selo de **"Vendedor Verificado"** concedido após validação de documentos pelo Administrador.
- **Perfil do Comprador:**
  - Gestão de endereços de entrega múltiplos (casa, trabalho).
  - Dados biométricos cadastrados para o Provador Virtual (busto, cintura, quadril, altura e numerações habituais).
  - Carteira de créditos (para estornos ou devoluções).

---

## 🔍 3. Módulo de Catálogo, Busca Avançada e Recomendação

### 3.1 Busca Textual e Autocomplete Inteligente
- Barra de busca global com sugestão instantânea (*typeahead*) de marcas, categorias e termos relacionados.
- Tratamento para busca fonética e tolerância a pequenos erros de digitação (*fuzzy search*).

### 3.2 Filtros Multifacetados e Refinados
O catálogo permite a combinação simultânea de dezenas de filtros específicos do universo de segunda mão:
- **Categorias e Subcategorias:** Roupas (calças, casacos, saias, vestidos, camisas, croppeds, etc.), calçados, bolsas e acessórios.
- **Gênero / Modelagem:** Feminino, Masculino, Unissex, Infantil, Plus Size e Vintage Oversized.
- **Faixa de Preço:** Slider interativo com valores dinâmicos mínimo e máximo com base nos itens cadastrados.
- **Tamanhos Padronizados e Especiais:**
  - Letras (PP, P, M, G, GG, XGG, G1 ao G4).
  - Numeração numérica (34 ao 56 para calças; 33 ao 46 para calçados).
- **Estado de Conservação (Classificação Padronizada):**
  1. *Novo com Etiqueta:* Peça nunca usada, preservando tags originais de fábrica.
  2. *Perfeito Estado:* Peça sem etiquetas, mas sem qualquer indício de uso visível.
  3. *Gentilmente Usado:* Peça usada poucas vezes, sem manchas, rasgos ou desgastes.
  4. *Vintage com História:* Peça com marcas de época autênticas declaradas pelo vendedor.
- **Estilo / Vibe do Garimpo:**
  - Vintage Anos 70/80/90, Y2K (Anos 2000), Streetwear, Minimalista, Alfaiataria, Boho Chic, Retrô, Casual.
- **Composição e Tecido:** Algodão, linho, seda, viscose, jeans/denim, lã, couro legítimo, veludo, etc.
- **Filtro de Localização:** Filtro por cidade/estado para incentivar negócios locais e retirada em mãos.

### 3.3 Ordenação e Visualização
- Ordenação por: *Mais Recentes*, *Menor Preço*, *Maior Preço*, *Maior Economia Ecológica (Água)* e *Mais Curtidos*.
- Modos de visualização em grade responsiva (2 colunas no mobile, 4 colunas no desktop) com carregamento dinâmico sob demanda (*infinite scroll* ou paginação limpa).

### 3.4 Feed Personalizado e "Radar de Garimpo"
- **Feed "Para o Seu Tamanho":** Aba personalizada que prioriza peças disponíveis exatamente nas medidas e tamanhos salvos no perfil do usuário.
- **Alerta de Garimpo / Notificação de Desejo:** O comprador pode configurar alarmes como *"Avisar-me quando surgir um Blazer Vintage G"* e receber alertas automáticos por e-mail e na central de notificações.

---

## 👗 4. Módulo de Peça Única e Ficha Técnica 360°

Por se tratar de peças de brechó sem reposição em série, a página do produto é desenhada com máxima transparência para evitar frustrações e devoluções:

### 4.1 Galeria Multimídia Interativa
- **Upload Múltiplo:** Até 8 fotos em alta definição com zoom interativo.
- **Ângulos Obrigatórios no Cadastro:**
  - Foto frontal inteira.
  - Foto das costas.
  - Foto da etiqueta original (comprovando marca, tamanho de fábrica e composição).
  - Foto aproximada (*macro*) da textura do tecido e eventuais detalhes de desgaste.
- **Suporte a Vídeo Curto:** Vídeo de até 15 segundos demonstrando o movimento, caimento e brilho do tecido.

### 4.2 Tabela de Medidas Reais em Centímetros (Fita Métrica)
Devido à grande variação de modelagens ao longo das décadas e entre diferentes marcas, cada anúncio traz medidas exatas tomadas com fita métrica:
- Busto / Tórax (cm)
- Cintura (cm)
- Quadril (cm)
- Comprimento total (cm)
- Distância ombro a ombro (cm)
- Comprimento da manga (cm)
- Gancho / Cintura à virilha (para calças/shorts)

### 4.3 "Provador Virtual Inteligente" (Fit Finder)
- **Comparador Automático:**
  - Quando o cliente está logado com suas medidas cadastradas, o sistema cruza os dados matematicamente e exibe uma etiqueta de caimento:
    - 🟢 *Caimento Perfeito (Sob medida para sua cintura e quadril)*.
    - 🟡 *Modelagem Mais Solta (+3 cm no busto em relação ao seu perfil)*.
    - 🔴 *Atenção: A cintura desta peça é 2 cm menor que a sua medida cadastrada*.

### 4.4 Selo de Eco-Impacto da Peça
- Cada ficha de produto apresenta um card ecológico com a economia real gerada:
  - *"Adquirir esta peça de segunda mão evita o gasto de ~7.500 litros de água e a emissão de ~12 kg de CO₂!"*.

---

## 🔒 5. Módulo de Concorrência, Carrinho e Reserva Segura (Anti-Overselling)

O maior desafio técnico de um brechó é a venda concorrente de uma peça física única. O ReVeste implementa travas de nível corporativo para erradicar o *overselling*:

```
[Catálogo: DISPONÍVEL]
       │
       ▼ (Usuário A inicia Checkout)
[Status: RESERVADO] ──(Inicia Timer de 15 minutos)
       │
       ├──► [Pagamento Concluído dentro do prazo] ──► [Status: VENDIDO]
       │
       └──► [Tempo Esgotado / Abandono] ───────────► [Status: DISPONÍVEL]
                                                      (Usuário B pode comprar)
```

### 5.1 Mecanismo de Trava Concorrencial (Database Locks & TTL)
- **Transação ACID com Lock Pessimista/Otimista:**
  - No momento em que um comprador avança para o checkout com uma peça única, a aplicação executa uma transação atômica (`SELECT ... FOR UPDATE` no banco relacional).
  - Se a peça estiver disponível, o status passa imediatamente para `RESERVADO`, atribuindo o ID da sessão do comprador e definindo `reserved_until = NOW() + INTERVAL '15 minutes'`.
- **Timer de Reserva Visível:**
  - Um contador regressivo em destaque é exibido no topo da tela do comprador: *"Sua peça única está reservada por 14:59 minutos. Conclua o pedido para garantir o seu garimpo!"*.
- **Rotina Automática de Liberação (Job / Expiração):**
  - Caso o tempo expire sem pagamento, um serviço em background atualiza o status de volta para `DISPONIVEL` e limpa o bloqueio instantaneamente.
- **Tratamento Amigável para Outros Usuários:**
  - Se outro usuário tentar adicionar uma peça que está reservada, a interface exibe um botão de alerta: *"Esta peça está no carrinho de outro usuário no momento. Deseja ser notificado se ela for liberada?"*.

---

## 🛍️ 6. Módulo Inovador: "Abrir Sacolinha" (Consolidação de Frete)

A **Sacolinha** é a funcionalidade mais solicitada no mercado de brechós brasileiros, resolvendo o atrito do frete em peças avulsas de baixo valor:

### 6.1 Como Funciona a Sacolinha no ReVeste
1. **Abertura da Sacolinha:**
   - Ao comprar uma peça, o cliente pode selecionar a opção **"Guardar na Sacolinha do Vendedor"**.
   - O valor da peça é pago e garantido imediatamente, ficando o item com status `VENDIDO_EM_SACOLINHA`.
   - O vendedor é notificado para higienizar e reservar a peça em sua prateleira de sacolinhas.
2. **Período de Acúmulo (Até 30 Dias):**
   - Durante até 30 dias corridos, o comprador pode garimpar novas peças daquele **mesmo vendedor** e adicioná-las à mesma sacolinha sem pagar frete adicional em cada compra.
   - Um contador de dias restantes e itens acumulados fica visível na área *"Minhas Sacolinhas"* do cliente.
3. **Fechamento e Envio Consolidado:**
   - A qualquer momento (ou ao atingir os 30 dias), o cliente clica em **"Fechar e Enviar Sacolinha"**.
   - O sistema calcula o peso e volume total de todas as peças reunidas e gera uma cobrança **única** de frete.
   - O vendedor recebe a etiqueta com todos os itens agrupados para envio em um único pacote, economizando caixas, emissões de transporte e frete.

---

## 💬 7. Módulo de Negociação, Ofertas e Chat Integrado

### 7.1 Sistema de Contraproposta ("Fazer Oferta")
- O comprador pode submeter uma oferta de valor menor do que o preço anunciado em anúncios que aceitam negociação.
- O vendedor recebe a notificação e pode escolher:
  - ✅ **Aceitar a Oferta:** O comprador tem 24h para pagar pelo valor negociado.
  - ❌ **Recusar a Oferta:** O anúncio permanece no valor original.
  - 🔄 **Fazer Contraproposta:** O vendedor sugere um valor intermediário.
- Limite de segurança: sistema impede ofertas abusivas (ex: ofertas abaixo de 60% do valor são bloqueadas por regra de negócio).

### 7.2 Chat Interno com Filtros de Segurança
- Canal de mensagens direto entre comprador e vendedor dentro do contexto de uma peça ou pedido.
- **Filtros Automáticos de Privacidade:**
  - O sistema detecta e bloqueia números de telefone, chaves PIX externas, links suspeitos ou tentativas de transação fora da plataforma, protegendo os usuários contra golpes e garantindo a comissão do sistema.

---

## 💳 8. Módulo de Checkout, Pagamentos e Custódia Segura (Escrow)

### 8.1 Multi-Meios de Pagamento
- **PIX Instantâneo Dinâmico:**
  - Geração de QR Code dinâmico e código "Copia e Cola" com expiração de 15 minutos sincronizada com o timer de reserva do estoque.
  - Confirmação automática via Webhook em segundos, liberando o pedido imediatamente.
- **Cartão de Crédito:**
  - Parcelamento em até 6x ou 12x.
  - Validação antifraude integrada com análise de risco.
- **Carteira Digital / Saldo ReVeste:**
  - Uso de créditos obtidos através de vendas anteriores ou estornos para abater no valor final.

### 8.2 Pagamento Seguro e Custódia (*Escrow*)
- O valor pago pelo comprador fica retido em custódia segura pela plataforma.
- O repasse ao vendedor só é liberado após:
  - 1. A confirmação de entrega pelo rastreamento dos Correios/transportadora;
  - 2. O término do prazo de conferência do comprador (48 horas após entrega sem abertura de disputas).
- Essa garantia elimina a desconfiança de compra em segunda mão pela internet.

---

## 📦 9. Módulo de Logística, Envios e Retirada Local

### 9.1 Integrações de Frete Nacional
- Integração com APIs de cotação de frete (**Correios, Melhor Envio, Jadlog e transportadoras privadas**).
- Cálculo dinâmico baseado no CEP de origem do vendedor e CEP de destino do comprador, somando peso e dimensões médias estimadas das roupas.
- Geração automática de:
  - **Etiqueta de Envio Padronizada em PDF** com código de barras;
  - **Declaração de Conteúdo pré-preenchida**, exigida pelos Correios.

### 9.2 Opção de Retirada Presencial ("Entrega em Mãos")
- Para compradores e vendedores da mesma região, o sistema permite optar por **"Retirada em Mãos"**.
- O frete torna-se R$ 0,00.
- A conclusão da entrega ocorre através de um **Código Seguro de Confirmação (OTP de 6 dígitos)**: ao se encontrarem em local público e seguro, o comprador passa o código ao vendedor, que o digita no app para validar a entrega e liberar o pagamento.

### 9.3 Rastreamento Completo do Ciclo de Vida do Pedido
Timeline visual com notificações em tempo real:
1. `Aguardando Pagamento`
2. `Pagamento Aprovado`
3. `Em Preparação / Aguardando Envio pelo Vendedor`
4. `Objeto Postado com Código de Rastreamento`
5. `Em Trânsito`
6. `Saiu para Entrega ao Destinatário`
7. `Entregue com Sucesso`
8. `Concluído e Repasse Liberado`

---

## 🔄 10. Módulo de Pós-Venda, Devoluções e Disputas

Atendimento integral ao Código de Defesa do Consumidor (CDC) para compras online:

### 10.1 Solicitação de Devolução Assistida
- O comprador tem até **7 dias corridos** após o recebimento para solicitar devolução de forma automatizada pelo sistema.
- **Motivos Estruturados:**
  - Peça não serviu / caimento inadequado;
  - Produto com defeito ou desgaste não informado no anúncio;
  - Produto diferente do anunciado;
  - Arrependimento de compra.
- **Upload Comprobatório:** Em caso de divergência ou defeito não declarado, o comprador anexa fotos e descrição detalhada.

### 10.2 Mediação e Logística Reversa
- O Administrador analisa o caso em painel específico.
- Aprovada a devolução, o sistema gera automaticamente uma autorização de postagem de logística reversa.
- Ao retornar ao vendedor, o estorno financeiro é processado ou convertido em créditos imediatos na carteira do comprador.

---

## 📊 11. Módulo de Inteligência Socioambiental (Eco-Dashboard)

O pilar sustentável do ReVeste não é apenas figurativo, mas baseado em métricas reais de engenharia ambiental:

### 11.1 Metodologia da Calculadora de Impacto Ambiental
A plataforma incorpora fatores médios científicos de economia por peça reaproveitada (evitando a fabricação de uma nova):

| Categoria da Peça | Água Economizada Média | CO₂ Evitado Médio | Resíduo Têxtil Mitigado |
| :--- | :--- | :--- | :--- |
| **Calça Jeans / Jaqueta Denim** | ~8.000 litros de água | ~13,0 kg de CO₂ | ~0,8 kg de tecido |
| **Camiseta / Blusa de Algodão** | ~2.700 litros de água | ~3,5 kg de CO₂ | ~0,2 kg de tecido |
| **Casaco Pesado / Lã / Moletom** | ~10.500 litros de água | ~18,0 kg de CO₂ | ~1,2 kg de tecido |
| **Vestido / Saia / Alfaiataria** | ~4.500 litros de água | ~7,0 kg de CO₂ | ~0,5 kg de tecido |
| **Calçados / Bolsas** | ~5.000 litros de água | ~15,0 kg de CO₂ | ~1,0 kg de material |

### 11.2 Dashboards e Compartilhamento
- **Placar Global na Página Inicial (Impactômetro):**
  - Contadores gigantes com animação numérica em tempo real:
    - 🌊 Total de Litros de Água Preservados.
    - 🍃 Toneladas de CO₂ Deixadas de Emitir.
    - 👕 Total de Peças Recirculadas pela Comunidade.
- **"Certificado Verde" Individual:**
  - No perfil de cada usuário, um card exibe o impacto ecológico acumulado de suas compras e desapegos.
  - Botão de exportação de imagem estilizada pronta para compartilhamento em redes sociais (*Instagram Stories, WhatsApp e LinkedIn*), promovendo o marketing orgânico e a conscientização.

---

## 🏆 12. Módulo de Gamificação, Selos e Reputação

### 12.1 Selos de Conquista para Vendedores
- 🌟 **Vendedor 5 Estrelas:** Média superior a 4.8 com mais de 20 vendas avaliadas.
- ⚡ **Despacho Relâmpago:** Posta as peças nos Correios em menos de 24 horas úteis.
- 🌿 **Brechó Circular Ouro:** Mais de 100 peças recirculadas na plataforma.
- 📦 **Embalagem Consciente:** Utiliza embalagens recicláveis ou reutilizadas certificadas pelos compradores.

### 12.2 Selos e Programa de Fidelidade para Compradores
- 🕵️‍♀️ **Garimpeiro Nato:** Mais de 5 compras de diferentes brechós.
- 🌊 **Guardião das Águas:** Economizou mais de 50.000 litros de água através de garimpos.
- **Eco-Pontos:** Cada compra gera pontos que podem ser trocados por cupons de desconto no frete das próximas compras.

---

## 📈 13. Módulo Administrativo, Governança e Relatórios (BI)

### 13.1 Painel de Moderação e Auditoria Contínua
- **Fila de Moderação:** Interface ágil para aprovação ou rejeição de novas peças cadastradas com justificativa de recusa ao vendedor.
- **Trilha de Auditoria Completa (*Audit Log*):**
  - Tabela relacional contendo: `log_id`, `user_id`, `action` (CREATE, UPDATE, DELETE, STATUS_CHANGE, LOGIN), `entity_name`, `entity_id`, `ip_address`, `user_agent`, `payload_before`, `payload_after` e `timestamp`.
  - Permite investigar fraudes, disputas ou modificações arbitrárias de preços e pedidos.

### 13.2 Painel Analítico de Negócios (Business Intelligence)
- **Métricas Financeiras:** Faturamento Bruto (GMV), Receita Líquida da taxa de intermediação (Take Rate), ticket médio e volume de transações.
- **Métricas de Inventário e Giro:**
  - Tempo médio de permanência da peça no estoque antes da venda.
  - Taxa de conversão de reservas no carrinho x compras concluídas.
  - Categorias, estilos e marcas mais buscadas e mais vendidas.
- **Exportação de Dados:**
  - Download de relatórios tabulares em **CSV / Excel**.
  - Emissão de relatórios executivos consolidados em **PDF** com cabeçalho institucional e gráficos resumidos.

---

## ⚙️ 14. Requisitos Não-Funcionais, Segurança e Padrões de Engenharia

| Requisito | Solução Técnica Adotada |
| :--- | :--- |
| **Performance e Latência** | Respostas de API REST inferiores a 200ms nas rotas comuns; uso de índices estratégicos no banco de dados e paginação de dados no catálogo. |
| **Concorrência e Integridade** | Transações atômicas com nível de isolamento adequado (`Read Committed` / `Serializable` em operações de checkout) para garantir unicidade estrita de estoque. |
| **Prevenção contra Ataques (OWASP)** | • Sanitização de dados de entrada e saídas (mitigação de **XSS**).<br>• Consultas 100% parametrizadas via ORM/Query Builder (mitigação de **SQL Injection**).<br>• Proteção contra **CSRF** e cabeçalhos de segurança HTTP com **Helmet**.<br>• Rate Limiting em rotas críticas (Login e Checkout) contra ataques de força bruta. |
| **Armazenamento de Imagens** | Compressão automática e conversão para formatos modernos e leves (**WebP/AVIF**), armazenadas em serviço de storage em nuvem (S3/Cloudinary/Local Storage configurável) com URLs públicas otimizadas. |
| **Documentação da API** | Documentação interativa e padronizada utilizando **Swagger / OpenAPI 3.0** com especificação de todos os endpoints, parâmetros, corpos de requisição e respostas de erro. |
| **Design Responsivo e Acessibilidade** | Interface 100% responsiva (Mobile-First), com conformidade com as diretrizes WCAG (contraste adequado, navegação por teclado e tags semânticas para leitores de tela). |

---

## 📋 15. Matriz Resumo de Todas as Funcionalidades do Sistema

Abaixo, a lista consolidada de todas as funcionalidades planejadas para o ReVeste:

```
[01] Autenticação segura (E-mail/Senha com BCrypt)
[02] Autenticação Social (Google Login)
[03] Gerenciamento de Sessão Stateless com JWT e Refresh Tokens
[04] Recuperação de senha com token expirável por e-mail
[05] Controle de Acesso Baseado em Papéis - RBAC (Cliente, Vendedor, Administrador)
[06] Validação de CPF/CNPJ e busca automática de endereço via ViaCEP
[07] Perfil do Comprador com cadastro de medidas corporais (Busto, Cintura, Quadril)
[08] Perfil do Vendedor com biografia, vitrine própria, reputação e selo de verificação
[09] Catálogo responsivo com paginação dinâmica e modo grade
[10] Busca textual rápida com autocomplete e tolerância a erros (Fuzzy Search)
[11] Filtros combinados (Categoria, Tamanho, Faixa de Preço, Tecido, Estilo/Vibe, Gênero)
[12] Filtro por Estado de Conservação Padronizado (Novo, Perfeito, Usado, Vintage)
[13] Ordenação por Preço, Recência, Relevância e Economia Ecológica
[14] Feed personalizado ("No Seu Tamanho") baseado nas medidas salvas do usuário
[15] Radar de Garimpo / Notificações personalizadas de novas peças cadastradas
[16] Ficha do produto com galeria de até 8 fotos em alta definição e zoom
[17] Suporte a vídeo curto (15s) de caimento e balanço da peça
[18] Tabela de medidas reais em centímetros com fita métrica na ficha do item
[19] Provador Virtual Inteligente com comparação automática das medidas da roupa x usuário
[20] Exibição de eco-impacto individual na página de cada produto
[21] Carrinho com lock transacional e timer regressivo de 15 minutos (Anti-Overselling)
[22] Liberação automática em background de peças reservadas após expiração do timer
[23] Notificação amigável para outros usuários quando uma peça desejada está sob reserva
[24] Funcionalidade "Abrir Sacolinha" (retenção e acúmulo de compras por até 30 dias)
[25] Fechamento e consolidação de frete unificado para múltiplos itens da mesma sacolinha
[26] Sistema de "Fazer Oferta" com contraproposta e limites percentuais de segurança
[27] Chat interno seguro entre comprador e vendedor com bloqueio de dados de contato
[28] Checkout transparente com integração de múltiplos endereços de entrega
[29] Pagamento via PIX dinâmico com expiração sincronizada e Webhook em tempo real
[30] Pagamento via Cartão de Crédito parcelado com análise antifraude
[31] Carteira virtual com saldo para estornos e compras
[32] Sistema de Custódia Financeira (Escrow) com repasse condicionado à entrega
[33] Cálculo automático de frete nacional via APIs de logística
[34] Opção de "Retirada Presencial em Mãos" com validação segura por código OTP
[35] Geração e impressão de Etiquetas de Envio e Declarações de Conteúdo em PDF
[36] Rastreamento ponta a ponta com notificações de status por e-mail e painel
[37] Módulo de devolução e arrependimento dentro de 7 dias com fotos comprobatórias
[38] Geração de autorização de postagem reversa para devoluções
[39] Onboarding guiado e formulário passo a passo para cadastro de peças pelo vendedor
[40] Sugestão inteligente de faixa de preço no cadastro com base no histórico do brechó
[41] Gestão de inventário de peças únicas (Rascunho, Disponível, Reservado, Vendido, Concluído)
[42] Extrato financeiro do vendedor com previsão de repasse e retenção de comissão
[43] Fila de moderação de anúncios para administradores
[44] Central de mediação e resolução de disputas entre comprador e vendedor
[45] Trilha de Auditoria detalhada (Audit Logs) com IP, User-Agent e histórico de alterações
[46] Painel analítico de sustentabilidade com calculadora de água economizada e CO₂ evitado
[47] Impactômetro global na Home com métricas em tempo real de impacto ambiental
[48] Emissão de "Certificado Verde" personalizado e compartilhável para redes sociais
[49] Sistema de Gamificação com selos de reputação para vendedores e compradores
[50] Programa de Eco-Pontos conversíveis em cupons de desconto
[51] Dashboard gerencial de BI com faturamento, comissões, churn e tempo de giro de estoque
[52] Exportação de relatórios gerenciais em formatos CSV, Excel e PDF consolidado
[53] Compressão e otimização de imagens em formatos modernos (WebP/AVIF)
[54] Documentação interativa completa de endpoints da API via Swagger / OpenAPI
```

---

## 📚 Documentos Relacionados
- 📚 [**Central de Documentação (Índice Geral)**](./README.md): Mapa completo de navegação.
- 📄 [**01. Briefing Oficial do Projeto**](./briefing.md): Contexto, problema e justificativa socioambiental.
- 📐 [**03. Arquitetura e Fluxos Transacionais**](./arquitetura-e-fluxos.md): Diagramas Mermaid de locks, sacolinha e estados.
- 🗄️ [**04. Modelagem do Banco de Dados**](./modelagem-dados.md): DER relacional, dicionário de dados e auditoria.
