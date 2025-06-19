import { Model, DataTypes } from "sequelize";

class File extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            path: DataTypes.STRING,
                },
            {
                sequelize,
                name: {
                    singular: "file",
                    plural: "files",
                }
            }
        );
    };

    static associate(models) {
        this.hasMany(models.User);

    }
};

export default File;