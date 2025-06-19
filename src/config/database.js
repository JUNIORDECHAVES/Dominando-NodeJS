import "dotenv/config";
module.exports = {  
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        define: {
            timestamps: true, // cria duas colunas createdAt e updatedAt, data de criação e atualização
            underscored: true, // cria um nome de coluna em minúsculo e com _ entre as palavras. Ex: created_at
            underscoredAll: true, // aplica o mesmo padrão para todas as colunas
        }
    
}