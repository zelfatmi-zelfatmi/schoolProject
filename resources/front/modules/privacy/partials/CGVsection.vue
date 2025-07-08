<script setup>
import { routes } from '@front/routes';
import { Link } from '@inertiajs/vue3';
const conditionGeneral="condition-general";

</script>

<template>
    <div class="row">
        <div>
            <h1 class="mb-0">Conditions générales de vente</h1>
            <p class="text-gray-500">Date de dernière mise à jour: 23 janvier 2025</p>
        </div>
        <div>
            <p>
                Les présentes conditions générales de vente ont pour objet de définir les modalités et conditions
                applicables à la vente en ligne des biens et services proposés sur le site internet
                WWW.MONITEURINDEPENDANT.FR édité par la société MONITEURINDEPENDANT, société société à responsabilité
                limitée au capital de 10 000 euros, dont le siège social se situe au 22 RUE CHARLES LESCOT, 60700
                PONT-SAINTE-MAXENCE, immatriculée au R.C.S. de Compiegne sous le n° 978 301 356, disposant d’un
                établissement 22 RUE CHARLES LESCOT, 60700 PONT-SAINTE-MAXENCE et autorisée à exploiter, sous le numéro
                E2306000170, un établissement d’enseignement, à titre onéreux, de la conduite des véhicules à moteur et
                de la sécurité routière selon arrêté délivré le 26 décembre 2023. MONITEURINDEPENDANT est légalement
                représenté par Monsieur Redawn Tantan, son Président
            </p>
            <h3 class="font-bold">ARTICLE 1. Définitions</h3>
            <p>
                Dans les présentes conditions générales de vente, les termes et expressions identifiés par une majuscule
                ont la signification indiquée ci-après, qu’ils soient employés au singulier ou au pluriel.
            </p>
            <p>
                « Capacité Juridique » : désigne toute personne physique, âgée d’au moins 15 ans, ayant tous les droits,
                titres, pouvoirs et/ou autorisations nécessaires, pour contracter au titre des présentes.
            </p>
            <p>« CGV » : désigne les présentes conditions générales de vente et leur(s) annexe(s).</p>
            <p>
                « Commande » : désigne tout achat de Produits et/ou Services réalisée par Vous sur le Site auprès de
                notre Société.
            </p>
            <p>
                « Compte » : désigne l’espace personnel que Vous serez amené à créer sur le Site, tel que décrit à
                l’article 5.1 ci-après.
            </p>
            <p>
                « Leçon de conduite » : désigne la leçon d’une durée d’une heure en formation pratique individuelle, qui
                comprend notamment le temps nécessaire à l'accueil, à la détermination de l'objectif, à la conduite de
                45 à 50 minutes environ, à l’évaluation et au bilan de la leçon.
            </p>
            <p>
                « Notre Société » ou « MONITEURINDEPENDANT » : désigne la société MONITEURINDEPENDANT, telle que décrite
                en en-tête des présentes.
            </p>
            <p>« Produit » : désigne tout produit proposé à la vente sur le Site.</p>
            <p>« Service » : désigne tout service proposé à la vente sur le Site.</p>
            <p>
                « Site » : désigne le site internet MONITEURINDEPENDANT , accessible depuis l’adresse
                <a class="text-primary" href="https://moniteurindependant.fr">www.moniteurindependant.fr</a> ou toute
                autre URL que notre Société pourrait lui substituer.
            </p>
            <p>
                « Vous » ou « Client » ou « Utilisateur » : vous désigne ou désigne tout client de MONITEURINDEPENDANT
                qui commande des Produits et/ou Services sur le Site.
            </p>
            <h3 class="font-bold">ARTICLE 2. Champ d’application et Capacité Juridique</h3>
            <p>
                Les CGV sont réservées aux seuls Clients particuliers, personnes physiques, majeures et capables
                juridiquement, agissant pour leur compte ou en tant que représentant légal pour le compte d’une personne
                mineure ou majeure incapable juridiquement, résidant en France métropolitaine et ses territoires
                d’Outre-Mer. Si Vous avez entre quinze (15) ans révolus et dix-huit (18) ans : Vous devez obtenir
                l’accord de votre représentant légal avant de procéder à l’achat d’une Commande, ce que
                <b>Vous reconnaissez et acceptez</b>. Notre Société pourra Vous demander à tout moment, et par tout
                moyen que Nous jugerons utile, de Nous fournir la preuve de cette autorisation
            </p>
            <p>Les CGV ne sont pas applicables aux partenaires commerciaux de MONITEURINDEPENDANT.</p>
            <p>
                Le Client déclare et garantit à Notre Société qu’il dispose de la Capacité Juridique, ainsi que de tous
                les droits, titres, pouvoirs et/ou autorisations nécessaires, pour contracter au titre des présentes et
                passer une Commande sur le Site.
            </p>
            <h3 class="font-bold">ARTICLE 3. Acceptation et modification des CGV</h3>
            <p>Les CGV sont applicables à toute Commande de Produits et/ou Services sur le Site.</p>
            <p>
                Toute validation de Commande est subordonnée à l’acceptation expresse et sans réserve des CGV par le
                Client en cochant la case « <i>Je comprends et j’accepte les CGV</i> » au moment de la passation de la
                Commande. En cochant cette case, Vous reconnaissez les avoir lues, les avoir entièrement comprises et
                acceptées et Vous vous engagez à en respecter le contenu. Elles sont accessibles via le lien hypertexte
                et Vous pouvez aisément les imprimer en Vous servant des fonctionnalités d’impression de votre
                ordinateur et/ou navigateur.
            </p>
            <p>
                Notre Société se réserve le droit de modifier les CGV à tout moment et sans préavis. En cas de
                modification, les CGV qui Vous sont applicables sont celles en vigueur à la date de la Commande.
            </p>
            <h3 class="font-bold">ARTICLE 4. Produits et Services proposés</h3>
            <p>
                Conformément aux articles L. 111-1 et L. 111-2 du Code de la consommation, notre Société présente sur le
                Site un descriptif détaillé de ses Produits et Services et des prix correspondants permettant au Client,
                avant la prise de Commande définitive, de connaître leurs caractéristiques essentielles. Le Client
                déclare en avoir pris connaissance préalablement à sa Commande.
            </p>
            <p>
                Conformément à l’article L. 441-1 du Code de commerce, les prix sont repris dans une grille tarifaire en
                Annexe 1 des présentes CGV.
            </p>
            <p>Tel que détaillé en clause 6.1.1, ces prix peuvent varier en fonction de :</p>
            <ul>
                <li>la date de signature de votre contrat de formation</li>
            </ul>
            <p>Notre Société propose sur le Site les Produits et Services suivants :</p>
            <h4 class="font-bold">4.1. Formule « Code de la route »</h4>
            <p>
                Cette formule, applicable à l’Examen Théorique Général (ci-après « ETG ») uniquement et disponible sous
                l’onglet « <i>Code de la route</i> », ou « <i>Boutique</i> » comprend les éléments suivants :
            </p>
            <ol>
                <li>
                    des contenus pédagogiques présentés sous la forme de séries de questions (plus de 2000 questions)
                    avec leur correction, réparties en dix (10) thèmes, conformément au code de la route et au
                    Référentiel pour l’Education à une Mobilité Citoyenne (REMC).
                </li>
                <li>
                    trois (3) modes d’évaluation des connaissances sont proposés : le mode entraînement, qui Vous permet
                    de Vous entraînez à votre rythme, avec une réponse commentée à chaque fin de question ; le mode
                    examen, qui Vous permet de Vous entraînez dans les mêmes conditions que l’examen officiel, avec un
                    temps limité par question ; et enfin le mode thématique, qui Vous permet de Vous entraînez par thème
                    officiel du REMC pour les approfondir à votre rythme.
                </li>
            </ol>
            <p>Le prix de la formule « <i>Code de la route</i> » se trouve en Annexe 1 (Grille tarifaire).</p>
            <p>Cette formule est valable pour une durée de douze (12) mois à compter de la Commande.</p>
            <h4 class="font-bold">4.2. Formule « Une heure d’évaluation »</h4>
            <p>
                Cette formule, disponible sous l’onglet « <i>Conduite</i> » ensuite « <i>Leçons de conduite</i> » et
                enfin « <i>Je réserve mon évaluation</i> » ou sous l’onglet « <i>Boutique</i> », «
                <i>1h d’évaluation</i> », comprend une (1) heure d’évaluation avec un enseignant titulaire du brevet
                pour l’exercice de la profession d’enseignant de la conduite automobile et de la sécurité routière
                (BEPECASER) ou du titre professionnel (TP) d’enseignant de la conduite et de la sécurité routière,
                permettant d’évaluer votre besoin de formation. Cette évaluation est réalisée avant toute formation
                pratique, conformément à l’article L. 213-2 du code de la route.
            </p>

            <p>Le prix de la formule « <i>Une heure d’évaluation</i> » se trouve en Annexe 1.</p>
            <p>Cette formule est valable pour une durée de douze (12) mois à compter de la Commande.</p>
            <h4 class="font-bold">4.3. Formule « Code + 1h d’évaluation »</h4>
            <p>
                Cette formule, disponible sous l’onglet « <i>Boutique </i>», puis « <i>Code + 1h d’évaluation</i> »,
                comprend les éléments suivants :
            </p>
            <ul>
                <li>
                    La formule “Code de la route”, qui comprend des contenus pédagogiques présentés sous la forme de
                    séries de questions (plus de 2000 questions) avec leur correction, réparties en dix (10) thèmes,
                    conformément au code de la route et au Référentiel pour l’Education à une Mobilité Citoyenne (REMC).
                    Trois modes d’évaluation des connaissances sont proposés : le mode entraînement, qui vous permet de
                    vous entraîner à votre rythme, avec une réponse commentée à chaque fin de question, le mode examen,
                    qui vous permet de vous entraîner dans les mêmes conditions que l’examen officiel, avec un temps
                    limité par question, et enfin le mode thématique qui vous permet de vous entraîner par thème
                    officiel du REMC pour les approfondir à son rythme ;
                </li>
                <li>
                    La formule “Une heure d’évaluation”, qui comprend une première heure d’évaluation avec un enseignant
                    titulaire du brevet pour l’exercice de la profession d’enseignant de la conduite automobile et de la
                    sécurité routière (BEPECASER), permettant d’évaluer votre besoin de formation. Cette évaluation est
                    réalisée avant toute formation pratique, conformément à l’article L. 213-2 du code de la route ;
                </li>
            </ul>
            <p>Le prix de la formule « <i>Code + 1h d’évaluation</i> » se trouve en Annexe 1 (Grille tarifaire).</p>
            <p>
                La formule « <i>Code + 1h d’évaluation </i>» et les leçons de conduite sont valables pour une durée de
                douze (12) mois à compter de la Commande.
            </p>
            <h4 class="font-bold">4.4. Formules « Les packs conduite »</h4>
            <p>
                Cette formule, disponible sur votre Compte, sous l’onglet « <i>Boutique </i>», comprend les éléments
                suivants :
            </p>
            <ol>
                <li>
                    Vous avez la possibilité de réserver des leçons de conduite en fonction de vos besoins, réparties en
                    quatre (5) packs : pack 1 heure d’évaluation, pack 5 heures, pack 10 heures, pack 20 heures, ou pack
                    30 heures.
                </li>
                <li>
                    <b
                        >L’accès à votre Compte à l’issue de la première heure d’évaluation est subordonné à votre
                        acceptation expresse et sans réserve du contrat de formation (cf. article 5.2.1.2). </b
                    >Conformément à la législation applicable aux contrats conclus par voie électronique pour les ventes
                    à distance, ce contrat de formation est réputé signé lorsque vous cochez la case «
                    <i>Je comprends et j’accepte le contrat</i> ».
                </li>
                <li>
                    Après avoir accepté votre contrat de formation, Vous pourrez procéder à la suite de votre formation
                    pratique.
                </li>
            </ol>
            <p>Les leçons de conduite sont valables pour une durée de douze (12) mois à compter de la Commande.</p>
            <h4 class="font-bold">4.5. Formule « Code + 20h de conduite »</h4>
            <p>
                Cette formule, disponible sur la page « <i>Espace examen</i> » ou « <i>Boutique </i>» est composée du «
                <i>Code de la route</i> » ainsi que de vingt (20) leçons de conduite et comprend les éléments suivants :
            </p>
            <ul>
                <li>
                    des contenus pédagogiques présentés sous la forme de séries de questions (plus de 2000 questions)
                    avec leur correction, réparties en dix (10) thèmes, conformément au code de la route et au
                    Référentiel pour l’Education à une Mobilité Citoyenne (REMC). Trois (3) modes d’évaluation des
                    connaissances sont proposés : le mode entraînement, qui Vous permet de vous entraînez à votre
                    rythme, avec une réponse commentée à chaque fin de question ; le mode examen, qui Vous permet de
                    Vous entraînez dans les mêmes conditions que l’examen officiel, avec un temps limité par question ;
                    et enfin le mode thématique qui Vous permet de vous entraînez par thème officiel du REMC pour les
                    approfondir à votre rythme ;
                </li>
                <li>
                    Vingt (20) leçons de conduite, dont une heure d’évaluation, avec un enseignant titulaire du brevet
                    pour l’exercice de la profession d’enseignant de la conduite automobile et de la sécurité routière
                    (BEPECASER), permettant d’évaluer votre besoin de formation. Cette évaluation est réalisée avant
                    toute formation pratique, conformément à l’article L. 213-2 du code de la route ;
                </li>
            </ul>
            <p>Le prix de la formule « <i>Code + 20h de conduite</i> » se trouve en Annexe 1.</p>
            <p>
                La formule « Code de la route » et les leçons de conduite sont valables pour une durée de douze (12)
                mois à compter de la Commande.
            </p>
            <h4 class="font-bold">4.6. Formule « Pack conduite accompagnée »</h4>
            <p>
                Cette formule, composée du « Code de la route » ainsi que de vingt-six (26) leçons de conduite, comprend
                les éléments suivants :
            </p>
            <ul>
                <li>
                    des contenus pédagogiques présentés sous la forme de séries de questions (plus de 2000 questions)
                    avec leur correction, réparties en dix (10) thèmes, conformément au code de la route et au
                    Référentiel pour l’Education à une Mobilité Citoyenne (REMC). Trois modes d’évaluation des
                    connaissances sont proposés : le mode entraînement, qui vous permet de vous entraînez à votre
                    rythme, avec une réponse commentée à chaque fin de question, le mode examen, qui vous permet de vous
                    entraînez dans les mêmes conditions que l’examen officiel, avec un temps limité par question, et
                    enfin le mode thématique qui vous permet de vous entraînez par thème officiel du REMC pour les
                    approfondir à son rythme ;
                </li>
                <li>
                    vingt-six (26) leçons de conduite dont :
                    <br />- Vingt (20) leçons de conduite dédiées à la formation initiale <br />- Six (6) leçons de
                    conduite dédiées aux rendez-vous pédagogiques dont : <br />-- Un (1) rendez-vous préalable de deux
                    (2) heures <br />-- Deux (2) rendez-vous pédagogiques de deux (2) heures de pratique et d'une (1)
                    heure de théorie sous la forme de module de révision en ligne
                </li>
                <li>Un livret d’apprentissage de la conduite papier</li>
            </ul>
            <p>Après l’obtention du Code de la route, la formation en conduite accompagnée se déroulera comme suit :</p>
            <ul>
                <li>
                    Vous effectuez votre heure d’évaluation avec un enseignant diplômé de votre choix et obtenez votre
                    plan de formation.
                </li>
                <li>
                    Vous apprenez ensuite la conduite avec votre enseignant (20 heures minimum) selon votre plan de
                    formation personnalisé jusqu'au rendez-vous préalable.
                </li>
                <li>
                    Dès que votre enseignant vous jugera prêt, Vous réaliserez un rendez-vous préalable. Durant celui-ci
                    votre enseignant Vous délivrera votre attestation de fin de formation initiale et briefera votre
                    accompagnateur.
                </li>
                <li>
                    Vous continuez votre formation avec votre accompagnateur en effectuant au moins 3 000 km sur une
                    période minimum d’un (1) an. Durant cette période, vous effectuez deux (2) rendez-vous pédagogiques
                    avec votre enseignant et votre accompagnateur.
                </li>
            </ul>
            <p>Le prix de la formule « <i>Pack conduite accompagnée</i> » se trouve en Annexe 1.</p>
            <p>Cette formule est valable pour une durée de vingt-quatre (24) mois à compter de la Commande.</p>
            <h4 class="font-bold">4.7. Accompagnement :</h4>
            <p>
                Un accompagnement à l’examen pratique du permis de conduire est possible dans certains cas. Il n’est
                toutefois pas obligatoire et est laissé à la libre appréciation de notre Société. Lorsque cet
                accompagnement est accepté par le Société, il sera facturé dans l’espace boutique du site sous
                l'appellation : Forfait accompagnement examen pratique , hors leçon de conduite nécessaire au temps de
                déplacement sur le centre d’examen aller-retour.
            </p>
            <h3 class="font-bold">ARTICLE 5. Commande de Produits et Services sur le Site</h3>
            <h4 class="font-bold">5.1. Création d’un compte</h4>
            <p>
                La passation d’une Commande sur notre Site nécessite que Vous créiez un Compte. Les modalités de
                création sont détaillées dans les Conditions générales d’utilisation (CGU) :<br />
                <Link :href="`${conditionGeneral}?tab=cgu`">
        {{ `${conditionGeneral}?tab=cgu` }}
    </Link>
            </p>
            <p>
                Lors de la création de votre Compte, nous Vous demandons d'enregistrer les éléments suivants : nom,
                prénom, date de naissance, nom de votre représentant légal si vous êtes mineur, adresse postale et
                numéro de téléphone. Le traitement et l'utilisation de ces éléments est décrit dans la Charte de
                Confidentialité:<br /><a class="text-primary" href="#politique-de-confidentialite"
                    >https://moniteurindependant.fr/politique-de-confidentialite
                </a>
            </p>
            <p>
                Si vous le souhaitez, vous pouvez vous inscrire sur la liste d'opposition au démarchage téléphonique
                proposée par Bloctel <a class="text-primary" href="https://conso.bloctel.fr/">sur leur site</a>.
                Conformément à l’article L. 223-1 du Code de la consommation, l'inscription à ce service est gratuite
                pour les consommateurs.
            </p>
            <h4 class="font-bold">5.2. Passation de Commande</h4>
            <h5 class="font-bold">5.2.1. Les formules :</h5>
            <p>
                <b>5.2.1.1.</b> Une fois connecté à votre Compte, Vous pouvez commander la formule de votre choix en
                cliquant sur l’onglet correspondant. Par ce premier clic, Vous initiez la Commande de la formule
                choisie.
            </p>
            <p>
                <b>5.2.1.2.</b> Vous devez alors vérifier le récapitulatif de la Commande et son prix total, ainsi
                qu’insérer vos informations de paiement.
            </p>
            <p>
                Nous nous appuyons sur les dernières normes de sécurité et ne disposons à aucun moment de vos
                informations bancaires.
            </p>
            <p>
                Avant de pouvoir procéder au paiement, vous devez prendre connaissance et lire attentivement les
                présentes CGV qui s’afficheront en cliquant sur le lien hypertexte. Vous cocherez, si Vous les acceptez,
                la case « <i>Je comprends et j’accepte les CGV</i> », reconnaissant ainsi avoir lu les CGV et accepter
                pleinement l’ensemble de leurs dispositions, sans restriction ni réserve. Vous pourrez aisément les
                imprimer en vous servant des fonctionnalités d’impression de votre ordinateur et/ou navigateur.
            </p>
            <p>
                Pour la formule « <i>Une heure d’évaluation</i> » et les formules « <i>Les packs conduite</i> », Vous
                serez également invité à cocher la case suivante : «
                <i
                    >Je déclare sur l’honneur être enregistré en tant que candidat au code ou à la conduite en
                    préfecture ou être titulaire du code de la route depuis moins de 5 ans ou être titulaire du permis
                    de conduire</i
                >
                ».
            </p>
            <p>Par ce clic, Vous garantissez à notre Société l’exactitude de votre déclaration.</p>
            <p>
                Pour les formules « <i>Les packs conduite</i> », « <i>Code + 20h de conduite</i> » et «
                <i>Pack conduite accompagnée</i> », à l’issue de votre heure d’évaluation, en application de l’article
                L. 213-2 du code de la route, Vous serez invité à prendre connaissance et lire attentivement le contrat
                de formation établi entre Vous et notre Société, régissant les conditions et les modalités de
                l'enseignement de la conduite et de la sécurité routière. Si Vous en acceptez les termes, Vous cocherez
                la case « <i>Je comprends et j’accepte le contrat</i> ». Par ce clic, Vous reconnaissez avoir l’avoir
                lu, compris et accepté pleinement l’ensemble de ses dispositions, sans restriction ni réserve. Un
                exemplaire de votre contrat de formation sera alors disponible sur votre Compte sous l’onglet «
                <i>Mon compte</i> », puis « <i>Mon dossier candidat</i> ».
            </p>
            <p>
                <b>5.2.1.3.</b> Vous pourrez alors valider votre Commande en cliquant sur l’onglet «
                <i>Je valide ma commande</i> ». Ce deuxième clic marquera la validation de la Commande. Avant de cliquer
                sur cet onglet Vous avez la possibilité d’annuler votre Commande et de revenir à la page de l’offre, en
                cliquant sur l’onglet « <i>Annuler </i>».
            </p>
            <p>
                <b>5.2.1.4.</b> Vous serez, enfin, invité à effectuer le paiement en entrant les informations bancaires
                nécessaires puis en cliquant sur l’onglet « <i>Payer </i>[montant de la formule choisie] ».
            </p>
            <p>
                Avant de cliquer sur cet onglet, Vous avez la possibilité de revenir à la page précédente récapitulant
                la Commande pour corriger d’éventuelles erreurs de saisie de vos informations personnelles, en cliquant
                sur l’onglet « <i>Vérifier ma commande</i> » ou d’annuler votre Commande et de revenir à la page de
                l’offre, en cliquant sur l’onglet « <i>Abandonner la transaction</i> ».
            </p>
            <p>
                Un e-mail accusant réception de la Commande et de son paiement Vous sera envoyé dans les meilleurs
                délais à l’adresse électronique renseignée dans votre Compte. Cet e-mail comportera le numéro de la
                Commande. Une facture acquittée sera alors disponible sur votre Compte sous l’onglet «
                <i>Mon compte</i> », puis « <i>Mon dossier candidat</i> ».
            </p>
            <p>
                Concernant les formules « <i>Les packs conduite</i> », « <i>Code + 20h de conduite</i> » et «
                <i>Pack conduite accompagnée</i> » et, plus précisément, la Commande de leçons de conduite, l’e-mail qui
                Vous sera envoyé vous rappellera également votre acceptation des termes du contrat de formation établi
                entre Vous et notre Société.
            </p>
            <p>
                <b
                    >La Commande est alors réputée ferme et définitive sous réserve de l’exercice du droit de
                    rétractation dans les conditions énoncées à l’article 5.3 ci-dessous. Toute modification de Commande
                    est soumise à l’acceptation de Notre Société.</b
                >
            </p>
            <h5 class="font-bold">5.2.2. L’inscription aux examens théoriques et pratiques</h5>
            <p><i>a) L’inscription à l’examen théorique du permis de conduire</i></p>
            <p>
                Si vous ne possédez pas de numéro d’enregistrement préfectoral harmonisé (NEPH), Vous pouvez suivre les
                instructions données dans l’« <i>Espace Examen</i> » de Votre compte, qui Vous permettra de Vous
                enregistrer au Fichier national des permis de conduire et d’obtenir votre numéro NEPH auprès de l’Agence
                Nationale des Titres Sécurisés (ANTS), afin de Vous inscrire, ensuite, auprès des organismes agréés
                compétents pour organiser l’examen théorique du permis de conduire.
            </p>
            <p><i>b) Passage de l’examen pratique du permis de conduire</i></p>
            <p>
                Au regard de l'arrêté du 22 octobre 2014 fixant la méthode nationale d'attribution des places d'examen
                du permis de conduire, il est rappelé que MONITEURINDEPENDANT ne pourra être tenue responsable des
                délais d'obtention d'une place à l'examen du permis de conduire, dont seules les Autorités Françaises
                sont responsables.
            </p>
            <p>
                Par ailleurs, aucune stipulation des présentes CGV ne saurait contraindre notre Société d'assister les
                Clients lors de leur inscription à l'épreuve du permis de conduire et à les assister dans leurs
                relations avec Autorités Françaises relativement à leurs démarches, pour lesquelles ils restent seuls
                responsables.
            </p>
            <p>A titre informatif, ci-après les conditions à remplir si vous sollicitez une place d’examen pratique.</p>
            <p>
                i) Si Vous avez commandé les « <i>Les packs conduite</i> » ou « <i>Code + 20h de conduite</i> », Vous
                devez remplir les conditions suivantes :
            </p>
            <ul>
                <li>avoir 18 ans révolus,</li>
                <li>avoir effectué votre première heure d'évaluation,</li>
                <li>
                    avoir commandé au moins cinq (5) leçons de conduite, grâce aux formules "<i>Les packs conduite</i>"
                    ou « <i>Code + 20h de conduite</i> ».
                </li>
            </ul>
            <p>
                Vous serez invité à vérifier vos informations personnelles (nom, prénom, date de naissance, nom de votre
                représentant légal si vous êtes mineur adresse postale et numéro de téléphone) et à compléter votre
                dossier d’inscription en renseignant votre sexe, votre lieu de naissance (pays, ville, département), la
                date d’obtention de votre code de la route et votre numéro NEPH.
            </p>
            <p>Vous serez également invité à cocher, le cas échéant, les cases suivantes :</p>
            <ul>
                <li>« <i>Je porte des lunettes ou des lentilles</i> » et</li>
                <li>« <i>J’ai besoin d’un contrôle médical pour obtenir le permis</i> ».</li>
            </ul>
            <p>Vous pourrez alors cliquer sur l’onglet « <i>Enregistrer </i>».</p>
            <p>
                ii) Si Vous avez commandé le « <i>Pack conduite accompagnée</i> », Vous devez remplir les conditions
                suivantes :
            </p>
            <ul>
                <li>avoir 15 ans révolus,</li>
                <li>
                    avoir réalisé au moins 20 leçons de conduite avec un enseignant de la conduite du réseau
                    MoniteurIndependant
                </li>
                <li>
                    avoir parcouru au moins trois mille (3000) km pendant au moins douze (12) mois en conduite
                    accompagnée
                </li>
                <li>
                    avoir réalisé vos trois (3) rendez-vous pédagogiques de deux (2) heures avec un enseignant de la
                    conduite du réseau MONITEURINDEPENDANT
                </li>
            </ul>
            <p>
                Vous serez invité à vérifier vos informations personnelles (nom, prénom, date de naissance, nom de votre
                représentant légal si vous êtes mineur adresse postale et numéro de téléphone) et à compléter votre
                dossier d’inscription en renseignant votre sexe, votre lieu de naissance (pays, ville, département), la
                date d’obtention de votre code de la route et votre numéro NEPH.
            </p>
            <p>Vous serez également invité à cocher, le cas échéant, les cases suivantes :</p>
            <ul>
                <li>« <i>Je porte des lunettes ou des lentilles</i> » et</li>
                <li>« <i>J’ai besoin d’un contrôle médical pour obtenir le permis</i> ».</li>
            </ul>
            <p>Vous pourrez alors cliquer sur l’onglet « <i>Enregistrer </i>».</p>
            <h4 class="font-bold">5.3. Droit de rétractation</h4>
            <p>
                Conformément aux articles L. 221-18 et suivants du Code de la consommation, Vous disposez d’un délai de
                quatorze (14) jours calendaires pour exercer votre droit de rétractation, sans avoir à justifier de
                motif ni à supporter de pénalités. Ce délai de rétractation commence le lendemain de votre achat. Si ce
                délai expire un samedi, un dimanche ou un jour férié, il est prolongé jusqu'au premier jour ouvrable
                suivant.
            </p>
            <p>
                Pour exercer le droit légal de rétractation, Vous devez notifier votre décision de rétractation au moyen
                d’une déclaration dénuée d’ambiguïté adressée par e-mail avec accusé de réception à l’adresse suivante :
                <a class="text-primary" href="mailto:contactmoniteurindependant@gmail.com"
                    >contactmoniteurindependant@gmail.com</a
                >
                ou par courrier à l’adresse suivante : Auto Ecole moniteurindependant 22 RUE CHARLES LESCOT, 60700
                PONT-SAINTE-MAXENCE
            </p>
            <p>
                Pour que le délai de rétractation soit respecté, il suffit que Vous transmettiez votre écrit relatif à
                l’exercice du droit de rétractation à Notre Société avant l’expiration du délai de rétractation.
            </p>
            <p>
                En cas de rétractation de votre part, nous Vous rembourserons tous les paiements reçus de Vous, sans
                retard excessif et, en tout état de cause, au plus tard quatorze (14) jours à compter du jour où nous
                sommes informés de votre décision de rétractation (sauf retard justifié de notre part). Nous procéderons
                au remboursement en utilisant le même moyen de paiement que celui que Vous avez utilisé pour la
                transaction initiale.
            </p>
            <p>
                Conformément à l’article L. 221-25 du Code de la consommation, si Vous avez commencé à utiliser les
                Produits ou Services avant la fin du délai de rétractation et que Vous exercez votre droit de
                rétractation, alors Vous devrez payer à Notre Société un montant correspondant aux Produits ou Services
                fournis jusqu'à la communication de votre décision de rétractation, ce montant étant proportionné au
                prix total des Produits ou Services commandés.
            </p>
            <p>
                Conformément à l’article L. 221-28 1° du Code de la consommation, le droit de rétractation ne pourra
                être exercé lorsque les Produits ou les Services auront été pleinement exécutés avant la fin du délai de
                rétractation et dont l'exécution aura commencé après votre accord préalable exprès et renoncement exprès
                à votre droit de rétractation.
            </p>
            <h4 class="font-bold">5.4. Remboursement des leçons non réalisées hors délai de rétractation</h4>
            <p>
                Au-delà du délai de rétractation de quatorze (14) jours, moyennant le paiement intégral des prestations
                déjà réalisées, les leçons de conduite non réalisées pourront être remboursées, pour les seuls motifs
                légitimes suivants (ci-après les « Motifs Légitimes ») :
            </p>
            <ul>
                <li>
                    Absence de point de rendez-vous dans un rayon de moins de trente (30) minutes en voiture ou
                    quarante-cinq (40) km de distance en transport
                </li>
                <li>
                    Mutation professionnelle de l’élève dans une zone où l’auto-école n'est pas présente (Absence de
                    point de rendez-vous dans un rayon de moins de trente (30) minutes en voiture ou quarante (40) km de
                    distance en transport)
                </li>
                <li>Mutation professionnelle de l’élève</li>
                <li>
                    Absence de disponibilité, dans les 4 prochaines semaines, sur les plannings des points de
                    rendez-vous dans un rayon de moins de trente (30) minutes en voiture ou quarante (40) km
                </li>
                <li>
                    L’enseignant conseille à l’élève de poursuivre sa formation en « boite automatique » dans un
                    département où il n’y a pas d’enseignant « boite automatique » (Absence de point de rendez-vous dans
                    un rayon de moins de trente (30) minutes en voiture ou quarante (40) km de distance en transport)
                </li>
                <li>
                    Apparition d’un litige avec l’enseignant (reconnu comme tel par le secrétariat) et absence d’un
                    autre enseignant dans la zone située dans un rayon de moins de trente (30) minutes en voiture ou
                    quarante (40) km de distance en transport
                </li>
                <li>
                    Apparition d’un problème médical entrainant une incapacité définitive à la conduite, dument justifié
                </li>
                <li>
                    Obtention d’un résultat favorable à l’examen, dans le cadre d'une présentation à l'épreuve en
                    candidature individuelle et accompagné par un enseignant partenaire du réseau MONITEURINDEPENDANT
                </li>
            </ul>
            <h3 class="font-bold">ARTICLE 6. Conditions financières</h3>
            <h4 class="font-bold">6.1. Prix</h4>
            <p>
                Les prix affichés sur notre Site sont indiqués en euros, toutes taxes comprises. Ces tarifs tiennent
                compte de la TVA applicable au jour de la Commande. Le montant total dû est indiqué sur la page de
                confirmation de votre Commande. Le prix des Produits et des Services est celui en vigueur au jour de la
                Commande. Notre Société se réserve le droit de modifier ses prix à tout moment, tout en Vous
                garantissant l’application du prix du Produit et/ou du Service en vigueur au jour de la Commande.
            </p>
            <p>Les prix indiqués comprennent les frais de transport et de livraison sauf précision contraire.</p>
            <p>Aucun escompte ne sera accordé en cas de paiement anticipé.</p>
            <p>Le prix est exigible en totalité après la confirmation de la commande.</p>
            <p>Tous les prix sont mentionnés dans l’Annexe 1 (Grille tarifaire)</p>
            <h4 class="font-bold">6.2. Modalités de paiement</h4>
            <p>
                Notre Société s’appuie sur les dernières normes de sécurité et ne dispose à aucun moment de vos
                informations bancaires.
            </p>
            <p>Le paiement pourra s’effectuer selon l’une des deux modalités suivantes :</p>
            <ol>
                <li>paiement comptant en un seul versement</li>
                <li>
                    paiements échelonnés en deux ou en trois versements sans frais, le premier versement étant
                    systématiquement réalisé au moment de la Commande (cela sera mentionné systématiquement sur la page
                    avant le paiement final des formules impliquées)
                </li>
            </ol>
            <p>
                Si l’option 2 est retenue, les versements s’effectueront aux échéances et selon les montants repris sur
                la facture afférente à cet achat le jour J ( <u class="cdx-underline">Exemple </u>: pour le forfait 20h
                à 758 euros, l’élève paiera selon l’option 2 mentionnée ci-dessus : 252,67 euros TTC le jour J, puis
                252,67 euros TTC à J + 30, puis une dernière échéance à J + 60 de 252,67 euro TTC).
            </p>
            <p>
                <b>
                    La Commande sera effective après accord de votre centre de paiement bancaire. En cas de refus de ce
                    dernier et à l’issue de six (6) tentatives de prélèvement restées infructueuses, l'accès à votre
                    compte sera automatiquement rendu indisponible. Vous serez contacté dans les plus brefs délais (par
                    MONITEURINDEPENDANT ou un tiers prestataire de recouvrement) afin de procéder à la régularisation de
                    votre paiement. Dès que vous aurez régularisé votre situation, l'accès à votre Compte sera rétabli.
                </b>
            </p>
            <h4 class="font-bold">6.3. Pénalités de retard</h4>
            <p>
                Pour les paiements échelonnés, en cas de retard de paiement à l’échéance, et après envoi d’une mise en
                demeure avec accusé de réception restée sans suite, MONITEURINDEPENDANT se réserve le droit d’intenter
                une action judiciaire en recouvrement de créances, auquel cas les frais de sommation, de justice, ainsi
                que les honoraires d’avocat et d’huissier, et tous les frais annexes seront à votre charge.
            </p>
            <h3 class="font-bold">ARTICLE 7. Livraisons</h3>
            <p>
                Les informations fournies lors de la Commande Vous engagent. En cas d’informations erronées entraînant
                l’impossibilité de livrer la Commande, Nous ne pourrons être tenus responsables. L’enregistrement
                automatique des données que Vous avez renseignées vaut preuve de la nature de la Commande, de sa date et
                de son prix. Les Produits disponibles sur notre Site ne sont livrés qu’en France métropolitaine et ses
                territoires d’Outre-Mer.
            </p>
            <p>
                Les délais de livraison sont précisés lors de la passation de Commande. Passé ces délais, Notre Société
                Vous informera par courrier électronique, adressé à l’adresse e-mail indiquée sur votre Compte, des
                délais de retard à prévoir. Vous pourrez alors décider d’annuler la Commande, par lettre recommandée
                avec demande d’avis de réception adressée à 7 place saint-martin 60510 Rochy-condé, ou par un écrit sur
                un autre support durable si, après Nous avoir enjoints, selon les mêmes modalités, d'effectuer la
                livraison dans un délai supplémentaire raisonnable, Notre Société ne s'est pas exécutée dans ce délai.
            </p>
            <p>
                Le délai d’expédition commence à courir une fois la Commande entièrement réglée. Ce délai Vous est
                précisé sur la page de vérification de votre Commande. Vous devrez nous signaler - dès la réception du
                colis - toute anomalie ou avarie concernant le Produit (produit manquant ou endommagé) et ce
                conformément aux conditions et modalités exposées ci-après. Les frais postaux que Vous auriez, le cas
                échéant, supportés pour retourner le colis Vous seront remboursés sur présentation d’un justificatif de
                paiement.
            </p>
            <p>
                Notre Société s’efforce de répondre à vos attentes et Vous proposer des Produits de qualité. Si
                toutefois votre Commande était non-conforme, Vous devez nous faire parvenir le ou les Produits livrés
                sous quinze (15) jours par courrier à l’adresse suivante : 7 place saint-martin 60510 Rochy-condé.
            </p>
            <p>Pour les défauts de conformité, Vous devez Nous indiquer dans le courrier les mentions suivantes :</p>
            <ul>
                <li>le numéro de la Commande ;</li>
                <li>votre nom, prénom et adresse ;</li>
                <li>les défauts constatés.</li>
            </ul>
            <p>Si le défaut de conformité est avéré, Vous obtiendrez le remplacement du Produit.</p>
            <h3 class="font-bold">ARTICLE 8. Fourniture des Produits et exécution des Services</h3>
            <h4 class="font-bold">8.1. La formation au code de la route</h4>
            <p>
                Immédiatement après la Commande d’une des formules comprenant le « Code de la route », Vous aurez accès
                aux séries de questions avec leur correction (plus de 2000 questions), réparties en dix (10) thèmes
                conformément au code de la route et au Référentiel pour l’Education à une Mobilité Citoyenne (REMC).
                Trois modes d’évaluation des connaissances sont proposés : le mode entraînement, qui vous permet de vous
                entraîner à votre rythme, avec une réponse commentée à chaque fin de question, le mode examen, qui vous
                permet de vous entraîner dans les mêmes conditions que l’examen officiel, avec un temps limité par
                question, et enfin le mode thématique qui vous permet de vous entraîner par thème officiel du REMC pour
                les approfondir à son rythme. A chaque question, Vous aurez la possibilité de poser une question pour
                Vous aider dans la compréhension de cette règle de sécurité routière, et un professionnel Vous répondra
                dans les plus brefs délais afin de Vous apporter les informations nécessaires.
            </p>
            <h4 class="font-bold">8.2. La formation à la conduite</h4>
            <p>
                Pour les formules comprenant des leçons de conduite, en application de l’article L. 213-2 du code de la
                route, Vous serez invité à prendre connaissance et à lire attentivement le contrat de formation établi
                entre Vous et notre Société, régissant les conditions et les modalités de l'enseignement de la conduite
                et de la sécurité routière. Conformément à la législation applicable aux contrats conclus par voie
                électronique pour les ventes à distance, ce contrat de formation est réputé signé lorsque vous cochez la
                case « <i><b>Je comprends et j’accepte le contrat</b></i> ». Vous ne pourrez continuer à accéder à votre
                Compte ou poursuivre votre formation tant que vous ne l’aurez pas accepté.
            </p>
            <h4 class="font-bold">8.3. La réservation d’une leçon de conduite</h4>
            <p>
                Lorsque Vous achetez un pack comprenant une (1) heure d’évaluation ou un des pack de leçons de conduite,
                votre Compte est crédité du nombre d’heures correspondantes. Ainsi, une (1) heure d’évaluation achetée
                est égale à un (1) heure d’évaluation créditée sur votre Compte.
            </p>
            <p>
                La réservation d’une (1) heure d’évaluation ne peut se faire que par l’intermédiaire du Site.
                MONITEURINDEPENDANT a mis en place une plateforme dédiée Vous permettant d’accéder à un calendrier de
                réservation indiquant les disponibilités de chaque enseignant.
                <b
                    >Toute réservation directement auprès d’un enseignant est strictement interdite et passible de
                    poursuites judiciaires.</b
                >
            </p>
            <p>
                En tout état de cause, MONITEURINDEPENDANT décline toute responsabilité en cas d’indisponibilité de
                l’enseignant, de dommages et/ou d’infraction lorsque la leçon de conduite a été réservée en dehors du
                Site.
            </p>
            <p>
                L’accès au calendrier de réservation est disponible sur votre Compte, dans l’onglet « Conduite », puis «
                Réserver une leçon ». Vous serez alors invité à cliquer sur l’horaire et l’enseignant de vos choix,
                selon les disponibilités de ce dernier. Une fenêtre s’ouvrira récapitulant votre demande de réservation
                (nombre d’heures, nom de l’enseignant, date et heure, point(s) de rencontre proposé(s)). Pour valider
                votre réservation, Vous serez invité à cliquer sur l’onglet « Utiliser [X] heure(s) ». Une fenêtre
                s’affichera pour Vous confirmer la réservation. Celle-ci Vous sera également envoyée par e-mail, à
                l’adresse indiquée sur votre Compte. Le nombre d’heure(s) réservée(s) sera alors déduit de votre Compte.
            </p>
            <p>
                Vous pourrez consulter le récapitulatif de Vos réservations de leçons de conduite (date, heure, lieu,
                nom et numéro de téléphone de l’enseignant) à tout moment dans l’onglet « Conduite ».
            </p>
            <p>
                Les propositions de points de rencontre qui Vous sont faites sont fonction de votre localisation. Le
                point de dépose à l’issue de la séance pourra être le lieu de prise en charge initial ou tout autre lieu
                que Vous conviendrez avec l’enseignant.
            </p>
            <p>
                La durée d’une leçon de conduite au volant ne peut excéder deux (2) heures consécutives, l’interruption
                entre deux (2) séances de conduite devant être au moins égale à la durée de la séance précédente.
            </p>
            <h4 class="font-bold">8.4. L’annulation d’une leçon de conduite</h4>
            <p>
                <b>Réserver une leçon de conduite avec un enseignant Vous engage</b>. Si Vous ne pouvez pas respecter la
                date et l’horaire convenu, Vous devez en avertir l’enseignant dans le respect des délais mentionnés dans
                le présent article (§3) (ci-après les « Conditions d’annulation ») et ce par l’intermédiaire du Site, en
                allant dans l’onglet « Conduite » disponible sur votre Compte, puis en cliquant sur l’onglet « Annuler
                la réservation » correspondant à la(les) heure(s) de conduite que Vous souhaitez annuler. Une fenêtre
                s’affichera pour Vous confirmez l’annulation de la réservation. Sous réserve du respect des Conditions
                d’annulation, votre Compte sera alors immédiatement recrédité d’autant de crédits que d’heures annulées,
                Vous permettant de procéder à une nouvelle réservation, le cas échéant.
            </p>
            <p>
                Aucune annulation faite directement auprès de l’enseignant, ou par tout autre moyen que le Site, ne sera
                prise en compte par MONITEURINDEPENDANT. La ou les leçon(s) de conduite annulée(s) directement auprès de
                l’enseignant ou par tout autre moyen que sur le Site, ne sera(ont) pas recréditée(s) sur votre Compte ni
                remboursée(s).
            </p>
            <p>
                <b
                    >Toute leçon de conduite non annulée ou non modifiée sur le Site au minimum quarante-huit (48)
                    heures avant l’heure prévue pour le commencement de votre leçon de conduite, sera considérée comme
                    due et ne sera pas remboursée ni recréditée sur votre Compte, sauf Motif Légitime (tels que listés à
                    l’article 5.4) dûment justifié par écrit.</b
                >
            </p>
            <p>
                Notre Société et/ou l’enseignant se réservent la possibilité d’annuler une leçon de conduite sans
                préavis en cas de motif légitime dûment justifié. Vous serez prévenu au plus tôt par tous les moyens mis
                à la disposition de Notre Société et notamment par e-mail à l’adresse mentionnée dans votre Compte. Dans
                ce cas, le(s) leçon(s) de conduite déjà réglées donneront lieu à un recrédit sur votre Compte.
            </p>
            <h4 class="font-bold">8.5. La leçon de conduite</h4>
            <p>
                Durant la leçon de conduite, Vous vous engagez à suivre les indications et recommandations de
                l’enseignant.
            </p>
            <p>
                Vous vous engagez à avoir un comportement approprié à l’égard de l’enseignant et plus généralement à
                l’égard de tous les autres usagers de la route (automobilistes, piétons, etc.).
            </p>
            <h4 class="font-bold">8.6. Fin de la leçon de conduite</h4>
            <p>
                A l’issue de la leçon de conduite, l’enseignant Vous déposera au lieu de prise en charge ou tout autre
                lieu que Vous aurez convenu au préalable avec lui.
            </p>
            <p>
                A l’issue de la première (1) leçon de conduite d’évaluation et toutes les 5 (cinq) heures, Vous vous
                engagez à évaluer cette leçon et le service fourni par MONITEURINDEPENDANT en répondant à un e-mail qui
                vous sera envoyé. C’est le moyen pour MONITEURINDEPENDANT d’améliorer la qualité du service rendu.
            </p>
            <p>
                MONITEURINDEPENDANT n’a référencé que des enseignants de qualité disposant de toutes les autorisations
                requises, notamment titulaires du brevet pour l’exercice de la profession d’enseignant de la conduite
                automobile et de la sécurité routière (BEPECASER) ou bien le titre professionnel (TP) d’enseignant de la
                conduite et de la sécurité routière et disposant de véhicules conformes à la réglementation en vigueur.
            </p>
            <p>
                Cependant, si Vous constatiez une quelconque anomalie au cours de votre leçon, nous Vous invitons à nous
                en faire part rapidement par e-mail à l’adresse suivante :
                <a class="text-primary" href="mailto:contactmoniteurindependant@gmail.com"
                    >contactmoniteurindependant@gmail.com</a
                >
            </p>
            <h4 class="font-bold">
                8.7. La mise à disposition permanente de votre Compte et de votre suivi de formation
            </h4>
            <p>
                Vous pouvez retrouver sur votre Compte l’ensemble des éléments concernant votre profil et les leçons de
                conduite réalisées.
            </p>
            <p>
                En principe, à la fin de chaque séance, l’enseignant indépendant établira un bilan de la séance afin de
                faire un suivi de formation sur votre livret d’apprentissage accessible sur le Site (onglet « Conduite »
                et ensuite « Mon Livret d’apprentissage »). Vous pourrez ainsi retrouver électroniquement votre suivi de
                formation.
            </p>
            <h3 class="font-bold">ARTICLE 9. Assurance</h3>
            <p>
                L’Etablissement est titulaire d’une police d’assurance souscrite auprès de AXA FRANCE 14 Avenue General
                De Gaulle 78490 Montfort l’Amaury conformément à l’article L 211-1 du Code des Assurances.<br />Sur
                simple demande de l’Utilisateur, MONITEURINDEPENDANT lui adressera une attestation de son assureur.
            </p>
            <p>
                MONITEURINDEPENDANT n’a pas souscrit de garantie financière permettant le remboursement au Client des
                sommes trop perçues. Vous reconnaissez être informé de cette absence de garantie financière et
                l’accepter.
            </p>
            <h3 class="font-bold">ARTICLE 10. Conformité et garanties légales des Produits</h3>
            <p>
                Tous les produits qui Vous sont livrés bénéficient de la garantie légale de conformité (articles L.211-1
                et suivants du Code de la consommation) et de la garantie contre les vices cachés (articles 1641 et
                suivants du Code civil), conformément aux dispositions légales en vigueur.
            </p>
            <p>Article L. 211-4 du Code de la consommation :</p>
            <p>
                « Le vendeur est tenu de livrer un bien conforme au contrat et répond des défauts de conformité existant
                lors de la délivrance.
            </p>
            <p>
                Il répond également des défauts de conformité résultant de l'emballage, des instructions de montage ou
                de l'installation lorsque celle-ci a été mise à sa charge par le contrat ou a été réalisée sous sa
                responsabilité. »
            </p>
            <p>Article L. 211-5 du Code de la consommation :</p>
            <p>« Pour être conforme au contrat, le bien doit :</p>
            <p>1° Etre propre à l'usage habituellement attendu d'un bien semblable et, le cas échéant :</p>
            <p>
                - correspondre à la description donnée par le vendeur et posséder les qualités que celui-ci a présentées
                à l'acheteur sous forme d'échantillon ou de modèle ;
            </p>
            <p>
                - présenter les qualités qu'un acheteur peut légitimement attendre eu égard aux déclarations publiques
                faites par le vendeur, par le producteur ou par son représentant, notamment dans la publicité ou
                l'étiquetage ;
            </p>
            <p>
                2° Ou présenter les caractéristiques définies d'un commun accord par les parties ou être propre à tout
                usage spécial recherché par l'acheteur, porté à la connaissance du vendeur et que ce dernier a accepté.
                »
            </p>
            <p>Article L. 211-12 du Code de la consommation :</p>
            <p>
                « L'action résultant du défaut de conformité se prescrit par deux ans à compter de la délivrance du
                bien. »
            </p>
            <p>Article 1641 du Code civil :</p>
            <p>
                « Le vendeur est tenu de la garantie à raison des défauts cachés de la chose vendue qui la rendent
                impropre à l'usage auquel on la destine, ou qui diminuent tellement cet usage que l'acheteur ne l'aurait
                pas acquise, ou n'en aurait donné qu'un moindre prix, s'il les avait connus. »
            </p>
            <p>Article 1648 alinéa 1er du Code civil :</p>
            <p>
                « L'action résultant des vices rédhibitoires doit être intentée par l'acquéreur dans un délai de deux
                ans à compter de la découverte du vice. »
            </p>
            <p>
                Les réclamations faites au titre des garanties doivent être adressées à notre Société par e-mail, à
                l’adresse suivante :
                <a class="text-primary" href="mailto:contactmoniteurindependant@gmail.com"
                    >contactmoniteurindependant@gmail.com</a
                >
                ou par courrier à l’adresse suivante : MONITEURINDEPENDANT ,22 RUE CHARLES LESCOT, 60700
                PONT-SAINTE-MAXENCE.
            </p>
            <h3 class="font-bold">ARTICLE 11. Responsabilité</h3>
            <p>
                Dans toute la mesure autorisée par la loi et la jurisprudence applicable, la responsabilité de notre
                Société ne saurait être engagée :
            </p>
            <ul>
                <li>
                    En cas de retard ou d’impossibilité de fournir le Service souscrit et/ou de livrer le(s) Produit(s)
                    afférents au Service, dû à une information erronée ou incomplète dans la saisie des informations
                    Vous concernant lors de votre inscription sur le Site ;
                </li>
                <li>En cas d’erreur de votre part dans la Commande validée ;</li>
                <li>
                    En cas de faute ou défaillance de votre part dans l’exécution du Service et/ou l’utilisation du(des)
                    Produit(s) après sa(leur) livraison.
                </li>
            </ul>
            <p>
                En outre, conformément à l’article 1218 du Code civil, la responsabilité de notre Société ne saurait
                être engagée, d’une façon générale, dans tous les cas où l'inexécution ou la mauvaise exécution de ses
                prestations et/ou obligations résulterait d'un cas de force majeure ou cas fortuit indépendant de sa
                volonté.
            </p>
            <p>
                Enfin, les Parties ne pourront être tenues responsables d’éventuels préjudices indirects, c’est-à-dire
                ceux qui ne résultent pas directement et exclusivement de leur fait (à titre d’exemple, sans que cette
                liste ne soit exhaustive : la perte de chance, le manque à gagner, etc.).
            </p>
            <h3 class="font-bold">ARTICLE 12. Protection de vos données personnelles</h3>
            <p>
                Toute passation d’une Commande sur le Site suppose la collecte et le traitement de données à caractère
                personnel Vous concernant. La collecte et le traitement de vos données à caractère personnel, ainsi que
                les droits dont Vous disposez, sont explicités au sein de notre charte de confidentialité.
            </p>
            <h3 class="font-bold">ARTICLE 13. Propriété intellectuelle</h3>
            <p>
                Le Site et/ou tous les éléments se trouvant sur le Site (notamment textes, images, logos, photographies,
                etc.) sont protégés par les droits de propriété intellectuelle (y compris notamment tous droits
                d’auteur, droits sur les brevets, les marques, les dessins et modèles, les bases de données, les noms de
                domaine et tout autre droit de propriété intellectuelle existant ou futur, français et internationaux)
                et appartiennent à notre Société ou à des tiers nous ayant autorisé à les exploiter.
            </p>
            <p>
                L’utilisation du Site ne Vous confère en aucune façon un droit de propriété ou un droit de propriété
                intellectuelle sur le Site et/ou les éléments se trouvant sur le Site à l’exception d’un droit personnel
                d’accès, gratuit et non exclusif, limité exclusivement à l’utilisation du Site et des éléments se
                trouvant sur le Site conformément aux finalités définies par notre Société. Toute reproduction ou
                représentation totale ou partielle du Site ou de tout ou partie des éléments se trouvant sur le Site
                sans l’accord préalable écrit de notre Société constitue une violation des droits de propriété
                intellectuelle de notre Société et/ou des tiers concédants et est susceptible d’entraîner des poursuites
                civiles et pénales.
            </p>
            <h3 class="font-bold">ARTICLE 14. Droit applicable</h3>
            <p>
                Toute question relative aux présentes CGV ainsi qu'aux ventes qu'elles régissent, qui ne serait pas
                traitée par les présentes stipulations contractuelles, sera régie par la loi française à l'exclusion de
                tout autre droit.
            </p>
            <h3 class="font-bold">ARTICLE 15. Dispositions diverses</h3>
            <h4 class="font-bold">15.1. Indépendance des clauses</h4>
            <p>
                Dans le cas où une ou plusieurs dispositions des CGV seraient tenues pour invalides ou déclarées comme
                telles en application d’une loi, d’un règlement ou à la suite d’une décision d’une juridiction
                compétente devenue définitive, les autres dispositions des CGV conserveraient néanmoins toute leur force
                et leur portée.
            </p>
            <h4 class="font-bold">15.2. Non renonciation</h4>
            <p>
                Le défaut pour notre Société de se prévaloir, à un moment donné, de l’une quelconque des dispositions
                des CGV, ne saurait être interprété à l’avenir comme une renonciation aux droits qu’elle tient des
                présentes.
            </p>
            <h4 class="font-bold">15.3. Valeur des titres</h4>
            <p>
                Les titres et sous-titres des articles des CGV sont indiqués à titre de référence uniquement et ne
                sauraient limiter le champ d’application des articles correspondants.
            </p>
            <h4 class="font-bold">15.4. Archivage et convention de preuve</h4>
            <p>
                L’archivage des communications, des bons de commande et des factures, ou de tout autre fichier
                informatique Vous concernant, est effectué sur un support fiable et durable de manière à constituer une
                copie fidèle et durable conformément à l’article 1379 du Code civil. Sauf preuve contraire, les données
                enregistrées par notre Société constituent la preuve de l'ensemble des transactions.
            </p>
            <h4 class="font-bold">15.5. Réclamations et médiations</h4>
            <p>
                Pour toute demande afférente à une Commande en cours ou aux CGV, Vous êtes invité à contacter notre
                Société par e-mail à l’adresse suivante :<br /><a
                    class="text-primary"
                    href="mailto:contactmoniteurindependant@gmail.com"
                    >contactmoniteurindependant@gmail.com</a
                >
                ou par courrier, à l’adresse suivante: MONITEURINDEPENDANT, 22 RUE CHARLES LESCOT, 60700
                PONT-SAINTE-MAXENCE ou en prenant soin de préciser en rubrique "objet" la date et le numéro de la
                Commande en cause.
            </p>
            <p>
                Le secrétariat de MONITEURINDEPENDANT est le mieux placé pour répondre à vos questions et résoudre vos
                problèmes, nous vous invitons à les contacter en premier.
            </p>
        </div>
    </div>
</template>
