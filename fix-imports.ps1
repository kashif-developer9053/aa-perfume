$dir = "c:\Users\kashi\OneDrive\Documents\perfume\chocolate-factory\app"
Get-ChildItem -Path $dir -Recurse -Include "*.js","*.ts","*.jsx","*.tsx" | ForEach-Object {
    $content = [System.IO.File]::ReadAllText($_.FullName)
    if ($content -match '@/app/lib/') {
        $newContent = $content -replace '@/app/lib/', '@/app/api/lib/'
        [System.IO.File]::WriteAllText($_.FullName, $newContent)
        Write-Host "Fixed: $($_.Name)"
    }
}
Write-Host "Done."
