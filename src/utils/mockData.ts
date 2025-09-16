import { CalendarData, Meal } from '../types';
import { formatDate } from './dateUtils';
import { addDays } from 'date-fns';

const createMeal = (id: string, name: string, recipe: string, person: 'me' | 'partner' | 'both'): Meal => ({
  id,
  name,
  recipe,
  person
});

// Definim les 5 setmanes del pla alimentari
const dietPlan = {
  setmana1: {
    esmorzars: [
      createMeal('s1b1', 'Iogurt Grec amb Fruits Vermells', '200g iogurt grec natural, 80g fruits vermells variats, 2 cullerades granola casera, 1 culleradeta mel. Posar l\'iogurt en un bol, afegir els fruits vermells i la granola per sobre. Ruixar amb mel i barrejar suaument.', 'both'),
      createMeal('s1b2', 'Torrada amb Pavo i Formatge Fresc', '2 llesques pa integral, pechuga de pavo braseada, formatge fresc, tomàquet de sucar, oli d\'oliva. Torrar el pa, estendre formatge fresc, afegir llesques de pavo i tomàquet. Ruixar amb oli d\'oliva.', 'both'),
      createMeal('s1b3', 'Batut Verd Proteic', '1 plàtan, 50g espinacs frescos, 200ml beguda d\'avena, 1 mesura proteïna vanilla, 1 cullerada mantega d\'ametlla. Triturar tots els ingredients fins obtenir textura suau.', 'both'),
      createMeal('s1b4', 'Truita de Formatge Brie', '2 ous, brie, herbes fresques, oli d\'oliva. Batre ous, afegir brie en trossos petits. Coure com truita francesa i decorar amb herbes.', 'both'),
      createMeal('s1b5', 'Iogurt amb Fruits Secs i Mel', '200g iogurt natural, 20g nous, 10g ametlles, mel, canyella. Barrejar iogurt amb mel, decorar amb fruits secs i canyella.', 'both'),
      createMeal('s1b6', 'Torrada amb Bacon i Ou', '2 llesques pa integral, bacon, 1 ou, tomàquet de sucar. Torrar pa, coure bacon fins cruixent, fer ou ferrat. Muntar torrada amb tomàquet.', 'both'),
      createMeal('s1b7', 'Overnight Oats Energètic', '50g avena, 150ml llet d\'ametlla, chia, mango, mel. Barrejar avena amb llet i chia la nit anterior. Al matí servir amb mango tallat.', 'both'),
    ],
    dinars: [
      createMeal('s1l1', 'Bowl de Quinoa amb Mango i Tofu', '80g quinoa, tofu fumat, mango, pastanagues, oli d\'oliva, llimona. Coure quinoa. Tallar tofu fumat en daus i pastanagues en juliana. Muntar bowl amb tots els ingredients i aliñar.', 'both'),
      createMeal('s1l2', 'Curry de Pollastre amb Pebrots', '200g pit de pollastre, pebrots, ceba, llet de coco, cúrcuma, comí, arròs integral. Tallar pollastre i verdures. Sofregir amb espècies, afegir llet de coco i coure 20 min.', 'both'),
      createMeal('s1l3', 'Esqueixada de Bacallà Mediterrània', '200g bacallà dessalat, mongetes blanques, tomàquet de sucar, ceba, olives, oli d\'oliva, vinagre. Desmigrar bacallà, mesclar amb verdures tallades i llegums.', 'both'),
      createMeal('s1l4', 'Pasta amb Verdures i Bacon', '100g pasta integral, carbassó, pebrots, bacon, parmesà, oli d\'oliva. Coure pasta. Saltejat verdures amb bacon, mesclar amb pasta calenta i parmesà.', 'both'),
      createMeal('s1l5', 'Amanida de Llenties amb Pavo', '120g llenties cuites, pechuga de pavo braseada, rúcula, tomàquet cherry, vinagreta. Mesclar llenties amb pavo tallat, rúcula i tomàquets. Aliñar amb vinagreta.', 'both'),
      createMeal('s1l6', 'Risotto de Verdures', 'Arròs arbori, carbassó, pastanagues, ceba, brou vegetal, parmesà. Sofregir verdures, afegir arròs i anar incorporant brou calent poc a poc.', 'both'),
      createMeal('s1l7', 'Pollastre amb Pebrots Confitats', '180g pit de pollastre, pebrots, ceba, herbes provençals, oli d\'oliva. Confitar pebrots a foc baix 30 min. Coure pollastre i servir amb pebrots.', 'both'),
    ],
    sopars: [
      createMeal('s1d1', 'Crema de Pastanaga i Carbassó', 'Pastanagues, carbassó, ceba, brou vegetal, oli d\'oliva. Sofregir ceba, afegir verdures tallades i brou. Coure 20 min i triturar.', 'both'),
      createMeal('s1d2', 'Truita de Carbassó', 'Carbassó, ous, ceba, oli d\'oliva, amanida verda. Sofregir carbassó i ceba, barrejar amb ous batuts i fer truita. Acompanyar amb amanida.', 'both'),
      createMeal('s1d3', 'Tofu Fumat amb Verdures', 'Tofu fumat, pebrots, pastanagues, salsa teriyaki suau, oli d\'oliva. Saltejat tofu amb verdures i un toc de salsa teriyaki.', 'both'),
      createMeal('s1d4', 'Amanida de Tomàquet amb Formatge', 'Tomàquet de sucar, formatge fresc, alfàbrega, oli d\'oliva, vinagre balsàmic. Tallar tomàquets, afegir formatge en trossos i aliñar.', 'both'),
      createMeal('s1d5', 'Sopa de Verdures Casolana', 'Pastanagues, ceba, brou vegetal, herbes, oli d\'oliva. Sofregir verdures, afegir brou i coure 15 min.', 'both'),
      createMeal('s1d6', 'Pebrot Farcit Vegetarià', 'Pebrots, arròs integral, tomàquet de sucar, formatge fresc, herbes. Buidar pebrots, farcir amb barreja d\'arròs, tomàquet i formatge. Enfornar 30 min.', 'both'),
      createMeal('s1d7', 'Gaspatxo de Pebrots', 'Pebrots, tomàquet de sucar, ceba, oli d\'oliva, vinagre, pa. Triturar tot amb aigua freda, colar i refrigerar. Servir amb croutons.', 'both'),
    ]
  },
  setmana2: {
    esmorzars: [
      createMeal('s2b1', 'Iogurt Grec amb Mel de Romaní', '200g iogurt grec, mel de romaní, ametlles torreres, figues seques. Tallar figues en trossos, servir iogurt amb mel i decorar amb ametlles i figues.', 'both'),
      createMeal('s2b2', 'Pa amb Tomàquet Català', '2 llesques pa rústic, tomàquet madur, oli d\'oliva verge extra, sal marina, pernil ibèric. Torrar pa, fregar tomàquet, afegir sal, oli i pernil.', 'both'),
      createMeal('s2b3', 'Smoothie Bowl Tropical', 'Mango congelat, pinya, coco ratllat, llavors de chia, granola, kiwi. Triturar mango i pinya congelats fins consistència gelat, decorar amb ingredients.', 'both'),
      createMeal('s2b4', 'Torrada Salmó Fumat', 'Pa de centeno, formatge crema, salmó fumat, alcaparres, cebolla morada, eneldo fresc. Estendre formatge, col·locar salmó i decorar.', 'both'),
      createMeal('s2b5', 'Porridge d\'Avena Proteic', 'Avena, llet de proteïnes, plàtan, mantega d\'ametlla, canyella, fruits vermells. Coure avena fins consistència cremosa, afegir plàtan aixafat.', 'both'),
      createMeal('s2b6', 'Tosta d\'Alvocat i Formatge', '2 llesques pa integral, alvocat madur, formatge feta, tomàquets cherry, oli d\'oliva, pebre negre. Aixafar alvocat, estendre sobre pa, decorar amb formatge i tomàquets.', 'both'),
      createMeal('s2b7', 'Batut de Fruites Tropical', 'Mango, pinya, plàtan, llet de coco, llima, menta fresca. Triturar fruits amb llet de coco fins textura suau i refrescant.', 'both'),
    ],
    dinars: [
      createMeal('s2l1', 'Paella de Verdures i Llegums', 'Arròs bomba, mongetes verdes, garrofó, tomàquet, safrà, cigrons, carxofes, oli, brou vegetal. Sofregir verdures, afegir arròs, brou amb safrà, coure 18 min.', 'both'),
      createMeal('s2l2', 'Cuscús Marroquí amb Pollastre', '180g pit pollastre, cuscús integral, pastanaga, calabruix, carbassó, espècies àrabs, fruits secs. Coure en tagine 30 min, hidratar cuscús amb brou.', 'both'),
      createMeal('s2l3', 'Amanida Completa de Quinoa', 'Quinoa tricolor, llenties vermelles, formatge feta, nous, rúcula, llimona, mostassa. Coure quinoa i llenties, mesclar amb vinagreta.', 'both'),
      createMeal('s2l4', 'Curry Thai de Peix', 'Peix blanc, llet de coco, pasta curry vermell, verdures asiàtiques, arròs jasmí integral, llima. Sofregir pasta curry, afegir llet de coco i peix.', 'both'),
      createMeal('s2l5', 'Risotto de Bolets i Espinacs', 'Arròs arbori, bolets variats, espinacs, formatge parmesà, ceba, vi blanc, brou vegetal. Remenant constantment 18 min, afegir espinacs i parmesà al final.', 'both'),
      createMeal('s2l6', 'Fideuà de Verdures', '200g fideus gruixuts, verdures de temporada, brou de peix, safrà, all, oli d\'oliva. Sofregir verdures, afegir fideus i brou, coure 12 min.', 'both'),
      createMeal('s2l7', 'Pollastre amb Samfaina', '180g pit de pollastre, albergínia, carbassó, pebrot, tomàquet, ceba, herbes. Sofregir samfaina 20 min, coure pollastre i servir conjuntament.', 'both'),
    ],
    sopars: [
      createMeal('s2d1', 'Carpaccio de Carbassó', 'Carbassó, rúcula, formatge parmesà, pinons, oli d\'oliva, llimona. Tallar carbassó en làmines fines, disposar amb rúcula i decorar.', 'both'),
      createMeal('s2d2', 'Sopa de Verdures de Temporada', 'Verdures de temporada, brou vegetal, herbes aromàtiques, oli d\'oliva, llegums. Sofregir verdures, cobrir amb brou, coure 20 min.', 'both'),
      createMeal('s2d3', 'Daurada a la Sal', 'Daurada fresca, sal marina gruixuda, herbes mediterrànies, verdures. Cobrir peix amb sal i clara d\'ou, enfornar 25 min a 200°C.', 'both'),
      createMeal('s2d4', 'Amanida Tèbia de Llegums', 'Mongetes blanques, cigrons, verdures rostides, herbes, vinagreta. Escalfar llegums, rostir verdures, mesclar amb vinagreta.', 'both'),
      createMeal('s2d5', 'Crema de Carabassa', 'Carabassa, cebolla, gingebre, llet de coco, curry suau, llavors de carbassa. Rostir carabassa, sofregir aromàtics, triturar amb llet de coco.', 'both'),
      createMeal('s2d6', 'Amanida Mediterrània', 'Tomàquets, cogombres, olives negres, cebolla morada, formatge feta, oli d\'oliva, oregano. Tallar verdures, mesclar amb formatge i aliñar.', 'both'),
      createMeal('s2d7', 'Verdures Rostides amb Quinoa', 'Quinoa, carbassó, pebrots, ceba, oli d\'oliva, herbes. Rostir verdures al forn, servir sobre quinoa cuita amb herbes fresques.', 'both'),
    ]
  },
  setmana3: {
    esmorzars: [
      createMeal('s3b1', 'Congee de Civada', 'Civada en gra, llet d\'ametlla, gingebre, canyella, fruits secs, mel. Coure civada amb llet i gingebre 30 min fins textura cremosa.', 'both'),
      createMeal('s3b2', 'Toast Japonès amb Ou', 'Pa japonès, ou, nori, sèsam, salsa soja lleugera, cebolleta. Torrar pa gruixut, fer ou, decorar amb nori i sèsam.', 'both'),
      createMeal('s3b3', 'Matcha Latte Bowl', 'Iogurt grec, pols de matcha, mel, granola, fruita fresca. Barrejar iogurt amb matcha fins color verd homogeni.', 'both'),
      createMeal('s3b4', 'Smoothie de Te Verd', 'Te verd fred, plàtan, espinacs, llimona, gingebre, mel. Triturar te fred amb ingredients fins textura suau.', 'both'),
      createMeal('s3b5', 'Onigiri de Quinoa', 'Quinoa cuita, nori, salmó, sèsam negre. Formar boles amb quinoa, omplir amb salmó, embolcallar amb nori.', 'both'),
      createMeal('s3b6', 'Miso Soup amb Tofu', 'Brou miso, tofu sedosa, alga wakame, cebolleta, sèsam. Escalfar brou miso, afegir tofu tallat en daus i decorar amb alga.', 'both'),
      createMeal('s3b7', 'Bowl de Kimchi i Arros', 'Arròs integral, kimchi, ou, sèsam, nori, cebolleta. Servir arròs calent amb kimchi i ou escalfat per sobre.', 'both'),
    ],
    dinars: [
      createMeal('s3l1', 'Ramen Vegetal Casolà', 'Fideus ramen integrals, brou miso, tofu, ou marnat, bolets, bambú, nori, cebolleta. Preparar brou amb miso, muntar bowl amb tots ingredients.', 'both'),
      createMeal('s3l2', 'Curry Indi de Llenties', 'Llenties vermelles, llet de coco, cúrcuma, comí, coriandre, espinacs, arròs basmati. Coure llenties amb espècies, afegir llet de coco.', 'both'),
      createMeal('s3l3', 'Bibimbap Coreà', 'Arròs integral, verdures variades, carn de vedella, ou, salsa gochujang, sèsam. Saltejat cada verdura per separat, muntar en bowl.', 'both'),
      createMeal('s3l4', 'Pad Thai amb Gambetes', 'Fideus de civada, gambetes, verdures, cacauets, llima, salsa tamarinde, ou. Hidratar fideus, saltejat amb salsa i ingredients.', 'both'),
      createMeal('s3l5', 'Dahl de Llegums Variats', 'Llenties vermelles, cigrons, espècies índies, llet de coco, espinacs. Coure llegums amb espècies, incorporar espinacs al final.', 'both'),
      createMeal('s3l6', 'Udon amb Verdures Saltejades', 'Fideus udon, verdures de temporada, salsa teriyaki, sèsam, gingebre. Coure udon, saltejar verdures amb gingebre i salsa.', 'both'),
      createMeal('s3l7', 'Chirashi Bowl', 'Arròs sushi, peix fresc variat, alvocat, cogombre, nori, wasabi. Disposar peix sobre arròs sazonnat amb vinagre de arròs.', 'both'),
    ],
    sopars: [
      createMeal('s3d1', 'Amanida Asiàtica de Cogombre', 'Cogombre, alga wakame, vinagre de arròs, sèsam, soja. Tallar cogombre, hidratar alga, aliñar amb vinagre i soja.', 'both'),
      createMeal('s3d2', 'Sopa Won Ton Vegetal', 'Won ton, verdures per farcit, brou clar, bok choy, bolets shiitake. Preparar farcit vegetal, coure won ton en brou.', 'both'),
      createMeal('s3d3', 'Yakitori de Pollastre', 'Pit de pollastre, salsa teriyaki, verdures, broquetes. Enfilar pollastre i verdures, pinzellar amb teriyaki.', 'both'),
      createMeal('s3d4', 'Amanida de Fideus Soba', 'Fideus soba, verdures, salsa ponzu, nori, sèsam. Coure fideus, refredar, mesclar amb verdures en juliana.', 'both'),
      createMeal('s3d5', 'Hot Pot Individual', 'Brou lleuger, tofu, verdures variades, bolets, fideus. Escalfar brou, afegir ingredients per ordre de cocció.', 'both'),
      createMeal('s3d6', 'Edamame amb Sal Marina', 'Edamame frescos, sal marina, sèsam torrat. Bullir edamame 5 min, escorre i servir amb sal i sèsam per sobre.', 'both'),
      createMeal('s3d7', 'Gyoza Vegetal', 'Pasta gyoza, verdures picades, gingebre, all, salsa soja. Omplir pasta amb farcit vegetal, coure a la planxa i vapor.', 'both'),
    ]
  },
  setmana4: {
    esmorzars: [
      createMeal('s4b1', 'Labneh amb Fruits Secs', 'Labneh, nous, mel, pistachos, dàtils. Escórrer iogurt grec 4h, servir amb fruits secs i mel.', 'both'),
      createMeal('s4b2', 'Shakshuka Lleugera', 'Ous, tomàquet, pebrot, cebolla, espècies àrabs, pa pita. Sofregir verdures, fer forats per ous, coure fins quallar.', 'both'),
      createMeal('s4b3', 'Müesli Oriental', 'Avena, fruits secs, llavors, cardamom, aigua de rosa, iogurt. Barrejar müesli amb iogurt aromàtic.', 'both'),
      createMeal('s4b4', 'Hummus Toast', 'Pa integral, hummus, tomàquet cherry, oli d\'oliva, za\'atar. Estendre hummus, decorar amb tomàquets i za\'atar.', 'both'),
      createMeal('s4b5', 'Batut de Rosa i Cardamom', 'Llet d\'ametlla, plàtan, aigua de rosa, cardamom, pistachos. Triturar amb aromàtics orientals.', 'both'),
      createMeal('s4b6', 'Mànsaf Estil Esmorzar', 'Iogurt làctic, pa pita, nous, dàtils, mel. Servir iogurt amb pa torrat i decorar amb fruits secs i mel.', 'both'),
      createMeal('s4b7', 'Fattoush de Fruites', 'Pa pita torrat, fruites fresques, menta, llimona, oli d\'oliva. Barrejar pa cruixent amb fruites tallades i herbes.', 'both'),
    ],
    dinars: [
      createMeal('s4l1', 'Falafel amb Quinoa Tabbouleh', 'Cigrons, herbes, espècies, quinoa, tomàquet, menta, perejil, llimona. Formar falafels, preparar tabbouleh amb quinoa.', 'both'),
      createMeal('s4l2', 'Moussaka Vegetal', 'Albergínia, llenties, salsa bechamel vegetal, formatge, espècies gregues. Muntar en capes i enfornar 30 min.', 'both'),
      createMeal('s4l3', 'Kofta d\'Anyell amb Pilaf', 'Anyell picat, espècies, arròs, fruits secs, verdures. Formar koftes, preparar pilaf amb arròs i fruits secs.', 'both'),
      createMeal('s4l4', 'Curry Persa d\'Anyell', 'Anyell, prunes, nous, espècies persanes, arròs basmati amb safrà. Coure anyell amb fruits secs a foc baix 45 min.', 'both'),
      createMeal('s4l5', 'Dolma Vegetariana', 'Fulles de vinya, arròs, pinons, pases, herbes, llimona. Omplir fulles amb barreja d\'arròs, coure en brou.', 'both'),
      createMeal('s4l6', 'Tagine de Verdures', 'Verdures mediterrànies, prunyons, espècies marroquines, cuscus. Coure verdures en tagine amb fruits secs 45 min.', 'both'),
      createMeal('s4l7', 'Kibbeh de Llenties', 'Bulgur, llenties, ceba, espècies, oli d\'oliva, nous. Formar kibbeh amb barreja de bulgur i llenties, fregir lleugerament.', 'both'),
    ],
    sopars: [
      createMeal('s4d1', 'Mezze Vegetarià', 'Hummus, baba ganoush, olives, formatge, verdures fresques. Disposar en plats petits amb pa pita.', 'both'),
      createMeal('s4d2', 'Crema de Llenties Vermelles', 'Llenties vermelles, cúrcuma, comí, llimona, pa pita. Coure llenties amb espècies fins desfer, triturar.', 'both'),
      createMeal('s4d3', 'Peix a la Chermoula', 'Peix blanc, coriandre, perejil, all, llimona, espècies, verdures rostides. Marinar peix 30 min amb chermoula.', 'both'),
      createMeal('s4d4', 'Amanida de Bulgur', 'Bulgur, tomàquet, cogombre, menta, perejil, llimona. Hidratar bulgur, mesclar amb verdures i herbes.', 'both'),
      createMeal('s4d5', 'Sopa Harira', 'Llenties, cigrons, tomàquet, canyella, gingebre, herbes. Coure llegums amb espècies 30 min.', 'both'),
      createMeal('s4d6', 'Baba Ganoush amb Verdures', 'Albergínies rostides, tahini, all, llimona, verdures fresques per sucar. Rostir albergínies al forn, triturar amb condiments.', 'both'),
      createMeal('s4d7', 'Pastissets de Formatge', 'Pasta filo, formatge feta, espinacs, herbes, oli d\'oliva. Omplir pasta filo amb barreja de formatge, enfornar fins daurat.', 'both'),
    ]
  },
  setmana5: {
    esmorzars: [
      createMeal('s5b1', 'Smoothie de Mantega de Cacauet', 'Plàtan, mantega cacauet natural, llet d\'avena, avena, canyella. Triturar fins textura suau i cremosa.', 'both'),
      createMeal('s5b2', 'Toast amb Hummus i Ou', 'Pa integral, hummus de cigrons, ou escalfat, rúcula. Estendre hummus, col·locar ou amb rovell líquid.', 'both'),
      createMeal('s5b3', 'Pancakes de Llegums', 'Farina de cigrons, ou, llet vegetal, verdures, herbes. Barrejar farina amb llet, afegir verdures picades.', 'both'),
      createMeal('s5b4', 'Porridge de Llenties Vermelles', 'Llenties vermelles cuites, llet de coco, fruita, canyella. Escalfar llenties amb llet fins textura cremosa.', 'both'),
      createMeal('s5b5', 'Batut Verd amb Proteïna', 'Espinacs, plàtan, proteïna vegetal en pols, ametlles. Triturar espinacs amb plàtan dolç per disimular color.', 'both'),
      createMeal('s5b6', 'Torrija de Llegums', 'Pa integral, llet de llegums, ou, canyella, mel. Remullar pa en llet, passar per ou i coure fins daurat.', 'both'),
      createMeal('s5b7', 'Bowl Energètic de Llegums', 'Llenties cuites, fruits secs, iogurt, mel, granola. Servir llenties fredes amb iogurt i decorar amb fruits secs.', 'both'),
    ],
    dinars: [
      createMeal('s5l1', 'Cassoulet Català', 'Mongetes blanques, botifarra, pernil, tomàquet, herbes provençals. Coure mongetes amb carn 1h fins melós.', 'both'),
      createMeal('s5l2', 'Chili amb Carn i Llegums', 'Carn picada, mongetes negres, tomàquet, pebrot, espècies mexicanes. Daurar carn, afegir llegums i espècies.', 'both'),
      createMeal('s5l3', 'Llenties al Curry amb Coco', 'Llenties vermelles, llet de coco, curry, espinacs, arròs. Coure llenties, afegir llet de coco i espècies.', 'both'),
      createMeal('s5l4', 'Hummus de Remolatxa amb Quinoa', 'Cigrons, remolatxa rostida, tahini, llimona, quinoa, verdures. Rostir remolatxa, triturar amb cigrons.', 'both'),
      createMeal('s5l5', 'Estofat de Mongetes amb Verdures', 'Mongetes blanques, pastanaga, apio, cebolla, tomàquet, herbes. Sofregir verdures, afegir mongetes i coure.', 'both'),
      createMeal('s5l6', 'Falàfel de Llenties amb Salsa', 'Llenties vermelles, herbes, espècies, tahini, iogurt, cogombre. Formar falàfel amb llenties, servir amb salsa de iogurt.', 'both'),
      createMeal('s5l7', 'Burguer de Mongetes Negres', 'Mongetes negres, avena, verdures, espècies, pa integral. Aixafar mongetes, formar hamburgueses i coure a la planxa.', 'both'),
    ],
    sopars: [
      createMeal('s5d1', 'Crema de Llenties Corail', 'Llenties vermelles, coco, cúrcuma, gingebre, coriandre fresc. Coure amb espècies, triturar amb llet de coco.', 'both'),
      createMeal('s5d2', 'Amanida de Mongetes i Tonyina', 'Mongetes blanques, tonyina, cebolla, tomàquet, olives, vinagreta. Mesclar mongetes amb tonyina i verdures.', 'both'),
      createMeal('s5d3', 'Sopa de Pèsols Verds', 'Pèsols frescos, porro, menta, brou vegetal, oli d\'oliva. Sofregir porro, coure pèsols, triturar parcialment.', 'both'),
      createMeal('s5d4', 'Dip de Mongetes amb Verdures', 'Mongetes blanques, all, llimona, oli, verdures per sucar. Triturar mongetes fins dip cremós.', 'both'),
      createMeal('s5d5', 'Amanida Tèbia de Llenties', 'Llenties, verdures rostides, formatge de cabra, vinagreta. Escalfar llenties, rostir verdures al forn.', 'both'),
      createMeal('s5d6', 'Crema de Pèsols amb Menta', 'Pèsols frescos, menta, ceba, brou vegetal, oli d\'oliva. Coure pèsols amb ceba, triturar amb menta fresca.', 'both'),
      createMeal('s5d7', 'Tàrtar de Llenties', 'Llenties cuites, ceba, pepinets, herbes, mostassa, oli. Tallar ingredients finament, barrejar amb llenties fredes.', 'both'),
    ]
  }
};

const generateDietCalendar = (): CalendarData => {
  const dietData: CalendarData = {};
  const startDate = new Date('2025-08-25'); // Començar el 25 d'agost (dilluns)
  
  // Crear 35 dies (5 setmanes de 7 dies completes)
  for (let week = 0; week < 5; week++) {
    const weekData = week === 0 ? dietPlan.setmana1 : 
                    week === 1 ? dietPlan.setmana2 :
                    week === 2 ? dietPlan.setmana3 :
                    week === 3 ? dietPlan.setmana4 : dietPlan.setmana5;
    
    // Per cada dia de la setmana (dilluns a diumenge = 7 dies)
    for (let day = 0; day < 7; day++) {
      const currentDate = addDays(startDate, week * 7 + day);
      const dateStr = formatDate(currentDate);
      
      // Tots els dies de la setmana tenen àpats (21 àpats per setmana)
      dietData[dateStr] = {
        date: dateStr,
        breakfast: weekData.esmorzars[day] || null,
        lunch: weekData.dinars[day] || null,
        dinner: weekData.sopars[day] || null,
      };
    }
  }
  
  return dietData;
};

export const mockCalendarData = generateDietCalendar();