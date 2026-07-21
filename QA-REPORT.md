# Relatorio de qualidade - Rumman site 0.1.0

Data: 21 de julho de 2026.

## Lighthouse mobile

Auditoria local da home em Chromium headless, viewport 390 x 844:

| Categoria | Resultado | Meta |
|---|---:|---:|
| Performance | 99 | >= 90 |
| Accessibility | 100 | >= 95 |
| Best Practices | 100 | >= 95 |
| SEO | 100 | >= 95 |

Observacao: o Lighthouse estimou cerca de 5 KiB de economia com minificacao de CSS. O resultado de Performance permaneceu em 99 e o CSS fonte foi preservado legivel para manutencao.

## Teste visual e responsivo

Larguras verificadas nos temas claro e escuro: 320, 360, 390, 768, 1024 e 1440 px.

- nenhuma rolagem horizontal;
- nenhuma sobreposicao ou texto cortado;
- margens laterais consistentes;
- menu compacto em desktop e menu recolhido em celular;
- ciclo guiado estavel entre os breakpoints;
- contraste de botoes e CTAs ajustado para fundos profundos no tema escuro;
- pagina legal com sumario responsivo e seletor de idioma sem colisao.

## Rotas e semantica

- home, quatro idiomas da Privacidade, Exclusao de Conta e 404 carregadas localmente;
- `lang`, `title`, H1, canonical e robots conferidos;
- 404 com `noindex, follow`;
- conteudo essencial disponivel sem JavaScript;
- menu movel anuncia abrir/fechar no idioma da pagina;
- nenhum erro ou aviso no console durante a auditoria.

## Conteudo e rede

- zero capturas provisórias, mockups de celular ou telas falsas;
- zero trackers, cookies nao essenciais ou chamadas para terceiros;
- fontes, imagens, CSS e JavaScript hospedados localmente;
- nenhuma ocorrencia publica de credenciais, e-mail pessoal, `workers.dev` ou hostname da API;
- placeholders legais bloqueados fora do build.

## Validacao de producao

Producao verificada em `https://rumman.app.br` depois do deploy:

- home, quatro idiomas da Privacidade, Exclusao de Conta, `robots.txt`, `sitemap.xml` e manifesto retornam HTTP 200;
- rota inexistente retorna HTTP 404 com pagina propria e `noindex`;
- `/privacy` e `/delete-account` redirecionam com HTTP 301;
- HTTPS, host canonico, CSP, `nosniff`, Referrer Policy, Permissions Policy e cache foram conferidos;
- viewport real de 390 x 844 sem overflow e sem erros ou avisos no console;
- recebimento em `e-mail@rumman.app.br` e envio para `devs@pascoal.eti.br` validados no servidor;
- SPF, DKIM, DMARC e MX conferidos no DNS.

O Lighthouse da build foi executado localmente porque a verificacao automatizada do hostname publico aciona a protecao contra bots da Cloudflare e passa a medir a pagina de desafio, nao o HTML publicado. A navegacao comum pelo dominio entrega o site correto, com metadados, conteudo e assets locais.
