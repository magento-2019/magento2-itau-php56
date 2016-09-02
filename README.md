![valid XHTML][checkmark]
[checkmark]: https://raw.githubusercontent.com/mozgbrasil/mozgbrasil.github.io/master/assets/images/logos/Red_star_32_32.png "MOZG"
[url-method]: http://www.itaushopline.com.br/_shopline.asp
[requirements]: http://mozgbrasil.github.io/requirements/
[contact-itau]: http://suporte.itau.com.br/
[tickets]: https://cerebrum.freshdesk.com/support/tickets/new
[preco]: http://www.cerebrum.com.br/preco/
[getcomposer]: https://getcomposer.org/
[uninstall-mods]: http://devdocs.magento.com/guides/v2.1/install-gde/install/cli/install-cli-uninstall-mods.html

# Mozg\Itaú

## Sinopse

Integração a [Itaú][url-method]

## Motivação

Atender o mercado de módulos para Magento oferecendo melhorias e um excelente suporte

## Suporte / Dúvidas

Para obter o devido suporte [Clique aqui][tickets], relatando o motivo da ocorrência o mais detalhado possível e anexe o print da tela para nosso entendimento

## Preço

[Clique aqui][preco]

## Recursos

- Non Non

## Característica técnica

Non Non

## Instalação - Atualização - Desinstalação

Este módulo destina-se a ser instalado usando o [Composer][getcomposer]

Antes de executar os processos, [clique aqui][requirements] e leia os pré-requisitos e sugestões

--

Para instalar o módulo execute o comando a seguir no terminal do seu servidor

	composer require mozgbrasil/magento2-itau-php56 -vvv && php bin/magento setup:upgrade

Você pode verificar se o módulo está instalado, indo ao backend em:

	STORES -> Configuration -> ADVANCED/Advanced -> Disable Modules Output

--

Para atualizar o módulo execute o comando a seguir no terminal do seu servidor

	composer --version && sudo composer self-update && composer clear-cache && composer update -vvv && composer diagnose && composer show -i && php bin/magento setup:upgrade

--

Para [desinstalar][uninstall-mods] o módulo execute o comando a seguir no terminal do seu servidor

	bin/magento module:uninstall --remove-data --backup-code --backup-media --backup-db Mozg_Itau

~~composer remove mozgbrasil/magento2-itau-php56 && composer clear-cache && composer update && php bin/magento setup:upgrade~~

## Como configurar o método de entrega

Antes de configurar o módulo você deve cadastrar o CEP de origem, indo ao backend em:

	STORES -> Configuration -> Sales/Shipping Settings -> Origin

Para configurar o método de entrega, acesse no backend em:

	STORES -> Configuration -> Sales/Shipping Methods -> Itaú (powered by MOZG)

Você terá os campos a seguir

- **Ativar**

Para "ativar" ou "desativar" o uso do método

- **Ordem de exibição**

É a ordem apresentada em métodos de entrega no passo de fechamento de pedido

- **Título**

Nome do método que deve ser exibido

- **Serviços**

Selecione os serviços desejado, para selecionar mais de um, segure a tecla "Ctrl" e clique nos serviços



## Quais os recursos do módulo

- [✓] Cálculo do frete
- [✓] Rastreamento

## Perguntas mais frequentes "FAQ"

### Non Non

Non Non

### Dados de contato - Itaú

Suporte Operacional Empresas  
0300 100 7575  
operemp@itau-unibanco.com.br  
Banco Itaú-Unibanco S.A.

ou acesse

Para entrar em contato com a [Itaú][contact-itau]

### Dependências

Para o perfeito funcionamento do produto ItauShopLine.  
É necessária a postagem de informações como BAIRRO e DOCUMENTO (CPF/CNPJ).  
O formulário de cadastro de clientes no Magento deverá conter as devidas validações nesses campos.  
No formulário de cadastro de clientes do Magento o campo BAIRRO se trata do campo "billing:street2", sugerimos aplicar as devidas validações.  
No formulário de cadastro de clientes do Magento o atributo "tax_vat" geralmente é usado para armazenar "CPF/CNPJ", sugerimos ativar o atributo "tax_vat" e aplicar as devidas validações.  

### ERROR: "Problemas no processamento, tente mais tarde. (Erro 08) SOS - Itaú Bankline"

Acesse o sistema administrativo, acesse o pedido, veja que no histórico é armazenado as variáveis de postagem ao itaushopline  
Caso alguma informação obrigatória não seja enviada é exibido pelo itau o erro 08

No post a seguir tem informações sobre essa ocorrência  
https://cerebrum.freshdesk.com/support/articles/91462-error-problemas-no-processamento-tente-mais-tarde-erro-08-sos-ita-bankline-

No formulário do magento o campo Bairro se trata do campo billing:street2  
Quando separa o número do endereço, colocando o número sobre o campo billing:street2 percebe que quando é apresentado dados do endereço o número sai na linha de baixo do registro  
Isso acontece em toda parte do Magento, tanto nos pedidos como fatura, descaracterizando o modelo comum de apresentação dos dados  
Devido a esse caso o módulo da Cerebrum procura seguir algumas definições do modelo nativo do Magento

### ERROR: "Problemas na criptografia ou o campo valor está incorreto. Entre em contato com o SOS Itaú Bankline. SOS - Itaú Bankline"

O erro está relacionado a Chave de Criptografia

Após a geração da Chave de Criptografia a mesma demora 24hrs para propagação

Sugiro aguardar o prazo para propagação e tentar novamente

Se o problema persistir sugiro entrar em contato com o Itaú apontando a ocorrência

### Observações

O processo do método de pagamento é aberto em popup

Deve funcionar dessa forma conforme o Manual do Itaú

No próprio corpo HTML no sistema do Itaú Shopline é enviado informações para a pagina que abriu o Popup

Sendo Obrigatório o uso do Popup para esse método de pagamento

Na eventualidade do navegador do usuário estiver habilitado o recurso de bloqueio de popup, será exibido um "aviso", induzindo o usuário ao clique para desbloqueio automático do popup.

## Manual

http://download.itau.com.br/downloadcenter/arquivos/Manual_Tecnico_ItauShopline.pdf

## Contribuintes

Equipe Mozg

## License

[Comercial License] (LICENSE.txt)

## Badges

[![Join the chat at https://gitter.im/mozgbrasil](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/mozgbrasil/)
[![Latest Stable Version](https://poser.pugx.org/mozgbrasil/magento2-itau-php56/v/stable)](https://packagist.org/packages/mozgbrasil/magento2-itau-php56)
[![Total Downloads](https://poser.pugx.org/mozgbrasil/magento2-itau-php56/downloads)](https://packagist.org/packages/mozgbrasil/magento2-itau-php56)
[![Latest Unstable Version](https://poser.pugx.org/mozgbrasil/magento2-itau-php56/v/unstable)](https://packagist.org/packages/mozgbrasil/magento2-itau-php56)
[![License](https://poser.pugx.org/mozgbrasil/magento2-itau-php56/license)](https://packagist.org/packages/mozgbrasil/magento2-itau-php56)
[![Monthly Downloads](https://poser.pugx.org/mozgbrasil/magento2-itau-php56/d/monthly)](https://packagist.org/packages/mozgbrasil/magento2-itau-php56)
[![Daily Downloads](https://poser.pugx.org/mozgbrasil/magento2-itau-php56/d/daily)](https://packagist.org/packages/mozgbrasil/magento2-itau-php56)

:cat2:
