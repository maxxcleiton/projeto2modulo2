import dotenv from "dotenv"; // rodar dotenv 1/2

import express from "express" // importando o express
import path from 'path' // serve para definir o caminho padrao
const __dirname = path.resolve(path.dirname('')) // __dirname serve para informar qual é o caminho padrão da minha pasta

dotenv.config(); // rodar dotenv 2/2

console.log(__dirname)
const app = express() // instanciando o express dentro da const app
app.use(express.urlencoded({extended: true})) // Informacao vai para o body (o corpo da requisicao)
app.use(express.json())

app.set("view engine", "ejs") // express reconheça o ejs da pasta views
app.use(express.static(path.join(__dirname, "public")))

const port = process.env.PORT || 3001
app.listen(port, () => { // listen é uma funcao do express pra criar servidor
    console.log(`Rodando na porta ${port}`)
})

//

let pokedex = [
    {
        id: 1,
        nome: 'Pikachu',
        tipo: 'Elétrico',
        imagem: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
        descricao: 'Pikachu que pode gerar eletricidade poderosa tem bolsas nas bochechas que são extra macias e super elásticas.',
        altura: 1.4,
        peso: 6,
        categoria: 'Rato Elétrico',
        habilidade: 'Estático',
    }, 
    {
        id: 2,
        nome: 'Charmander',
        tipo: 'Fogo',
        imagem: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
        descricao: 'Tem preferência por coisas quentes. Quando chove, diz-se que o vapor jorra da ponta de sua cauda.',
        altura: 0.6,
        peso: 8.5,
        categoria: 'Lagarto',
        habilidade: 'Chama',
    }, 
    {
        id: 3,
        nome: 'Squirtle',
        tipo: 'Água',
        imagem: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
        descricao: 'Quando retrai seu longo pescoço em sua concha, esguicha água com força vigorosa.',
        altura: 0.5,
        peso: 9,
        categoria: 'Tartaruga',
        habilidade: 'Corrente de água',
    },
];

//

app.get('/', (req, res) => { // get é um método http/https que serve para trazer uma pagina

    res.render('index.ejs', {
        pokedex,
    });
})

app.get('/detalhes/:id', (req, res) => { // get é um método http/https que serve para trazer uma pagina
    let poke = []
    pokedex.filter((element) => {
        if(element.id == req.params.id) {
            poke.push(element)
        }
    })
    console.log(poke)
    
    res.render('detalhes.ejs', {
        poke,
        pokedex,
    })
})

app.get('/cadastro', (req, res) => { // get é um método http/https que serve para trazer uma pagina
    res.render('cadastro.ejs', {
    })
})

// Existem dois methods possíveis:
// GET METHOD ROUTE
app.get('/', (req,res) => {
    res.send('GET request to the homepage');
});

// POST METHOD ROUTE
app.post('/cadastro', (req,res) => {
    let i = pokedex[pokedex.length-1].id + 1;

    const { nome, tipo, imagem, descricao, altura, peso, categoria, habilidade, } = req.body;
    pokedex.push({ id: i, nome, tipo, imagem, descricao, altura, peso, categoria, habilidade,});
    console.log(pokedex);
    res.redirect("/");
});