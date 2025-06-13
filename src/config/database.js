module.exports = {  
        username: 'root',
        password: 'user:junior12345',
        database: 'dominando-nodejs',
        host: '127.0.0.1',
        dialect: 'mysql',
        define: {
            timestamps: true, // cria duas colunas createdAt e updatedAt, data de criação e atualização
            underscored: true, // cria um nome de coluna em minúsculo e com _ entre as palavras. Ex: created_at
            underscoredAll: true, // aplica o mesmo padrão para todas as colunas
        }
    
}