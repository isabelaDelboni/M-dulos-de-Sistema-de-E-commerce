const bcrypt = require('bcrypt'); 
const db = require('../models'); 
const roundSalts = 10; 

class UserService {
    constructor(UserModel) {
        this.User = UserModel; 
    }

    //Cria um novo usuário
    async create(email, data_nasc, password) {
        try {
            const hashPassword = await bcrypt.hash(password, roundSalts); 
            const newUser = await this.User.create({
                email,
                data_nasc,
                password: hashPassword
            });
            return newUser || null;
        } catch (error) {
            throw new Error(`Erro ao criar usuário: ${error.message}`);
        }
    }

    //Retornar todos os usuários
    async findAll() {
        try {
            const allUsers = await this.User.findAll(); 
            return allUsers.length ? allUsers : null;
        } catch (error) {
            throw new Error(`Erro ao listar usuários: ${error.message}`); 
        }
    }

    //Retorna o usuário pelo id
    async findById(id) {
        try {
            console.log(`Buscando usuário com ID: ${id}`); 
            const user = await this.User.findByPk(id);
            console.log(`Usuário encontrado: ${JSON.stringify(user)}`); 
            return user ? user : null; 
        } catch (error) {
            console.error(`Erro ao buscar usuário: ${error}`); 
            throw error; 
        }
    }

    //Login
    async login(email, password) {
        try {
            const user = await this.User.findOne({ where: { email } }); 

            if (user) {
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (isPasswordValid) {
                    user.dataValues.password = ''; 
                    return user; 
                } else {
                    throw new Error('Senha inválida'); 
                }
            } else {
                throw new Error('Usuário não encontrado');
            }
        } catch (error) {
            throw new Error(`Erro ao realizar login: ${error.message}`); 
        }
    }
}

module.exports = UserService; 
