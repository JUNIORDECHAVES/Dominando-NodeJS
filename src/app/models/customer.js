import { Model, DataTypes } from "sequelize";

class Customer extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            status: DataTypes.ENUM("ACTIVE", "ARCHIVED"),
        },
            {
                sequelize,
                name: {
                    singular: "customer",
                    plural: "customers",
                },
            }
        );
    };

    static associate(models) {
        this.hasMany(models.Contact);

    }
};

export default Customer;