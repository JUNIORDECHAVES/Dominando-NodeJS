import { DataTypes, Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.VIRTUAL,
            password_hash: DataTypes.STRING,
        },
            {
                sequelize,
                name: {
                    singular: "user",
                    plural: "users",
                }
            }
        );

        this.addHook("beforeSave", async user => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8)
            }
        });


    };
    
    checkPassword(password) {
        if (password) {
            return bcrypt.compare(password, this.password_hash);
        }
    }

    static associate(models) {
        this.belongsTo(models.File, { foreignKey: "file_id" });
    }

};

export default User;