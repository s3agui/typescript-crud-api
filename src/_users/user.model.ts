import {DataTypes, Model, Optional} from 'sequelize';
import type { Sequelize } from 'sequelize';

export interface UserAttributes {
    id: number;
    email: string;
    passwordHash: string;
    tittle: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

export class User extends Model<UserAttributes, UserCreationAttributes>
implements UserAttributes {
    public id!: number;
    public email!: string;
    public passwordHash!: string;
    public tittle!: string;
    public firstName!: string;
    public lastName!: string;
    public role!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default function(sequelize: Sequelize): typeof User {

    return User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        passwordHash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tittle: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: true,
            defaultScope: {
                attributes: { exclude: ['passwordHash'] }
            },
            scopes: {
                withhash: {
                    attributes: { include: ['passwordHash'] },
                }
            }
        }
    );
    
    
    return  User;



}