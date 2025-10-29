import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Actor', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, field: 'id' },
    Name: { type: DataTypes.STRING, allowNull: false , field: 'name'},
  },
  {
    timestamps: false,
    tableName: 'actors',
  });
};
