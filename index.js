import express from "express" // importando o express
import path from 'path' // serve para definir o caminho padrao
const __dirname = path.resolve(path.dirname('')) // __dirname serve para informar qual é o caminho padrão da minha pasta

console.log(__dirname)
const app = express() // instanciando o express dentro da const app

app.set("view engine", "ejs") // express reconheça o ejs da pasta views
app.use(express.static(path.join(__dirname, "public")))

const port = 3001
app.listen(port, () => { // listen é uma funcao do express pra criar servidor
    console.log(`Rodando na porta ${port} rsr22s`)
})

//

let message = "";

let pokedex = [
    {
        Número: 1,
        Nome: 'Pikachu',
        Tipo: 'Elétrico',
        Imagem: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png',
        Descrição: 'Pikachu que pode gerar eletricidade poderosa tem bolsas nas bochechas que são extra macias e super elásticas.',
        Altura: 1.4,
        Peso: 6,
        Categoria: 'Rato Elétrico',
        Habilidade: 'Estático',
    }, 
    {
        Número: 2,
        Nome: 'Charmander',
        Tipo: 'Fogo',
        Imagem: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png',
        Descrição: 'Tem preferência por coisas quentes. Quando chove, diz-se que o vapor jorra da ponta de sua cauda.',
        Altura: 0.6,
        Peso: 8.5,
        Categoria: 'Lagarto',
        Habilidade: 'Chama',
    }, 
    {
        Número: 3,
        Nome: 'Squirtle',
        Tipo: 'Água',
        Imagem: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png',
        Descrição: 'Quando retrai seu longo pescoço em sua concha, esguicha água com força vigorosa.',
        Peso: 9,
        Categoria: 'Tartaruga',
        Habilidade: 'Corrente de água',
    }
];

//

app.get('/', (req, res) => { // get é um método http/https que serve para trazer uma pagina
    res.render('index.ejs', {
        pokedex
    })
})

app.get('/detalhes', (req, res) => { // get é um método http/https que serve para trazer uma pagina
    res.render('detalhes.ejs')
})

app.get('/cadastro', (req, res) => { // get é um método http/https que serve para trazer uma pagina
    res.render('cadastro.ejs', {
        message,
    })
})

//

// GET METHOD ROUTE
app.get('/', (req,res) => {
    res.send('GET request to the homepage');
});

// POST METHOD ROUTE
app.post('/', (req,res) => {
    res.send('POST request to the homepage')
});


// Isso aqui sempre antes do post mais pra frente
app.use(express.urlencoded());

// Tudo do formulário eu preciso organizar o json:
// app.post('/subscription', (req,res) => {
//     const { nome, email } = req.body;
//     res.send({ nome: nome, email: email });
// });

// Aqui é a versao adicionando mensagem estilizada de resposta
app.post('/subscription', (req, res) => {
    const { nome, email } = req.body;
    message = `Parabéns ${nome}, sua incrição foi realizada com sucesso! Um e-mail foi enviado para: ${email}`;
    res.redirect('/cadastro');
});