// Chave de armazenamento para o Local Storage
const STORAGE_KEY = 'eap_app_data';

// Dados do aplicativo (Insumos, Composições e EAPs)
let data = {
    insumos: [],
    composicoes: [],
    eaps: []
};

// Elementos do DOM
const insumoList = document.getElementById('insumos-list');
const composicaoList = document.getElementById('composicoes-list');
const eapList = document.getElementById('eap-list');
const insumoNomeInput = document.getElementById('insumo-nome');
const insumoUnidadeInput = document.getElementById('insumo-unidade');
const insumoCustoInput = document.getElementById('insumo-custo');
const composicaoNomeInput = document.getElementById('composicao-nome');
const composicaoUnidadeInput = document.getElementById('composicao-unidade');
const eapNomeInput = document.getElementById('eap-nome');
const eapBomSelect = document.getElementById('eap-bom-select');

// Variáveis para gráficos
let pieChart, abcChart;

// Funções para manipulação dos dados e UI

// Função para gerar um ID único
function generateId(prefix) {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Função para salvar os dados no Local Storage
function saveData() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Função para carregar os dados do Local Storage
function loadData() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
        data = JSON.parse(storedData);
    }
}

// Função para mostrar uma mensagem em um modal customizado
function showMessage(message) {
    const modal = document.getElementById('message-modal');
    document.getElementById('message-text').innerText = message;
    modal.classList.remove('oculto');
    modal.classList.add('flex');
    document.getElementById('close-modal-btn').onclick = () => {
        modal.classList.add('oculto');
        modal.classList.remove('flex');
    };
}

// Adicionar um novo insumo
document.getElementById('add-insumo-btn').addEventListener('click', () => {
    const nome = insumoNomeInput.value.trim();
    const unidade = insumoUnidadeInput.value.trim();
    const custo = parseFloat(insumoCustoInput.value);

    if (!nome || !unidade || isNaN(custo)) {
        showMessage('Por favor, preencha todos os campos do insumo corretamente.');
        return;
    }

    data.insumos.push({
        id: generateId('insumo'),
        nome,
        unidade,
        custo
    });

    saveData();
    renderUI();
    clearInsumoInputs();
});

// Limpar inputs de insumos
function clearInsumoInputs() {
    insumoNomeInput.value = '';
    insumoUnidadeInput.value = '';
    insumoCustoInput.value = '';
}

// Adicionar uma nova composição
document.getElementById('add-composicao-btn').addEventListener('click', () => {
    const nome = composicaoNomeInput.value.trim();
    const unidade = composicaoUnidadeInput.value.trim();

    if (!nome || !unidade) {
        showMessage('Por favor, preencha o nome e a unidade da composição.');
        return;
    }

    data.composicoes.push({
        id: generateId('composicao'),
        nome,
        unidade,
        items: []
    });

    saveData();
    renderUI();
    clearComposicaoInputs();
});

// Limpar inputs de composições
function clearComposicaoInputs() {
    composicaoNomeInput.value = '';
    composicaoUnidadeInput.value = '';
}

// Adicionar EAP principal
document.getElementById('add-eap-btn').addEventListener('click', () => {
    const nome = eapNomeInput.value.trim();
    if (!nome) {
        showMessage('Por favor, insira o nome da EAP principal.');
        return;
    }
    data.eaps.push({
        id: generateId('eap'),
        nome,
        items: [],
        children: []
    });
    saveData();
    renderUI();
    eapNomeInput.value = '';
});

// Renderizar a lista de insumos e composições na UI
function renderUI() {
    renderInsumos();
    renderComposicoes();
    renderEAP();
    updateExportOptions();
    updateCharts();
    updateTotalCost();
}

// Renderizar a seção de insumos
function renderInsumos() {
    insumoList.innerHTML = '';
    data.insumos.forEach(insumo => {
        const itemEl = document.createElement('div');
        itemEl.className = 'flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 bg-gray-100 p-4 rounded-lg';
        itemEl.innerHTML = `
            <p class="flex-1 font-medium text-gray-900">${insumo.nome} (${insumo.unidade})</p>
            <p class="flex-1 text-gray-700">R$ ${insumo.custo.toFixed(2)}</p>
            <button class="button-secondary text-red-600 border border-red-600 hover:bg-red-100" onclick="removeInsumo('${insumo.id}')">Remover</button>
        `;
        insumoList.appendChild(itemEl);
    });
}

// Remover insumo
window.removeInsumo = function(id) {
    data.insumos = data.insumos.filter(insumo => insumo.id !== id);
    saveData();
    renderUI();
};

// Renderizar a seção de composições
function renderComposicoes() {
    composicaoList.innerHTML = '';
    data.composicoes.forEach(composicao => {
        const composicaoEl = document.createElement('div');
        composicaoEl.className = 'bg-gray-100 p-4 rounded-xl space-y-4';
        
        const totalCusto = calcularCustoComposicao(composicao.id);
        
        composicaoEl.innerHTML = `
            <div class="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                <p class="flex-1 font-bold text-lg text-gray-900">${composicao.nome} (${composicao.unidade})</p>
                <p class="font-bold text-lg text-green-600">Total: R$ ${totalCusto.toFixed(2)}</p>
                <button class="button-secondary text-red-600 border border-red-600 hover:bg-red-100" onclick="removeComposicao('${composicao.id}')">Remover</button>
            </div>
            
            <div id="composicao-items-${composicao.id}" class="space-y-2 pl-4 border-l-2 border-gray-300">
                </div>

            <div class="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 pl-4 mt-4">
                <select id="item-select-${composicao.id}" class="flex-1 border border-gray-300 rounded-lg p-2">
                    <option value="">-- Selecione um item --</option>
                    ${data.insumos.map(i => `<option value="${i.id}">Insumo: ${i.nome}</option>`).join('')}
                    ${data.composicoes.filter(c => c.id !== composicao.id).map(c => `<option value="${c.id}">Composição: ${c.nome}</option>`).join('')}
                </select>
                <input type="number" id="item-quantidade-${composicao.id}" placeholder="Quantidade" step="0.01" class="w-full md:w-32 border border-gray-300 rounded-lg p-2">
                <button class="button-primary w-full md:w-auto" onclick="addItemToComposicao('${composicao.id}')">Adicionar Item</button>
            </div>
        `;

        const itemsListEl = composicaoEl.querySelector(`#composicao-items-${composicao.id}`);
        composicao.items.forEach((item, index) => { // Adicionada a variável 'index'
            const itemData = findItem(item.id);
            if (itemData) {
                const itemCost = itemData.custo ? itemData.custo : calcularCustoComposicao(item.id);
                const itemTotal = item.quantidade * itemCost;
                const itemType = item.id.startsWith('insumo') ? 'Insumo' : 'Composição';
                const itemEl = document.createElement('div');
                itemEl.className = 'flex items-center space-x-2';
                itemEl.innerHTML = `
                    <p class="flex-1 text-sm text-gray-700">${itemType}: ${itemData.nome} - Qtd: ${item.quantidade} - Custo: R$ ${itemTotal.toFixed(2)}</p>
                    <button class="text-red-500 hover:text-red-700 text-sm" onclick="removeItemFromComposicao('${composicao.id}', ${index})">Remover</button>
                `;
                itemsListEl.appendChild(itemEl);
            }
        });
        
        composicaoList.appendChild(composicaoEl);
    });
}

// Remover composição
window.removeComposicao = function(id) {
    data.composicoes = data.composicoes.filter(c => c.id !== id);
    saveData();
    renderUI();
};

// Adicionar um item a uma composição
window.addItemToComposicao = function(composicaoId) {
    const selectEl = document.getElementById(`item-select-${composicaoId}`);
    const quantidadeEl = document.getElementById(`item-quantidade-${composicaoId}`);
    const itemId = selectEl.value;
    const quantidade = parseFloat(quantidadeEl.value);

    if (!itemId || isNaN(quantidade) || quantidade <= 0) {
        showMessage('Por favor, selecione um item e insira uma quantidade válida.');
        return;
    }
    
    const composicao = data.composicoes.find(c => c.id === composicaoId);
    if (composicao) {
        composicao.items.push({ id: itemId, quantidade });
    }
    
    saveData();
    renderUI();
};

// Remover item de uma composição
window.removeItemFromComposicao = function(composicaoId, itemIndex) {
    const composicao = data.composicoes.find(c => c.id === composicaoId);
    if (composicao) {
        composicao.items.splice(itemIndex, 1);
        saveData();
        renderUI();
    }
};

// Renderizar a seção da EAP
function renderEAP() {
    eapList.innerHTML = '';
    data.eaps.forEach(eap => renderEAPNode(eap, eapList));
}

// Renderizar um nó da EAP de forma recursiva
function renderEAPNode(node, parentEl, level = 0) {
    const nodeEl = document.createElement('div');
    nodeEl.className = `p-4 rounded-lg space-y-4 ${level > 0 ? 'eap-item-container' : 'bg-gray-100'}`;
    
    const totalCusto = calcularCustoEAP(node.id);

    const title = `
        <div class="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
            <p class="flex-1 font-bold text-lg text-gray-900">${node.nome}</p>
            <p class="font-bold text-lg text-green-600">Total: R$ ${totalCusto.toFixed(2)}</p>
            <div class="flex space-x-2">
                <button class="button-secondary text-sm" onclick="showAddItemModal('${node.id}')">Adicionar Item</button>
                <button class="button-secondary text-sm" onclick="addEAPChild('${node.id}')">Adicionar Sub-EAP</button>
                <button class="button-secondary text-red-600 border border-red-600 hover:bg-red-100 text-sm" onclick="removeEAP('${node.id}')">Remover</button>
            </div>
        </div>
    `;
    nodeEl.innerHTML = title;

    // Renderizar itens do nó atual
    const itemsListEl = document.createElement('div');
    itemsListEl.className = 'space-y-2 pl-4 border-l-2 border-gray-300 mt-4';
    node.items.forEach((item, index) => { // Adicionada a variável 'index'
        const itemData = findItem(item.id);
        if (itemData) {
            const itemCost = itemData.custo ? itemData.custo : calcularCustoComposicao(item.id);
            const itemTotal = item.quantidade * itemCost;
            const itemType = item.id.startsWith('insumo') ? 'Insumo' : 'Composição';
            const itemEl = document.createElement('div');
            itemEl.className = 'flex items-center space-x-2';
            itemEl.innerHTML = `
                <p class="flex-1 text-sm text-gray-700">${itemType}: ${itemData.nome} - Qtd: ${item.quantidade} - Custo: R$ ${itemTotal.toFixed(2)}</p>
                <button class="text-red-500 hover:text-red-700 text-sm" onclick="removeItemFromEAP('${node.id}', ${index})">Remover</button>
            `;
            itemsListEl.appendChild(itemEl);
        }
    });
    nodeEl.appendChild(itemsListEl);
    
    parentEl.appendChild(nodeEl);

    // Renderizar filhos recursivamente
    const childrenEl = document.createElement('div');
    childrenEl.className = 'space-y-4';
    node.children.forEach(child => renderEAPNode(child, childrenEl, level + 1));
    nodeEl.appendChild(childrenEl);
}

// Adicionar um sub-EAP
window.addEAPChild = function(parentId) {
    const newName = prompt("Insira o nome da nova sub-EAP:");
    if (newName) {
        const parentNode = findEAPNode(data.eaps, parentId);
        if (parentNode) {
            parentNode.children.push({
                id: generateId('eap'),
                nome: newName,
                items: [],
                children: []
            });
            saveData();
            renderUI();
        }
    }
};

// Encontrar um nó da EAP de forma recursiva
function findEAPNode(nodes, id) {
    for (const node of nodes) {
        if (node.id === id) {
            return node;
        }
        const found = findEAPNode(node.children, id);
        if (found) {
            return found;
        }
    }
    return null;
}

// Remover EAP (nó e seus filhos)
window.removeEAP = function(id) {
    function removeNode(nodes, idToRemove) {
        return nodes.filter(node => {
            if (node.id === idToRemove) {
                return false;
            }
            node.children = removeNode(node.children, idToRemove);
            return true;
        });
    }
    data.eaps = removeNode(data.eaps, id);
    saveData();
    renderUI();
};

// Mostrar modal para adicionar item na EAP
window.showAddItemModal = function(eapId) {
    const modal = document.getElementById('add-item-modal');
    const selectEl = document.getElementById('item-to-add-select');
    const quantidadeEl = document.getElementById('item-to-add-quantidade');
    const eapModalTitle = document.getElementById('eap-modal-title');
    
    const eapNode = findEAPNode(data.eaps, eapId);
    eapModalTitle.innerText = `Adicionando item para: ${eapNode.nome}`;

    selectEl.innerHTML = '<option value="">-- Selecione um item --</option>';
    data.insumos.forEach(i => {
        const opt = document.createElement('option');
        opt.value = i.id;
        opt.innerText = `Insumo: ${i.nome}`;
        selectEl.appendChild(opt);
    });
    data.composicoes.forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id;
        opt.innerText = `Composição: ${c.nome}`;
        selectEl.appendChild(opt);
    });

    quantidadeEl.value = '';
    
    document.getElementById('confirm-add-item-btn').onclick = () => {
        const itemId = selectEl.value;
        const quantidade = parseFloat(quantidadeEl.value);
        if (!itemId || isNaN(quantidade) || quantidade <= 0) {
            showMessage('Por favor, selecione um item e insira uma quantidade válida.');
            return;
        }
        
        const node = findEAPNode(data.eaps, eapId);
        if (node) {
            node.items.push({ id: itemId, quantidade });
            saveData();
            renderUI();
            modal.classList.add('oculto');
            modal.classList.remove('flex');
        }
    };
    
    document.getElementById('cancel-add-item-btn').onclick = () => {
        modal.classList.add('oculto');
        modal.classList.remove('flex');
    };

    modal.classList.remove('oculto');
    modal.classList.add('flex');
};

// Remover item de uma EAP
window.removeItemFromEAP = function(eapId, itemIndex) {
    const eapNode = findEAPNode(data.eaps, eapId);
    if (eapNode) {
        eapNode.items.splice(itemIndex, 1);
        saveData();
        renderUI();
    }
};

// Encontrar um item (insumo ou composição) pelo ID
function findItem(id) {
    const insumo = data.insumos.find(i => i.id === id);
    if (insumo) return insumo;
    return data.composicoes.find(c => c.id === id);
}

// Calcular o custo total de uma composição (função recursiva)
function calcularCustoComposicao(composicaoId, visited = new Set()) {
    if (visited.has(composicaoId)) {
        return 0; // Previne loops infinitos
    }
    
    const composicao = data.composicoes.find(c => c.id === composicaoId);
    if (!composicao) return 0;
    
    visited.add(composicaoId);
    
    let totalCusto = 0;
    for (const item of composicao.items) {
        const { id, quantidade } = item;
        let itemCusto = 0;
        
        if (id.startsWith('insumo')) {
            const insumo = data.insumos.find(i => i.id === id);
            if (insumo) {
                itemCusto = insumo.custo;
            }
        } else if (id.startsWith('composicao')) {
            itemCusto = calcularCustoComposicao(id, visited);
        }
        
        totalCusto += itemCusto * quantidade;
    }
    
    visited.delete(composicaoId);
    return totalCusto;
}

// Calcular o custo total de uma EAP (função recursiva)
function calcularCustoEAP(eapId) {
    const eapNode = findEAPNode(data.eaps, eapId);
    if (!eapNode) return 0;

    let totalCusto = 0;
    // Custo dos itens
    for (const item of eapNode.items) {
        let itemCusto = 0;
        if (item.id.startsWith('insumo')) {
            const insumo = data.insumos.find(i => i.id === item.id);
            if (insumo) itemCusto = insumo.custo;
        } else { // É uma composição
            itemCusto = calcularCustoComposicao(item.id);
        }
        totalCusto += itemCusto * item.quantidade;
    }

    // Custo dos filhos da EAP
    for (const child of eapNode.children) {
        totalCusto += calcularCustoEAP(child.id);
    }
    
    return totalCusto;
}

// Atualiza o custo total do projeto
function updateTotalCost() {
    let totalCost = 0;
    data.eaps.forEach(eap => {
        totalCost += calcularCustoEAP(eap.id);
    });
    document.getElementById('total-project-cost').innerText = `Custo Total do Projeto: R$ ${totalCost.toFixed(2)}`;
}

// Prepara as opções do select de exportação da EAP
function updateExportOptions() {
    eapBomSelect.innerHTML = '<option value="">-- Selecione uma EAP --</option>';
    function addOptions(nodes, level = 0) {
        nodes.forEach(node => {
            const option = document.createElement('option');
            option.value = node.id;
            option.innerText = `${" ".repeat(level * 4)}${node.nome}`;
            eapBomSelect.appendChild(option);
            addOptions(node.children, level + 1);
        });
    }
    addOptions(data.eaps);
}

// Funções para exportação

// Função utilitária para download de arquivos
function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Exportar para JSON
document.getElementById('export-json-btn').addEventListener('click', () => {
    const jsonString = JSON.stringify(data, null, 2);
    downloadFile(jsonString, 'projeto_completo.json', 'application/json');
});

// Gerar e exportar BOM (Total)
document.getElementById('export-total-bom-btn').addEventListener('click', () => {
    const bom = buildTotalBOM();
    const csvContent = bomToCsv(bom);
    downloadFile(csvContent, 'bom_total.csv', 'text/csv;charset=utf-8;');
});

// Gerar e exportar BOM (por EAP)
document.getElementById('export-eap-bom-btn').addEventListener('click', () => {
    const eapId = eapBomSelect.value;
    if (!eapId) {
        showMessage('Por favor, selecione uma EAP para exportar o BOM.');
        return;
    }
    const eapNode = findEAPNode(data.eaps, eapId);
    const bom = buildEAPBom(eapNode);
    const csvContent = bomToCsv(bom);
    downloadFile(csvContent, `bom_${eapNode.nome.replace(/ /g, '_')}.csv`, 'text/csv;charset=utf-8;');
});

// Constrói o BOM total
function buildTotalBOM() {
    const bom = new Map();
    data.eaps.forEach(eap => {
        const eapBom = buildEAPBom(eap);
        for (const [id, item] of eapBom) {
            if (bom.has(id)) {
                bom.get(id).quantidade += item.quantidade;
                bom.get(id).custoTotal += item.custoTotal;
            } else {
                bom.set(id, {...item});
            }
        }
    });
    return bom;
}

// Constrói o BOM para uma EAP específica (função recursiva)
function buildEAPBom(eapNode, bom = new Map()) {
    if (!eapNode) return bom;

    // Adiciona insumos dos items
    eapNode.items.forEach(item => {
        if (item.id.startsWith('insumo')) {
            const insumo = findItem(item.id);
            if (insumo) {
                const quantidade = item.quantidade;
                const custoTotal = quantidade * insumo.custo;
                if (bom.has(insumo.id)) {
                    bom.get(insumo.id).quantidade += quantidade;
                    bom.get(insumo.id).custoTotal += custoTotal;
                } else {
                    bom.set(insumo.id, { nome: insumo.nome, unidade: insumo.unidade, quantidade, custoTotal });
                }
            }
        } else if (item.id.startsWith('composicao')) {
            const composicao = findItem(item.id);
            if (composicao) {
                const insumosDaComposicao = getInsumosFromComposicao(composicao, item.quantidade);
                for (const [id, insumoItem] of insumosDaComposicao) {
                    if (bom.has(id)) {
                        bom.get(id).quantidade += insumoItem.quantidade;
                        bom.get(id).custoTotal += insumoItem.custoTotal;
                    } else {
                        bom.set(id, {...insumoItem});
                    }
                }
            }
        }
    });

    // Processa filhos da EAP
    eapNode.children.forEach(child => buildEAPBom(child, bom));
    
    return bom;
}

// Obtém todos os insumos de uma composição (função recursiva)
function getInsumosFromComposicao(composicao, fatorMultiplicador = 1, visited = new Set()) {
    const insumos = new Map();
    if (visited.has(composicao.id)) return insumos;
    visited.add(composicao.id);

    composicao.items.forEach(item => {
        if (item.id.startsWith('insumo')) {
            const insumo = findItem(item.id);
            if (insumo) {
                const quantidade = item.quantidade * fatorMultiplicador;
                const custoTotal = quantidade * insumo.custo;
                if (insumos.has(insumo.id)) {
                        insumos.get(insumo.id).quantidade += quantidade;
                        insumos.get(insumo.id).custoTotal += custoTotal;
                } else {
                    insumos.set(insumo.id, { nome: insumo.nome, unidade: insumo.unidade, quantidade, custoTotal });
                }
            }
        } else {
            const subComposicao = findItem(item.id);
            if (subComposicao) {
                const subInsumos = getInsumosFromComposicao(subComposicao, item.quantidade * fatorMultiplicador, visited);
                for (const [id, insumoItem] of subInsumos) {
                    if (insumos.has(id)) {
                            insumos.get(id).quantidade += insumoItem.quantidade;
                            insumos.get(id).custoTotal += insumoItem.custoTotal;
                    } else {
                        insumos.set(id, insumoItem);
                    }
                }
            }
        }
    });
    visited.delete(composicao.id);
    return insumos;
}

// Converte o mapa de BOM para CSV
function bomToCsv(bomMap) {
    const headers = "Nome do Insumo,Unidade,Quantidade,Custo Total\n";
    let csv = headers;
    bomMap.forEach(item => {
        csv += `${item.nome},${item.unidade},${item.quantidade.toFixed(2)},${item.custoTotal.toFixed(2)}\n`;
    });
    return csv;
}

// Funções para os gráficos
function updateCharts() {
    renderPieChart();
    renderABCChart();
}

// Renderiza o gráfico de pizza
function renderPieChart() {
    const ctx = document.getElementById('pie-chart').getContext('2d');
    if (pieChart) pieChart.destroy();
    
    const labels = data.eaps.map(eap => eap.nome);
    const costs = data.eaps.map(eap => calcularCustoEAP(eap.id));
    const colors = labels.map(() => `hsl(${Math.random() * 360}, 70%, 50%)`);

    pieChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                data: costs,
                backgroundColor: colors,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = total > 0 ? (value / total * 100).toFixed(2) : 0;
                            return `${label}: R$ ${value.toFixed(2)} (${percentage}%)`;
                        }
                    }
                }
            }
        }
    });
}

// Renderiza o gráfico da curva ABC
function renderABCChart() {
    const ctx = document.getElementById('abc-chart').getContext('2d');
    if (abcChart) abcChart.destroy();

    const bom = buildTotalBOM();
    const insumosArray = Array.from(bom.values()).sort((a, b) => b.custoTotal - a.custoTotal);

    const totalCost = insumosArray.reduce((sum, item) => sum + item.custoTotal, 0);
    let cumulativeCost = 0;
    const labels = insumosArray.map(i => i.nome);
    const dataSets = insumosArray.map(i => i.custoTotal);
    const cumulativePercentage = insumosArray.map(i => {
        cumulativeCost += i.custoTotal;
        return totalCost > 0 ? (cumulativeCost / totalCost) * 100 : 0;
    });
    
    abcChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Custo Total',
                data: dataSets,
                backgroundColor: '#3b82f6',
                yAxisID: 'y'
            }, {
                label: 'Curva ABC (%)',
                data: cumulativePercentage,
                type: 'line',
                borderColor: '#10b981',
                backgroundColor: '#10b981',
                fill: false,
                yAxisID: 'y1'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Custo (R$)'
                    }
                },
                y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Porcentagem Acumulada (%)'
                    },
                    grid: {
                        drawOnChartArea: false,
                    },
                    min: 0,
                    max: 100
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    renderUI();
});