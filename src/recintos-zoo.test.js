// recintos-zoo.test.js
import { RecintosZoo } from "./recintos-zoo.js";

describe('Recintos do Zoológico', () => {
    let zoo;

    beforeEach(() => {
        zoo = new RecintosZoo();
    });

    // Testes existentes
    test('Deve rejeitar animal inválido', () => {
        const resultado = zoo.analisaRecintos('UNICORNIO', 1);
        expect(resultado.erro).toBe("Animal inválido");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve rejeitar quantidade inválida', () => {
        const resultado = zoo.analisaRecintos('MACACO', 0);
        expect(resultado.erro).toBe("Quantidade inválida");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
        const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recinto para 2 macacos', () => {
        const resultado = zoo.analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis).toContain('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis).toContain('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis).toContain('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });

    // Testes adicionados
    test('Não deve encontrar recinto para 1 macaco sozinho', () => {
        const resultado = zoo.analisaRecintos('MACACO', 1);
        expect(resultado.recintosViaveis).not.toContain('Recinto 2 (espaço livre: 4 total: 5)');
    });

    test('Deve encontrar recinto para 1 leão', () => {
        const resultado = zoo.analisaRecintos('LEAO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis).toContain('Recinto 5 (espaço livre: 3 total: 9)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });    

    test('Não deve encontrar recinto para hipopótamo em recinto só de savana', () => {
        const resultado = zoo.analisaRecintos('HIPOPOTAMO', 1);
        expect(resultado.recintosViaveis).not.toContain('Recinto 1 (espaço livre: 6 total: 10)');
    });

    test('Deve encontrar recinto para hipopótamo em recinto de savana e rio', () => {
        const resultado = zoo.analisaRecintos('HIPOPOTAMO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis).toContain('Recinto 3 (espaço livre: 0 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Não deve encontrar recinto para carnívoro com outras espécies', () => {
        const resultado = zoo.analisaRecintos('LEOPARDO', 1);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeNull();
    });

    test('Deve rejeitar animal com nome em branco', () => {
        const resultado = zoo.analisaRecintos('', 1);
        expect(resultado.erro).toBe("Animal inválido");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve rejeitar quantidade negativa', () => {
        const resultado = zoo.analisaRecintos('CROCODILO', -1);
        expect(resultado.erro).toBe("Quantidade inválida");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve encontrar recinto para 3 zebras', () => {
        const resultado = zoo.analisaRecintos('ZEBRA', 3);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis).toContain('Recinto 1 (espaço livre: 0 total: 10)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Não deve encontrar recinto para 5 tigres', () => {
        const resultado = zoo.analisaRecintos('TIGRE', 5);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recinto para 2 ursos', () => {
        const resultado = zoo.analisaRecintos('URSO', 2);
        expect(resultado.erro).toBe("Não há recinto viável");
        expect(resultado.recintosViaveis).toBeNull();
    });

    test('Deve encontrar recinto para 1 urso', () => {
        const resultado = zoo.analisaRecintos('URSO', 1);
        expect(resultado.erro).toBeNull();
        expect(resultado.recintosViaveis).toContain('Recinto 2 (espaço livre: 2 total: 5)');
    });
    
    test('Deve rejeitar animal com nome em números', () => {
        const resultado = zoo.analisaRecintos('12345', 1);
        expect(resultado.erro).toBe("Animal inválido");
        expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Deve rejeitar animal com nome em maiúsculas incorreto', () => {
        const resultado = zoo.analisaRecintos('ELEFANTE', 1);
        expect(resultado.erro).toBe("Animal inválido");
        expect(resultado.recintosViaveis).toBeFalsy();
    });
    
});

