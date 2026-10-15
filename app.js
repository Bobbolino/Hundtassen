// DEL 1: Klocka, datum och öppetstatus.

const datumElement = document.getElementById("datum");
const klockaElement = document.getElementById("klocka");
const statusElement = document.getElementById("status");

function harOppet(dag, timme) {
  if (dag >= 1 && dag <= 5) {
    return timme >= 7 && timme < 18;
  }

  if (dag === 6) {
    return timme >= 9 && timme < 14;
  }

  // Söndag är 0 och har alltid stängt.
  return false;
}

function uppdateraTid() {
  const nu = new Date();

  const timmar = String(nu.getHours()).padStart(2, "0");
  const minuter = String(nu.getMinutes()).padStart(2, "0");
  const sekunder = String(nu.getSeconds()).padStart(2, "0");

  klockaElement.textContent = `${timmar}:${minuter}:${sekunder}`;

  datumElement.textContent = nu.toLocaleDateString("sv-SE", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  if (harOppet(nu.getDay(), nu.getHours())) {
    statusElement.textContent = "Öppet just nu";
  } else {
    statusElement.textContent = "Stängt just nu";
  }
}

// Kör direkt, sedan en gång per sekund.
uppdateraTid();
setInterval(uppdateraTid, 1000);

// DEL 2: Bokningslista med klass och localStorage.

class Bokningslista {
  constructor() {
    this.bokningar =
      JSON.parse(localStorage.getItem("tassenEnkelBokningar")) || [];
  }

  spara() {
    localStorage.setItem(
      "tassenEnkelBokningar",
      JSON.stringify(this.bokningar),
    );
  }

  laggTill(hund, datum) {
    const bokning = {
      id: crypto.randomUUID(),
      hund: hund,
      datum: datum,
    };

    this.bokningar.push(bokning);
    this.spara();
  }

  taBort(id) {
    this.bokningar = this.bokningar.filter((bokning) => bokning.id !== id);

    this.spara();
  }
}

const bokningslista = new Bokningslista();

const bokningsForm = document.getElementById("bokningsForm");
const hundNamn = document.getElementById("hundNamn");
const bokningsDatum = document.getElementById("bokningsDatum");
const listaElement = document.getElementById("bokningsLista");
const meddelande = document.getElementById("meddelande");

function renderaBokningar() {
  // Töm listan så att gamla rader inte visas dubbelt.
  listaElement.replaceChildren();

  if (bokningslista.bokningar.length === 0) {
    const tomRad = document.createElement("li");

    tomRad.textContent = "Du har inga bokningsförfrågningar ännu.";
    listaElement.append(tomRad);

    return;
  }

  bokningslista.bokningar.forEach((bokning) => {
    const rad = document.createElement("li");
    const text = document.createElement("span");
    const knapp = document.createElement("button");

    text.textContent = `${bokning.hund} – ${bokning.datum}`;

    knapp.textContent = "Avboka";
    knapp.type = "button";

    knapp.setAttribute("aria-label", `Avboka förfrågan för ${bokning.hund}`);

    knapp.addEventListener("click", () => {
      bokningslista.taBort(bokning.id);
      renderaBokningar();

      meddelande.textContent = "";
      hundNamn.focus();
    });

    rad.append(text, knapp);
    listaElement.append(rad);
  });
}

bokningsForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const namn = hundNamn.value.trim();
  const datum = bokningsDatum.value;

  if (namn === "" || datum === "") {
    meddelande.textContent = "Fyll i hundens namn och önskat datum.";
    return;
  }

  // Ändra datan och spara först, rita sedan om listan.
  bokningslista.laggTill(namn, datum);
  renderaBokningar();

  bokningsForm.reset();
  meddelande.textContent = "";
  hundNamn.focus();
});

renderaBokningar();

// DEL 3: Fem exempelomdömen som en array av objekt.

const omdomen = [
  {
    namn: "Anna",
    text: "Bosse trivs jättebra hos Tassen!",
  },
  {
    namn: "Johan",
    text: "Tryggt att lämna Luna hos Nina och Pelle.",
  },
  {
    namn: "Sara",
    text: "Milo kommer hem glad efter en dag på dagiset.",
  },
  {
    namn: "Erik",
    text: "Trevlig personal och gott om plats utomhus.",
  },
  {
    namn: "Maria",
    text: "Sigge hade en fin vistelse medan vi var bortresta.",
  },
];

function visaOmdome() {
  const index = Math.floor(Math.random() * omdomen.length);
  const omdome = omdomen[index];

  document.getElementById("omdomeText").textContent = omdome.text;
  document.getElementById("omdomeNamn").textContent = omdome.namn;
}

document.getElementById("omdomeKnapp").addEventListener("click", visaOmdome);

visaOmdome();
