# Relatório de qualidade - Rumman site 0.2.0

Data: 22 de julho de 2026.

## Lighthouse

Auditoria local da home em Chromium headless:

| Categoria | Resultado | Meta |
|---|---:|---:|
| Performance | 99 | >= 90 |
| Accessibility | 100 | >= 95 |
| Best Practices | 100 | >= 95 |
| SEO | 100 | >= 95 |

- FCP: 1,1 s;
- LCP: 1,8 s;
- TBT: 0 ms;
- CLS: 0.

## Teste visual e responsivo

Temas claro e escuro auditados em desktop e celular.

- nenhuma rolagem horizontal;
- nenhuma sobreposição ou texto cortado;
- margens laterais consistentes;
- menu completo em desktop e menu recolhido em celular;
- símbolo vetorial transparente e sem moldura no cabeçalho e nas seções de marca;
- artigos com imagem pequena no topo, breadcrumb responsivo e leitura sem compressão;
- contraste de botões e CTAs ajustado para fundos profundos no tema escuro;
- página legal com sumário responsivo e seletor de idioma sem colisão.

## Rotas e semântica

- home, Recursos, Como funciona, Planos, FAQ, Blog, dez artigos, quatro idiomas da Privacidade, Exclusão de Conta e 404 carregadas localmente;
- `lang`, `title`, H1, canonical e robots conferidos;
- 404 com `noindex, follow`;
- conteúdo essencial disponível sem JavaScript;
- menu móvel anuncia abrir/fechar no idioma da página;
- nenhum erro ou aviso no console durante a auditoria;
- build automatizado validou 22 páginas, 21 URLs indexáveis, JSON-LD e links internos.

## Conteúdo e rede

- zero capturas provisórias, mockups de celular ou telas falsas;
- símbolo SVG derivado da marca canônica e registrado no repositório privado;
- zero trackers, cookies não essenciais ou chamadas para terceiros;
- fontes, imagens, CSS e JavaScript hospedados localmente;
- nenhuma ocorrência pública de credenciais, e-mail pessoal, `workers.dev` ou hostname da API;
- placeholders legais bloqueados fora do build.

## Segurança

- CSP sem `unsafe-inline`;
- hashes SHA-256 calculados automaticamente para cada JSON-LD;
- `nosniff`, proteção contra framing, Referrer Policy e Permissions Policy;
- HTML sem atributos de evento, estilos inline ou scripts executáveis inline.

## Validação de produção

- domínio oficial, páginas comerciais, blog, artigos, políticas, exclusão de conta, feed, sitemap, SVG e 404 verificados;
- `/blog/` retorna HTTP 200 com canonical e sitemap alinhados;
- HTML usa `no-cache` e assets versionados usam cache imutável;
- CSP, HSTS, `nosniff`, proteção contra framing, Referrer Policy e Permissions Policy presentes;
- desktop e viewport de 390 x 844 sem overflow;
- nenhum erro ou aviso no console do navegador em produção.
