# Rumman - site institucional

Site estatico oficial do **Rumman - ERP Inteligente Guiado**, preparado para `https://rumman.app.br`.

## Escopo

- apresentacao comercial responsiva em tema claro e escuro;
- home sem capturas provisórias, mockups de celular ou telas inventadas;
- Politica de Privacidade em portugues, ingles, espanhol e frances;
- pagina oficial de exclusao de conta e dados;
- SEO tecnico, Open Graph, JSON-LD, sitemap, robots, manifest e 404;
- headers de seguranca, cache, compressao e redirects para Apache/Virtualmin;
- fontes Inter e Sora locais, licenciadas sob SIL Open Font License 1.1.

## Estrutura

```text
public/       fonte estatico publicado
dist/         build pronto para o Virtualmin
scripts/      build e servidor local
proof/        evidencias internas; nunca entra no repositorio publico
qa-output/    relatorios locais; ignorados pelo Git
```

## Executar localmente

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build.ps1
node .\scripts\dev-server.mjs .\dist 8766
```

Acesse `http://127.0.0.1:8766/`.

## Build

O build e deterministico e apenas copia os arquivos aprovados de `public/` para `dist/`. O script valida se o destino resolvido continua dentro deste projeto antes de limpar a pasta.

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\build.ps1
```

## Capturas futuras do aplicativo

`public/screenshots/` permanece sem telas nesta versao. Quando existir um conjunto final aprovado:

1. exporte derivados AVIF e WebP a partir das capturas originais;
2. preserve proporcao e dimensoes declaradas;
3. substitua somente o bloco `.guided-visual` da hero por um `<picture>` responsivo;
4. use `loading="eager"` apenas para a imagem da hero e `loading="lazy"` nas demais;
5. repita a auditoria visual, de console e Lighthouse.

Arquivos de emulador, QA, `tmp`, `build`, anexos de conversa, mockups e telas inventadas nao sao aprovados para publicacao.

## Rotas

- `/`
- `/privacidade`
- `/en/privacy`
- `/es/privacidad`
- `/fr/confidentialite`
- `/excluir-conta`
- `/privacy` redireciona para `/privacidade`
- `/delete-account` redireciona para `/excluir-conta`

### Termos de Uso

`/termos` nao integra o build atual. O documento canonico exige nome ou razao social, CPF/CNPJ e endereco completo do fornecedor. A rota somente pode ser criada e publicada depois que o proprietario fornecer e aprovar esses dados, sem placeholders.

## Qualidade

Consulte [QA-REPORT.md](QA-REPORT.md). A medicao Lighthouse mobile da home obteve 99/100/100/100. O projeto nao usa cookies nao essenciais, trackers, CDN de fontes, banco de dados ou chamadas ao backend do aplicativo.

## Licenca

O codigo e o conteudo do site seguem [LICENSE](LICENSE). As licencas das fontes estao em `public/assets/fonts/`.
