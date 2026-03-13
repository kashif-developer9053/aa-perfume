$dir = "c:\Users\kashi\OneDrive\Documents\perfume\chocolate-factory\app\admin"
Get-ChildItem -Path $dir -Recurse -Include "*.jsx","*.tsx" | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $content = $content -replace 'text-\[#555\]', 'text-[#888]'
    $content = $content -replace 'text-\[#444\]', 'text-[#777]'
    $content = $content -replace 'text-\[#333\]', 'text-[#777]'
    $content = $content -replace 'text-\[#a1a1a1\]', 'text-[#c0c0c0]'
    $content = $content -replace 'placeholder-\[#555\]', 'placeholder-[#666]'
    Set-Content -Path $_.FullName -Value $content -NoNewline
    Write-Host "Updated: $($_.Name)"
}
Write-Host "All done."
