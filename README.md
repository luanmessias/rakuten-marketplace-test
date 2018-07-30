# Projeto teste Rakuten Brasil
O documento tem como proposta apresentar o projeto, demonstrando os métodos, plugins e modos de trabalho utilizado.

##	Arquivos


```
Projeto
├── resource
|	├── angular
|	├── css
|	├── elevatezoom
|	├── fancybox
|	├── grunt
|	├── img
|	├── jquery
|	├── js
|	└── sass
├──	index.html
└───README.md

```

## Descrição dos componentes

### AngularJS  V1.x
Utilizado para fazer a parte de acesso ao arquivo JSON e desenvolvimento do projeto, o arquivo de desenvolvimento esta neste diretório:

```
Projeto
└── resource
	├── ...
	└── js
		└── app.js
```

### CSS
O CSS final compilado fica neste diretório, o projeto foi desenvolvido em SASS.

### Elevate Zoom
Plugin utilizado para habilitar a funcionalidade de Zoom na imagem principal do projeto.

### Fancybox
Utilizado para criar os modais de Calculo de frete e Inclusão de novas avaliações do produto.

### Grunt
Task Runner utilizado para trabalhar com SASS e compilar o CSS do projeto.

### jQuery
Utilizando como dependência dos plugins e em algumas funções no arquivo app.js

###	JS
Aqui esta localizado o arquivo data.js (Dados do projeto) e app.js (Parte de desenvolvimento do projeto)

###	SASS
Todo estilo do projeto esta aplicado aqui pasta. A separação de arquivos segue um padrão chamado ITCSS (Inverted Triangle CSS) ele serve para ordenar as declarações de estilos do menos especifico ao mais especifico para tornar o projeto mais escalável:

![enter image description here](http://technotif.com/wp-content/uploads/2015/04/Manage-Large-CSS-Projects-With-ITCSS.jpg)


A estrutura deste diretório ficou assim:

**SETTINGS**

Aqui se encontra as configurações globais e variáveis do projeto, fonte, cores, etc...

**TOOLS**

Neste diretório encontram-se os arquivos de funções, placeholders e mixins do projeto.

 **GENERIC**
 
CSS Normalize são aplicados nesta sessão.

 **ELEMENTS**
 
Todo estilo que precisa ser aplicado diretamente nas tags HTML estão aqui.

 **OBJECTS**
 
Sessão responsável por conter pequenos trechos de códigos ou objetos que podem ser utilizados em qualquer lugar do projeto, icons, animações, etc...

 **COMPONENTS**
 
Nesta sessão está praticamente todo código especifico do projeto, a página de detalhes do produto em pequenos arquivos de componentes:

```
sass
└── componetns
	├── prodBuy.scss
	├── prodContainers.scss
	├── prodDesc.scss
	├── prodInfo.scss	
	├── prodModals.scss
	├── prodOffers.scss
	├── prodPhoto.scss
	├── prodPoints.scss
	├── prodRating.scss
	├── prodRelated.scss
	├── prodReviews.scss
	├── prodSkus.scss
	├── prodThumbs.scss
	├── prodTools.scss
	└── prodZoom.scss

```


## BEM [Block Element Modifier]
Utilizei esta metodologia para nomear as classes de meus componentes no projeto, mesmo sendo mais "verboso" o método tem como principal benéfico sua performance de leitura pelo Browser por garantir que a leitura das classes sejam únicas, garantindo que pouca leitura de tags será realizada.


## Fontes

ITCSS:

[Organizando seu CSS com ITCSS](https://willianjusten.com.br/organizando-seu-css-com-itcss/)

BEM:

[Google Developers: Reduzir o escopo e a complexidade dos cálculos de estilo](https://developers.google.com/web/fundamentals/performance/rendering/reduce-the-scope-and-complexity-of-style-calculations)


