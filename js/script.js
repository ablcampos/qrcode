
// const url = 'http://213.218.234.164:9000/';
const url = 'https://api.procampos.com.br/';
//const url = 'http://142.4.193.48:9000/';
// const url = 'https://api.jarb.com.br/';
const username = '12345';
const password = '12345';
const headers = new Headers();// Montar cabeçalho de autenticação
const pagina = document.getElementById('quem-somos');
const pagina1 = document.getElementById('inicial');

if (pagina1){           
    const botao = document.getElementById('myButton');
    botao.addEventListener('click', () => {
      abrirPagina('Enter');  
    });
}  

window.onload = function() {
   
    if (pagina1){           
        const datalist = document.getElementById('listaPessoas');
        const input = document.getElementById('pessoas');
        datalist.innerHTML = ''; // Limpa as opções
        input.value = '';        // Limpa o campo de input
    }  
};

function limparDatalist() {  
    document.getElementById('listaPessoas').innerHTML = '';
}

function abrirPagina(event) {
    
    if (event.key === "Enter" || event === "Enter") {         

        const entrada = document.getElementById('pessoas').value;
        const opcoes = document.querySelectorAll('#listaPessoas option');

        let url = '';

        opcoes.forEach(opcao => {
            if (opcao.value === entrada) {
                url = opcao.getAttribute('data-url');
            }
        });
        
        if (url) {
            window.open(url, '_blank');
            document.getElementById('formulario').reset();

            // Limpa o datalist após abrir a página
            document.getElementById('listaPessoas').innerHTML = '';
        } else {
            alert('Opção não encontrada!');
        }
    }
}

const input = document.getElementById('pessoas');
    
async function carregarPessoas(filtro) {      
      const url2 = url+`pessoa?nome=${encodeURIComponent(filtro)}`;

      headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

      try {
        const response = await fetch(url2, { headers });

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
        }

        const dados = await response.json();

        const datalist = document.getElementById('listaPessoas');
        datalist.innerHTML = ''; // Limpa qualquer dado anterior 

        dados.forEach(pessoa => {
          var option = document.createElement('option');
          option.value = `${pessoa.idcli} - ${pessoa.nome}`;
          option.setAttribute('data-url', "inumado.html?codigo="+ `${pessoa.idcli}`);
          datalist.appendChild(option);                        
        });

      } catch (erro) {
        console.error('Erro ao carregar pessoas:', erro);
      }
}
        
    if (pagina1){   
        input.addEventListener('input', (event) => {
          const valor = event.target.value.trim();
          if (valor.length > 3) {
              carregarPessoas(valor);
          } else {
            limparDatalist();
          }
        });      
      }    

//************************************************************************************************************************************** */      
// SCRIPT PARA QUEM SOMOS APENAS *****************************************************************************************************
//************************************************************************************************************************************** */      

// Executa a função quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', funcaoInicial);
 

function funcaoInicial() {
    
      if (pagina){           
          if (pagina.getAttribute('id')==='quem-somos') {
            location.hash = '#openModal';                
          } 
      }
}
// ***********************************************************
// ***********************************************************
// BAIXA JSOM INUMADO
// ***********************************************************
// ***********************************************************   
function baixaJsonInumado(vlCodigo){
 
  headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

  // Fetch na API
  fetch(url+'pessoa/'+vlCodigo, { method: 'GET', headers: headers })
      .then(response => {
          if (!response.ok) {
              throw new Error('Erro na API: ' + response.status);
          }
          return response.json();
      })
      .then(data => {
          // Preencher os elementos HTML
           data2    = new Date(data.nasci);
           dataNasc = data2.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
           data2    = new Date(data.fales);
           dataFale = data2.toLocaleDateString('pt-BR', {timeZone: 'UTC'});
           data.obs = 'A era digital é um período de grande transformação e inovação, trazendo consigo uma série de oportunidades e desafios. Uma das principais importâncias da era digital é a capacidade de conectar pessoas e comunidades em todo o mundo, permitindo a troca de informações e ideias de forma rápida e eficiente.'+
           'A inteligência artificial (IA) é uma das principais tecnologias da era digital, permitindo que máquinas e sistemas aprendam e se adaptem às necessidades dos usuários. A IA tem aplicações em diversas áreas, desde a assistência virtual até a análise de dados complexos, melhorando a eficiência e a precisão em muitos setores.'+
           'No entanto, a era digital também traz desafios, como o cyberbullying. O cyberbullying é uma forma de assédio e intimidação que ocorre online, podendo ter consequências graves para a saúde mental e emocional das vítimas. É fundamental que sejam implementadas medidas para prevenir e combater o cyberbullying, protegendo os usuários e promovendo um ambiente online seguro.'+
           'Outro desafio importante da era digital é a disseminação de fake news. As notícias falsas podem ter consequências graves, desde a manipulação de opiniões públicas até a propagação de informações erradas. É essencial que os usuários sejam críticos e verificadores das informações que consomem online, e que as fontes de notícias sejam transparentes e confiáveis.'+
           'A segurança e o controle também são fundamentais na era digital. Com a crescente dependência da tecnologia, é importante proteger os dados pessoais e garantir a segurança online. Isso inclui a implementação de medidas de segurança robustas, como a autenticação de dois fatores e a criptografia de dados.'+
           'Em resumo, a era digital é um período de grande oportunidade e desafio. Com a inteligência artificial, a conexão global e a troca de informações, é possível criar um futuro mais eficiente e conectado. No entanto, é fundamental abordar os desafios do cyberbullying, das fake news e da segurança online para garantir que a era digital seja um período de progresso e inovação para todos.';

           document.getElementById('breveHistoria').innerText = data.texto;
           document.getElementById('nomeFales').innerText = data.nome;
           document.getElementById('nasci').innerText = '✨ ' +  dataNasc;
        //    document.getElementById('fales').innerText = '✝️ ' + dataFale;
           document.getElementById('historia').innerText = data.obs;


          // Se a foto vier com o prefixo correto
          if (data.foto.startsWith('data:image')) {
              document.getElementById('foto').src = data.foto;
          } else {
              // Caso venha só o base64 puro, adiciona o prefixo
              document.getElementById('foto').src = 'data:image/jpeg;base64,' + data.foto;
          }           
      })
      .catch(error => {
          console.error('Erro ao buscar dados da API:', error);
          alert('Erro ao carregar dados. Verifique a conexão com a API.');
      });
}
// ***********************************************************
// ***********************************************************
// BAIXA JSOM    F O T O 
// ***********************************************************
// *********************************************************** 
function baixaJsonFoto(vlCodigo){
   
    headers.set('Authorization', 'Basic ' + btoa(username + ':' + password));

    fetch(url+'foto/'+vlCodigo, { method: 'GET', headers: headers })
        .then(response => {
            if (!response.ok) {
               console.log('Erro na API: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            const galeria = document.getElementById('galeria');
            galeria.innerHTML = ''; // Limpa o conteúdo anterior

            if (Array.isArray(data) && data.length > 0) {
                data.forEach(item => {
                    const img = document.createElement('img');
                    img.src = 'data:image/jpeg;base64,' + item.foto;
                    img.alt = 'Foto';
                    img.classList.add('foto-galeria'); // Classe CSS para estilizar
                    galeria.appendChild(img);
                });
            } else {
                console.error('Nenhuma foto encontrada no JSON');
                galeria.innerHTML = '<p>Nenhuma foto disponível.</p>';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados da API:', error);
            alert('Erro ao carregar dados. Verifique a conexão com a API.');
        });
}


const audio = document.getElementById('musica');
  
  if (audio){           
     
    function liberarAudio() {
         audio.play();
    }   
  }   


if(pagina){    
    var permitirAudio = document.querySelector('#permitir');
    var negarAudio = document.querySelector('#negar');

    permitirAudio.addEventListener('click', function (event) { 
        const audio = document.getElementById('musica');
        liberarAudio()
        location.href='#close';  /*executa o fechar la do html */
    });

    negarAudio.addEventListener('click', function (event) { 
        location.href='#close';  /*executa o fechar la do html */
    });
     // Abre automaticamente o modal de aviso
    location.hash = '#openModal';
    
    const parametros = new URLSearchParams(window.location.search);
    const codigo = parametros.get('codigo');
    baixaJsonInumado(codigo);
    baixaJsonFoto(codigo); 
}
