
# Script para procesar HTML de Stitch y extraer CSS
$lightHtmlPath = "c:\Users\nesto\OneDrive\Escritorio\Me\proyectos\my-portfolio\src\assets\stitch-light.html"
$darkHtmlPath = "c:\Users\nesto\OneDrive\Escritorio\Me\proyectos\my-portfolio\src\assets\stitch-dark.html"
$outputDir = "c:\Users\nesto\OneDrive\Escritorio\Me\proyectos\my-portfolio\src\assets"

# Leer archivos
$lightHtml = Get-Content $lightHtmlPath -Raw
$darkHtml = Get-Content $darkHtmlPath -Raw

# Extraer contenido entre <body> y </body>
function Extract-BodyContent($html, $mode) {
    $bodyStart = $html.IndexOf('<body')
    $bodyStart = $html.IndexOf('>', $bodyStart) + 1
    $bodyEnd = $html.LastIndexOf('</body>')
    return $html.Substring($bodyStart, $bodyEnd - $bodyStart)
}

$lightBody = Extract-BodyContent $lightHtml "light"
$darkBody = Extract-BodyContent $darkHtml "dark"

# Guardar contenido del body
$lightBody | Out-File "$outputDir\body-light.html" -Encoding UTF8
$darkBody | Out-File "$outputDir\body-dark.html" -Encoding UTF8

Write-Host "✓ Light body extracted: $($lightBody.Length) chars"
Write-Host "✓ Dark body extracted: $($darkBody.Length) chars"

# Extraer <head>
function Extract-Head($html) {
    $headStart = $html.IndexOf('<head')
    $headStart = $html.IndexOf('>', $headStart) + 1
    $headEnd = $html.LastIndexOf('</head>')
    return $html.Substring($headStart, $headEnd - $headStart)
}

$headLight = Extract-Head $lightHtml

# Guardar head (es similar en ambos)
$headLight | Out-File "$outputDir\head.html" -Encoding UTF8
Write-Host "✓ Head extracted: $($headLight.Length) chars"
