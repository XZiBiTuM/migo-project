Start-Job -ScriptBlock { cd 'd:\migo\migo-frontend'; npm.cmd start }
Start-Sleep -Seconds 15
npx.cmd lighthouse http://localhost:3000 --output=json --output-path='d:\migo\lcp_v3.json' --chrome-flags='--headless'
Stop-Process -Name node -Force -ErrorAction SilentlyContinue
