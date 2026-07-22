$ErrorActionPreference = 'Stop'

$projectRoot = [IO.Path]::GetFullPath((Join-Path $PSScriptRoot '..'))
$source = [IO.Path]::GetFullPath((Join-Path $projectRoot 'public'))
$destination = [IO.Path]::GetFullPath((Join-Path $projectRoot 'dist'))

if (-not $destination.StartsWith($projectRoot, [StringComparison]::OrdinalIgnoreCase) -or
    [IO.Path]::GetFileName($destination) -ne 'dist') {
    throw "Destino de build inseguro: $destination"
}

if (-not (Test-Path -LiteralPath $source -PathType Container)) {
    throw "Diretorio de origem nao encontrado: $source"
}

& node (Join-Path $PSScriptRoot 'generate-pages.mjs') $source
if ($LASTEXITCODE -ne 0) {
    throw "Falha ao gerar as paginas estaticas."
}

New-Item -ItemType Directory -Path $destination -Force | Out-Null
Get-ChildItem -LiteralPath $destination -Force | Remove-Item -Recurse -Force
Copy-Item -Path (Join-Path $source '*') -Destination $destination -Recurse -Force
Copy-Item -LiteralPath (Join-Path $source '.htaccess') -Destination (Join-Path $destination '.htaccess') -Force

& node (Join-Path $PSScriptRoot 'audit-site.mjs') $destination
if ($LASTEXITCODE -ne 0) {
    throw "Falha na auditoria do site gerado."
}

$files = Get-ChildItem -LiteralPath $destination -Recurse -File
Write-Host ("Build concluido: {0} arquivos em {1}" -f $files.Count, $destination)
