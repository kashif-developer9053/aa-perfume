$files = @(
    "components\customer-reviews.jsx",
    "components\footer.jsx",
    "components\newsletter-section.jsx",
    "components\our-story.jsx",
    "components\testimonial-section.jsx",
    "app\about\page.jsx",
    "app\layout.jsx",
    "app\contact\page.jsx",
    "app\page.jsx"
)

$base = "c:\Users\kashi\OneDrive\Documents\perfume\chocolate-factory"

foreach ($file in $files) {
    $path = Join-Path $base $file
    $content = [System.IO.File]::ReadAllText($path)
    $content = $content -replace 'AyeshaAslam', 'Aslam Baig Fragrance'
    $content = $content -replace 'Ayesha Aslam', 'Aslam Baig Fragrance'
    [System.IO.File]::WriteAllText($path, $content)
    Write-Host "Updated: $file"
}
Write-Host "Done."
