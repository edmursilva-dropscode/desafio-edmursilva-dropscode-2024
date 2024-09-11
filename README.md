# Recintos do Zoológico

## Descrição
Este projeto tem como objetivo ajudar a organizar os recintos de um zoológico para garantir que novos animais se sintam confortáveis. Foi desenvolvido em JavaScript e utiliza testes automatizados para validar a solução.

## Estrutura do Projeto
O projeto é composto pelos seguintes arquivos:
. recintos-zoo.js: Contém a lógica principal para analisar e determinar os recintos viáveis para os novos animais.
. recintos-zoo.test.js: Contém os testes automatizados para validar a lógica implementada no recintos-zoo.js.

## Arquivo recintos-zoo.js
### Classe RecintosZoo
A classe RecintosZoo é responsável por gerenciar a lógica dos recintos e dos animais. Seus principais métodos e propriedades são:

. Propriedades:
  . recintos: Uma lista de recintos com suas características (número, bioma, tamanho, e animais presentes).
  . animais: Um objeto contendo informações sobre as espécies de animais, incluindo tamanho, bioma e se são carnívoros ou não.
. Método:
  . analisaRecintos(especie, quantidade): Analisa se a espécie de animal pode ser acomodada em algum dos recintos disponíveis, considerando as regras específicas de cada tipo de animal. Retorna um objeto com a lista de recintos viáveis ou mensagens de erro.

## Regras de Negócio
  1. Bioma Adequado: O recinto deve ter um bioma compatível com a espécie do animal.
  2. Espaço Disponível: O recinto deve ter espaço suficiente para acomodar o número de animais, levando em consideração o espaço ocupado por animais existentes e um possível espaço extra se houver mais de uma espécie no recinto.
  3. Animais Carnívoros: Devem estar sozinhos ou apenas com sua própria espécie no recinto.
  4. Hipopótamos: Podem ser acomodados apenas em recintos que contenham tanto savana quanto rio.
  5. Macacos: Não se sentem confortáveis sozinhos e precisam de pelo menos um outro animal no recinto.


## Arquivo recintos-zoo.test.
### Testes Automatizados
O arquivo recintos-zoo.test.js utiliza o Jest para validar a implementação da classe RecintosZoo. Os testes cobrem diferentes cenários, incluindo:

. Validação de Entrada:
  . Verificação de animais inválidos.
  . Verificação de quantidades inválidas.
. Casos de Teste:
  . Encontrar recintos para diferentes espécies de animais (como crocodilos, macacos, e hipopótamos).
  . Testar a alocação de animais em recintos considerando regras específicas (por exemplo, recintos para carnívoros e o espaço disponível).
  . Testar condições onde não há recintos viáveis.

### RECINTOS EXISTENTES

 O zoológico possui os seguintes recintos disponíveis.

  | número    | bioma             | tamanho total |  animais existentes |
  |-----------|-------------------|---------------|---------------------|
  | 1         | savana            |   10          |   3 macacos         |
  | 2         | floresta          |    5          |   vazio             |
  | 3         | savana e rio      |    7          |  1 gazela           |
  | 4         | rio               |    8          |   vazio             |
  | 5         | savana            |    9          |  1 leão             |

### ANIMAIS

 O zoológico só está habilitado a tratar dos animais abaixo.
 A tabela mostra o espaço que cada indivíduo ocupa e em quais biomas se adapta.

  | espécie    | tamanho | bioma                |
  |------------|---------|----------------------|
  | LEAO       |   3     |  savana              |
  | LEOPARDO   |   2     |  savana              |
  | CROCODILO  |   3     |  rio                 |
  | MACACO     |   1     |  savana ou floresta  |
  | GAZELA     |   2     |  savana              |
  | HIPOPOTAMO |   4     |  savana ou rio       |
  | ZEBRA      |   2     |  savana              |
  | URSO       |   3     |  floresta            |
  | TIGRE      |   2     |  savana              |
  | PANDA      |   2     |  floresta            |
