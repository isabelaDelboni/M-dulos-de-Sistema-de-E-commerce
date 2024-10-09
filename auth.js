//Gera um identificador para o usuário
async function generateIdentifier(user) {
    const { id, email } = user; 
    return { id, email }; 
}

//Verifica se um usuário é válido
async function verifyUser(req, res, next) {
    const userId = req.headers['user-id'];

    if (!userId) {
        return res.status(401).json({ message: 'Usuário não informado' }); 
    }
    req.user = { id: userId }; 
    next();
}

module.exports = { generateIdentifier, verifyUser };
