/* ==========================================================================
   VitaNord Fysioterapi Clinic: content file
   --------------------------------------------------------------------------
   This is the file the clinic edits day to day.
   Everything below drives the website: services, treatments, team, prices.

   HOW TO EDIT
   -----------
   * Text lives inside the language blocks:
       en = English   no = Norsk   sv = Svenska   fi = Suomi   es = Español
   * Keep the quotes and commas exactly as they are.
   * To ADD a treatment: copy a whole { ... } block, change the "slug"
     and the text, then create a matching page in /treatments/.
   * To HIDE something: set  "published": false
   * Prices are placeholders (EUR XX). Replace them with your real prices.
   * Anything you leave untranslated falls back to English.
   ========================================================================== */

window.VN_CONTENT = {

  /* ---------------------------------------------------------------- CLINIC */
  clinic: {
    name: 'VitaNord Fysioterapi Clinic',
    shortName: 'VitaNord',
    street: 'C. Bautista Bertomeu Sober, 5, 1ª planta local 29',
    postalCode: '03183',
    city: 'Torrevieja',
    region: 'Alicante',
    country: 'España',
    countryCode: 'ES',
    email: 'info@vitanord.net',
    website: 'https://vitanord.net',
    /* Replace the placeholders below with your real numbers. */
    phone: '+34 623 80 20 23',
    phoneHref: '+34623802023',
    whatsapp: '34623802023',           // EDIT ME (digits only, no + sign)
    whatsappEnabled: false,            // set true once the number is real
    geo: { lat: 37.9772, lng: -0.6822 }, // EDIT ME if the pin needs nudging
    mapsShortLink: 'https://maps.app.goo.gl/rUM2JhkUc7RgFKGFA',
    /* Languages actually spoken at the clinic. Codes are translated
       automatically (see 'lang.*' in i18n.js). */
    /* Languages actually spoken at the clinic. Drives the hero bullet and the
       counter on the homepage, so it stays true when the team changes. */
    spokenLanguages: ['en', 'es'],
    /* Opening hours.
       open/close null          = closed that day
       byAppointment: true      = shown as "By appointment" instead of "Closed".
       Weekend slots are NOT offered by the online booking system on purpose:
       they are arranged by telephone so you can plan the day yourself. */
    hours: [
      { day: 'mon', open: '09:00', close: '19:00' },
      { day: 'tue', open: '09:00', close: '19:00' },
      { day: 'wed', open: '09:00', close: '19:00' },
      { day: 'thu', open: '09:00', close: '19:00' },
      { day: 'fri', open: '09:00', close: '17:00' },
      { day: 'sat', open: null,    close: null, byAppointment: true },
      { day: 'sun', open: null,    close: null, byAppointment: true }
    ],
    social: {
      facebook: '',   // e.g. https://facebook.com/vitanordfisio
      instagram: ''
    }
  },

  /* -------------------------------------------------------------- SERVICES */
  /* Shown as cards on the homepage. icon = key from assets/js/icons.js       */
  services: [
    { slug: 'general-physiotherapy', icon: 'hands', published: true,
      en: { title: 'General Physiotherapy',        text: 'Hands-on assessment and treatment tailored to how your body actually moves.' },
      no: { title: 'Generell fysioterapi',         text: 'Grundig undersøkelse og manuell behandling tilpasset hvordan kroppen din faktisk beveger seg.' },
      sv: { title: 'Allmän fysioterapi',           text: 'Noggrann undersökning och manuell behandling anpassad efter hur din kropp faktiskt rör sig.' },
      fi: { title: 'Yleinen fysioterapia',         text: 'Huolellinen tutkimus ja manuaalinen hoito, joka on sovitettu siihen miten kehosi todella liikkuu.' },
      es: { title: 'Fisioterapia general',         text: 'Valoración y tratamiento manual adaptados a cómo se mueve realmente tu cuerpo.' } },

    { slug: 'rehabilitation',   icon: 'progress', published: true,
      en: { title: 'Rehabilitation',             text: 'Structured, progressive programmes that rebuild strength and confidence step by step.' },
      no: { title: 'Rehabilitering',             text: 'Strukturerte, progressive program som bygger opp styrke og trygghet steg for steg.' },
      sv: { title: 'Rehabilitering',             text: 'Strukturerade, progressiva program som bygger upp styrka och trygghet steg för steg.' },
      fi: { title: 'Kuntoutus',                  text: 'Järjestelmällisiä, nousujohteisia ohjelmia jotka rakentavat voimaa ja luottamusta askel askeleelta.' },
      es: { title: 'Rehabilitación',             text: 'Programas progresivos y estructurados que reconstruyen fuerza y confianza paso a paso.' } },

    { slug: 'sports-injuries',  icon: 'run',      published: true,
      en: { title: 'Sports injuries',            text: 'Assessment, treatment and return-to-sport planning for active people of every level.' },
      no: { title: 'Idrettsskader',              text: 'Undersøkelse, behandling og plan for retur til idrett, uansett nivå.' },
      sv: { title: 'Idrottsskador',              text: 'Undersökning, behandling och plan för återgång till idrott, oavsett nivå.' },
      fi: { title: 'Urheiluvammat',              text: 'Tutkimus, hoito ja suunnitelma paluusta lajin pariin, tasosta riippumatta.' },
      es: { title: 'Lesiones deportivas',        text: 'Valoración, tratamiento y plan de vuelta al deporte para deportistas de cualquier nivel.' } },

    { slug: 'back-neck-pain',   icon: 'spine',    published: true,
      en: { title: 'Back and neck pain',         text: 'For stiff, aching or painful backs and necks, including desk-related complaints.' },
      no: { title: 'Rygg- og nakkesmerter',      text: 'For stiv, verkende eller smertefull rygg og nakke, også plager fra stillesittende arbeid.' },
      sv: { title: 'Rygg- och nackbesvär',       text: 'För stel, värkande eller smärtande rygg och nacke, även besvär från stillasittande arbete.' },
      fi: { title: 'Selkä- ja niskakivut',       text: 'Jäykkään, särkevään tai kipeään selkään ja niskaan, myös istumatyön aiheuttamiin vaivoihin.' },
      es: { title: 'Dolor de espalda y cuello',  text: 'Para espalda y cuello rígidos o doloridos, incluidas molestias por trabajo de oficina.' } },

    { slug: 'functional-screening-seniors', icon: 'target', published: true,
      en: { title: 'Functional screening for seniors', text: 'A clear picture of how you move now, and what keeps you steady and independent.' },
      no: { title: 'Funksjonstest for seniorer',       text: 'Et tydelig bilde av hvordan du beveger deg nå, og hva som holder deg stødig og selvstendig.' },
      sv: { title: 'Funktionsbedömning för seniorer',  text: 'En tydlig bild av hur du rör dig i dag, och vad som håller dig stadig och självständig.' },
      fi: { title: 'Ikäihmisten toimintakykykartoitus', text: 'Selkeä kuva siitä miten liikut nyt, ja mikä pitää sinut tukevana ja omatoimisena.' },
      es: { title: 'Valoración funcional para mayores', text: 'Una imagen clara de cómo te mueves hoy y de qué te mantiene estable y autónomo.' } },

    { slug: 'post-operative',   icon: 'shield',   published: true,
      en: { title: 'Post-operative rehabilitation', text: 'Careful, staged recovery after surgery, in step with your surgeon’s protocol.' },
      no: { title: 'Rehabilitering etter operasjon', text: 'Skånsom, trinnvis opptrening etter operasjon, i tråd med kirurgens protokoll.' },
      sv: { title: 'Rehabilitering efter operation', text: 'Skonsam, stegvis återhämtning efter kirurgi, i linje med kirurgens protokoll.' },
      fi: { title: 'Leikkauksen jälkeinen kuntoutus', text: 'Varovainen, vaiheittainen toipuminen leikkauksen jälkeen kirurgin ohjeiden mukaan.' },
      es: { title: 'Rehabilitación postoperatoria',  text: 'Recuperación cuidadosa y por etapas tras la cirugía, siguiendo el protocolo de tu cirujano.' } },

    { slug: 'preventative',     icon: 'leaf',     published: true,
      en: { title: 'Preventative physiotherapy', text: 'Screening, advice and training to keep small niggles from becoming big problems.' },
      no: { title: 'Forebyggende fysioterapi',   text: 'Screening, råd og trening som hindrer små plager i å bli store problemer.' },
      sv: { title: 'Förebyggande fysioterapi',   text: 'Screening, råd och träning som hindrar små krämpor från att bli stora problem.' },
      fi: { title: 'Ennaltaehkäisevä fysioterapia', text: 'Kartoitus, ohjeet ja harjoittelu, jotta pienistä vaivoista ei tule suuria ongelmia.' },
      es: { title: 'Fisioterapia preventiva',    text: 'Valoración, consejo y entrenamiento para que las pequeñas molestias no vayan a más.' } },

    { slug: 'home-visit',       icon: 'home',     published: true,
      en: { title: 'Home visit',                 text: 'The same treatment in your own home, when getting to the clinic is the hard part.' },
      no: { title: 'Hjemmebesøk',                text: 'Samme behandling hjemme hos deg, når det å komme seg til klinikken er det vanskelige.' },
      sv: { title: 'Hembesök',                   text: 'Samma behandling hemma hos dig, när det svåra är att ta sig till kliniken.' },
      fi: { title: 'Kotikäynti',                 text: 'Sama hoito omassa kodissasi, kun vaikeinta on päästä klinikalle.' },
      es: { title: 'Visita a domicilio',         text: 'El mismo tratamiento en tu casa, cuando lo difícil es llegar a la clínica.' } }
  ],

  /* ------------------------------------------------------------ TREATMENTS */
  /* Each treatment has its own page at /treatments/<slug>.html               */
  treatments: [
    {
      slug: 'general-physiotherapy', icon: 'hands', published: true, duration: 45,
      en: {
        title: 'General Physiotherapy',
        summary: 'A thorough assessment followed by hands-on treatment and a plan you can actually follow.',
        what: 'General physiotherapy begins with listening. We take a full history, look at how you move, and test the areas involved before treating anything. It covers the everyday problems that bring most people to a clinic: shoulders, hips, knees, ankles, muscles and tendons. Treatment may combine manual techniques, soft-tissue work, guided movement and advice on load and activity, always chosen to suit you rather than a fixed protocol.',
        suitable: [
          'Pain or stiffness that has not settled on its own',
          'Shoulder, hip, knee or ankle pain that limits what you want to do',
          'Reduced movement, strength or function',
          'Tendon-related pain that flares up with activity',
          'A second opinion on a problem that keeps coming back'
        ],
        visit: [
          'Conversation about your history, symptoms and goals',
          'Physical assessment of movement, strength and the affected area',
          'Explanation of the findings in plain language',
          'Hands-on treatment where appropriate',
          'A short home programme and a clear plan for the next steps'
        ]
      },
      no: {
        title: 'Generell fysioterapi',
        summary: 'Grundig undersøkelse, manuell behandling og en plan du faktisk klarer å følge.',
        what: 'Generell fysioterapi starter med å lytte. Vi tar en full sykehistorie, ser på hvordan du beveger deg og undersøker de aktuelle områdene før vi behandler. Den dekker hverdagsplagene som de fleste kommer til klinikken med: skuldre, hofter, knær, ankler, muskler og sener. Behandlingen kan kombinere manuelle teknikker, bløtvevsbehandling, veiledet bevegelse og råd om belastning og aktivitet, alltid tilpasset deg og ikke en fast mal.',
        suitable: [
          'Smerte eller stivhet som ikke gir seg av seg selv',
          'Smerter i skulder, hofte, kne eller ankel som begrenser deg',
          'Redusert bevegelse, styrke eller funksjon',
          'Seneplager som blusser opp ved aktivitet',
          'Ønske om en ny vurdering av et problem som stadig kommer tilbake'
        ],
        visit: [
          'Samtale om sykehistorie, symptomer og mål',
          'Undersøkelse av bevegelse, styrke og det aktuelle området',
          'Forklaring av funnene på et forståelig språk',
          'Manuell behandling der det er aktuelt',
          'Et kort hjemmeprogram og en tydelig plan videre'
        ]
      },
      sv: {
        title: 'Allmän fysioterapi',
        summary: 'En grundlig undersökning följd av manuell behandling och en plan du faktiskt klarar att följa.',
        what: 'Allmän fysioterapi börjar med att lyssna. Vi tar en fullständig sjukhistoria, ser hur du rör dig och undersöker de aktuella områdena innan vi behandlar något. Den täcker de vardagsbesvär som de flesta söker för: axlar, höfter, knän, fotleder, muskler och senor. Behandlingen kan kombinera manuella tekniker, mjukdelsbehandling, handledd rörelse och råd om belastning och aktivitet, alltid valt för dig och inte efter en fast mall.',
        suitable: [
          'Smärta eller stelhet som inte gått över av sig själv',
          'Smärta i axel, höft, knä eller fotled som begränsar dig',
          'Minskad rörlighet, styrka eller funktion',
          'Sensmärta som blossar upp vid aktivitet',
          'En andra bedömning av ett besvär som hela tiden återkommer'
        ],
        visit: [
          'Samtal om din sjukhistoria, dina symtom och dina mål',
          'Undersökning av rörlighet, styrka och det aktuella området',
          'Förklaring av fynden på vanligt språk',
          'Manuell behandling när det passar',
          'Ett kort hemmaprogram och en tydlig plan framåt'
        ]
      },
      fi: {
        title: 'Yleinen fysioterapia',
        summary: 'Perusteellinen tutkimus, manuaalinen hoito ja suunnitelma jota pystyt oikeasti noudattamaan.',
        what: 'Yleinen fysioterapia alkaa kuuntelemalla. Käymme läpi esitietosi, katsomme miten liikut ja tutkimme kyseiset alueet ennen kuin hoidamme mitään. Se kattaa arkiset vaivat joiden vuoksi useimmat tulevat vastaanotolle: olkapäät, lonkat, polvet, nilkat, lihakset ja jänteet. Hoito voi yhdistää manuaalisia tekniikoita, pehmytkudoskäsittelyä, ohjattua liikettä sekä neuvoja kuormituksesta ja aktiivisuudesta, aina sinulle sovitettuna eikä kiinteän kaavan mukaan.',
        suitable: [
          'Kipu tai jäykkyys joka ei ole hellittänyt itsestään',
          'Olkapään, lonkan, polven tai nilkan kipu joka rajoittaa tekemistäsi',
          'Heikentynyt liikkuvuus, voima tai toimintakyky',
          'Jänneperäinen kipu joka pahenee liikkuessa',
          'Toinen näkemys ongelmasta joka palaa yhä uudelleen'
        ],
        visit: [
          'Keskustelu esitiedoista, oireista ja tavoitteista',
          'Liikkuvuuden, voiman ja oirealueen tutkiminen',
          'Löydösten selittäminen selkokielellä',
          'Manuaalinen hoito silloin kun se on aiheellista',
          'Lyhyt kotiohjelma ja selkeä suunnitelma jatkosta'
        ]
      },
      es: {
        title: 'Fisioterapia general',
        summary: 'Una valoración completa, tratamiento manual y un plan que de verdad puedes seguir.',
        what: 'La fisioterapia general empieza escuchando. Recogemos tu historia clínica, observamos cómo te mueves y exploramos las zonas implicadas antes de tratar nada. Cubre los problemas cotidianos por los que la mayoría acude a consulta: hombros, caderas, rodillas, tobillos, músculos y tendones. El tratamiento puede combinar técnicas manuales, trabajo de tejidos blandos, movimiento guiado y consejo sobre carga y actividad, siempre elegido para ti y no según un protocolo fijo.',
        suitable: [
          'Dolor o rigidez que no se resuelve solo',
          'Dolor de hombro, cadera, rodilla o tobillo que te limita',
          'Pérdida de movimiento, fuerza o función',
          'Dolor de origen tendinoso que se agrava con la actividad',
          'Una segunda opinión sobre un problema que vuelve una y otra vez'
        ],
        visit: [
          'Conversación sobre tu historia, síntomas y objetivos',
          'Exploración de movimiento, fuerza y zona afectada',
          'Explicación de los hallazgos en lenguaje claro',
          'Tratamiento manual cuando esté indicado',
          'Un programa breve para casa y un plan claro'
        ]
      }
    },
    {
      slug: 'rehabilitation', icon: 'progress', published: true, duration: 45,
      en: {
        title: 'Rehabilitation',
        summary: 'Progressive, measurable programmes that take you from where you are to where you want to be.',
        what: 'Rehabilitation is the middle phase of recovery. It focuses on regaining lost abilities, improving independence and reducing the impact of any disability left behind by an injury, an illness or surgery. To do that we set goals, reassess along the way and adjust the programme as you progress.',
        suitable: [
          'Recovery after surgery',
          'Weakness or loss of balance after a period of immobilisation',
          'Vestibular rehabilitation, dizziness or vertigo',
          'Cardiopulmonary rehabilitation, for example after a stable heart attack or with pulmonary fibrosis',
          'Pelvic rehabilitation, including urinary incontinence and pelvic organ prolapse'
        ],
        visit: [
          'Assessment of your current level and your limitations',
          'Functional and objective testing matched to your goals',
          'A programme adapted to your stage of recovery',
          'Guidance and review of technique, dosage and exercise progression',
          'A scheduled reassessment'
        ]
      },
      no: {
        title: 'Rehabilitering',
        summary: 'Progressive, målbare program som tar deg fra der du er til dit du vil.',
        what: 'Rehabilitering er mellomfasen i opptreningen. Den handler om å gjenvinne tapte ferdigheter, bedre selvstendigheten og redusere følgene av en funksjonsnedsettelse etter skade, sykdom eller operasjon. Derfor setter vi mål, revurderer underveis og justerer programmet etter hvert som du blir bedre.',
        suitable: [
          'Opptrening etter operasjon',
          'Svakhet eller dårligere balanse etter en periode med immobilisering',
          'Vestibulær rehabilitering, svimmelhet eller vertigo',
          'Hjerte- og lungerehabilitering, for eksempel etter stabilt hjerteinfarkt eller ved lungefibrose',
          'Bekkenrehabilitering, blant annet urinlekkasje og fremfall av bekkenorganer'
        ],
        visit: [
          'Vurdering av ditt nåværende nivå og dine begrensninger',
          'Funksjonelle og objektive tester tilpasset målene dine',
          'Et program tilpasset fasen du er i',
          'Oppfølging og gjennomgang av teknikk, dosering og progresjon i øvelsene',
          'Planlagt ny vurdering'
        ]
      },
      sv: {
        title: 'Rehabilitering',
        summary: 'Progressiva, mätbara program som tar dig från där du är till dit du vill.',
        what: 'Rehabilitering är mellanfasen i återhämtningen. Den handlar om att återfå förlorade förmågor, öka självständigheten och minska följderna av en funktionsnedsättning efter skada, sjukdom eller operation. Därför sätter vi mål, omvärderar längs vägen och justerar programmet allteftersom du blir bättre.',
        suitable: [
          'Återhämtning efter operation',
          'Svaghet eller sämre balans efter en period av immobilisering',
          'Vestibulär rehabilitering, yrsel eller svindel',
          'Hjärt- och lungrehabilitering, till exempel efter stabil hjärtinfarkt eller vid lungfibros',
          'Bäckenrehabilitering, bland annat urininkontinens och framfall av bäckenorgan'
        ],
        visit: [
          'Bedömning av din nuvarande nivå och dina begränsningar',
          'Funktionella och objektiva tester anpassade till dina mål',
          'Ett program anpassat till din återhämtningsfas',
          'Handledning och genomgång av teknik, dosering och stegring i övningarna',
          'En inplanerad omvärdering'
        ]
      },
      fi: {
        title: 'Kuntoutus',
        summary: 'Nousujohteisia, mitattavia ohjelmia jotka vievät sinut nykytilasta tavoitteeseesi.',
        what: 'Kuntoutus on toipumisen välivaihe. Siinä keskitytään menetettyjen taitojen palauttamiseen, omatoimisuuden parantamiseen ja vamman, sairauden tai leikkauksen jättämän haitan vähentämiseen. Siksi asetamme tavoitteet, arvioimme matkan varrella uudelleen ja säädämme ohjelmaa edistymisesi mukaan.',
        suitable: [
          'Toipuminen leikkauksen jälkeen',
          'Heikkous tai tasapainon heikkeneminen liikkumattoman jakson jälkeen',
          'Vestibulaarinen kuntoutus, huimaus tai kiertohuimaus',
          'Sydän- ja keuhkokuntoutus, esimerkiksi vakaan sydäninfarktin jälkeen tai keuhkofibroosissa',
          'Lantionpohjan kuntoutus, muun muassa virtsankarkailu ja lantion elinten laskeuma'
        ],
        visit: [
          'Nykyisen tasosi ja rajoitteidesi arviointi',
          'Toiminnalliset ja objektiiviset testit tavoitteidesi mukaan',
          'Toipumisvaiheeseesi sovitettu ohjelma',
          'Ohjaus sekä tekniikan, annostelun ja liikkeiden etenemisen tarkistus',
          'Sovittu uusintaarviointi'
        ]
      },
      es: {
        title: 'Rehabilitación',
        summary: 'Programas progresivos y medibles que te llevan de donde estás a donde quieres llegar.',
        what: 'La rehabilitación es la fase intermedia de la recuperación. Se enfoca en recuperar habilidades perdidas, mejorar la autonomía y disminuir el impacto de cualquier discapacidad después de una lesión, enfermedad o cirugía. Para ello fijamos objetivos, reevaluamos por el camino y ajustamos el programa según avanzas.',
        suitable: [
          'Recuperación después de cirugía',
          'Debilidad o pérdida de equilibrio después de inmovilización',
          'Rehabilitación vestibular, mareos o vértigo',
          'Rehabilitación cardiopulmonar, después de infarto cardiaco estable, fibrosis pulmonar, entre otros',
          'Rehabilitación pélvica: personas con incontinencia urinaria, prolapso de órganos pélvicos, entre otros'
        ],
        visit: [
          'Evaluación de tu nivel actual y limitaciones',
          'Pruebas funcionales y objetivas acorde a tus objetivos',
          'Programa adaptado a tu fase de recuperación',
          'Acompañamiento y revisión de la técnica, dosis y progresión de ejercicios',
          'Reevaluación programada'
        ]
      }
    },
    {
      slug: 'sports-injuries', icon: 'run', published: true, duration: 45,
      en: {
        title: 'Sports injuries',
        summary: 'From the first days after an injury through to a planned return to your sport.',
        what: 'Sports injury work covers the whole arc: settling the acute phase, restoring range and strength, then rebuilding the specific qualities your sport demands, such as sprinting, changing direction, jumping, throwing and endurance. We plan the return with criteria, not just a calendar.',
        suitable: [
          'Muscle, tendon and ligament injuries',
          'Overuse complaints from running, racket sports, golf, cycling or the gym',
          'Recurring injuries that keep interrupting training',
          'Athletes preparing to return to competition'
        ],
        visit: [
          'History of the injury and the demands of your sport',
          'Assessment of the injured area and related links in the chain',
          'Treatment to reduce irritation and restore movement',
          'Sport-specific loading and progression criteria',
          'A realistic timeline discussed openly with you'
        ]
      },
      no: {
        title: 'Idrettsskader',
        summary: 'Fra de første dagene etter skaden til en planlagt retur til idretten din.',
        what: 'Arbeid med idrettsskader dekker hele forløpet: å roe den akutte fasen, gjenopprette bevegelighet og styrke, og deretter bygge opp de egenskapene idretten din krever, som spurt, retningsforandringer, hopp, kast og utholdenhet. Returen planlegges etter kriterier, ikke bare kalender.',
        suitable: [
          'Skader i muskler, sener og leddbånd',
          'Belastningsplager fra løping, racketidrett, golf, sykling eller styrketrening',
          'Gjentakende skader som stadig avbryter treningen',
          'Utøvere som forbereder retur til konkurranse'
        ],
        visit: [
          'Gjennomgang av skaden og kravene i idretten din',
          'Undersøkelse av skadeområdet og resten av bevegelseskjeden',
          'Behandling for å dempe irritasjon og gjenopprette bevegelse',
          'Idrettsspesifikk belastning og kriterier for progresjon',
          'En realistisk tidslinje som vi snakker åpent om'
        ]
      },
      sv: {
        title: 'Idrottsskador',
        summary: 'Från de första dagarna efter skadan till en planerad återgång till din idrott.',
        what: 'Arbetet med idrottsskador täcker hela förloppet: att lugna den akuta fasen, återställa rörlighet och styrka, och sedan bygga upp de egenskaper din idrott kräver, som sprint, riktningsändringar, hopp, kast och uthållighet. Återgången planeras efter kriterier, inte bara efter kalendern.',
        suitable: [
          'Skador i muskler, senor och ligament',
          'Belastningsbesvär från löpning, racketsport, golf, cykling eller gym',
          'Återkommande skador som hela tiden avbryter träningen',
          'Idrottare som förbereder återgång till tävling'
        ],
        visit: [
          'Genomgång av skadan och kraven i din idrott',
          'Undersökning av skadeområdet och resten av rörelsekedjan',
          'Behandling för att dämpa irritation och återställa rörelse',
          'Idrottsspecifik belastning och kriterier för stegring',
          'En realistisk tidsplan som vi pratar öppet om'
        ]
      },
      fi: {
        title: 'Urheiluvammat',
        summary: 'Vamman ensipäivistä suunniteltuun paluuseen lajisi pariin.',
        what: 'Urheiluvammojen hoito kattaa koko kaaren: akuutin vaiheen rauhoittamisen, liikelaajuuden ja voiman palauttamisen sekä lajisi vaatimien ominaisuuksien rakentamisen, kuten juoksun, suunnanmuutosten, hyppyjen, heittojen ja kestävyyden. Paluu suunnitellaan kriteerien eikä pelkän kalenterin mukaan.',
        suitable: [
          'Lihas-, jänne- ja nivelsidevammat',
          'Rasitusvaivat juoksusta, mailapeleistä, golfista, pyöräilystä tai salilta',
          'Toistuvat vammat jotka keskeyttävät harjoittelun kerta toisensa jälkeen',
          'Urheilijat jotka valmistautuvat palaamaan kilpailuun'
        ],
        visit: [
          'Vamman taustan ja lajisi vaatimusten läpikäynti',
          'Vamma-alueen ja koko liikeketjun tutkiminen',
          'Hoito ärsytyksen vähentämiseksi ja liikkeen palauttamiseksi',
          'Lajinomainen kuormitus ja etenemisen kriteerit',
          'Realistinen aikataulu josta puhumme avoimesti kanssasi'
        ]
      },
      es: {
        title: 'Lesiones deportivas',
        summary: 'Desde los primeros días tras la lesión hasta una vuelta planificada a tu deporte.',
        what: 'El trabajo con lesiones deportivas cubre todo el proceso: calmar la fase aguda, recuperar rango y fuerza, y después reconstruir las cualidades que exige tu deporte, como la velocidad, los cambios de dirección, los saltos, los lanzamientos y la resistencia. La vuelta se planifica con criterios, no solo con el calendario.',
        suitable: [
          'Lesiones musculares, tendinosas y ligamentosas',
          'Molestias por sobrecarga en carrera, deportes de raqueta, golf, ciclismo o gimnasio',
          'Lesiones recurrentes que interrumpen tu entrenamiento',
          'Deportistas que preparan la vuelta a la competición'
        ],
        visit: [
          'Historia de la lesión y demandas de tu deporte',
          'Exploración de la zona lesionada y del resto de la cadena',
          'Tratamiento para reducir la irritación y recuperar movimiento',
          'Carga específica del deporte y criterios de progresión',
          'Unos plazos realistas que hablamos contigo con claridad'
        ]
      }
    },
    {
      slug: 'back-neck-pain', icon: 'spine', published: true, duration: 45,
      en: {
        title: 'Back and neck pain',
        summary: 'Understanding why your back or neck hurts, and what changes it.',
        what: 'Back and neck pain has many causes and rarely one single fix. We assess the spine together with the hips, shoulders and the way you sit, stand and work. Treatment usually combines manual therapy, targeted movement, and practical changes to your daily loading.',
        suitable: [
          'Acute or recurring low back pain',
          'Neck stiffness, tension and desk-related complaints',
          'Pain that radiates into an arm or leg',
          'Pain that returns whenever you increase activity'
        ],
        visit: [
          'Detailed history, including work and daily habits',
          'Screening and movement testing of the spine and nearby joints',
          'Manual treatment to reduce sensitivity and restore movement',
          'Specific exercises you can do at home or at the desk',
          'Advice on posture variation, load and activity pacing'
        ]
      },
      no: {
        title: 'Rygg- og nakkesmerter',
        summary: 'Forstå hvorfor ryggen eller nakken gjør vondt, og hva som faktisk endrer det.',
        what: 'Rygg- og nakkesmerter har mange årsaker og sjelden én enkelt løsning. Vi undersøker ryggsøylen sammen med hofter, skuldre og måten du sitter, står og arbeider på. Behandlingen kombinerer som regel manuell terapi, målrettet bevegelse og praktiske endringer i den daglige belastningen.',
        suitable: [
          'Akutte eller gjentakende korsryggsmerter',
          'Stiv nakke, spenninger og plager fra kontorarbeid',
          'Smerter som stråler ut i arm eller bein',
          'Smerter som kommer tilbake hver gang du øker aktiviteten'
        ],
        visit: [
          'Grundig sykehistorie, inkludert arbeid og daglige vaner',
          'Screening og bevegelsestesting av rygg og nærliggende ledd',
          'Manuell behandling for å dempe ømhet og bedre bevegelse',
          'Spesifikke øvelser du kan gjøre hjemme eller ved pulten',
          'Råd om variasjon i stilling, belastning og aktivitetsstyring'
        ]
      },
      sv: {
        title: 'Rygg- och nackbesvär',
        summary: 'Förstå varför ryggen eller nacken gör ont, och vad som faktiskt förändrar det.',
        what: 'Rygg- och nackbesvär har många orsaker och sällan en enda lösning. Vi undersöker ryggraden tillsammans med höfter, axlar och sättet du sitter, står och arbetar på. Behandlingen kombinerar oftast manuell terapi, riktad rörelse och praktiska förändringar i din dagliga belastning.',
        suitable: [
          'Akut eller återkommande ländryggssmärta',
          'Stel nacke, spänningar och besvär från kontorsarbete',
          'Smärta som strålar ut i en arm eller ett ben',
          'Smärta som återkommer varje gång du ökar aktiviteten'
        ],
        visit: [
          'Noggrann sjukhistoria, inklusive arbete och dagliga vanor',
          'Screening och rörelsetester av ryggrad och närliggande leder',
          'Manuell behandling för att dämpa ömhet och förbättra rörelse',
          'Specifika övningar du kan göra hemma eller vid skrivbordet',
          'Råd om att variera ställning, belastning och aktivitetsnivå'
        ]
      },
      fi: {
        title: 'Selkä- ja niskakivut',
        summary: 'Ymmärrä miksi selkä tai niska on kipeä, ja mikä siihen todella vaikuttaa.',
        what: 'Selkä- ja niskakivuilla on monia syitä ja harvoin yhtä ainoaa ratkaisua. Tutkimme selkärangan yhdessä lonkkien ja hartioiden kanssa sekä sen, miten istut, seisot ja työskentelet. Hoito yhdistää yleensä manuaalista terapiaa, kohdennettua liikettä ja käytännön muutoksia päivittäiseen kuormitukseen.',
        suitable: [
          'Äkillinen tai toistuva alaselkäkipu',
          'Niskan jäykkyys, jännitys ja istumatyön vaivat',
          'Kipu joka säteilee käteen tai jalkaan',
          'Kipu joka palaa aina kun lisäät aktiivisuutta'
        ],
        visit: [
          'Tarkat esitiedot, mukaan lukien työ ja päivittäiset tottumukset',
          'Selkärangan ja lähinivelten kartoitus ja liiketestit',
          'Manuaalinen hoito arkuuden vähentämiseksi ja liikkeen parantamiseksi',
          'Täsmälliset liikkeet joita voit tehdä kotona tai työpisteellä',
          'Neuvoja asennon vaihteluun, kuormitukseen ja aktiivisuuden jaksottamiseen'
        ]
      },
      es: {
        title: 'Dolor de espalda y cuello',
        summary: 'Entender por qué te duele la espalda o el cuello, y qué lo cambia.',
        what: 'El dolor de espalda y cuello tiene muchas causas y rara vez una única solución. Valoramos la columna junto con caderas, hombros y la forma en que te sientas, te pones de pie y trabajas. El tratamiento suele combinar terapia manual, movimiento dirigido y cambios prácticos en tu carga diaria.',
        suitable: [
          'Lumbalgia aguda o recurrente',
          'Rigidez cervical, tensión y molestias por trabajo de oficina',
          'Dolor que se irradia a un brazo o una pierna',
          'Dolor que reaparece cada vez que aumentas la actividad'
        ],
        visit: [
          'Historia detallada, incluidos trabajo y hábitos diarios',
          'Exploración y pruebas de movimiento de columna y articulaciones vecinas',
          'Tratamiento manual para reducir la sensibilidad y recuperar movimiento',
          'Ejercicios concretos para casa o para el escritorio',
          'Consejo sobre variación postural, carga y dosificación de la actividad'
        ]
      }
    },
    {
      slug: 'functional-screening-seniors', icon: 'target', published: true, duration: 45,
      en: {
        title: 'Functional screening for seniors',
        summary: 'A clear picture of how you move now, and what keeps you steady and independent.',
        what: 'A functional screening looks at the movements that decide whether you keep living the way you want to: getting out of a chair, climbing stairs, walking on uneven ground, reaching a high shelf, turning without losing your footing. We measure where you are today using standard tests, explain what the numbers mean in plain language, and give you a short programme aimed at whichever areas came out weakest.',
        suitable: [
          'Feeling less steady on your feet than you used to',
          'A fall, or a near miss, in the past year',
          'Stairs, getting up from a chair or carrying shopping have become harder',
          'Wanting to keep living independently at home',
          'Family who have noticed you slowing down'
        ],
        visit: [
          'A conversation about your daily life and what has changed',
          'Standard tests of balance, walking speed and leg strength',
          'A plain summary of what the results mean for you',
          'A short home programme aimed at your weakest areas',
          'A follow-up screening to measure whether it is working'
        ]
      },
      no: {
        title: 'Funksjonstest for seniorer',
        summary: 'Et tydelig bilde av hvordan du beveger deg nå, og hva som holder deg stødig og selvstendig.',
        what: 'En funksjonstest ser på bevegelsene som avgjør om du kan fortsette å leve slik du vil: å reise deg fra en stol, gå i trapper, gå på ujevnt underlag, strekke deg etter noe høyt, snu deg uten å miste balansen. Vi måler hvor du står i dag med standardiserte tester, forklarer hva tallene betyr på et forståelig språk, og gir deg et kort program rettet mot de områdene som kom svakest ut.',
        suitable: [
          'Du føler deg mindre stødig enn du pleide',
          'Et fall, eller nesten-fall, det siste året',
          'Trapper, å reise seg fra stolen eller bære handleposer er blitt tyngre',
          'Du vil fortsette å bo selvstendig hjemme',
          'Familien har lagt merke til at du er blitt tregere'
        ],
        visit: [
          'Samtale om hverdagen din og hva som har endret seg',
          'Standardiserte tester av balanse, ganghastighet og beinstyrke',
          'En enkel oppsummering av hva resultatene betyr for deg',
          'Et kort hjemmeprogram rettet mot de svakeste områdene',
          'En ny test senere for å måle om det virker'
        ]
      },
      sv: {
        title: 'Funktionsbedömning för seniorer',
        summary: 'En tydlig bild av hur du rör dig i dag, och vad som håller dig stadig och självständig.',
        what: 'En funktionsbedömning tittar på de rörelser som avgör om du kan fortsätta leva som du vill: att resa dig ur en stol, gå i trappor, gå på ojämnt underlag, nå en hög hylla, vända dig utan att tappa balansen. Vi mäter var du står i dag med standardiserade tester, förklarar vad siffrorna betyder på vanligt språk och ger dig ett kort program riktat mot de områden som kom ut svagast.',
        suitable: [
          'Du känner dig mindre stadig än du brukade',
          'Ett fall, eller ett tillbud, under det senaste året',
          'Trappor, att resa sig ur stolen eller bära matkassar har blivit tyngre',
          'Du vill fortsätta bo självständigt hemma',
          'Anhöriga har märkt att du blivit långsammare'
        ],
        visit: [
          'Ett samtal om din vardag och vad som förändrats',
          'Standardiserade tester av balans, gånghastighet och benstyrka',
          'En enkel sammanfattning av vad resultaten betyder för dig',
          'Ett kort hemmaprogram riktat mot dina svagaste områden',
          'En ny bedömning senare för att mäta om det fungerar'
        ]
      },
      fi: {
        title: 'Ikäihmisten toimintakykykartoitus',
        summary: 'Selkeä kuva siitä miten liikut nyt, ja mikä pitää sinut tukevana ja omatoimisena.',
        what: 'Toimintakykykartoitus tarkastelee liikkeitä jotka ratkaisevat, voitko elää jatkossakin haluamallasi tavalla: tuolista ylös nouseminen, portaiden kulkeminen, epätasaisella alustalla käveleminen, korkealle kurottaminen, kääntyminen tasapainoa menettämättä. Mittaamme nykytilasi vakiintuneilla testeillä, selitämme mitä luvut tarkoittavat selkokielellä ja annamme lyhyen ohjelman, joka kohdistuu heikoimmiksi osoittautuneisiin alueisiin.',
        suitable: [
          'Tunnet olosi epävarmemmaksi jaloillasi kuin ennen',
          'Kaatuminen tai läheltä piti -tilanne viimeisen vuoden aikana',
          'Portaat, tuolista nouseminen tai kassien kantaminen tuntuvat raskaammilta',
          'Haluat jatkaa itsenäistä asumista kotona',
          'Läheiset ovat huomanneet hidastumisesi'
        ],
        visit: [
          'Keskustelu arjestasi ja siitä mikä on muuttunut',
          'Vakiintuneet testit tasapainosta, kävelynopeudesta ja jalkojen voimasta',
          'Selkeä yhteenveto siitä mitä tulokset sinulle tarkoittavat',
          'Lyhyt kotiohjelma heikoimmille alueille',
          'Seurantakartoitus sen mittaamiseksi toimiiko se'
        ]
      },
      es: {
        title: 'Valoración funcional para mayores',
        summary: 'Una imagen clara de cómo te mueves hoy y de qué te mantiene estable y autónomo.',
        what: 'La valoración funcional observa los movimientos que deciden si puedes seguir viviendo como quieres: levantarte de una silla, subir escaleras, caminar sobre terreno irregular, alcanzar un estante alto, girarte sin perder el equilibrio. Medimos dónde estás hoy con pruebas estandarizadas, explicamos qué significan los resultados en lenguaje sencillo y te damos un programa breve dirigido a las áreas que salieron más débiles.',
        suitable: [
          'Te notas menos estable de lo que solías',
          'Una caída, o un susto, en el último año',
          'Las escaleras, levantarte de la silla o cargar la compra cuestan más',
          'Quieres seguir viviendo de forma independiente en casa',
          'Tu familia ha notado que vas más despacio'
        ],
        visit: [
          'Una conversación sobre tu día a día y qué ha cambiado',
          'Pruebas estandarizadas de equilibrio, velocidad de marcha y fuerza de piernas',
          'Un resumen sencillo de lo que significan los resultados para ti',
          'Un programa breve para casa dirigido a tus puntos más débiles',
          'Una nueva valoración para medir si está funcionando'
        ]
      }
    },
    {
      slug: 'post-operative', icon: 'shield', published: true, duration: 45,
      en: {
        title: 'Post-operative rehabilitation',
        summary: 'Staged recovery after surgery, in step with your surgeon’s protocol.',
        what: 'After an operation, timing matters as much as effort. We follow the protocol provided by your surgeon or hospital, protect the healing tissue in the early phase, and progress movement, strength and function as each stage allows. Bring any post-operative instructions with you to the first appointment.',
        suitable: [
          'Recovery after knee, hip or shoulder surgery',
          'Rehabilitation after ligament or tendon repair',
          'Spinal surgery follow-up, where referred',
          'Anyone unsure how to progress safely after an operation'
        ],
        visit: [
          'Review of your surgical report and any protocol you have',
          'Assessment of the current stage of healing and function',
          'Careful hands-on work and scar or swelling management where appropriate',
          'Stage-appropriate exercise, progressed at each visit',
          'Coordination with your surgeon or GP if needed'
        ]
      },
      no: {
        title: 'Rehabilitering etter operasjon',
        summary: 'Trinnvis opptrening etter operasjon, i tråd med kirurgens protokoll.',
        what: 'Etter en operasjon betyr timing like mye som innsats. Vi følger protokollen fra kirurgen eller sykehuset ditt, beskytter vevet i den tidlige fasen, og øker bevegelse, styrke og funksjon etter hvert som hver fase tillater det. Ta med eventuelle postoperative instrukser til første time.',
        suitable: [
          'Opptrening etter kne-, hofte- eller skulderoperasjon',
          'Rehabilitering etter ligament- eller senereparasjon',
          'Oppfølging etter ryggkirurgi, ved henvisning',
          'Alle som er usikre på hvordan man trapper opp trygt etter operasjon'
        ],
        visit: [
          'Gjennomgang av operasjonsbeskrivelse og eventuell protokoll',
          'Vurdering av tilhelingsfase og funksjon',
          'Skånsom manuell behandling og håndtering av arr eller hevelse ved behov',
          'Øvelser tilpasset fasen, med progresjon for hver time',
          'Kontakt med kirurg eller fastlege ved behov'
        ]
      },
      sv: {
        title: 'Rehabilitering efter operation',
        summary: 'Stegvis återhämtning efter kirurgi, i linje med kirurgens protokoll.',
        what: 'Efter en operation betyder tajmingen lika mycket som ansträngningen. Vi följer protokollet från din kirurg eller ditt sjukhus, skyddar den läkande vävnaden i den tidiga fasen och ökar rörelse, styrka och funktion i takt med vad varje fas tillåter. Ta med eventuella postoperativa instruktioner till första besöket.',
        suitable: [
          'Återhämtning efter knä-, höft- eller axelkirurgi',
          'Rehabilitering efter ligament- eller senreparation',
          'Uppföljning efter ryggkirurgi, vid remiss',
          'Alla som är osäkra på hur man ökar tryggt efter en operation'
        ],
        visit: [
          'Genomgång av operationsberättelse och eventuellt protokoll',
          'Bedömning av läkningsfas och funktion',
          'Skonsam manuell behandling och hantering av ärr eller svullnad vid behov',
          'Övningar anpassade till fasen, som stegras vid varje besök',
          'Kontakt med din kirurg eller läkare vid behov'
        ]
      },
      fi: {
        title: 'Leikkauksen jälkeinen kuntoutus',
        summary: 'Vaiheittainen toipuminen leikkauksen jälkeen, kirurgin ohjeiden mukaisesti.',
        what: 'Leikkauksen jälkeen ajoitus merkitsee yhtä paljon kuin ponnistelu. Noudatamme kirurgisi tai sairaalasi antamaa ohjeistusta, suojaamme paranevaa kudosta alkuvaiheessa ja lisäämme liikettä, voimaa ja toimintakykyä sitä mukaa kuin kukin vaihe sallii. Ota mahdolliset leikkauksen jälkeiset ohjeet mukaan ensimmäiselle käynnille.',
        suitable: [
          'Toipuminen polvi-, lonkka- tai olkapääleikkauksen jälkeen',
          'Kuntoutus nivelside- tai jännekorjauksen jälkeen',
          'Selkäleikkauksen seuranta, lähetteellä',
          'Kuka tahansa joka on epävarma miten edetä turvallisesti leikkauksen jälkeen'
        ],
        visit: [
          'Leikkauskertomuksen ja mahdollisen ohjeistuksen läpikäynti',
          'Paranemisvaiheen ja toimintakyvyn arviointi',
          'Varovainen manuaalinen hoito sekä arven tai turvotuksen hoito tarvittaessa',
          'Vaiheeseen sopivat harjoitteet, joita edistetään joka käynnillä',
          'Yhteydenpito kirurgiin tai lääkäriin tarvittaessa'
        ]
      },
      es: {
        title: 'Rehabilitación postoperatoria',
        summary: 'Recuperación por etapas tras la cirugía, siguiendo el protocolo de tu cirujano.',
        what: 'Después de una operación, el momento importa tanto como el esfuerzo. Seguimos el protocolo facilitado por tu cirujano u hospital, protegemos el tejido en la fase inicial y progresamos movimiento, fuerza y función según lo permite cada etapa. Trae contigo cualquier indicación postoperatoria a la primera cita.',
        suitable: [
          'Recuperación tras cirugía de rodilla, cadera u hombro',
          'Rehabilitación tras reparación de ligamento o tendón',
          'Seguimiento tras cirugía de columna, con derivación',
          'Quien no sabe cómo progresar con seguridad tras una operación'
        ],
        visit: [
          'Revisión del informe quirúrgico y del protocolo que tengas',
          'Valoración de la fase de cicatrización y de la función',
          'Trabajo manual cuidadoso y manejo de cicatriz o edema si procede',
          'Ejercicio adecuado a la fase, progresado en cada visita',
          'Coordinación con tu cirujano o médico si es necesario'
        ]
      }
    },
    {
      slug: 'preventative', icon: 'leaf', published: true, duration: 45,
      en: {
        title: 'Preventative physiotherapy',
        summary: 'A check-up for how you move, before a niggle turns into a problem.',
        what: 'Preventative sessions are for people who are not injured but want to stay that way. We screen movement, strength and load tolerance against the demands of your work, sport or hobby, then give you a short, specific programme to close the gaps we find.',
        suitable: [
          'Runners, golfers, padel and tennis players, cyclists, gym-goers',
          'Physically demanding work',
          'Long hours at a desk',
          'A history of injuries you would rather not repeat'
        ],
        visit: [
          'A conversation about your activities and your goals',
          'Movement, strength and mobility screening',
          'A written summary of findings and priorities',
          'A focused programme, usually three to five exercises',
          'An optional follow-up to review progress'
        ]
      },
      no: {
        title: 'Forebyggende fysioterapi',
        summary: 'En sjekk av hvordan du beveger deg, før en småplage blir et problem.',
        what: 'Forebyggende timer er for deg som ikke er skadet, men gjerne vil fortsette å være det. Vi screener bevegelse, styrke og belastningstoleranse opp mot kravene i jobben, idretten eller hobbyen din, og gir deg et kort, spesifikt program som tetter hullene vi finner.',
        suitable: [
          'Løpere, golfspillere, padel- og tennisspillere, syklister, styrketrenende',
          'Fysisk krevende arbeid',
          'Mange timer ved skrivebordet',
          'Tidligere skader du helst ikke vil gjenta'
        ],
        visit: [
          'Samtale om aktivitetene og målene dine',
          'Screening av bevegelse, styrke og mobilitet',
          'Skriftlig oppsummering av funn og prioriteringer',
          'Et målrettet program, som regel tre til fem øvelser',
          'Valgfri oppfølgingstime for å vurdere framgang'
        ]
      },
      sv: {
        title: 'Förebyggande fysioterapi',
        summary: 'En kontroll av hur du rör dig, innan en krämpa blir ett problem.',
        what: 'Förebyggande besök är för dig som inte är skadad men gärna vill fortsätta vara det. Vi screenar rörelse, styrka och belastningstålighet mot kraven i ditt arbete, din idrott eller din hobby, och ger dig ett kort, specifikt program som täpper till luckorna vi hittar.',
        suitable: [
          'Löpare, golfare, padel- och tennisspelare, cyklister, gymtränande',
          'Fysiskt krävande arbete',
          'Många timmar vid skrivbordet',
          'Tidigare skador du helst inte vill upprepa'
        ],
        visit: [
          'Ett samtal om dina aktiviteter och dina mål',
          'Screening av rörelse, styrka och rörlighet',
          'En skriftlig sammanfattning av fynd och prioriteringar',
          'Ett fokuserat program, oftast tre till fem övningar',
          'Ett frivilligt återbesök för att följa upp'
        ]
      },
      fi: {
        title: 'Ennaltaehkäisevä fysioterapia',
        summary: 'Tarkastus siitä miten liikut, ennen kuin pikkuvaivasta tulee ongelma.',
        what: 'Ennaltaehkäisevät käynnit ovat sinulle, joka et ole loukkaantunut mutta haluat pysyä terveenä. Kartoitamme liikkeen, voiman ja kuormituksen sietokyvyn suhteessa työsi, lajisi tai harrastuksesi vaatimuksiin ja annamme sinulle lyhyen, täsmällisen ohjelman löytämiemme aukkojen paikkaamiseksi.',
        suitable: [
          'Juoksijat, golfarit, padel- ja tennispelaajat, pyöräilijät, kuntosaliharrastajat',
          'Fyysisesti vaativa työ',
          'Pitkät päivät työpöydän ääressä',
          'Aiemmat vammat joita et haluaisi toistaa'
        ],
        visit: [
          'Keskustelu harrastuksistasi ja tavoitteistasi',
          'Liikkeen, voiman ja liikkuvuuden kartoitus',
          'Kirjallinen yhteenveto löydöksistä ja painopisteistä',
          'Täsmällinen ohjelma, yleensä kolmesta viiteen liikettä',
          'Vapaaehtoinen seurantakäynti edistymisen arvioimiseksi'
        ]
      },
      es: {
        title: 'Fisioterapia preventiva',
        summary: 'Una revisión de cómo te mueves, antes de que una molestia se convierta en un problema.',
        what: 'Las sesiones preventivas son para quien no está lesionado y quiere seguir así. Valoramos movimiento, fuerza y tolerancia a la carga frente a las exigencias de tu trabajo, deporte o afición, y te damos un programa breve y específico para cubrir lo que encontremos.',
        suitable: [
          'Corredores, golfistas, jugadores de pádel y tenis, ciclistas, gimnasio',
          'Trabajo físicamente exigente',
          'Muchas horas de escritorio',
          'Antecedentes de lesiones que prefieres no repetir'
        ],
        visit: [
          'Conversación sobre tus actividades y tus objetivos',
          'Valoración de movimiento, fuerza y movilidad',
          'Un resumen escrito de hallazgos y prioridades',
          'Un programa concreto, normalmente de tres a cinco ejercicios',
          'Una revisión opcional para valorar el progreso'
        ]
      }
    },
    {
      slug: 'home-visit', icon: 'home', published: true, duration: 40,
      en: {
        title: 'Home visit',
        summary: 'The same treatment in your own home, when getting to the clinic is the hard part.',
        what: 'A home visit is a full physiotherapy appointment carried out where you live, in the Torrevieja area and subject to availability. It suits people who cannot travel easily: the first weeks after an operation, reduced mobility, or simply nobody available to drive. Working in your own rooms has an advantage of its own, because the exercises are set up on your stairs, in your chair and with your furniture, which is where you will actually be doing them.',
        suitable: [
          'The first weeks after surgery, before travelling is comfortable',
          'Reduced mobility, or a high risk of falling',
          'No transport, or nobody available to bring you',
          'Ongoing rehabilitation that is simply easier to do at home',
          'Family who would like the therapist to see the home setup'
        ],
        visit: [
          'A call beforehand to agree the address, the parking and what to prepare',
          'The same assessment you would receive at the clinic',
          'Hands-on treatment in a room with enough space to work',
          'Exercises set up using your own stairs, chair and doorways',
          'A written plan left with you, and the next visit agreed'
        ]
      },
      no: {
        title: 'Hjemmebesøk',
        summary: 'Samme behandling hjemme hos deg, når det å komme seg til klinikken er det vanskelige.',
        what: 'Et hjemmebesøk er en full fysioterapitime gjennomført der du bor, i Torrevieja-området og ved ledig kapasitet. Det passer for deg som ikke kommer deg lett ut: de første ukene etter en operasjon, nedsatt bevegelighet, eller rett og slett ingen som kan kjøre. Å jobbe i dine egne rom har en fordel i seg selv, for øvelsene settes opp i trappa di, i stolen din og med dine møbler, som er der du faktisk skal gjøre dem.',
        suitable: [
          'De første ukene etter operasjon, før det er behagelig å reise',
          'Nedsatt bevegelighet, eller høy risiko for fall',
          'Ingen transport, eller ingen som kan følge deg',
          'Pågående opptrening som rett og slett er enklere hjemme',
          'Pårørende som ønsker at terapeuten ser hjemmesituasjonen'
        ],
        visit: [
          'En telefon på forhånd for å avtale adresse, parkering og hva du bør forberede',
          'Den samme undersøkelsen du ville fått på klinikken',
          'Manuell behandling i et rom med nok plass til å arbeide',
          'Øvelser satt opp med din egen trapp, stol og dine dørkarmer',
          'En skriftlig plan som blir igjen hos deg, og neste besøk avtalt'
        ]
      },
      sv: {
        title: 'Hembesök',
        summary: 'Samma behandling hemma hos dig, när det svåra är att ta sig till kliniken.',
        what: 'Ett hembesök är ett fullständigt fysioterapibesök som genomförs där du bor, i Torrevieja-området och i mån av tid. Det passar dig som inte tar dig ut så lätt: de första veckorna efter en operation, nedsatt rörlighet, eller helt enkelt ingen som kan köra. Att arbeta i dina egna rum har en fördel i sig, eftersom övningarna läggs upp i din trappa, i din stol och med dina möbler, vilket är där du faktiskt ska göra dem.',
        suitable: [
          'De första veckorna efter operation, innan det är bekvämt att resa',
          'Nedsatt rörlighet, eller hög risk för fall',
          'Ingen transport, eller ingen som kan följa med dig',
          'Pågående rehabilitering som helt enkelt är enklare hemma',
          'Anhöriga som vill att terapeuten ser hemmiljön'
        ],
        visit: [
          'Ett samtal i förväg för att komma överens om adress, parkering och förberedelser',
          'Samma undersökning som du skulle få på kliniken',
          'Manuell behandling i ett rum med tillräckligt med plats',
          'Övningar upplagda med din egen trappa, stol och dina dörrposter',
          'En skriftlig plan som lämnas hos dig, och nästa besök inbokat'
        ]
      },
      fi: {
        title: 'Kotikäynti',
        summary: 'Sama hoito omassa kodissasi, kun vaikeinta on päästä klinikalle.',
        what: 'Kotikäynti on täysimittainen fysioterapiakäynti, joka toteutetaan kotonasi Torreviejan alueella ja saatavuuden mukaan. Se sopii sinulle, joka et pääse helposti liikkeelle: ensimmäiset viikot leikkauksen jälkeen, heikentynyt liikkumiskyky tai yksinkertaisesti ei ketään joka voisi kuljettaa. Omissa tiloissasi työskentelyssä on oma etunsa, sillä liikkeet rakennetaan omiin portaisiisi, omaan tuoliisi ja omilla huonekaluillasi, eli sinne missä niitä oikeasti teet.',
        suitable: [
          'Ensimmäiset viikot leikkauksen jälkeen, ennen kuin matkustaminen on mukavaa',
          'Heikentynyt liikkumiskyky tai suuri kaatumisriski',
          'Ei kyytiä tai ei ketään joka voisi tuoda sinut',
          'Käynnissä oleva kuntoutus joka on yksinkertaisesti helpompaa kotona',
          'Läheiset jotka toivovat terapeutin näkevän kodin olosuhteet'
        ],
        visit: [
          'Puhelu etukäteen osoitteesta, pysäköinnistä ja valmisteluista sopimiseksi',
          'Sama tutkimus jonka saisit klinikalla',
          'Manuaalinen hoito huoneessa jossa on riittävästi tilaa',
          'Liikkeet rakennettuna omiin portaisiisi, tuoliisi ja oviaukkoihisi',
          'Kirjallinen suunnitelma jää sinulle, ja seuraava käynti sovitaan'
        ]
      },
      es: {
        title: 'Visita a domicilio',
        summary: 'El mismo tratamiento en tu casa, cuando lo difícil es llegar a la clínica.',
        what: 'La visita a domicilio es una sesión completa de fisioterapia realizada donde vives, en la zona de Torrevieja y según disponibilidad. Va bien para quien no puede desplazarse con facilidad: las primeras semanas tras una operación, movilidad reducida o simplemente nadie que pueda llevarte. Trabajar en tus propias habitaciones tiene una ventaja añadida, porque los ejercicios se montan en tu escalera, en tu sillón y con tus muebles, que es donde realmente los vas a hacer.',
        suitable: [
          'Las primeras semanas tras la cirugía, antes de que viajar resulte cómodo',
          'Movilidad reducida o riesgo alto de caída',
          'Sin transporte, o sin nadie que pueda acompañarte',
          'Rehabilitación en curso que sencillamente es más fácil en casa',
          'Familiares que prefieren que el fisioterapeuta vea el entorno del domicilio'
        ],
        visit: [
          'Una llamada previa para acordar dirección, aparcamiento y qué preparar',
          'La misma valoración que recibirías en la clínica',
          'Tratamiento manual en una habitación con espacio suficiente',
          'Ejercicios montados con tu propia escalera, tu sillón y tus puertas',
          'Un plan por escrito que se queda contigo, y la siguiente visita acordada'
        ]
      }
    }
  ],

  /* ------------------------------------------------------------------ TEAM */
  /* published: false hides a therapist from the website AND from the booking
     dropdown, without deleting anything. Flip it back to true when they join.
     photo: put the file in assets/img/team/ and write the filename here.
     Leave photo as null to show the initials placeholder.
     languages: two-letter codes, translated automatically (see i18n.js).
     credentials / registration: replace the placeholder strings.         */
  team: [
    {
      id: 'emilia',
      name: 'Emilia Cevallos',
      published: false,                 // set true to put Emilia back on the site
      photo: null,                      // e.g. 'team/emilia.jpg'
      credentials: ['[Degree / qualification to be added]'],       // EDIT ME
      registration: '[Colegio de Fisioterapeutas no. to be added]', // EDIT ME
      languages: ['en', 'es', 'hu'],                                // EDIT ME per person
      en: { role: 'Physiotherapist', bio: 'Profile text to be added. This space is ready for a short introduction: background, areas of special interest and what patients can expect from a session.' },
      no: { role: 'Fysioterapeut',   bio: 'Profiltekst kommer. Her er det satt av plass til en kort presentasjon: bakgrunn, spesielle interesseområder og hva pasienter kan forvente av en time.' },
      sv: { role: 'Fysioterapeut',   bio: 'Profiltext kommer. Här finns plats för en kort presentation: bakgrund, särskilda intresseområden och vad patienter kan förvänta sig av ett besök.' },
      fi: { role: 'Fysioterapeutti', bio: 'Esittelyteksti tulossa. Tähän tulee lyhyt esittely: tausta, erityiset kiinnostuksen kohteet ja mitä potilas voi käynniltä odottaa.' },
      es: { role: 'Fisioterapeuta',  bio: 'Texto de perfil pendiente. Este espacio está listo para una breve presentación: formación, áreas de especial interés y qué puede esperar el paciente de una sesión.' }
    },
    {
      id: 'diego',
      name: 'Diego Cortes',
      published: true,
      photo: 'team/diego.jpg',
      /* credentials can be one string for every language, or an object with a
         string per language when the wording should be translated. */
      credentials: [{
        en: 'BSc in Physiotherapy, Universidad Nacional de Colombia',
        no: 'Bachelor i fysioterapi, Universidad Nacional de Colombia',
        sv: 'Kandidatexamen i fysioterapi, Universidad Nacional de Colombia',
        fi: 'Fysioterapian kandidaatti, Universidad Nacional de Colombia',
        es: 'Fisioterapeuta, Universidad Nacional de Colombia'
      }, {
        en: 'MSc in neuro-musculoskeletal pain management, Universidad Miguel Hernández',
        no: 'Master i håndtering av nevromuskuloskeletal smerte, Universidad Miguel Hernández',
        sv: 'Master i hantering av neuromuskuloskeletal smärta, Universidad Miguel Hernández',
        fi: 'Maisteri neuromuskuloskeletaalisen kivun hoidossa, Universidad Miguel Hernández',
        es: 'Máster en el manejo del dolor neuro-músculo-esquelético, Universidad Miguel Hernández'
      }],
      registration: {
        en: 'Colegio de Fisioterapeutas, registration no. 10084',
        no: 'Colegio de Fisioterapeutas, reg.nr. 10084',
        sv: 'Colegio de Fisioterapeutas, reg.nr 10084',
        fi: 'Colegio de Fisioterapeutas, rek.nro 10084',
        es: 'Colegiado nº 10084 del Colegio de Fisioterapeutas'
      },
      languages: ['en', 'es'],
      en: { role: 'Physiotherapist', bio: 'I believe good physiotherapy starts with listening — understanding the person behind the symptoms and designing a treatment that truly fits their needs. My approach is personalised, practical and focused on helping you reduce pain, regain movement and improve your function and confidence in everyday life. I combine manual therapy with active rehabilitation, adapting each process to each patient’s characteristics and goals.' },
      no: { role: 'Fysioterapeut',   bio: 'Jeg mener at god fysioterapi begynner med å lytte — å forstå personen bak symptomene og utforme en behandling som virkelig passer til deres behov. Min tilnærming er personlig, praktisk og rettet mot å hjelpe deg med å redusere smerte, gjenvinne bevegelse og forbedre funksjon og trygghet i hverdagen. Jeg kombinerer manuell behandling med aktiv rehabilitering, og tilpasser hver prosess til den enkelte pasients egenskaper og mål.' },
      sv: { role: 'Fysioterapeut',   bio: 'Jag tror att bra fysioterapi börjar med att lyssna — att förstå personen bakom symtomen och utforma en behandling som verkligen passar just dina behov. Mitt förhållningssätt är personligt, praktiskt och inriktat på att hjälpa dig minska smärta, återfå rörlighet och förbättra din funktion och trygghet i vardagen. Jag kombinerar manuell behandling med aktiv rehabilitering och anpassar varje process efter varje patients egenskaper och mål.' },
      fi: { role: 'Fysioterapeutti', bio: 'Uskon, että hyvä fysioterapia alkaa kuuntelemisesta — oireiden takana olevan ihmisen ymmärtämisestä ja hoidon suunnittelusta, joka todella vastaa hänen tarpeitaan. Lähestymistapani on yksilöllinen, käytännönläheinen ja tähtää kivun vähentämiseen, liikkuvuuden palauttamiseen sekä toimintakyvyn ja itseluottamuksen parantamiseen arjessa. Yhdistän manuaalisen hoidon aktiiviseen kuntoutukseen ja sovitan jokaisen prosessin potilaan ominaisuuksiin ja tavoitteisiin.' },
      es: { role: 'Fisioterapeuta',  bio: 'Creo que una buena fisioterapia comienza por escuchar, comprender a la persona que hay detrás de los síntomas y diseñar un tratamiento que realmente se adapte a sus necesidades. Mi enfoque es personalizado, práctico y orientado a ayudarte a reducir el dolor, recuperar el movimiento y mejorar tu función y confianza en el día a día. Combino el tratamiento manual con la rehabilitación activa, adaptando cada proceso a las características y objetivos de cada paciente.' }
    },
    {
      id: 'sara',
      name: 'Sara Acs',
      published: false,                 // Sara is undecided, flip to true when she joins
      photo: null,
      credentials: ['[Degree / qualification to be added]'],
      registration: '[Colegio de Fisioterapeutas no. to be added]',
      languages: ['en', 'es', 'hu'],
      en: { role: 'Physiotherapist', bio: 'Profile text to be added. This space is ready for a short introduction: background, areas of special interest and what patients can expect from a session.' },
      no: { role: 'Fysioterapeut',   bio: 'Profiltekst kommer. Her er det satt av plass til en kort presentasjon: bakgrunn, spesielle interesseområder og hva pasienter kan forvente av en time.' },
      sv: { role: 'Fysioterapeut',   bio: 'Profiltext kommer. Här finns plats för en kort presentation: bakgrund, särskilda intresseområden och vad patienter kan förvänta sig av ett besök.' },
      fi: { role: 'Fysioterapeutti', bio: 'Esittelyteksti tulossa. Tähän tulee lyhyt esittely: tausta, erityiset kiinnostuksen kohteet ja mitä potilas voi käynniltä odottaa.' },
      es: { role: 'Fisioterapeuta',  bio: 'Texto de perfil pendiente. Este espacio está listo para una breve presentación: formación, áreas de especial interés y qué puede esperar el paciente de una sesión.' }
    }
  ],

  /* ---------------------------------------------------------------- PRICES */
  /* featured: true adds the accent border and the "most booked" badge.
     The package totals in the notes are the session price times the number
     of sessions, less the discount. If you change the session price, update
     those two notes as well.                                              */
  prices: [
    { id: 'session',  price: '€50', duration: 45, featured: true,
      en: { title: 'Physiotherapy session', note: 'A one-to-one treatment session with your physiotherapist.' },
      no: { title: 'Fysioterapitime', note: 'En behandlingstime alene med fysioterapeuten din.' },
      sv: { title: 'Fysioterapibesök', note: 'Ett behandlingsbesök enskilt med din fysioterapeut.' },
      fi: { title: 'Fysioterapiakäynti', note: 'Yksilöllinen hoitokäynti fysioterapeutin kanssa.' },
      es: { title: 'Sesión de fisioterapia', note: 'Una sesión de tratamiento individual con tu fisioterapeuta.' } },

    { id: 'package5', price: '€230', duration: null, featured: false,
      en: { title: 'Package of 5 sessions', note: 'Five sessions booked together for €230, instead of €250.' },
      no: { title: 'Pakke med 5 timer', note: 'Fem timer bestilt samlet for 230 €, i stedet for 250 €.' },
      sv: { title: 'Paket med 5 besök', note: 'Fem besök bokade tillsammans för 230 €, i stället för 250 €.' },
      fi: { title: 'Viiden käynnin paketti', note: 'Viisi käyntiä kerralla varattuna hintaan 230 €, hinnan 250 € sijaan.' },
      es: { title: 'Bono de 5 sesiones', note: 'Cinco sesiones reservadas juntas por 230 €, en lugar de 250 €.' } },

    { id: 'package10', price: '−10%', duration: null, featured: false,
      en: { title: 'Package of 10 sessions', note: 'Ten sessions booked together, 10% off. €450 instead of €500.' },
      no: { title: 'Pakke med 10 timer', note: 'Ti timer bestilt samlet, 10 % rabatt. 450 € i stedet for 500 €.' },
      sv: { title: 'Paket med 10 besök', note: 'Tio besök bokade tillsammans, 10 % rabatt. 450 € i stället för 500 €.' },
      fi: { title: 'Kymmenen käynnin paketti', note: 'Kymmenen käyntiä kerralla varattuna, 10 %:n alennus. 450 € hinnan 500 € sijaan.' },
      es: { title: 'Bono de 10 sesiones', note: 'Diez sesiones reservadas juntas, 10 % de descuento. 450 € en lugar de 500 €.' } },

    { id: 'home',     price: '€60', duration: 40, featured: false,
      en: { title: 'Home visit', note: 'Treatment at your home in the Torrevieja area, subject to availability.' },
      no: { title: 'Hjemmebesøk', note: 'Behandling hjemme hos deg i Torrevieja-området, ved ledig kapasitet.' },
      sv: { title: 'Hembesök', note: 'Behandling hemma hos dig i Torrevieja-området, i mån av tid.' },
      fi: { title: 'Kotikäynti', note: 'Hoito kotonasi Torreviejan alueella, saatavuuden mukaan.' },
      es: { title: 'Visita a domicilio', note: 'Tratamiento en tu domicilio en la zona de Torrevieja, según disponibilidad.' } }
  ]
};
