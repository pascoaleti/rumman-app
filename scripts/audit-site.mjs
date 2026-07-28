import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative, resolve, sep } from 'node:path';

const root = resolve(process.argv[2] || new URL('../dist', import.meta.url).pathname);
const failures = [];
const htmlFiles = [];
const requiredScreens = [
  '01-visao-geral.webp',
  '02-fluxo-guiado.webp',
  '03-catalogo.webp',
  '04-clientes.webp',
  '05-financeiro.webp',
  '06-estoque.webp',
  '07-locacoes.webp',
  '08-assistente.webp'
];
const requiredRoutes = [
  '/',
  '/recursos',
  '/como-funciona',
  '/como-usar',
  '/casos-de-uso',
  '/planos',
  '/faq',
  '/blog',
  '/privacidade',
  '/termos',
  '/excluir-conta',
  '/suporte',
  '/en',
  '/en/features',
  '/en/how-it-works',
  '/en/how-to-use',
  '/en/use-cases',
  '/en/plans',
  '/en/faq',
  '/en/blog',
  '/en/privacy',
  '/en/terms',
  '/en/delete-account',
  '/en/support',
  '/es',
  '/es/funciones',
  '/es/como-funciona',
  '/es/como-usar',
  '/es/casos-de-uso',
  '/es/planes',
  '/es/preguntas-frecuentes',
  '/es/blog',
  '/es/privacidad',
  '/es/terminos',
  '/es/eliminar-cuenta',
  '/es/soporte',
  '/fr',
  '/fr/fonctionnalites',
  '/fr/fonctionnement',
  '/fr/mode-emploi',
  '/fr/cas-usage',
  '/fr/forfaits',
  '/fr/questions-frequentes',
  '/fr/blog',
  '/fr/confidentialite',
  '/fr/conditions',
  '/fr/supprimer-compte',
  '/fr/assistance'
];

function walk(directory) {
  for (const name of readdirSync(directory)) {
    const target = join(directory, name);
    const stats = statSync(target);
    if (stats.isDirectory()) walk(target);
    else if (!name.startsWith('.') && !extname(name)) htmlFiles.push(target);
  }
}

function routeFor(file) {
  const local = relative(root, file).split(sep).join('/');
  if (local === 'index') return '/';
  if (local.endsWith('/index')) return `/${local.slice(0, -6)}`;
  return `/${local}`;
}

function count(html, pattern) {
  return [...html.matchAll(pattern)].length;
}

function internalTargetExists(href) {
  const pathname = href.split('#')[0].split('?')[0];
  if (!pathname || pathname === '/') return existsSync(join(root, 'index'));
  const target = join(root, pathname.replace(/^\//, ''));
  return existsSync(target) || existsSync(join(target, 'index'));
}

walk(root);

for (const file of htmlFiles) {
  const route = routeFor(file);
  const html = readFileSync(file, 'utf8');
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];

  if (!title) failures.push(`${route}: title ausente`);
  if (!description) failures.push(`${route}: meta description ausente`);
  if (!canonical) failures.push(`${route}: canonical ausente`);
  if (count(html, /<h1\b/gi) !== 1) failures.push(`${route}: deve conter exatamente um H1`);
  if (/\son(?:click|load|error|submit)=/i.test(html)) failures.push(`${route}: evento inline encontrado`);
  if (/\sstyle=/i.test(html)) failures.push(`${route}: estilo inline encontrado`);
  if (/"@type"\s*:\s*"Offer"/i.test(html)) failures.push(`${route}: oferta comercial ativa encontrada`);
  if (/disponível para download no Google Play|baixe agora|instale agora|assine agora/i.test(html)) {
    failures.push(`${route}: promessa prematura de disponibilidade encontrada`);
  }
  if (/prepara(?:ção|cao) para testes fechados|being prepared for closed testing|preparaci[oó]n para pruebas cerradas|pr[eé]paration (?:aux|pour les) tests ferm[eé]s/i.test(html)) {
    failures.push(`${route}: estado antigo de testes fechados encontrado`);
  }
  if (/@gmail\.com|BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY|(?:api[_-]?key|secret|password|passwd)\s*[:=]/i.test(html)) {
    failures.push(`${route}: possível dado sensível encontrado`);
  }

  for (const match of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)) {
    const openTag = match[0].slice(0, match[0].indexOf('>') + 1);
    if (!/type="application\/ld\+json"/i.test(openTag)) {
      failures.push(`${route}: script inline não estruturado`);
      continue;
    }
    try {
      JSON.parse(match[1]);
    } catch {
      failures.push(`${route}: JSON-LD inválido`);
    }
  }

  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/gi)) {
    const href = match[1];
    if (href.startsWith('/') && !internalTargetExists(href)) {
      failures.push(`${route}: destino interno inexistente ${href}`);
    }
  }
}

const sitemap = readFileSync(join(root, 'sitemap.xml'), 'utf8');
const sitemapUrls = count(sitemap, /<url>/g);
if (sitemapUrls !== htmlFiles.length - 1) {
  failures.push(`sitemap: ${sitemapUrls} URLs para ${htmlFiles.length - 1} páginas indexáveis`);
}

const generatedRoutes = new Set(htmlFiles.map(routeFor));
for (const route of requiredRoutes) {
  if (!generatedRoutes.has(route)) failures.push(`${route}: rota obrigatória ausente`);
}

for (const screen of requiredScreens) {
  const screenPath = join(root, 'screenshots', screen);
  if (!existsSync(screenPath)) failures.push(`screenshots/${screen}: tela final ausente`);
}

const guide = readFileSync(join(root, 'como-usar'), 'utf8');
for (const screen of requiredScreens) {
  if (!guide.includes(`/screenshots/${screen}`)) {
    failures.push(`/como-usar: tela final não referenciada ${screen}`);
  }
}

const home = readFileSync(join(root, 'index'), 'utf8');
if (!/Em testes fechados no Google Play/i.test(home)) {
  failures.push('/: estado real de testes fechados ausente');
}

if (failures.length) {
  process.stderr.write(`${failures.join('\n')}\n`);
  process.exit(1);
}

process.stdout.write(`Auditoria concluída: ${htmlFiles.length} páginas, ${sitemapUrls} URLs indexáveis e links internos válidos.\n`);
