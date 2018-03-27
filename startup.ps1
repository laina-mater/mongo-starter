param($mongoLocation, $dbPathLocation)

Write-Host "Executing startup.ps1"
Set-Variable -Name "defaultMongoLocation" -Value "`"C:\Program Files\MongoDB\Server\3.6\bin`""
Set-Variable -Name "defaultDbPath" -Value ""

Write-Host "db path location variable: " $dbPathLocation
if ("$($dbPathLocation)" -ne ""){
 $defaultDbPath = "$($dbPathLocation)"
}

Set-Variable -Name "startMongo" -Value ".\mongod.exe --dbpath `"$($defaultDbPath)`""
Write-Host "mongo location variable: " $mongoLocation
if ("$($mongoLocation)" -ne ""){
 $defaultMongoLocation = "$($mongoLocation)"
}

Set-Variable -Name "setLocation" -Value "Set-Location -Path `"$($defaultMongoLocation)`""

Write-Host "Set Location variable: " $setLocation
Write-Host "Full command: " $startMongo

iex $setLocation
iex $startMongo