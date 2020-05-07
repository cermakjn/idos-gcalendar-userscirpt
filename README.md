# IDOS - Přidat spojení do Google kalendáře

Userscript pro rozšíření prohlížečů jako je Greasemonkey či Tampermonkey.

Userscript přidá do IDOSu k vyhledanému spojení nové tlačítko "Uložit do Google kalendáře". 
![Nové tlačítko v detailu spojení IDOSu](/docs/images/idos-button.png?raw=true)

Po kliknutí na něj se předvyplní založení nové události v Google kalendáři.
![Ukázka události v Google kalendáři](/docs/images/google-calendar-event.png?raw=true)


## Známé problémy

 - Pokud spojení zasahuje do více jak jednoho dne (např.: začátek je v podělí a konec ve středu), v kalendáři bude jako konečné datum úterý.
 - Při hledání události v jiném roce se použije aktuální rok. Netýká se spojení přes půlnoc 31.12. stávajícího roku, to funguje v pořádku.