# Hundpensionat-Tassen

Det här projektet är en hemsida för ett fiktivt hunddagis och hundpensionat som heter Tassen. Syftet med sidan är att besökaren enkelt ska kunna hitta information om verksamheten, se öppettider och priser samt göra en bokningsförfrågan.

Hemsidan är byggd med HTML, CSS och JavaScript.

## Starta sidan

För att starta hemsidan öppnar man index.html i webbläsaren. Det går även att använda Live Server i VS Code.

Filerna index.html, style.css och app.js ska ligga i samma mapp. Bilden på hemsidan ligger i mappen bilder.

## Funktioner

På hemsidan finns bland annat följande funktioner:

En klocka som visar aktuell tid och datum.

En funktion som kontrollerar om hundpensionatet har öppet eller stängt.

Ett formulär där besökaren kan spara en bokningsförfrågan.

Möjlighet att ta bort tidigare bokningsförfrågningar.

Bokningar sparas med localStorage så att de finns kvar efter att sidan laddas om.

Kundomdömen som slumpas fram när man trycker på en knapp.

Bokningarna sparas endast i webbläsaren och skickas inte till någon server.

## Min reflektion

Det jag tyckte var svårast var att få JavaScript att fungera tillsammans med HTML, framför allt när det gäller bokningsformuläret. Det var flera saker som behövde fungera tillsammans, som att hämta värden från formuläret, lägga till dem i en array och sedan visa dem på sidan.

Jag har fått en bättre förståelse för hur DOM fungerar och hur man kan använda JavaScript för att ändra innehållet på en hemsida utan att behöva ladda om den.

Jag har även lärt mig mer om localStorage och hur man kan spara information som ska finnas kvar när användaren besöker sidan igen.

## En bugg jag löste

När jag ändrade namn på mina ID i HTML fick jag problem med att JavaScript inte hittade vissa element. Jag gick igenom koden och använde DevTools för att undersöka vad som orsakade problemet. Jag jämförde mina getElementById i JavaScript med motsvarande ID i HTML och såg att namnen behövde stämma överens. Efter att jag rättade namnen fungerade kopplingen mellan HTML och JavaScript igen.

## Scope och this

I min JavaScript har jag skapat en klass som heter Bokningar. I klassen använder jag this.bokningar för att komma åt den array som tillhör objektet.

När jag skapar ett objekt med new Bokningar() körs klassens constructor, som hämtar tidigare bokningar från localStorage eller skapar en tom array. Metoderna laggTill() och taBort() använder this för att arbeta med samma array. På så sätt behöver jag inte skapa en ny array varje gång jag vill lägga till eller ta bort något.

## Varför jag valde dessa lösningar

### Grid och Flexbox

Jag har använt både Grid och Flexbox för att bygga sidans layout. Grid passar bra när jag vill placera flera delar bredvid varandra, exempelvis korten som visar de olika tjänsterna.

Flexbox har jag använt för bland annat navigeringen och andra delar där innehållet behöver placeras i en rad. Jag har även använt media queries för att anpassa sidan till mindre skärmar.

### forEach

Jag använder forEach för att gå igenom bokningarna i min array och visa dem på hemsidan.

Jag valde forEach eftersom jag vill göra samma sak med varje bokning, alltså skapa HTML-element som visar hundens namn, datum och vald tjänst. Jag använder även arrayens index för att veta vilken bokning som ska tas bort när användaren klickar på avboka.

### Array och objekt

Jag sparar alla bokningsförfrågningar i en array. Varje bokning är ett objekt som innehåller hundens namn, datum och vilken tjänst besökaren har valt.

Jag tycker att det blir enklare att hålla reda på informationen när varje bokning har sina egna egenskaper.

### localStorage

Jag använder localStorage för att spara bokningarna i webbläsaren. Fördelen är att informationen finns kvar även om man laddar om sidan eller stänger webbläsaren.

En begränsning är att informationen bara sparas lokalt i den aktuella webbläsaren. Bokningarna skickas alltså inte till hundpensionatet, och de finns inte automatiskt på andra enheter.

## Sammanfattning

Genom projektet har jag fått öva på HTML, CSS och JavaScript tillsammans. Jag har framför allt fått en bättre förståelse för funktioner, arrayer, objekt, klasser och hur JavaScript kan användas för att göra en hemsida mer interaktiv.
