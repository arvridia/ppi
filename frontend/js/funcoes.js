const integrantes = [
    { matricula: '12211BCC037', nome: 'Pedro Luiz Martins Simoni', descricao: 'Desenvolvedor Junior Backend, com as principais linguagens sendo Golang, Kotlin e JS.' },

    { matricula: '12121BCC041', nome: 'João Vitor Alves de Souza', descricao: 'Movido pela curiosidade e pela vontade de criar, estou trilhando meu caminho no mundo da tecnologia. Cada linha de código é um passo a mais rumo ao futuro que eu quero construir.' },

    { matricula: '12121BCC035', nome: 'Geovana Beatriz Ribeiro', descricao: 'Apaixonada por tecnologia e começando minha jornada para ser programadora, sempre com dedicação e carinho.' },

    { matricula: '12011BCC017', nome: 'Henrique Braga Alves Pereira', descricao: 'Engenheiro de Software Sênior especializado em arquiteturas de microsserviços e soluções escaláveis em nuvem.' },

    { matricula: '12011BCC020', nome: 'Arthur Resende Santos', descricao: 'Sou uma pessoa tranquila, curiosa e sempre disposta a aprender. Gosto de boas conversas, conexões reais e de evoluir um pouco todo dia.' },

    { matricula: '11721BCC022', nome: 'Victor Guilherme Oliveira Santos', descricao: 'Estudante de Ciência da Computação focado em back-end, desenvolvendo projetos pessoais com Node.js, e bancos de dados SQL/NoSQL.' },

    { matricula: '12121BCC038', nome: 'Juan Kristian Miranda', descricao: 'Motivado pela curiosidade sobre tecnologia e seu potencial gigantesco, estou construindo minha trajetória profissional focado em aprendizado contínuo e evolução' },
];

const fotosLista = [
    "imgs/pedro.png",    // 0
    "imgs/joao.png",     // 1
    "imgs/geovana.png",  // 2
    "imgs/henrique.png", // 3
    "imgs/arthur.png",   // 4
    "imgs/victor.png",   // 5
    "imgs/juan.png"      // 6
];

// Variável para controlar o número da foto
let numeroDaFoto = 0;

function exibirFoto() {
    const matricula = document.getElementById('matricula').value.trim().toUpperCase();
    const wrapper = document.getElementById('fotoWrapper');
    let html;

    
switch (matricula) {
        case '12211BCC037':
            numeroDaFoto = 0;
            html = '<img id="img-aluno" src="../imgs/pedro.png" onclick="proxima()" width="220">';
            break;

        case '12121BCC041':
            numeroDaFoto = 1;
            html = '<img id="img-aluno" src="../imgs/joao.png" onclick="proxima()" width="220">';
            break;

        case '12121BCC035':
            numeroDaFoto = 2;
            html = '<img id="img-aluno" src="../imgs/geovana.png" onclick="proxima()" width="220">';
            break;

        case '12011BCC017':
            numeroDaFoto = 3;
            html = '<img id="img-aluno" src="../imgs/henrique.png" onclick="proxima()" width="220">';
            break;

        case '12011BCC020':
            numeroDaFoto = 4;
            html = '<img id="img-aluno" src="../imgs/arthur.png" onclick="proxima()" width="220">';
            break;

        case '11721BCC022':
            numeroDaFoto = 5;
            html = '<img id="img-aluno" src="../imgs/victor.png" onclick="proxima()" width="220">';
            break;

        case '12121BCC038':
            numeroDaFoto = 6;
            html = '<img id="img-aluno" src="../imgs/juan.png" onclick="proxima()" width="220">';
            break;

        default:
            html = '<p>Matrícula não encontrada.</p>';
    }

    wrapper.innerHTML = html;
}





function atualizarDescricao() {
    const matricula = document.getElementById('matriculaPerfil').value.trim().toUpperCase();
    const sectionPerfil = document.getElementById('sectionPerfil');

    if (matricula === '') {
        alert('Informe uma matrícula.');
        return;
    }

    let integranteEncontrado = null;
    for (let i = 0; i < integrantes.length; i += 1) {
        if (integrantes[i].matricula === matricula) {
            integranteEncontrado = integrantes[i];
            break;
        }
    }

    if (integranteEncontrado) {
        sectionPerfil.innerHTML = `
            <h3>${integranteEncontrado.nome}</h3>
            <p>${integranteEncontrado.descricao}</p>
        `;
    } else {
        alert('Matrícula não encontrada.');
    }


}


function proxima() {
    // Aumenta o número
    numeroDaFoto++;

    // Se passar do total de fotos, volta para a 0
    if (numeroDaFoto >= fotosLista.length) {
        numeroDaFoto = 0;
    }

    // Pega a imagem pelo ID e troca o SRC baseada no número novo
    document.getElementById("img-aluno").src = fotosLista[numeroDaFoto];
}