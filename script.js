const containerPersogens = document.querySelector('#personagens')
let url = "https://rickandmortyapi.com/api/character?page=1"

async function carregarPersonagens(link){
    const request = await fetch(link)
    const response = await request.json()
    const lista = response.results
    
    for(let i = 0; i <= lista.length - 1; i++){
        criarCard(lista[i])
    }
}

async function next(){
    const request = await fetch(url)
    const response = await request.json()
    const lista = response.info.next
    return lista
}

function criarCard(lista){
    const div_card_personagem = document.createElement('div')
    const img_personagem = document.createElement('img')
    const div_card_infos = document.createElement('div')
    const p_especie = document.createElement('p')
    const p_genero = document.createElement('p')
    const div_infos_adicional_1 = document.createElement('div')
    const div_infos_adicional_2 = document.createElement('div')

    img_personagem.src = lista.image
    img_personagem.alt = `Imagem do personagem ${lista.name}`
    div_card_personagem.appendChild(img_personagem)

    const infos_adicional_1_h4 = document.createElement('h4')
    const infos_adicional_1_p = document.createElement('p')
    infos_adicional_1_h4.textContent = "Nome:"
    infos_adicional_1_p.textContent = lista.name
    div_infos_adicional_1.appendChild(infos_adicional_1_h4)
    div_infos_adicional_1.appendChild(infos_adicional_1_p)
    div_infos_adicional_1.classList.add('card-infos-adicional')
    
    p_especie.textContent = lista.species
    
    p_genero.textContent = lista.gender
    
    const infos_adicional_2_h4 = document.createElement('h4')
    const infos_adicional_2_p = document.createElement('p') 
    infos_adicional_2_h4.textContent = "Localização:"
    infos_adicional_2_p.textContent = lista.origin.name
    div_infos_adicional_2.appendChild(infos_adicional_2_h4)
    div_infos_adicional_2.appendChild(infos_adicional_2_p)
    div_infos_adicional_2.classList.add('card-infos-adicional')
    
    div_card_infos.appendChild(div_infos_adicional_1)
    div_card_infos.appendChild(p_especie)
    div_card_infos.appendChild(p_genero)
    div_card_infos.appendChild(div_infos_adicional_2)
    div_card_infos.classList.add('card-infos')

    div_card_personagem.appendChild(img_personagem)
    div_card_personagem.appendChild(div_card_infos)
    div_card_personagem.classList.add('card-personagem')

    containerPersogens.appendChild(div_card_personagem)
}

function carregarBotao(link){
    const button = document.createElement('button')
    button.id = "carregar_mais"
    button.textContent = "Carregar mais"
    
    document.body.appendChild(button)
    button.addEventListener('click', async ()=>{
        const nova_url = await next(url)
        url = nova_url
        carregarPersonagens(url)
    })
}

carregarPersonagens(url)
carregarBotao()