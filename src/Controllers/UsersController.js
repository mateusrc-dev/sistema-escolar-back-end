const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
const knex = require("../database/knex")
const { hash, compare } = require("bcrypt") //pegando de dentro de bcrypt a função que gera a criptografia

class UsersController {

  async create(request, response) {
    const { name, email, cpf, birth, password } = request.body
    const database = await sqliteConnection()
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])
    if (checkUserExists) {
      throw new AppError("Este E-mail está em uso!")
    }
    if (!name) {
      throw new AppError("Nome é obrigatório")
    }
    const hashedPassword = await hash(password, 8)
    await database.run("INSERT INTO users (name, email, cpf, birth, password) VALUES (?, ?, ?, ?, ?)", [name, email, cpf, birth, hashedPassword])

    return response.status(201).json()
  }

  
  async update(request, response) { //funcionalidade de atualização do usuário
    const { name, email, cpf, birth, password, old_password } = request.body //pegando o corpo da requisição
    const { id } = request.params; //o id está sendo pego do caminho, pois ele foi colocado como parâmetro
    //const user_id = request.user.id;
    const database = await sqliteConnection() //fazendo conexão com o banco de dados
    const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]) //selecionando todos as colunas da linha que tem o respectivo id
    if (!user) { //caso o usuário não exista vai entrar nas chaves
      throw new AppError("Usuário não encontrado!")
    }
    const userWithUpdatedEmail = await database.get("SELECT * FROM users WHERE email = (?)", [email]) //selecionando todas as colunas da linha que tem o respectivo email
    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) { //verificando se a pessoa está tentando mudar um email pra outro que já usado por outra pessoa
      throw new AppError("Este e-mail já está em uso!")
    }
    user.name = name ?? user.name; //atualizando o nome do user que foi pego através do id - a interrogação significa que se não existir conteúdo dentro de name então vai ser utilizado o user.name - as interrogações é um null operator
    user.email = email ?? user.email; //atualizando o email do user
    user.cpf = cpf ?? user.cpf;
    user.birth = birth ?? user.birth;

    if (password && !old_password) {
      throw new AppError("Você precisa informar a senha antiga para definir a nova senha!")
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password) //comparando se a senha antiga inserida pelo usuário (old_password) é igual a que está no banco de dados (user.password) - compare é uma funcionalidade de bcrypt que serve para comparar senhas, é possível comparar a senha que está criptografada no banco de dados (user.password) com a senha que não está que foi inserida pelo usuário (old_password)
      if (!checkOldPassword) { //se caso a senha digitada pelo usuário não for igual a do banco de dados, vai entrar nas chaves
        throw new AppError("A senha antiga não confere!")
      }
      user.password = await hash(password, 8) //atualizando a senha caso passe por todas as verificações e criptografando ela com a função hash
      
    }

    await database.run(`
    UPDATE users SET 
    name = ?, 
    email = ?,
    cpf = ?,
    birth = ?,
    password = ?, 
    update_at = DATETIME('now')
    WHERE id = ?`,
      [user.name, user.email, user.cpf, user.birth, user.password, id]); //aqui está sendo atualizado o banco de dados, são comandos SQL (UPDATE users SET) pra atualizar o banco de dados - WHERE é pra identificar a linha específica que será modificado o valor das colunas - DATETIME() é uma função do banco de dados que pega o momento atual (data e hora), estamos fazendo isso porque a função Date() do JS tem um padrão de escrever a data e hora diferente da função do banco de dados
    return response.json()
  }

  async show(request, response) {
    const { name } = request.query
    const users = await knex("users").whereLike("name", `%${name}%`).orderBy("name")
    return response.json({ users })
  }

  async getUser(request, response) {
    const { id } = request.params
    const user = await knex("users").where({ id })
    response.json({ user })
  }

  async delete(request, response) {
    const { id } = request.params
    await knex("users").where({ id }).delete()
    response.json()
  }
}

module.exports = UsersController