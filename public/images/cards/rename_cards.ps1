# PowerShell script to rename card files to consistent naming pattern
# This script will rename all card files to follow the pattern: card_{id}_{name}.png

Write-Host "Starting card file renaming process..." -ForegroundColor Green

# Get all PNG files in the current directory
$cardFiles = Get-ChildItem -Path "." -Filter "*.png" | Where-Object { $_.Name -like "card_*" }

Write-Host "Found $($cardFiles.Count) card files to process" -ForegroundColor Yellow

$renamedCount = 0
$skippedCount = 0

foreach ($file in $cardFiles) {
    $currentName = $file.Name
    
    # Extract card ID and name from filename
    if ($currentName -match "^card_(\d+)_(.+)\.png$") {
        $cardId = $matches[1]
        $cardName = $matches[2]
        
        # Fix capitalization - capitalize first letter of each word
        $words = $cardName -split '_'
        $capitalizedWords = @()
        foreach ($word in $words) {
            if ($word.Length -gt 0) {
                $capitalizedWords += $word.Substring(0,1).ToUpper() + $word.Substring(1).ToLower()
            }
        }
        $newCardName = $capitalizedWords -join ''
        
        $newName = "card_${cardId}_${newCardName}.png"
        
        if ($currentName -ne $newName) {
            try {
                Rename-Item -Path $file.FullName -NewName $newName -Force
                Write-Host "Renamed: $currentName -> $newName" -ForegroundColor Green
                $renamedCount++
            }
            catch {
                Write-Host "Error renaming $currentName : $($_.Exception.Message)" -ForegroundColor Red
            }
        } else {
            Write-Host "Skipped (already correct): $currentName" -ForegroundColor Yellow
            $skippedCount++
        }
    } else {
        Write-Host "No mapping found for: $currentName" -ForegroundColor Red
    }
}

Write-Host "`nRenaming complete!" -ForegroundColor Green
Write-Host "Files renamed: $renamedCount" -ForegroundColor Cyan
Write-Host "Files skipped: $skippedCount" -ForegroundColor Cyan
Write-Host "Total processed: $($cardFiles.Count)" -ForegroundColor Cyan
