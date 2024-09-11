//recintos-zoo.js
class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3 }] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: ['savana', 'rio'], tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1 }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1 }] }
        ];

        this.animais = {
            LEAO: { tamanho: 3, bioma: ['savana'], carnivoro: true },
            LEOPARDO: { tamanho: 2, bioma: ['savana'], carnivoro: true },
            CROCODILO: { tamanho: 3, bioma: ['rio'], carnivoro: true },
            MACACO: { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            GAZELA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
            HIPOPOTAMO: { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false },
            ZEBRA: { tamanho: 2, bioma: ['savana'], carnivoro: false },
            URSO: { tamanho: 3, bioma: ['floresta'], carnivoro: true },
            TIGRE: { tamanho: 2, bioma: ['savana'], carnivoro: true },
            PANDA: { tamanho: 2, bioma: ['floresta'], carnivoro: false }
        };
    }

    analisaRecintos(especie, quantidade) {
        if (!this.animais[especie.toUpperCase()]) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }
        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }

        especie = especie.toUpperCase(); // Garantir que o nome do animal esteja em maiúsculas

        const recintosViaveis = this.recintos
            .filter(recinto => this.recintoViavel(recinto, especie, quantidade))
            .map(recinto => {
                const espacoLivre = this.calculaEspacoLivre(recinto, especie, quantidade);
                return `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho})`;
            });

        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: null };
        }

        return { erro: null, recintosViaveis };
    }

    recintoViavel(recinto, especie, quantidade) {
        const animal = this.animais[especie];

        // Verifica se o bioma é adequado
        const biomaAdequado = Array.isArray(recinto.bioma) 
            ? recinto.bioma.some(b => animal.bioma.includes(b))
            : animal.bioma.includes(recinto.bioma);
        if (!biomaAdequado) return false;

        // Verifica espaço disponível
        if (this.calculaEspacoLivre(recinto, especie, quantidade) < 0) return false;

        // Regra dos carnívoros
        if (animal.carnivoro && recinto.animais.length > 0 && recinto.animais[0].especie !== especie) return false;
        if (recinto.animais.some(a => this.animais[a.especie].carnivoro) && especie !== recinto.animais[0].especie) return false;

        // Regra do hipopótamo
        if (especie === 'HIPOPOTAMO' && (!Array.isArray(recinto.bioma) || !recinto.bioma.includes('savana') || !recinto.bioma.includes('rio'))) return false;

        // Regra do macaco
        if (especie === 'MACACO' && recinto.animais.length === 0 && quantidade === 1) return false;

        return true;
    }

    calculaEspacoLivre(recinto, especie, quantidade) {
        const animal = this.animais[especie];
        const espacoOcupado = recinto.animais.reduce((total, a) => total + (this.animais[a.especie].tamanho * a.quantidade), 0);
        const espacoNovoAnimal = animal.tamanho * quantidade;
        
        // Calcula o espaço extra apenas se estiver adicionando uma nova espécie
        const espacoExtra = recinto.animais.length > 0 && recinto.animais[0].especie !== especie ? 1 : 0;
        
        const espacoTotal = espacoOcupado + espacoNovoAnimal + espacoExtra;
        
        return recinto.tamanho - espacoTotal;
    }
}

export { RecintosZoo };
