# IDOS - Přidat spojení do Google kalendáře

[![Build Status](https://travis-ci.com/cermakjn/idos-gcalendar-userscirpt.svg?branch=master)](https://travis-ci.com/cermakjn/idos-gcalendar-userscirpt)

## Instalace

UserScript pro rozšíření [Greasemonkey do Firefoxu](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/) či [Tampermonkey do Google Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) instalujte z těchto zdrojů:

 - [OpenUserJS](https://openuserjs.org/scripts/cermakjn/IDOS_%E2%80%93_Ulo%C5%BEit_spojen%C3%AD_do_Google_Kalend%C3%A1%C5%99e)
 - [GreasyFork](https://greasyfork.org/en/scripts/402817-idos-ulo%C5%BEit-spojen%C3%AD-do-google-kalend%C3%A1%C5%99e)
 - [GitHub](https://raw.githubusercontent.com/cermakjn/idos-gcalendar-userscirpt/master/src/idos-add-to-gcalendar.user.js)

## Použití

Userscript pro rozšíření prohlížečů jako je Greasemonkey či Tampermonkey.

Userscript přidá do IDOSu k vyhledanému spojení nové tlačítko "Uložit do Google kalendáře". 
![Nové tlačítko v detailu spojení IDOSu](https://raw.githubusercontent.com/cermakjn/idos-gcalendar-userscirpt/master/docs/images/idos-button.png)

Po kliknutí na něj se předvyplní založení nové události v Google kalendáři.
![Ukázka události v Google kalendáři](https://raw.githubusercontent.com/cermakjn/idos-gcalendar-userscirpt/master/docs/images/google-calendar-event.png)


## Známé problémy

 - Pokud spojení zasahuje do více jak jednoho dne (např.: začátek je v podělí a konec ve středu), v kalendáři bude jako konečné datum úterý.
 - Při hledání události v jiném roce se použije aktuální rok. Netýká se spojení přes půlnoc 31.12. stávajícího roku, to funguje v pořádku.