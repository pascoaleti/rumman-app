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

New-Item -ItemType Directory -Path $destination -Force | Out-Null
Get-ChildItem -LiteralPath $destination -Force | Remove-Item -Recurse -Force
Copy-Item -Path (Join-Path $source '*') -Destination $destination -Recurse -Force
Copy-Item -LiteralPath (Join-Path $source '.htaccess') -Destination (Join-Path $destination '.htaccess') -Force

$files = Get-ChildItem -LiteralPath $destination -Recurse -File
Write-Host ("Build concluido: {0} arquivos em {1}" -f $files.Count, $destination)
