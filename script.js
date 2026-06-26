// Création d'un dictionnaire, ce format permet de simplifier la tâche et éviter de répéter les titres et les unités partout
const noms = {
  very_active_pct: { titre: "Personnes très actives", suffixe: "%", uniteAxe: "% de la population" },
  inactive_pct: { titre: "Personnes non sportives", suffixe: "%", uniteAxe: "% de la population" },
  sport_accidents_total_thousands: { titre: "Accidents sportifs", suffixe: " milliers", uniteAxe: "milliers d’accidents" },
  sport_accidents_uvg_thousands: { titre: "Accidents UVG", suffixe: " milliers", uniteAxe: "milliers d’accidents" },
  uvg_cost_mio_chf: { titre: "Coûts UVG — assurance-accidents obligatoire", suffixe: " mio CHF", uniteAxe: "millions de CHF" },
  total_material_cost_population_mio_chf: { titre: "Coûts matériels totaux", suffixe: " mio CHF", uniteAxe: "millions de CHF" },
  injuries_per_million_hours: { titre: "Risque de blessure", suffixe: "", uniteAxe: "blessés par million d’heures de pratique" },
  cost_per_100_hours_chf: { titre: "Coût pour 100 heures", suffixe: " CHF", uniteAxe: "CHF par 100 heures de pratique" },
  cost_per_case_chf: { titre: "Coût par cas", suffixe: " CHF", uniteAxe: "CHF par cas" }
};

// Création d'un dictionnaire pour stocker les textes narratifs
const textes = {
  boom: "Étape 1 — Avant la COVID-19 (1978–2019) : la série commence en 1978. Les enquêtes Sport Suisse montrent ensuite une évolution progressive des pratiques sportives : la proportion de personnes très actives augmente tandis que celle des personnes ne pratiquant aucun sport diminue.",
  covid: "Étape 2 — La pandémie de COVID-19 (2020–2021) : cette période constitue une rupture dans les tendances observées auparavant. Les restrictions sanitaires modifient temporairement les habitudes sportives et influencent également les accidents ainsi que leurs coûts.",
  costs: "Étape 3 — Les dernières observations (2022–2023) : les données les plus récentes permettent d’observer les accidents jusqu’en 2022 et les coûts UVG jusqu’en 2023. Cette étape présente les informations disponibles sans conclure sur l’évolution de tous les indicateurs après la pandémie."
};

// Définition des variables principales qui vont changer au cours de l'utilisation 
let donneesSport = [];
let donneesRisques = [];
let anneeActive = 1978;
let mesureHaut = "very_active_pct";
let mesureBas = "sport_accidents_total_thousands";

// Création de l'infobulle qui apparaît lorsqu'on passe la souris sur un point ou une barre des graphiques.
const bulle = d3.select("body").append("div").attr("class", "tooltip");

// Création des marges pour les graphiques en courbes
const margeCourbe = { haut: 34, droite: 25, bas: 60, gauche: 78 };

// Chargement des données contenues dans les fichiers data.csv et sports_risk.csv

d3.csv("data.csv", d3.autoType).then(function(data) {
  donneesSport = data;

  d3.csv("sports_risk.csv", d3.autoType).then(function(risques) {
    donneesRisques = risques;

    // Affichage de départ
    d3.select("#story-text").text(textes.boom);
    // L'endroit où dessiner le graphique chart-top, mesureHaut : la variable qui va être représentée, top : classe CSS appliquée
    dessinerCourbe("#chart-top", mesureHaut, "top");
    dessinerCourbe("#chart-bottom", mesureBas, "bottom");
    dessinerRisques("injuries_per_million_hours");
    afficherAnnee(anneeActive);

    // Boutons des courbes
    // Ajout d'un événementz sur les boutons 
  d3.selectAll("button.metric").on("click", function () {

    const boutonClique = this;

    const bouton = d3.select(boutonClique);

    // Récupération du graphique concerné et de la mesure choisie
    const graphique = boutonClique.dataset.chart;
    const mesure = boutonClique.dataset.metric;

    // On retire la classe "active" à tous les boutons du graphique concerné
    // ChatGPT plusieurs boutons restaient actifs en même temps 
    d3.selectAll(`button.metric[data-chart='${graphique}']`).classed("active", false);

    bouton.classed("active", true);

    // Mise à jour du bon graphique 
    if (graphique === "top") {
      mesureHaut = mesure;
      dessinerCourbe("#chart-top", mesureHaut, "top");
    } else {
      mesureBas = mesure;
      dessinerCourbe("#chart-bottom", mesureBas, "bottom");
    }
  });

// Autre bouton du parcours narratifs
d3.selectAll(".story-step").on("click", function () {

  const etape = this.dataset.step;

  // À chaque étape, une année de référence est associée
  const anneeParEtape = {
    boom: 1978,
    covid: 2020,
    costs: 2023
  };

  // Classe active retirée du bouton
  d3.selectAll(".story-step").classed("active", false);

  // Bouton sélectionné mis en évidence
  d3.select(this).classed("active", true);

  // Affichage du texte correspondant à l'étape choisie
  d3.select("#story-text").text(textes[etape]);

  if (etape === "boom") {
    mettreAJourMesure("top", "very_active_pct");
    mettreAJourMesure("bottom", "sport_accidents_total_thousands");

  } else if (etape === "covid") {
    mettreAJourMesure("top", "inactive_pct");
    mettreAJourMesure("bottom", "sport_accidents_total_thousands");

  } else if (etape === "costs") {
    mettreAJourMesure("top", "very_active_pct");
    mettreAJourMesure("bottom", "uvg_cost_mio_chf");
  }

  // Mise à jour du panneau de droite avec l'année de la période choisie
  afficherAnnee(anneeParEtape[etape]);

});

    // Menu du graphique des risques
    d3.select("#risk-select").on("change", function () {
      dessinerRisques(this.value);
    });
  });
});

// Fonction permettant de mettre à jour la mesure affichée dans l'un des deux graphiques
function mettreAJourMesure(graphique, mesure) {

  // On retire la classe "active" à tous les boutons du graphique concerné
  d3.selectAll(`button.metric[data-chart='${graphique}']`)
    .classed("active", false);

  // Met en évidence le bouton concerné
  // ChatGPT
  d3.select(`button.metric[data-chart='${graphique}'][data-metric='${mesure}']`)
    .classed("active", true);

  if (graphique === "top") {

    mesureHaut = mesure;

    dessinerCourbe("#chart-top", mesureHaut, "top");

  }

  else {

    mesureBas = mesure;

    dessinerCourbe("#chart-bottom", mesureBas, "bottom");

  }
}

// Courbes principales

// Ce graphique en courbe a été réalisé à l'aide de ChatGPT
function dessinerCourbe(selecteur, mesure, classeCss) {
  //zone où le graphique apparaît
  const zone = d3.select(selecteur);
  // suppression des anciens graphiques
  zone.selectAll("*").remove(); 

  // délimitation de la taille du graphique
  const largeur = zone.node().getBoundingClientRect().width;
  const hauteur = selecteur === "#chart-top" ? 390 : 330;
  // suppression des marges pour avoir toute la place disponible
  const w = largeur - margeCourbe.gauche - margeCourbe.droite;
  const h = hauteur - margeCourbe.haut - margeCourbe.bas;

  // On garde seulement les années où la mesure existe
  const lignes = donneesSport.filter(d => d[mesure] !== null && !Number.isNaN(d[mesure]));

  // création du support svg
  const svg = zone.append("svg").attr("viewBox", `0 0 ${largeur} ${hauteur}`);
  const g = svg.append("g").attr("transform", `translate(${margeCourbe.gauche},${margeCourbe.haut})`);

  // Transformation des valeurs du CSV en positions dans le SVG
  const x = d3.scaleLinear()
    .domain(d3.extent(lignes, d => d.year))
    .range([0, w]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(lignes, d => d[mesure]) * 1.12])
    .nice()
    .range([h, 0]);

  // Bande orange pour rappeler la période COVID
  g.append("rect")
    .attr("class", "covid-band")
    .attr("x", x(2020))
    .attr("y", 0)
    .attr("width", x(2022) - x(2020))
    .attr("height", h);

  g.append("text")
    .attr("class", "covid-label")
    .attr("x", x(2020) - 5)
    .attr("y", 16)
    .text("COVID-19");

  // Grille horizontale 
  g.append("g")
    .attr("class", "grid")
    .call(d3.axisLeft(y).ticks(5).tickSize(-w).tickFormat(""));

  // Axe des années
  g.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${h})`)
    .call(d3.axisBottom(x).ticks(8).tickFormat(d3.format("d")));

  g.append("text")
    .attr("class", "axis-label")
    .attr("x", w / 2)
    .attr("y", h + 44)
    .attr("text-anchor", "middle")
    .text("Année");

  // Axe des valeurs
  g.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(y).ticks(5));

  g.append("text")
    .attr("class", "axis-label")
    .attr("x", -h / 2)
    .attr("y", -56)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text(noms[mesure].uniteAxe);

  // Titre interne du graphique
  g.append("text")
    .attr("x", 0)
    .attr("y", -10)
    .attr("font-weight", 800)
    .text(noms[mesure].titre);

  // Ligne principale
  g.append("path")
    .datum(lignes)
    .attr("class", `line ${classeCss}`)
    .attr("d", d3.line()
      .x(d => x(d.year))
      .y(d => y(d[mesure]))
      .curve(d3.curveMonotoneX));

  // Points cliquables : un point = une année
  g.selectAll("circle")
    .data(lignes)
    .join("circle")
    .attr("class", d => `point ${classeCss} ${d.year === anneeActive ? "selected" : ""}`)
    .attr("cx", d => x(d.year))
    .attr("cy", d => y(d[mesure]))
    .attr("r", 5.5)
    .on("click", function (event, d) {
      afficherAnnee(d.year);
    })
    .on("mousemove", function (event, d) {
      montrerBulle(event, d.year, noms[mesure].titre, d[mesure], noms[mesure].suffixe);
    })
    .on("mouseleave", cacherBulle);
}

// 3. Graphique horizontal des sports à risque
// structure similaire au graphique en courbe

function dessinerRisques(mesure) {
  const zone = d3.select("#risk-chart");
  zone.selectAll("*").remove();

  // On trie les sports et on garde seulement les 12 premiers
  const top = donneesRisques
    .slice()
    .sort((a, b) => b[mesure] - a[mesure])
    .slice(0, 12);

  const marge = { haut: 20, droite: 75, bas: 35, gauche: 170 };
  const largeur = zone.node().getBoundingClientRect().width;
  const hauteur = 500;
  const w = largeur - marge.gauche - marge.droite;
  const h = hauteur - marge.haut - marge.bas;

  const svg = zone.append("svg").attr("viewBox", `0 0 ${largeur} ${hauteur}`);
  const g = svg.append("g").attr("transform", `translate(${marge.gauche},${marge.haut})`);

  // x = longueur des barres ; y = noms des sports
  const x = d3.scaleLinear()
    .domain([0, d3.max(top, d => d[mesure])])
    .nice()
    .range([0, w]);

  const y = d3.scaleBand()
    .domain(top.map(d => d.sport))
    .range([0, h])
    .padding(0.22);

  g.append("g")
    .attr("class", "grid")
    .call(d3.axisTop(x).ticks(5).tickSize(-h).tickFormat(""));

  g.append("g")
    .attr("class", "axis")
    .call(d3.axisLeft(y));

  g.append("g")
    .attr("class", "axis")
    .attr("transform", `translate(0,${h})`)
    .call(d3.axisBottom(x).ticks(5));

  g.append("text")
    .attr("class", "axis-label")
    .attr("x", w / 2)
    .attr("y", h + 32)
    .attr("text-anchor", "middle")
    .text(noms[mesure].uniteAxe);

  // Barres horizontales
  g.selectAll("rect")
    .data(top)
    .join("rect")
    .attr("class", "bar")
    .attr("x", 0)
    .attr("y", d => y(d.sport))
    .attr("width", d => x(d[mesure]))
    .attr("height", y.bandwidth())
    .on("mousemove", function (event, d) {
      montrerBulle(event, d.sport, noms[mesure].titre, d[mesure], noms[mesure].suffixe);
    })
    .on("mouseleave", cacherBulle);

  // Valeurs écrites au bout des barres
  g.selectAll(".value-label")
    .data(top)
    .join("text")
    .attr("class", "value-label")
    .attr("x", d => x(d[mesure]) + 6)
    .attr("y", d => y(d.sport) + y.bandwidth() / 2 + 4)
    .text(d => formatNombre(d[mesure], noms[mesure].suffixe));
}

// Panneau de droite

function afficherAnnee(annee) {
  anneeActive = annee;

  // On retrouve la ligne du CSV correspondant à l’année choisie
  const d = donneesSport.find(ligne => ligne.year === anneeActive);
  if (!d) return;

  // On surligne les points de cette année sur les deux courbes
  d3.selectAll(".point").classed("selected", point => point.year === anneeActive);

  const panneau = d3.select("#details");
  panneau.select("h2").text(d.year);
  panneau.select(".period-pill").text(d.period || "—");
  panneau.select(".note").text(d.note || "Aucune note spécifique pour cette année.");

  // Chiffres principaux affichés en haut du panneau
  const chiffres = [
    ["Activité très régulière", d.very_active_pct, "%"],
    ["Non-sportifs", d.inactive_pct, "%"],
    ["Accidents sportifs", d.sport_accidents_total_thousands, " milliers"],
    ["Accidents UVG", d.sport_accidents_uvg_thousands, " milliers"],
    ["Coûts UVG — assurance-accidents obligatoire", d.uvg_cost_mio_chf, " mio CHF"],
    ["Coûts matériels totaux", d.total_material_cost_population_mio_chf, " mio CHF"]
  ];

  panneau.select(".stats")
    .selectAll(".stat")
    .data(chiffres)
    .join("div")
    .attr("class", "stat")
    .html(d => `<strong>${formatNombre(d[1], d[2])}</strong><span>${d[0]}</span>`);

  // Pour les variations, on compare avec la dernière valeur disponible avant l’année choisie
  const ancienActifs = valeurAvant(anneeActive, "very_active_pct");
  const anciensAccidents = valeurAvant(anneeActive, "sport_accidents_total_thousands");
  const anciensCouts = valeurAvant(anneeActive, "uvg_cost_mio_chf");

  const variations = [
    ["Très actifs", d.very_active_pct, ancienActifs, "points"],
    ["Accidents", d.sport_accidents_total_thousands, anciensAccidents, "k"],
    ["Coûts UVG", d.uvg_cost_mio_chf, anciensCouts, "mio CHF"]
  ];

  // Corrections apportées par ChatGPT
  panneau.select(".variation")
    .selectAll(".delta-row")
    .data(variations)
    .join("div")
    .attr("class", function (v) {
      // condition pour vérifier que les deux valeurs existent, si ce n'est pas le cas affiche delta-neutral
      if (v[1] === null || v[2] === null || Number.isNaN(v[1]) || Number.isNaN(v[2])) {
        return "delta-row delta-neutral";
      }
      const ecart = v[1] - v[2];
      if (ecart > 0) return "delta-row delta-positive";
      if (ecart < 0) return "delta-row delta-negative";
      return "delta-row delta-neutral";
    })
    .html(function (v) {
      return `<strong>${texteVariation(v[1], v[2], v[3])}</strong><span>Variation depuis la valeur précédente disponible · ${v[0]}</span>`;
    });
}

// Cherche la dernière valeur connue avant une année donnée
function valeurAvant(annee, colonne) {
  const lignesAvant = donneesSport.filter(d => d.year < annee && d[colonne] !== null && !Number.isNaN(d[colonne]));
  // Si aucune valeur pour l'année précédente, return null
  if (lignesAvant.length === 0) return null;
  // Si plusieurs années existent, la fonction renvoie simplement la dernière valeur connue.
  return lignesAvant[lignesAvant.length - 1][colonne];
}

// Si aucunes données, return "-"
function texteVariation(valeur, ancienneValeur, unite) {
  if (valeur === null || ancienneValeur === null || Number.isNaN(valeur) || Number.isNaN(ancienneValeur)) {
    return "—";
  }

  // Si l'écart entre deux valeurs est de 0, return "-"
  const ecart = valeur - ancienneValeur;
  if (ecart === 0) return "—";
  const signe = ecart > 0 ? "+" : "";
  return signe + ecart.toLocaleString("fr-CH") + " " + unite;
}

// Fonction qui affiche l'infobulle

function montrerBulle(event, titre, nom, valeur, unite) {
  bulle
    .style("opacity", 1)
    .style("left", event.clientX + "px")
    .style("top", event.clientY + "px")
    .html(`<strong>${titre}</strong><br>${nom} : ${formatNombre(valeur, unite)}`);
}

// Fonction qui cache l'infobulle
function cacherBulle() {
  bulle.style("opacity", 0);
}

// fonction qui met en forme les valeurs
// recommandation ChatGPT
function formatNombre(valeur, unite) {
  if (valeur === null || Number.isNaN(valeur)) return "—";
  return Number(valeur).toLocaleString("fr-CH") + unite;
}
