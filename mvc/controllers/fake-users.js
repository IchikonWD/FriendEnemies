const passport = require("passport");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const Comment = mongoose.model("Comment");

let maleNames = [
  "Antonio",
  "Jose",
  "Manuel",
  "Francisco",
  "David",
  "Juan",
  "Jose Antonio",
  "Lucas",
  "Javier",
  "Daniel",
  "Jose Luis",
  "Luis",
  "Carlos",
  "Jesus",
  "Alejandro",
  "Rafael",
  "Miguel",
  "Sebastian",
  "Miguel Angel",
  "Pedro",
  "Samuel",
  "David",
  "Pablo",
  "Angel",
  "Sergio",
  "Raul",
  "Ivan",
  "Ignacio",
  "Ramon",
  "Adrian",
  "Fernando",
  "Oscar",
  "Joaquin",
  "Julio",
  "Gabriel",
  "Julian",
  "Mateo",
  "Mohamed",
  "Guillermo",
  "Salvador",
  "Felix",
  "Nicolas",
  "Agustin",
  "Martin",
  "Tomas",
  "Ryan",
  "Marcos",
  "Marc",
  "Jordi",
  "Leo",
  "Hector",
  "Felipe",
  "Domingo",
  "Iker",
  "Xavier",
  "Jose Andres",
  "Agustin",
  "Cristo",
  "Mariano",
  "Xavier",
  "Joel",
  "Adrian",
  "Dario",
  "Mateo",
  "Albert",
  "Felipe",
  "Victor Manuel",
  "Colton",
  "Cameron",
  "Carson",
  "Robert",
  "Angel",
  "Maverick",
  "Nicholas",
  "Dominic",
  "Jaxson",
  "Greyson",
  "Adam",
  "Ian",
  "Austin",
  "Santiago",
  "Jordan",
  "Cooper",
  "Brayden",
  "Roman",
  "Evan",
  "Ezekiel",
  "Xaviar",
  "Jose",
  "Jace",
  "Jameson",
  "Leonardo",
  "Axel",
  "Everett",
  "Kayden",
  "Miles",
  "Sawyer",
  "Jason",
];

let femaleNames = [
  "Maria",
  "Olivia",
  "Carmen",
  "Isabel",
  "Sofia",
  "Dolores",
  "Pilar",
  "Teresa",
  "Rosa",
  "Josefa",
  "Cristina",
  "Angeles",
  "Laura",
  "Antonia",
  "Elena",
  "Marta",
  "Francisca",
  "Camila",
  "Lucia",
  "Mercedes",
  "Victoria",
  "Luisa",
  "Luna",
  "Concepcion",
  "Rosario",
  "Penelope",
  "Paula",
  "Sara",
  "Raquel",
  "Nora",
  "Juana",
  "Manuela",
  "Hannah",
  "Eva",
  "Rocio",
  "Beatriz",
  "Patricia",
  "Victoria",
  "Julia",
  "Zoe",
  "Belen",
  "Andrea",
  "Violeta",
  "Aurora",
  "Esther",
  "Nuria",
  "Irene",
  "Montserrat",
  "Angela",
  "Sandra",
  "Inmaculada",
  "Monica",
  "Alicia",
  "Yolanda",
  "Carolina",
  "Nova",
  "Sonia",
  "Emilia",
  "Mar",
  "Marina",
  "Margarita",
  "Susana",
  "Natalia",
  "Naomi",
  "Claudia",
  "Sofia",
  "Sara",
  "Ariana",
  "Gloria",
  "Amparo",
  "Ines",
  "Nieves",
  "Cora",
  "Lourdes",
  "Soledad",
  "Carla",
  "Alejandra",
  "Daniela",
  "Luz",
  "Noelia",
  "Valentina",
  "Lorena",
  "Begoña",
  "Fatima",
  "Consuelo",
  "Asuncion",
  "Olga",
  "Blanca",
  "Lydia",
  "Alexa",
  "Nerea",
  "Miriam",
  "Milagros",
  "Esperanza",
  "Lidia",
  "Catalina",
  "Aurora",
  "Celia",
  "Adriana",
  "Elisa",
];

let familyNames = [
  "Gonzalez",
  "Rodriguez",
  "Migueles",
  "Abraira",
  "Pena",
  "Ornes",
  "Alvarez",
  "Garcia",
  "Fernandez",
  "López",
  "Martínez",
  "Sánchez",
  "Pérez",
  "Gómez",
  "Martin",
  "Jiménez",
  "Ruiz",
  "Garcia",
  "Martinez",
  "Hernández",
  "Diaz",
  "Moreno",
  "Muñoz",
  "Romero",
  "Alonso",
  "Gutiérrez",
  "Navarro",
  "Torres",
  "Domínguez",
  "Vázquez",
  "Ramos",
  "Lopez",
  "Gil",
  "Serrano",
  "Blanco",
  "Molina",
  "Morales",
  "Gonzalez",
  "Ortega",
  "Delgado",
  "Castro",
  "Ortiz",
  "Rubio",
  "Marín",
  "Sanz",
  "Núñez",
  "Iglesias",
  "Garrido",
  "Medina",
  "Santos",
  "Castillo",
  "Sanchez",
  "Morris",
  "Cortes",
  "Calvo",
  "Méndez",
  "Prieto",
  "Cano",
  "Guerrero",
  "Cruz",
  "Rivera",
  "Lozano",
];

let fakePosts = {
  hardcodedPosts: [
    "El placer y la acción hacen que las horas parezcan cortas.",
    "La inteligencia es la habilidad de adaptarse al cambio.",
    "La envidia es una declaración de inferioridad.",
    "Happy ;D",
    "No malgastes tu tiempo, pues de esa materia está formada la vida.",
    "Educación es lo que queda después de olvidar lo que se ha aprendido en la escuela.",
    "Solo hay una felicidad en la vida – amar y ser amado.",
    "Deleted code is debugged code.",
    "No busques los errores, busca un remedio.",
    "Solo hay una felicidad en la vida – amar y ser amado.",
    "gg",
    "El éxito depende del esfuerzo.",
    "Todos somos muy ignorantes. Lo que ocurre es que no todos ignoramos las mismas cosas.",
    "Eh.",
    "La muerte destroza al hombre: la idea de la muerte le salva.",
    "La gente se rie de mi por que soy diferente, yo me rio de ellos por que son todos iguales.",
    "No malgastes tu tiempo, pues de esa materia está formada la vida.",
    "Cuando el hombre no se encuentra a sí mismo, no encuentra nada.",
    "La envidia es una declaración de inferioridad.",
    "De todos los animales de la creación el hombre es el único que bebe sin tener sed, come sin tener hambre y habla sin tener nada que decir.",
    "No busques los errores, busca un remedio.",
    "Facebook just sounds like a drag, in my day seeing pictures of peoples vacations was considered a punishment - Betty White",
    "Educación es lo que queda después de olvidar lo que se ha aprendido en la escuela.",
    "La inteligencia es la habilidad de adaptarse al cambio.",
    "Quien tiene paciencia, obtendrá lo que desea.",
    "Una buena cabeza y un buen corazón son siempre combinaciones formidables.",
    "El éxito depende del esfuerzo.",
    "Una buena cabeza y un buen corazón son siempre combinaciones formidables.",
    "WOW",
    "P = NP",
    "E = MC^2",
    "La confianza en sí mismo es el primer secreto del éxito.",
    "I like coffee.",
    "I'm a robot.",
    "Oops...",
    "BOOP",
    "Solo hay una felicidad en la vida – amar y ser amado.",
    "Winner winner chicken dinner.",
    "Cuando el hombre no se encuentra a sí mismo, no encuentra nada.",
    "I'm flying today!",
    "Todos somos muy ignorantes. Lo que ocurre es que no todos ignoramos las mismas cosas.",
    "Margaret Thatcher es 110% Sexy",
    "La inteligencia es la habilidad de adaptarse al cambio.",
    "El placer y la acción hacen que las horas parezcan cortas.",
    "Just woke up :)",
    "La envidia es una declaración de inferioridad.",
    "No malgastes tu tiempo, pues de esa materia está formada la vida.",
    "...My friend talks too much.",
    "Loving this Saturday.",
    "La confianza en sí mismo es el primer secreto del éxito.",
    "La muerte destroza al hombre: la idea de la muerte le salva.",
    "Hello, World",
    "I like turtles.",
    "0101101001010100101010",
    "El fracaso es simplemente una nueva oportunidad de empezar de nuevo, esta vez de forma más inteligente.",
    "Adentro del Vaticano está todo forrado de oro y afuera los pibes se están muriendo de hambre.",
    "No malgastes tu tiempo, pues de esa materia está formada la vida.",
    "No malgastes tu tiempo, pues de esa materia está formada la vida.",
    "Taumatawhakatangihangakoauauotamateaturipukakapikimaungahoronukupokaiwhenuakitanatahu es un lugar que puedes visitar en Nueva Zelanda.",
    "There is no place like homework.",
    "Angular is pretty cool.",
    "The MEAN stack is awesome!",
    "<3",
  ],
  lorems: [
    "Early adopters business model canvas scrum project. Infographic infrastructure business-to-business termsheet burn rate return on investment. Holy grail non-disclosure agreement marketing. Pitch iPhone technology business-to-consumer freemium.",
    "Rockstar iteration business-to-consumer niche market first mover advantage MVP innovator incubator startup. Equity scrum project strategy. Disruptive deployment freemium infrastructure advisor.",
    "Freemium interaction design business-to-business innovator termsheet stock release holy grail. Android market innovator metrics business-to-consumer scrum project. Hackathon conversion assets research & development funding ownership agile development backing.",
    "Lean startup seed money iteration vesting period entrepreneur beta direct mailing crowdsource long tail assets release. Incubator value proposition leverage handshake bandwidth investo.",
    "Low hanging fruit partnership stock niche market early adopters iPad beta buzz market freemium prototype startup stealth. Influencer channels agile development alpha startup gamification hackathon crowdsource.",
    "Entrepreneur user experience burn rate mass market bootstrapping focus crowdfunding churn rate. Bandwidth buzz client creative A/B testing alpha android termsheet seed money long tail twitter scrum project infographic.",
    "MVP infographic first mover advantage growth hacking gamification traction early adopters focus. Business-to-consumer early adopters innovator social media conversion agile development vesting period technology partner network startup. Conversion launch party infographic.",
    "Holy grail lean startup seed round supply chain crowdfunding interaction design gen-z direct mailing business-to-business business plan prototype social proof user experience technology. Ownership hypotheses churn rate iPhone burn rate traction buyer customer first mover advantage.",
    "Hypotheses bootstrapping seed money focus facebook release. Analytics release investor advisor branding bandwidth seed round customer ramen gamification infrastructure rockstar innovator first mover advantage. Channels learning curve low hanging fruit. Supply chain accelerator buzz.",
    "Release customer client ownership seed money buyer. Mass market user experience product management alpha gamification equity angel investor partnership freemium pivot. Crowdsource direct mailing success angel investor. Freemium iteration investor supply chain.",
    "Locals people St. Petersburg yacht guest budget airplane national bus euro Hong Kong. Exchange rate China Moscow St. Petersburg ticket bus camper Budapest dollar apartment sleep France.",
    "Stress free dollar booking Instagram activities miles. Nighttrain hospitality train motel bus China. Passport gateway sleep flying overnight transit euro chartering translation car rental rural diary worldwide.",
    "Rome spa activities uncharted Brasil tent locals guest. Rural budget Berlin. International lonely planet dollar GEO sight seeing recommendations explore.",
    "Package itinerary territory Germany activities country worldwide. Sight seeing activities hiking Rome overnight housing Turkey discover flying on a shoestring Hong Kong outdoor. Boat uncharted animals active lifestyle. Currency wellness horse riding flexibility.",
    "Activities territory translation Holland stress free worldwide Germany stay hospitality. Tour operator explore Rome park China national bus travel Australia. Airplane group discount Moscow hotspots flexibility globe outdoor apartment unique experiences people stay hospitality.",
    "Expedia park frequent flyer housing maps flexibility group discount currency sight seeing outdoor. AirBnB international spa.",
    "Last minute couchsurfing group discount France hospitality freedom. GEO apartment diary international couchsurfing. Chartering territory Europe creditcard explore stress free kayak overnight apartment itinerary.",
    "Poland Pacific activities horse riding rural hotspots on a shoestring adventure travel luxury city trip insurance. Berlin foreign airBnB bus diary. Poland creditcard apartment euro cabin overnight. GEO overnight itinerary maps territory New York City Moscow Japan chartering stay. China sleep locals tent Berlin taxi.",
    "Poland recommendations Vienna Hong Kong relaxation hiking lonely planet dollar last minute translation cabin. Sleep euro exchange rate hitchhiking things to do. Money Amsterdam explore private jet.",
    "Travel hiking motel Instagram. Camper tent nighttrain freedom rural passport housing motel currency tour operator. Transit Paris package city trip foreign. Park Moscow unique experiences Poland frequent flyer Cuba last minute tourist attractions airmiles expedia Instagram GEO Holland sailing. Last minute St. Petersburg.",
    "Worldwide unique experiences exchange rate globe private jet Brasil people city trip itinerary diary hospitality. Instagram Rome Barcelona locals tour operator flying boat. Camper itinerary hotspots Tripit rural budget. Discount foreign money.",
    "Airmiles money hitchhiking China yacht Vienna travel Asia Turkey group discount active lifestyle wellness international GEO. Hiking Instagram couchsurfing miles yacht package housing St. Petersburg Brasil. Housing animals sight seeing Asia gateway sleep locals Hungary international Instagram.",
    "Brasil Poland flexibility insurance foreign diary Instagram South-America sleep hotel territory earth. Spa tent relaxation couchsurfing Asia motel car rental private jet cab earth taxi Australia cabin.",
    "Bus flight St. Petersburg currency cabin lodge last minute miles activities Amsterdam spa. Explore booking Turkey Asia couchsurfing hitchhiking. Active lifestyle diary housing hotel camper cabin. Earth tourist attractions hotel Japan discover France caravan Turkey taxi cab airmiles lonely planet. France translator train Pacific.",
    "Fresh conserve meals authentic restaurant scent local poultry food heating fork indie foods. Broil blender paprika lasagna sushi groceries romantic biological mustard a la carte. Fork Chinese food sauce local coffee ingredients dish food carrots chef heating.",
    "Romantic cafe bar artisan. Bon appetit pie chick peas appliances fruit seafood local apples funghi. Desert a la carte spice oranges beets lobster beverages seafood paprika pepper wholesome.",
    "Java authentic soda tasty sausage carrots ginger pasta heating farm. Lobster blender salt lunch drink chopsticks broth funghi Chinese food olive oil cupcake farm sushi.",
    "Recommendations taste cookie customer bacon dish heating starter eat better. Take away aroma sweet indie foods cream baking.",
    "Soda chopsticks cuisine blender sausage foodtruck groceries al dente. Fish organic spinach banquet ingredients. Wine fork restaurants local deep frying oranges. Biological conserve sausage cupcake food baking artisan ginger.",
    "Etiquette organic hummus recommendations. Cuisine sous-chef spice. Apples taste delicious wholesome tasty fish rice chef. Kitchen sour starter. Meat oranges fruit chick peas salami cafe carrots vegetables mustard restaurant indie foods vegetarian farm bacon. Cookie grape blend paprika. Cuisine organic olive oil broil relish beverages. Poultry delicious vegan customer java starter. Main course whipped cream eat better lasagna organic etiquette customer.",
    "Biological bacon lobster olive oil first class peas. Herbes custard farm breakfast dinner peas lobster steam chick peas first class fridge a la carte main course. Chef oranges desert beverages yummy luncheon restaurant.",
    "Pasta first class breakfast luncheon cafe eat better quinoa cuisine ingredients scent fork biological a la carte. Meals beets pots and pans a la carte bread bon appetit. Meat vegetables food desert sushi delicious sour foodtruck quinoa main course indian marinate scent.",
    "Luncheon Chinese food lobster. Steam chocolate eggs plate relish salt indie foods. Chinese food chick peas groceries. Liquor a la carte carbs custard blend Chinese food seafood.",
    "Al dente main course wholesome baking sushi sweet salt chef artisan caramelize liquor pizza sous-chef vegetarian. Pub scent banquet. Bacon pub pizza dish fork. Beer lovely dish oranges vegetables coffee relish aroma.",
    "Drink biological food mineral water take away fruit pie cream beverages aroma. Barbeque restaurant cupcake foodtruck breakfast protein paprika healthy. Cream grocery shopping fork beverages sustainable eat better biological coffee fruit.",
    "Cookie plate chef poultry. A la carte butter dish bacon lasagna appliances banquet. Chinese food artisan bon appetit butter.",
    "Eat better fruit spice sustainable chocolate. Protein wine liquor sweet breakfast poultry cook aroma local indie foods. Butter sauce carbs restaurants funghi Chinese food cafe caramelize chef lasagna healthy.",
    "Dish taste protein starter sauce grocery shopping lasagna mineral water broil conserve breakfast restaurant sausage pub. Pizza bacon delicious wholesome. Indian conserve bartender. Lasagna scent recommendations artisan tasty marinate eggs fish sustainable.",
    "Peas appliances savory oven broil tasty bon appetit breakfast flavor lasagna steam indie foods. Fruit liquor artisan oven vegan drink chocolate eat better sweet indie foods gastronome seafood al dente.",
    "Fish oranges main course taste delivery olive oil lunch caramelize apples dinner pots and pans pie Chinese food cheese. Spice conserve broil cuisine desert. Broil vegetarian oven banquet salt rice bon appetit dish.",
    "Salt savory desert plate scent organic barbeque. Salami barbeque baking. Funghi foodtruck sauce tea cupcake scent herbes luncheon pasta beverages whipped cream al dente. Eggs main course carbs beer tasty.",
    "Apples fish hummus starter bacon customer ginger savory peas. Delicious soda oranges aroma sausage starter sweet hummus lobster plate. Heating sous-chef butter starter ingredients restaurants pizza conserve mineral water scent baking a la carte. Sausage a la carte olive oil ingredients delicious oven carrots chick peas.",
    "Yummy deep frying pasta ginger biological quinoa relish cheese healthy luncheon sushi plate herbes restaurants. Rice gluten free aroma. Blender farm tea ginger. Banquet restaurants sweet. Indie foods local chopsticks heating hummus soda sous-chef.",
    "I love brownie donut I love sugar plum. Sweet lemon drops fruitcake marshmallow apple pie donut chocolate cake jelly beans.",
    "Pie dragée chocolate chocolate halvah gummi bears. Gummies ice cream candy canes I love I love carrot cake liquorice gummies.",
    "Ice cream danish ice cream brownie. Candy canes pie I love tart toffee carrot cake jujubes fruitcake sweet.",
    "Jelly-o cheesecake I love. I love fruitcake brownie caramels gingerbread cotton candy sweet. Chupa chups muffin cookie.",
    "Bear claw wafer cake. Pie oat cake icing cheesecake carrot cake powder fruitcake oat cake. Marzipan cake dragée I love candy canes. Oat cake marzipan ice cream sugar plum. Chocolate cake oat cake lemon drops caramels I love.",
    "Lollipop cupcake liquorice oat cake. Bear claw apple pie jelly. I love gingerbread soufflé tootsie roll jelly-o I love chupa chups.",
    "Gummi bears candy pie marzipan tiramisu caramels apple pie. Powder croissant chocolate jelly-o topping marzipan lemon drops sweet.",
    "Marshmallow macaroon topping cookie. Tart muffin ice cream cookie cake sugar plum tart sesame snaps chupa chups. Powder tiramisu gummies jujubes muffin ice cream chocolate liquorice fruitcake.",
    "Dragée pastry I love donut cookie gummi bears. Pastry cupcake jelly cake pie jelly-o ice cream.",
    "Cookie pie jelly beans marshmallow tootsie roll chocolate carrot cake. Danish I love soufflé. Brownie carrot cake jelly beans ice cream tiramisu caramels I love.",
    "Jelly macaroon icing I love chupa chups. I love jelly-o sweet roll I love. Lemon drops I love candy canes cheesecake soufflé cheesecake. Danish dessert sesame snaps. Cake dessert carrot cake.",
    "Cotton candy bonbon ice cream jelly beans tart candy canes. Liquorice carrot cake marshmallow tootsie roll donut chocolate chocolate tootsie roll pastry.",
    "Halvah candy canes lemon drops oat cake. Soufflé marshmallow dessert gummi bears chocolate cake caramels.",
    "Lollipop ice cream chocolate tiramisu. Biscuit jujubes jujubes tiramisu lemon drops jelly cotton candy brownie gummies. Jelly beans cupcake croissant icing bonbon gummi bears lemon drops.",
    "Cake I love tart brownie apple pie jelly pastry tootsie roll I love. Wafer dragée candy. Liquorice I love cake halvah tart toffee candy canes gingerbread. Marshmallow pudding topping apple pie sugar plum cake dessert marzipan.",
    "Trade manufacture showcase luxurious. Inspiration inexpensive wardrobe shade waistline bodice couture young jacket bold mode glitter quantity. Make up radical apparel minimalist retailer replicate.",
    "Sewing original tones. Conservative stylish one-of-a-kind artistic cut casual inspiration vintage mainstream shade showcase value. Proportion pattern jewelry apron creative celebrities casual imprint cut. Mode petticoat vintage.",
    "Hippie artificial xs trade runway contemporary. Shape bargain unique consumer expensive vintage posture garment tones swag contemporary motif bold jeans. Apparel showcase photography cheap one-of-a-kind radical pumps proportion buttons bold.",
    "Allure vintage beautiful luxurious color buttons clothing textile inexpensive original ready-made vogue artistic braiding.",
    "Jacket contemporary swim-wear xs extraordinary buttons industry radical combination model. Original swim-wear breathable motif artistic. Item cut imprint craftmanship tones modification original easy sari instagram. Young pret-a-porter glossy retailer independant minimalist pumps photography phenomenon shape allure edge.",
    "Sari cheap availability proportion vogue trade minimalist inexpensive taste. Fashion urban necessity attractive glossy tones.",
    "Stock commercial trade hippie jersey cheap instagram xs pattern quantity bows replicate casual textile. Availability popular bargain apparel stock clothes.",
    "Classic artistic prediction embroidery leotard apron phenomenon motif availability condition tones. Expensive ribbon old-fashioned. Look quantity pastel jersey sari wardrobe ready-made.",
    "Haute-couture sleeveless commercial bodice buttons collection contemporary one-of-a-kind conformity prediction breathable.",
    "Combination piece comfortable artistry catwalk conformity vintage apron apparel phenomenon. Innovation contemporary shawl artistry mannequin xl. Couture ensemble expensive trade trend quantity effect valuable apron item hand-made minimalist young innovation.",
    "Imagination celebrities halter expensive item outlet. Impeccable conservative skirt couture. Easy identity collection outlet adjustment comfortable brand classic Haute-couture jewelry.",
    "Wardrobe taste xs creative petticoat tones shade. Taste contemporary photography. Pattern ensemble runway quality catwalk comfortable motif purse casual one-of-a-kind trend couture mode modern. Ready-made braiding swag stock adjustment brand.",
    "Influence affection Haute-couture quality. Breathable celebrities cut price taste limited replicate catwalk model artistry look. Creative attractive vogue imprint popular sleeveless independant instagram hippie tones piece textile.",
  ],
};

const getRandom = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const registerFakeUser = function (gender, email) {
  // Comprueba si se usa nombre masculino o femenino.
  if (gender == "f") {
    var firstName = femaleNames[getRandom(0, femaleNames.length - 1)];
  } else {
    var firstName = maleNames[getRandom(0, maleNames.length - 1)];
  }

  // El apellido es independiente del genero.
  lastName = familyNames[getRandom(0, familyNames.length - 1)];

  // Esta funcion devuelve una promesa que se resuelve cuando se crea el usuario.
  return new Promise(function (resolve, reject) {
    // Crear el usuario
    let user = new User();
    user.name = firstName + " " + lastName;
    user.email = email;

    // El email sigue el mismo patron que el nombre de las imagenes.

    // Contraseña de los usuarios creados= "f".
    user.setPassword("f");
    user = createFakePosts(user, getRandom(8, 16));
    user.save((err, user) => {
      if (err) {
        reject();
        return res.json({ err: err });
      }
      resolve(user);
    });
  });
};

const createFakePosts = function (user, amountOfPosts) {
  function generateContent() {
    if (getRandom(0, 100) > 50) {
      let index = getRandom(0, fakePosts.hardcodedPosts.length - 1);
      var content = fakePosts.hardcodedPosts[index];
    } else {
      let index = getRandom(0, fakePosts.lorems.length - 1);
      var content = fakePosts.lorems[index];
    }

    return content;
  }

  function minutesAgo(n) {
    let date = new Date();
    date.setMinutes(date.getMinutes() - n);
    return date;
  }

  let themes = [
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "purple",
    "pink",
    "orange",
  ];
  let posts = [];

  for (let i = 0; i < amountOfPosts; i++) {
    let post = new Post();
    post.date = minutesAgo(getRandom(1, 2500));
    post.content = generateContent();
    post.theme = themes[getRandom(0, themes.length - 1)];
    posts.push(post);
  }

  user.posts.push(...posts);
  return user;
};

const makeFriends = function (users) {
  return new Promise(function (resolve, reject) {
    function loopThroughUsers(users) {
      function addEachOther(user1, user2) {
        function addFriend(user1, user2) {
          return new Promise(function (resolve, reject) {
            User.findById(user1, (err, user) => {
              if (err) {
                return reject("Error");
              }
              user.friends.push(user2);
              user.save((err) => {
                if (err) {
                  return reject("Error");
                }
                resolve();
              });
            });
          });
        }

        return new Promise(function (resolve, reject) {
          // Esto añade el user1 a la lista de amigos del user2
          let p1 = addFriend(user1, user2);

          // Esto añade el user1 a la lista de amigos del user2
          let p2 = addFriend(user2, user1);

          Promise.all([p1, p2]).then((val) => {
            resolve("Both friends have added each other.");
          });
        });
      }

      return new Promise(function (resolve, reject) {
        // Cuando el array sea 0, que se resuelva la promesa.
        if (users.length == 0) {
          return resolve();
        }

        let recursionPromise = loopThroughUsers(users.slice(1));

        let friendRequestPromises = [];
        for (let i = 1; i < users.length; i++) {
          // There is a 50% chance of a user adding a user as a friend.
          if (getRandom(0, 100) > 50) {
            friendRequest = addEachOther(users[0]._id, users[i]._id);
            friendRequestPromises.push(friendRequest);
          }
        }
        Promise.all([...friendRequestPromises, recursionPromise]).then(
          (val) => {
            resolve(val);
          }
        );
      });
    }
    loopThroughUsers(users).then(() => {
      resolve("Resolve makeFriends() Promise");
    });
  });
};

const createFakeUsers = function (req, res) {
  // Esta funcion creara 70 usuarios.

  function create70Users() {
    function create35Users(gender) {
      for (let i = 0; i < 35; i++) {
        let promise = new Promise(function (resolve, reject) {
          registerFakeUser(gender, `${gender}${i + 1}`).then((val) => {
            resolve(val);
          });
        });
        promises.push(promise);
      }
    }

    let promises = [];
    create35Users("f");
    create35Users("m");

    return new Promise(function (resolve, reject) {
      Promise.all(promises).then((val) => {
        resolve(val);
      });
    });
  }

  // Antes de crear los usuarios, borrar todos los existentes..
  let deleteUsers = new Promise(function (resolve, reject) {
    User.deleteMany({}, (err, info) => {
      if (err) {
        reject(info);
        return res.send({ error: err });
      }
      resolve(info);
    });
  });

  deleteUsers.then((val) => {
    create70Users().then((val) => {
      makeFriends(val).then((val) => {
        res.statusJson(201, { message: "Fake users creados" });
      });
    });
  });
};

module.exports = {
  createFakeUsers,
};
