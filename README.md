# secretaria-fiap

## Pré-requisitos


### Windows

-   Instalar WSL2 seguindo a documentaÃ§Ã£o [aqui](https://docs.microsoft.com/en-us/windows/wsl/install-win10).
    - Recomendação: realizar a instalação manual gera menos chances de dar problemas.
    - Sugestão: Criar um ponto de restauração antes de realizar as intalações, como nesse [exemplo](https://canaltech.com.br/windows/como-criar-pontos-de-restauracao-diarios-no-windows-10/).
-   Instalar [Docker for Windows](https://www.docker.com/products/docker-desktop) e configurÃ¡- lo para rodar com o WSL2 seguindo as instruções [aqui](https://docs.docker.com/docker-for-windows/wsl/).

### Linux

-   Instalar [Docker](https://docs.docker.com/engine/install/ubuntu/) e [Docker Compose](https://docs.docker.com/compose/install/).

### Macos
-   Instalar [Docker for Mac](https://www.docker.com/products/docker-desktop)


## Instalação Back-end


- Clone o projeto para sua máquina. Recomendo clonar para o diretório `/var/www` do seu SO mas não é obrigatório.
  ```shell
  git clone https://github.com/valeriaharumi/secretaria-fiap.git
  ```
- Copie o .env.example para o .env e faça as modificações necessárias.
  
- Rode o docker-compose

  ```
  docker-compose up --build
  ```
  
### últimos passos

- É preciso ter o build-essential instalado, caso não tenha rodar no terminal:
  ```
  sudo apt-get install build-essential
  ```

- Após essas configurações, abra um novo terminal na pasta do projeto e acesse o container do php via bash:
  ```
  docker exec -it laravel_app bash
  ```
  - Rode o composer:
    ```
    composer install
    ```
      - Em caso de erro rodar:
        ```
        composer install --ignore-platform-reqs
        ```
    
  - Gere a chave:
    ```
    php artisan key:generate
    ```
  - Rode as migrations:
    ```
    php artisan migrate
    ```
  - Rode o Script dos valores da tabela brokers_waent :
    ```
    php artisan db:seed --class=TiposSeeder.php
    ```
    ou rode no banco MySQL:
    ```
    INSERT INTO tipos (name) VALUES ('Graduação'), ('Pós-graduação'), ('MBA'), ('Cursos Livres');
    ```
  - Crie um usuário no database:
    ```php
    php artisan tinker

    $u = new App\Models\User;
    $u->name = "Seu nome";
    $u->email = "seu.nome@email.com.br";
    $u->password = \Hash::make('a');
    $u->save();
    ```
  - Saia do tinker:
    ```
    exit
  - Saia do Container:
    ```
    exit
    ```

## Instalação Front-end

- Acessar a pasta `sf-frontend`
```shell
cd sf-frontend
```
- Instalar as dependencias do projeto
```shell
npm install
```
-É preciso uma versão superior ao node 18 para rodar o projeto, atualizar caso a sua seja menor
```shell
node -v
```
-Para subir o projeto
```shell
npm start dev
```

### Executando

- Acesse `localhost:3000` em seu navegador e realize o login.

- Nas próximas vezes que for rodar o projeto apenas rode no back-end:
```shell
docker-compose up
ou
docker-compose up -d
```
- E no front-end:
```shell
npm start dev
```

## Problemas conhecidos

- Erro para executar comandos de edição no banco de dados em máquina windows utilizando o wsl