/// modal para cadastro de recados
const openModal = () => document.getElementById('modal')
    .classList.add('active')

const closeModal = () => {
    clearFields()
    document.getElementById('modal').classList.remove('active')

}
/////////////////////////////////////////////////////////
//Variaveis para inserção e busca dos dados inseridos.
/*const tempRecados = {
//
    desc: 'Maria',
    detalhe: 'teste de inserção dos dados Rodrigo'
}*/
const getLocalSttorage = () => JSON.parse(localStorage.getItem('db_recados')) ?? []// função para verificar se o localStorage esta vasio

const setLocalStorae = (dbRecados) => localStorage.setItem('db_recados', JSON.stringify(dbRecados))

const readRecado = () => getLocalSttorage()


const delRecados = (index) => {
    const dbRecados = readRecado()
    dbRecados.splice(index, 1)
    setLocalStorae(dbRecados)
}
/// Editando os Recados

const updateRecados = (index, recados) => {
    const dbRecado = readRecado()
    dbRecado[index] = recados
    setLocalStorae(dbRecado)
}
const isValidFilds = () => {
    return document.getElementById('form').reportValidity()

}
///Criando Recados
const createRecado = (recados) => {
    const dbRecados = getLocalSttorage()
    dbRecados.push(recados)
    setLocalStorae(dbRecados)
}
/// interação com layput
const clearFields = () => {
    const fields = document.querySelectorAll('.modal-field')
    fields.forEach(field => field.value = '')
}
/// Salvando Recados
const saveRecado = () => {
    if (isValidFilds()) {
        const recado = {
            desc: document.getElementById('desc').value,
            detal: document.getElementById('detal').value

        }
        const index = document.getElementById('desc').dataset.index
        if (index == 'new') {
            createRecado(recado)
            updateTable()
            closeModal()
        } else {
            updateRecados(index, recado)
            updateTable()
            closeModal()
            document.getElementById("desc").dataset.index = 'new';
        }
    }
}
//Criando Lista de recados
const createRow = (recados, index) => {
    const newRow = document.createElement('tr')
    newRow.innerHTML = ` 
    <td>${recados.desc}</td>
    <td>${recados.detal}</td>
    <td>
        <button type="button" class="button green" id='edit-${index}'>Editar</button>
        <button type="button" class="button red"id='delete-${index}'>Excluir</button>
    </td>`
    document.querySelector('#tbRecados>tbody').appendChild(newRow)
}
const clearTable = () => {
    const rows = document.querySelectorAll('#tbRecados>tbody tr')
    rows.forEach(row => row.parentNode.removeChild(row))

}
const updateTable = () => {
    const dbRecados = readRecado()
    clearTable()
    dbRecados.forEach(createRow)

}
updateTable()
const fillFields = (recados) => {
    document.getElementById('desc').value = recados.desc
    document.getElementById('detal').value = recados.detal
    document.getElementById('desc').dataset.index = recados.index
}

/// Editar Recados
const editRecados = (index) => {
    const recados = readRecado()[index]
    recados.index = index
    fillFields(recados)
    updateTable()
    openModal()

}
const editDelete = (event) => {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')

        if (action == 'edit') {
            editRecados(index)
        } else {
            const recado = readRecado()[index]
            const response = confirm(`Deseja realmente excluir o recado  ${recado.desc} ?`)
            if (response) {
                delRecados(index)
                updateTable()
            }

        }
    }
}
/////////////////////////////////////////////////////
// eventos que sobrepoem o cadastro    
document.getElementById('cadastrarRecados')
    .addEventListener('click', openModal)

document.getElementById('modalClose')
    .addEventListener('click', closeModal)
document.getElementById('salvar')
    .addEventListener('click', saveRecado)

document.querySelector('#tbRecados>tbody')
    .addEventListener('click', editDelete)   