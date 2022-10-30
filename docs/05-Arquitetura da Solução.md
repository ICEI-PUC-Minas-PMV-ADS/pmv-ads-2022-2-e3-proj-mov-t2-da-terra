# Arquitetura da Solução

<<<<<<< HEAD
 PRÓXIMA ETAPA
 
=======
>>>>>>> b5d9830c2d873083586b0a3722d507625e427561
<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![Arquitetura da Solução](img/02-mob-arch.png)

## Diagrama de Classes

<<<<<<< HEAD
O Diagrama de Classes representa conceitos e dados no mundo da aplicação. Num segundo momento esse diagrama será detalhado para incremento das tecnologias. 

![DaTerra%20-%20Diagrama%20de%20Classes.png](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2022-2-e3-proj-mov-t2-da-terra/blob/main/entregas/images/diagramas/DaTerra%20-%20Diagrama%20de%20Classes.png)

## Modelo ER

O modelo apresentado a seguir demonstra como os conceitos importantes da aplicação se relacionam. 

![DaTerra-Modelo-ER.png](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2022-2-e3-proj-mov-t2-da-terra/blob/main/entregas/images/diagramas/DaTerra-Modelo-ER.png)

## Esquema Relacional

O modelo a seguir demonstra o esquema das tabelas para um Banco de Dados Relacional. 

![DaTerra-Esquema-Relacional.png](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2022-2-e3-proj-mov-t2-da-terra/blob/main/entregas/images/diagramas/DaTerra-Esquema-Relacional.png)

## Modelo Físico
PRÓXIMA ETAPA
Entregar um arquivo banco.sql contendo os scripts de criação das tabelas do banco de dados. Este arquivo deverá ser incluído dentro da pasta src\bd.

## Tecnologias Utilizadas
PRÓXIMA ETAPA
=======
O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Classes”.

> - [Diagramas de Classes - Documentação da IBM](https://www.ibm.com/docs/pt-br/rational-soft-arch/9.6.1?topic=diagrams-class)
> - [O que é um diagrama de classe UML? | Lucidchart](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-de-classe-uml)

## Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.]

As referências abaixo irão auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

## Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 
As referências abaixo irão auxiliá-lo na geração do artefato “Esquema Relacional”.

> - [Criando um modelo relacional - Documentação da IBM](https://www.ibm.com/docs/pt-br/cognos-analytics/10.2.2?topic=designer-creating-relational-model)

## Modelo Físico

Entregar um arquivo banco.sql contendo os scripts de criação das tabelas do banco de dados. Este arquivo deverá ser incluído dentro da pasta src\bd.

## Tecnologias Utilizadas

>>>>>>> b5d9830c2d873083586b0a3722d507625e427561
Descreva aqui qual(is) tecnologias você vai usar para resolver o seu problema, ou seja, implementar a sua solução. Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas.

Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.

## Hospedagem
<<<<<<< HEAD
PRÓXIMA ETAPA
=======

>>>>>>> b5d9830c2d873083586b0a3722d507625e427561
Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de Software

<<<<<<< HEAD
Baseando-se nas características e sub-caractertísticas descritas na norma técnica ISO/IEC 25010, foram levantados alguns tópicos para a avaliação da qualidade de software. 

A escolha foi feita devido a relevância de determinadas sub-características para o projeto me questão. 
 

1. **Funcionalidade**

* **Adequação:** Será analisado se o software atende a demanda para qual foi proposto. Foi escolhida essa sub-característica devido ao fato de a proposta estar focada em atender pequenos produtores que podem, em alguns casos, não ter familiaridade com o uso desse tipo de aplicativo em seu dia-a-dia. 
 
* **Segurança:** Manter os dados protegidos é uma das principais preocupações quando se fala em aplicação web ou mobile. Esse tópico irá avaliar a criptografia de senhas e acesso aos dados pessoais. 

 
2. **Confiabilidade:**

* **Tolerância a falhas:** Em se tratando de uma aplicação que exige conexão com a internet, pode-se estar sujeita a falhas como queda do sinal e afins. A tolerância deve ser avaliada de modo que o usuário não perca informações essenciais nesses casos. 

* **Recuperabilidade:** Relacionado ao tópico anterior, será avaliado a recuperação de dados em eventos de falhas. 
  

3. **Usabilidade**

* **Inteligibilidade:** Um software é voltado para o usuário e de nada vale um software que cumpre suas funcionalidades, possuindo um visual confuso. Pensando nisso, avaliaremos a capacidade da interface transmitir o propósito da aplicação para o usuário. 
 
* **Apreensibilidade:** Nesse tópico será avaliada a dificuldade para realização de determinadas tarefas dentro do aplicativo. 

  
4. **Eficiência**

* **Comportamento em relação ao tempo:** Em um aplicativo mobile é evidente que o usuário espera agilidade nas suas buscas e outros procedimentos. Nesse tópico, avaliaremos a espera entre requisição e reposta do software. 

* **Conformidade:** Com relação com o tópico anterior, será analisada a entrega de dados para garantir um tempo aceitável, conforme definido. 
 

5. **Manutenabilidade**

* **Analisabilidade:** Pensando numa maior facilidade para a equipe de desenvolvimento, será analisado o código e averiguado a dificuldade ou facilidade na identificação de problemas que precisam ser resolvidos. 

* **Modificabilidade:** Analisar a documentação e a identação de códigos, assim como aspectos da legibilidade como um todo. 

 
6. **Portabilidade:**	 

* **Capacidade de instalação:** Nesse tópico será feito a avaliação das possíveis dificuldades enfrentadas para a instalação do aplicativo. 

* **Coexistência:** Será avaliado se há conflitos com outros softwares. 
=======
Conceituar qualidade de fato é uma tarefa complexa, mas ela pode ser vista como um método gerencial que através de procedimentos disseminados por toda a organização, busca garantir um produto final que satisfaça às expectativas dos stakeholders.

No contexto de desenvolvimento de software, qualidade pode ser entendida como um conjunto de características a serem satisfeitas, de modo que o produto de software atenda às necessidades de seus usuários. Entretanto, tal nível de satisfação nem sempre é alcançado de forma espontânea, devendo ser continuamente construído. Assim, a qualidade do produto depende fortemente do seu respectivo processo de desenvolvimento.

A norma internacional ISO/IEC 25010, que é uma atualização da ISO/IEC 9126, define oito características e 30 subcaracterísticas de qualidade para produtos de software.
Com base nessas características e nas respectivas sub-características, identifique as sub-características que sua equipe utilizará como base para nortear o desenvolvimento do projeto de software considerando-se alguns aspectos simples de qualidade. Justifique as subcaracterísticas escolhidas pelo time e elenque as métricas que permitirão a equipe avaliar os objetos de interesse.

> **Links Úteis**:
>
> - [ISO/IEC 25010:2011 - Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE) — System and software quality models](https://www.iso.org/standard/35733.html/)
> - [Análise sobre a ISO 9126 – NBR 13596](https://www.tiespecialistas.com.br/analise-sobre-iso-9126-nbr-13596/)
> - [Qualidade de Software - Engenharia de Software 29](https://www.devmedia.com.br/qualidade-de-software-engenharia-de-software-29/18209/)
>>>>>>> b5d9830c2d873083586b0a3722d507625e427561
