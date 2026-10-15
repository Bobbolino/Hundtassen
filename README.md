# Hundpensionatet Tassen

Det här projektet är en hemsida för ett fiktivt hunddagis och hundpensionat som heter Tassen. Besökaren ska enkelt kunna hitta information om verksamheten, se öppettider och priser samt spara en bokningsförfrågan.

Hemsidan är byggd med HTML, CSS och JavaScript.

## Starta sidan

Öppna index.html med Live Server i VS Code. Det går även att öppna filen direkt i webbläsaren, men localStorage kan fungera olika för lokala filer. Live Server rekommenderas därför när man testar bokningarna.

Filerna index.html, style.css och app.js ska ligga i samma mapp. Bilden hund.jpg ligger i mappen Images, som ska ligga bredvid index.html.

Filnamn och sökvägar behöver stämma överens med HTML-koden, även när det gäller stora och små bokstäver.

## Funktioner

- Presentation av Tassen och personalen.
- Fyra tjänster med beskrivningar och priser.
- Öppettider och kontaktuppgifter.
- En klocka och ett datum som uppdateras varje sekund.
- Öppetstatus som beräknas från veckodag och tid.
- Ett formulär för hundens namn och önskat datum.
- Kontroll av tomma fält och namn som bara innehåller mellanslag.
- Kontroll som stoppar datum som redan har varit.
- Kontroll som stoppar samma hundnamn och datum från att sparas dubbelt.
- En lista över sparade förfrågningar med möjlighet att avboka.
- Bokningar som finns kvar efter omladdning genom localStorage.
- Bekräftelser efter sparning och borttagning.
- Felmeddelanden när något inte fungerar.
- Bokningsdatum som visas med utskrivet månadsnamn.
- Kundomdömen som slumpas utan samma omdöme två gånger i rad.
- En layout som anpassas till mindre skärmar.

Bokningsförfrågningarna sparas bara i den aktuella webbläsaren. De skickas inte till Tassen och innebär inte att en plats är bekräftad. Besökaren behöver kontakta verksamheten för att boka.

## Min reflektion

Det jag tyckte var svårast var att få JavaScript att fungera tillsammans med HTML, framför allt bokningsformuläret. Flera saker behövde fungera tillsammans: hämta värden från formuläret, kontrollera dem, lägga till ett objekt i en array och sedan visa informationen på sidan.

Jag valde att lägga in koden stegvis för att lättare kunna följa vad varje del gör. Under arbetet behövde jag också skilja på problem i HTML, CSS och JavaScript. När bilden hamnade utanför sektionen handlade det om bildens storlek i CSS. Problemet med tidigare bokningsdatum behövde däremot lösas med både en gräns i datumfältet och en kontroll i JavaScript.

Jag har fått en bättre förståelse för DOM och hur JavaScript kan ändra innehållet utan att hela sidan laddas om. Jag har också arbetat mer med localStorage, klasser och arrayer av objekt.

En viktig del har varit att förstå ordningen: ändra datan, spara den och sedan rita om listan.

Jag har använt AI som stöd för kodexempel och felsökning under arbetet.

## Buggar och problem

### JavaScript hittade inte mina element

När jag ändrade namn på mina ID i HTML fick jag problem med att JavaScript inte hittade vissa element. Jag gick igenom koden och använde DevTools för att undersöka vad som orsakade problemet. Jag jämförde mina getElementById i JavaScript med motsvarande ID i HTML och såg att namnen behövde stämma överens. Efter att jag rättade namnen fungerade kopplingen mellan HTML och JavaScript igen.

### Det gick att välja tidigare datum

Formuläret tillät först en bokningsförfrågan för ett datum som redan hade varit. Jag upptäckte det när det gick att välja den 14 oktober trots att det var den 15 oktober. Lösningen var att sätta datumfältets min till dagens datum och lägga till en kontroll i formulärets submit-lyssnare. JavaScript jämför det valda datumet med dagens datum och avbryter sparningen om datumet har passerat.

### Bilden hamnade utanför "Om oss"

När jag lade till hundbilden i sektionen Om oss blev den för stor för rutan. Bilden låg redan inuti rätt section i HTML, men saknade en CSS-regel som begränsade bredden. Lösningen var att lägga till en regel för #om-oss img med max-width: 100% och height: auto. Bilden kan då krympa med sektionen och behålla sina proportioner.

### Dubbla bokningsförfrågningar

När jag gick igenom bokningsfunktionen upptäckte jag att koden saknade en kontroll för dubbletter. Formuläret kontrollerade tomma fält och tidigare datum, men jämförde inte med redan sparade bokningar. Jag lade till some() för att kontrollera om samma hundnamn och datum redan finns i arrayen. Namnen jämförs med toLowerCase() så att exempelvis Bosse och bosse behandlas som samma namn.

### En punkt godkändes som hundnamn

När jag testade namnfältet stoppades mellanslag, men en ensam punkt gick att spara. Orsaken var att trim() bara tar bort mellanslag i början och slutet och inte kontrollerar vad texten innehåller. Jag lade till ett reguljärt uttryck som kontrollerar att namnet innehåller minst en bokstav. Om namnet saknar bokstäver visas ett felmeddelande och förfrågan sparas inte.

## Scope och this

Jag använder klassen Bokningslista och skapar en instans med new Bokningslista(). I metoderna syftar this på den instans som anropar metoden, så this.bokningar är just den instansens array. this.spara() anropar sparmetoden på samma instans.

I forEach är bokning en lokal parameter som avbokningsknappens callback kan använda för att komma åt rätt boknings id. Vid borttagning skapar filter() en ny array utan den valda bokningen och tilldelar den till this.bokningar.

## Varför jag valde dessa lösningar

### Grid och Flexbox

Jag använder Grid för att dela upp sidans sektioner i kolumner och för att placera tjänsternas kort bredvid varandra. Prislistan sträcker sig över hela sidans rutnät och har ett eget Grid för korten.

Flexbox används bland annat för att placera loggan och navigeringen bredvid varandra och för att ordna formulärets innehåll i en kolumn.

Media queries ändrar layouten på mindre skärmar så att innehållet staplas och blir lättare att använda.

### Array och objekt

Bokningsförfrågningarna sparas i en array. Varje bokning är ett objekt med id, hund och datum. Ett eget id gör att rätt förfrågan kan tas bort även om samma hundnamn förekommer på olika datum.

Omdömena är också objekt i en array. Varje objekt innehåller ett namn och en text, vilket håller ihop informationen som ska visas.

### forEach, filter och some

Jag använder forEach() för att gå igenom bokningarna och skapa DOM-element som visar hundens namn, datum och en avbokningsknapp. Jag behöver ingen ny array som resultat av renderingen, vilket gör forEach() lämplig här.

filter() används för att skapa en ny array utan bokningen som ska tas bort. Borttagningen utgår från bokningens id, inte dess index i listan.

some() kontrollerar om samma hundnamn och datum redan finns. Namnen jämförs med toLowerCase() så att exempelvis Bosse och bosse räknas som samma namn.

### State och återanvändbara funktioner

this.bokningar är datan som listan bygger på. När en förfrågan läggs till eller tas bort ändras arrayen först och sparas sedan i localStorage. Därefter bygger renderaBokningar() om listan från arrayen.

uppdateraTid() körs direkt vid sidstart och sedan varje sekund.

renderaBokningar() återanvänds efter ändringar, visaMeddelande() visar både fel och bekräftelser och formateraDatum() gör bokningsdatumet mer lättläst.

### localStorage och felhantering

JSON.stringify() gör bokningsarrayen till text som kan sparas i localStorage. Vid sidstart används JSON.parse() för att läsa tillbaka datan.

try/catch hanterar fel om sparad data inte går att läsa eller om webbläsaren inte tillåter sparning. Om tidigare data inte kan läsas visas ett felmeddelande och den skrivs inte över med en ny lista.

Om en ändring inte går att spara återställs arrayen så att sidan inte visar ändringen som lyckad.

### Datum och omdömen

Datumet sparas som YYYY-MM-DD, vilket gör att giltiga datumsträngar från formuläret kan jämföras i datumkontrollen. I bokningslistan formateras datumet med toLocaleDateString() så att månaden skrivs ut.

senasteIndex håller reda på vilket omdöme som visades senast. En while-loop slumpar igen om samma index väljs. Den lösningen kräver att arrayen innehåller minst två omdömen.

## HTML-validering

Jag har även kört HTML-koden genom en kodvalidator för att kontrollera sidans HTML-struktur och fånga eventuella fel i markupen.

HTML-valideringen kompletterar felsökningen i DevTools. Den kontrollerar HTML-koden, men visar inte om exempelvis bokningslistan, datumkontrollen eller localStorage fungerar som tänkt.

JavaScript-funktionerna och sidans utseende behöver därför också kontrolleras i webbläsaren.

## Begränsningar

- Förfrågningarna skickas inte till verksamheten och delas inte mellan enheter eller webbläsare.
- Om webbläsarens lagring rensas försvinner de sparade förfrågningarna.
- Klockan använder datorns tid och tidszon. Den behöver vara inställd på svensk tid för att öppetstatusen ska stämma för Tassen.
- Dubblettkontrollen utgår från hundnamn och datum. Den kan inte skilja två olika hundar med samma namn åt på samma datum.
- Tassen är fiktivt och omdömena är exempeltexter.

## Kontrollera före inlämning

- Spara tre förfrågningar och ta bort den mittersta.
- Ladda om sidan och kontrollera att de övriga finns kvar.
- Ta bort alla och kontrollera att texten för tom lista visas.
- Testa tomma fält, mellanslag och ett tidigare datum.
- Testa samma hundnamn och datum med olika stora och små bokstäver.
- Kontrollera bekräftelserna och att bokningsdatumet visas tydligt.
- Klicka på omdömesknappen flera gånger och kontrollera att texten byts.
- Gå igenom eventuella fel och varningar från HTML-validatorn.
- Kontrollera mobilbredd, tangentbordsnavigering och eventuella fel i DevTools.
