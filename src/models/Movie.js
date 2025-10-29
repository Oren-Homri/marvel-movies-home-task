import { DataTypes } from 'sequelize';

export default (sequelize) => {
  return sequelize.define('Movie', {
    Id: { type: DataTypes.INTEGER, primaryKey: true, field: 'id' },
    Title: { type: DataTypes.STRING, allowNull: false, field: 'title' },
  },
  {
    timestamps: false,
    tableName: 'movies',
  }
);
};
