# Sport en Suisse : évolution de la pratique sportive, accidents et coûts associés

## Description du projet

Ce projet de visualisation de données a été réalisé dans le cadre du cours de **Visualisation de données**. Il vise à explorer l'évolution de la pratique sportive en Suisse et ses conséquences sur les accidents et les coûts économiques.

À travers une application web interactive développée avec **D3.js**, plusieurs aspects du sport sont présentés. On trouve l'évolution de la proportion de personnes très actives, de celles qui ne pratiquent aucun sport, le nombre d'accidents sportifs, les coûts liés à ces accidents, et les différences de risque entre plusieurs disciplines sportives.

L'objectif principal est de montrer comment les pratiques sportives ont changé depuis la fin des années 1970. Il met en évidence l'impact de la pandémie de COVID-19 sur ces changements et permet d'observer les données les plus récentes.

La visualisation propose également un parcours narratif qui guide progressivement l'utilisateur à travers trois périodes : **avant la pandémie**, **la pandémie de COVID-19**, et **les dernières observations disponibles**.


# Obtention des données

Les données utilisées dans le cadre du présent projet sont tirées de diverses publications officielles dédiées à l’étude du sport en Suisse.

J'ai récupéré les données relatives à l’évolution de la pratique sportive des publications de l’Observatoire Sport et activité physique Suisse (Sportobs) et des rapports de l’enquête nationale *Sport Suisse*. Ces documents renseignent sur la fréquence de la pratique sportive, l’évolution de l’activité physique de la population et les changements constatés dans le temps.

Les données sur les accidents sportifs et leurs coûts proviennent des statistiques publiées par les institutions suisses en charge de la prévention des accidents et de l’assurance-accidents, notamment le BPA/BFU et la Suva.

Données d'information :

# Sources

Lamprecht, M., Fischer, A. & Stamm, H. (2020). *Sport Suisse 2020*. Observatoire Sport et activité physique Suisse.

https://www.sportobs.ch/inhalte/Downloads/Bro_Sport_Schweiz_2020_d_WEB.pdf

Observatoire Sport et activité physique Suisse. *Indicateur 17 – Activité sportive de la population suisse.*

https://www.sportobs.ch/inhalte/Indikatoren_PDF_neu/Ind_17_Sportobs.pdf

Observatoire Sport et activité physique Suisse. *Indicateur 18 – Évolution de la pratique sportive.*

https://www.sportobs.ch/inhalte/Indikatoren_PDF_neu/Ind_18_Sportobs.pdf

Lamprecht, M., Fischer, A. & Stamm, H. (2022). *Sport Suisse Light 2022.*


# Présentation des données

Le fichier principal (`data.csv`) rassemble plusieurs indicateurs observés à différentes périodes.

Les variables principales utilisées sont :

* le pourcentage de personnes très actives physiquement ;
* le pourcentage de personnes ne pratiquant aucun sport ;
* le nombre total d'accidents sportifs ;
* le nombre d'accidents pris en charge par l'assurance-accidents obligatoire (UVG) ;
* les coûts des accidents pris en charge par l'assurance-accidents obligatoire (UVG) ;
* les coûts matériels totaux associés aux accidents.

Le second fichier (`sports_risk.csv`) contient des données comparatives pour plusieurs disciplines sportives :

* le nombre de blessés par million d'heures de pratique ;
* le coût économique pour 100 heures de pratique ;
* le coût moyen par accident.

Toutes les séries ne couvrent pas la même période. Certaines commencent en 1978 alors que d'autres débutent plus tard ou se terminent en 2022 ou en 2023 selon les données disponibles.


# Pré-traitement des données

Une harmonisation des données issues de plusieurs publications était nécessaire avant de pouvoir les exploiter.

Les principales étapes de prétraitement ont été :

1. le recueil manuel des indicateurs pertinents dans les différents rapports ;
2. l’harmonisation des unités de mesure ;
3. la conversion des données dans un format exploitable par D3.js ;
4. la construction de séries chronologiques cohérentes couvrant les périodes disponibles ;
5. le traitement des valeurs manquantes et la vérification de la cohérence des données.

Le pré-traitement n'a pas impliqué de transformation statistique complexe mais a nécessité un travail important de sélection et d'organisation des données afin de rendre comparables des informations provenant de plusieurs sources.


# Visualisations principales

## Description

L’application s’appuie sur deux courbes interactives.

L'utilisateur dispose de boutons variés pour sélectionner les indicateurs à afficher. On peut notamment afficher :

* la proportion de personnes très actives; * la proportion de personnes ne faisant aucun sport; * le nombre total d’accidents sportifs; * le nombre d’accidents pris en charge par l’assurance-accidents obligatoire (UVG); * les coûts des accidents pris en charge par l’assurance-accidents obligatoire (UVG); * les coûts matériels totaux.

En choisissant un point sur une courbe, un encadré d'information affiche les principales valeurs observées pour l'année sélectionnée ainsi que leur évolution par rapport à la dernière valeur disponible.

## Justification des choix

Le graphique en ligne a été choisi car il permet de représenter efficacement l'évolution d'un indicateur dans le temps.

L'emploi de deux diagrammes distincts facilite la comparaison de divers indicateurs tout en permettant à l'utilisateur d'ajuster à sa guise les valeurs présentées.

Le panneau d'information enrichit les graphiques en fournissant des valeurs de façon plus détaillée sans encombrer la représentation visuelle.

Les axes sont accompagnés de leurs unités de mesure afin de faciliter la lecture des données.

## Ce que montrent les visualisations

Les graphiques mettent en évidence une augmentation progressive de la pratique sportive au cours des dernières décennies ainsi qu'une diminution de la proportion de personnes ne pratiquant aucun sport.

Ils montrent également que les accidents sportifs et leurs coûts n'évoluent pas toujours de la même manière.

La période correspondant à la pandémie de COVID-19 fait apparaître une rupture temporaire dans plusieurs indicateurs avant les dernières observations disponibles.

<img width="820" height="381" alt="Capture d’écran 2026-06-26 à 02 45 06" src="https://github.com/user-attachments/assets/78f2c373-07c3-408c-81b2-f27c09b45beb" />

<img width="800" height="404" alt="Capture d’écran 2026-06-26 à 02 45 58" src="https://github.com/user-attachments/assets/bd6e2af3-3abe-423c-96cf-28ec307bceda" />

<img width="808" height="321" alt="Capture d’écran 2026-06-26 à 02 49 10" src="https://github.com/user-attachments/assets/c41131a6-b6cb-4cc0-b804-d42a65203942" />

<img width="811" height="328" alt="Capture d’écran 2026-06-26 à 02 49 40" src="https://github.com/user-attachments/assets/2036106d-5a40-4b5f-ae09-a9f38ecc886f" />


# Visualisation des risques sportifs

## Description

La troisième visualisation propose un classement interactif des disciplines sportives selon différents indicateurs de risque.

L'utilisateur peut choisir de classer les sports selon :

* le nombre de blessés par million d'heures de pratique ;
* le coût économique pour 100 heures de pratique ;
* le coût moyen par accident.

## Justification des choix

Le diagramme en barres a été choisi car il permet de comparer efficacement plusieurs catégories.

Le classement visuel facilite l'identification des disciplines présentant les niveaux de risque ou les coûts les plus élevés selon l'indicateur retenu.

<img width="760" height="499" alt="Capture d’écran 2026-06-26 à 02 46 54" src="https://github.com/user-attachments/assets/42bd89cc-b055-455b-975e-8bfda0f06ed7" />

<img width="758" height="497" alt="Capture d’écran 2026-06-26 à 02 47 37" src="https://github.com/user-attachments/assets/244b67cc-5750-4d8d-86f0-482c13418b00" />

## Ce que montre la visualisation

Les résultats montrent que la notion de risque dépend de l'indicateur utilisé.

Il existe des disciplines qui affichent un taux élevé de blessures, tandis que d'autres se démarquent surtout par les coûts qu'elles engendrent.

Cette représentation offre ainsi la possibilité d'examiner le risque sportif sous plusieurs angles.


# Narration et interactivité

L'application ne se limite pas à afficher des graphiques statiques. Elle propose également une approche narrative permettant de guider l'utilisateur à travers trois grandes étapes :

1. **Avant la pandémie de COVID-19 (1978–2019)** ;
2. **La pandémie de COVID-19 (2020–2021)** ;
3. **Les dernières observations disponibles (2022–2023)**.

Chaque étape met automatiquement en avant les indicateurs les plus adaptés à la période présentée et affiche un texte explicatif.

L'utilisateur a par la suite la possibilité de continuer à explorer à sa guise, en choisissant d'autres indicateurs, en cliquant sur les différentes années des tracés chronologiques ou en changeant l'ordre des sports concernés.


# Technologies utilisées

* HTML5
* CSS3
* JavaScript
* D3.js
* ChatGPT
* Google Traduction


# Utilisation de l'intelligence artificielle générative

Utilisation des modèles de langage (LLM)

ChatGPT a été utilisé comme outil d'assistance pour certaines étapes du développement de ce projet.

Les principales utilisations sont les suivantes :

* Corrections du premier graphique en courbe que je ne suis pas parvenu à réaliser, ChatGPT a donc modifié mon code afin de le faire foctionner et cela m'a permis de comprendre et réaliser les graphiques suivants par moi-même.
  
* ChatGPT a servi d'assistance pour la gestion des interactions entre les boutons et les graphiques (notamment pour faire en sorte qu'un bouton ne reste pas actif)

* Il a également servi à la création du panneau d'information que je n'ai pas pu terminer par moi-même, en particulier pour le calcul et l'affichage des variations entre deux années ;

* proposition d'une fonction de formatage des valeurs (formatNombre()) afin d'uniformiser leur affichage dans les graphiques et les infobulles ;

Les propositions générées par le modèle n'ont pas été intégrées directement. Elles ont été relues, comprises, adaptées et modifiées afin de répondre aux besoins du projet. J'ai également inclus des commentaires dans le code qui expliquent où l'IA a été utilisée. 
