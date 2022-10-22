# Dominos Bot
## Funktionen
- Get 30% Gutschein von Seite
- sendMessage über telegram an chat mit dem aktuellen gutschein
- get gutschein automatisch alle 8h (cron) -- rate limit schutz

## How to use
- Config Datei zu config.json umbenennen
- Config Datei ausfüllen
- node main.js im terminal eingeben

## Funktionsweise
- Starte Bot
- Hole Coupon Code und speichere in const coupon.code
- Wenn nicht neugestartet, dann keine neue API Abfrage (prevent spamming the dominos site)
- Cron Job holt sich alle 8h den neusten Code
- tg anschreiben mit /coupon
- bekomme coupon und spaß haben!