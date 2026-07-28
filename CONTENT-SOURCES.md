# Fontes de conteúdo

Este mapa registra a origem das afirmações públicas e evita promessas não sustentadas.

| Área publicada | Fonte canônica |
|---|---|
| Posicionamento, público e ciclo guiado | `docs/product-strategy.md`, `docs/ui-direction.md` e `docs/handoffs/JOW22_SITE_FINAL_PRODUCTION_UPDATE.md` |
| Nome, slogan, símbolo, paleta e tipografia | `docs/brand/brand-system.md` e assets canônicos do design system |
| SEO, descrição comercial e FAQ | `docs/play-store/store-listing-pt-BR.md` e `docs/prompts/SITE_RUMMAN_APP_BR.md` |
| Painel, clientes, catálogo, kits, orçamentos, ordens, estoque por local, compras, locações e financeiro | `README.md`, `docs/erp-production-scope.md`, handoff final e validações existentes do aplicativo |
| Scanner, OCR, documentos multipágina e exportações | `README.md` e `docs/play-store/store-listing-pt-BR.md` |
| Assistente com texto, voz, anexos, memória, histórico, favoritos e pesquisa | `README.md`, `docs/product-strategy.md` e `docs/play-store/privacy-policy.md` |
| Local-first, privacidade, ausência de anúncios e tratamento da IA | `docs/play-store/privacy-policy.md` e `docs/play-store/data-safety.md` |
| Planos, cotas, usuários, preços e avaliação de 15 dias | `docs/prompts/SITE_RUMMAN_APP_BR.md` e estratégia aprovada do produto |
| Exclusão de conta, dados removidos e prazo | `docs/play-store/account-deletion.md` |
| Política de Privacidade PT | `docs/play-store/privacy-policy.md` |
| Política de Privacidade EN, ES e FR | tradução fiel da política canônica em português, sem ampliar tratamento ou finalidade |
| Estado de testes fechados e oferta inicial Brasil/PT-BR | `docs/handoffs/JOW4_EXTERNAL_GATES_READY.md` e handoff final do site |
| Capturas do aplicativo | oito artes finais em `release-assets/play-store/final`, produzidas com telas reais e dados sintéticos |
| Artigos sobre fluxo de caixa, estoque e planejamento | materiais públicos do Sebrae e da CAIXA, ligados ao fim de cada artigo |
| Artigo sobre privacidade em ERP | regulamentação e guia para pequenos agentes publicados pela ANPD |

## Assets visuais

Os elementos de marca publicados derivam dos assets canônicos do design system:

- `core/designsystem/src/main/res/drawable-nodpi/rumman_brand_lockup.png`;
- `core/designsystem/src/main/res/drawable-nodpi/rumman_brand_mark_final.png`;
- `core/designsystem/src/main/res/drawable-nodpi/rumman_brand_mark_transparent.png`.

As oito imagens WebP em `public/screenshots` são versões otimizadas das artes finais da Play Store. A conversão preserva proporção, conteúdo e valores exibidos; nenhuma tela foi inventada ou redesenhada para o site.

## Restrições deliberadas

O site não anuncia nota fiscal, contabilidade fiscal, Open Finance, conciliação bancária em tempo real, WhatsApp operacional, voz neural pronta, iOS, plano gratuito permanente, IA ilimitada, armazenamento ilimitado, IA tomando decisões sozinha ou disponibilidade pública antes da liberação no Google Play.

## Termos bloqueados

`docs/play-store/terms-of-use.md` é a fonte canônica. A versão pública foi revisada sem placeholders de CPF ou CNPJ e mantém o estado real de testes fechados.
