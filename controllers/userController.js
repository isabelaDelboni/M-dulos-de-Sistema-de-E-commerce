class UserController {
    constructor(UserService) {
        this.userService = UserService;
    }

    //Cria um usuário
    async createUser(req, res) {
        const { email, data_nasc, password } = req.body; 
        try {
            const newUser = await this.userService.create(email, data_nasc, password);
            res.status(201).json(newUser); 
        } catch (error) {
            console.error("Erro ao criar usuário:", error.message); 
            res.status(500).json({ error: 'Ocorreu um erro ao gravar o novo usuário.' });
        }
    }

    //Encontra todos os usuários
    async findAllUsers(req, res) {
        try {
            const allUsers = await this.userService.findAll();
            res.status(200).json(allUsers); 
        } catch (error) {
            console.error("Erro ao localizar usuários:", error.message); 
            res.status(500).json({ error: 'Ocorreu um erro ao localizar todos os usuários.' });
        }
    }

    //Encontra um usuário pelo ID
    async findUserById(req, res) {
        const { id } = req.params; 
        try {
            const user = await this.userService.findById(id);
            if (!user) {
                return res.status(404).json({ message: "Usuário não encontrado." }); 
            }
            res.json(user);
        } catch (error) {
            console.error(`Erro ao encontrar usuário: ${error}`); 
            return res.status(500).json({ message: "Erro ao encontrar usuário." });
        }
    }

    //Login
    async login(req, res) {
        const { email, password } = req.body; 
        console.log("Tentativa de login:", { email, password }); 
    
        try {
            const user = await this.userService.login(email, password);
            console.log("Usuário autenticado:", user); 
            res.status(200).json(user); 
        } catch (error) {
            console.error("Erro no login:", error.message); 
            res.status(401).json({ error: error.message }); 
        }
    }
}

module.exports = UserController; 
