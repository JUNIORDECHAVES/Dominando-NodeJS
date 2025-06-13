import {DataTypes, Model} from "sequelize";

class Contact extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            status: DataTypes.ENUM("ACTIVE", "ARCHIVED"),
        },
        {
            sequelize,
            name: {
                singular: "contact",
                plural: "contacts",
            }
        }
        );
    };

    static associate(models) {
        this.belongsTo(models.Customer, { foreignKey: "customer_id" });
    }
};

export default Contact;