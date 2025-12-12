document.addEventListener('DOMContentLoaded', function() {
    const formContainer = document.getElementById('form-container');
    if (!formContainer) return;

    const form = document.createElement('form');
    form.id = 'meu-formulario';
    form.style.backgroundColor = 'ghostwhite';
    form.style.border = '10px solid purple';
    form.style.padding = '20px';
    form.style.fontFamily = 'Arial, sans-serif';

    const title = document.createElement('h2');
    title.textContent = 'Formulário de Cadastro de Animal';
    form.appendChild(title);

    const fields = [
        { id: 'nome', label: 'Nome:', type: 'text', placeholder: 'Digite seu nome completo' },
        { id: 'email', label: 'Email:', type: 'email', placeholder: 'Digite seu email' },
        { id: 'telefone', label: 'Telefone:', type: 'tel', placeholder: '(XX) XXXXX-XXXX' },
        { id: 'nomeAnimal', label: 'Nome do Animal:', type: 'text', placeholder: 'Digite o nome do seu animal' },
        { id: 'racaAnimal', label: 'Raça do Animal:', type: 'text', placeholder: 'Digite a raça do seu animal' },
        { id: 'idadeAnimal', label: 'Idade do Animal:', type: 'number', placeholder: 'Digite a idade em anos' },
        { id: 'descricaoAnimal', label: 'Descrição do Animal:', type: 'text', placeholder: 'Descreva brevemente seu animal' }
    ];

    fields.forEach((fieldInfo, index) => {
        const label = document.createElement('label');
        label.htmlFor = fieldInfo.id;
        label.textContent = fieldInfo.label;
        label.style.display = 'block';
        label.style.marginTop = '10px';

        const input = document.createElement('input');
        input.type = fieldInfo.type;
        input.id = fieldInfo.id;
        input.name = fieldInfo.id;
        input.placeholder = fieldInfo.placeholder;
        input.required = true;
        input.style.width = 'calc(100% - 20px)';
        input.style.padding = '8px';
        input.style.marginTop = '5px';

        form.appendChild(label);
        form.appendChild(input);

        if (index === 0) {
            setTimeout(() => input.focus(), 0);
        }
    });

    const labelSelect = document.createElement('label');
    labelSelect.htmlFor = 'tipoAnimal';
    labelSelect.textContent = 'Tipo de Animal:';
    labelSelect.style.display = 'block';
    labelSelect.style.marginTop = '10px';
    form.appendChild(labelSelect);

    const select = document.createElement('select');
    select.id = 'tipoAnimal';
    select.name = 'tipoAnimal';
    select.required = true;
    select.style.width = '100%';
    select.style.padding = '8px';
    select.style.marginTop = '5px';

    const options = [
        { value: '', text: 'Selecione o tipo' },
        { value: 'cachorro', text: 'Cachorro' },
        { value: 'gato', text: 'Gato' },
        { value: 'passaro', text: 'Pássaro' },
        { value: 'peixe', text: 'Peixe' }
    ];

    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.text;
        if (opt.value === '') {
            option.disabled = true;
            option.selected = true;
        }
        select.appendChild(option);
    });
    form.appendChild(select);

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'Gerar Relatório';
    button.style.marginTop = '20px';
    button.style.padding = '10px 20px';
    button.style.backgroundColor = 'purple';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.cursor = 'pointer';

    button.addEventListener('click', function() {
        const reportContainer = document.getElementById('report-container');
        if (form.checkValidity()) {
            let reportHTML = '<h3>Relatório do Cadastro</h3>';
            const images = {
                cachorro: 'imgs2/cachorro.jpg',
                gato: 'imgs2/gato.jpg',
                passaro: 'imgs2/passaro.png',
                peixe: 'imgs2/peixe.png'
            };

            fields.forEach(field => {
                const inputElement = document.getElementById(field.id);
                reportHTML += `<p><strong>${inputElement.previousElementSibling.textContent}</strong> ${inputElement.value}</p>`;
            });

            const selectedAnimalType = select.value;
            reportHTML += `<p><strong>Tipo de Animal:</strong> ${select.options[select.selectedIndex].text}</p>`;
            
            if (images[selectedAnimalType]) {
                reportHTML += `<img src="${images[selectedAnimalType]}" alt="Imagem de ${selectedAnimalType}" style="max-width: 200px; margin-top: 10px;">`;
            }

            reportContainer.innerHTML = reportHTML;
            reportContainer.style.border = '2px solid purple';
            reportContainer.style.padding = '15px';
            reportContainer.style.marginTop = '20px';

        } else {
            reportContainer.innerHTML = '';
            reportContainer.style.border = 'none';
            alert('Por favor, preencha todos os campos obrigatórios.');
            // mostra campos invalidos ou em branco
            Array.from(form.elements).forEach(el => {
                if (!el.checkValidity()) {
                    el.style.border = '2px solid red';
                } else {
                    el.style.border = '';
                }
            });
        }
    });

    form.appendChild(document.createElement('br'));
    form.appendChild(button);
    formContainer.appendChild(form);
});
