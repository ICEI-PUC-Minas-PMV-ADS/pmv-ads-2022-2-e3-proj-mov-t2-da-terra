# Arquitetura da Solução

As resquests e response do aplicativo com o servidor serão feitas através de API desenvolvida na linguagem C#, utilizando a plataforma .Net.

A imagem a seguir ilustra o processo:

<img src=https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2022-2-e3-proj-mov-t2-da-terra/blob/main/entregas/images/outras/API.png alt="API" width="690" height="266">

Fonte de Imagem: https://help.klaviyo.com/hc/en-us/articles/360045726811-Getting-Started-with-Klaviyo-APIs

![Arquitetura da Solução]()

## Diagrama de Classes

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
Descreva aqui qual(is) tecnologias você vai usar para resolver o seu problema, ou seja, implementar a sua solução. Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas.

Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.

## Hospedagem
PRÓXIMA ETAPA
Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html)

## Qualidade de Software

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
