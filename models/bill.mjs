export default function billModel(sequelize, DataTypes) {
  return sequelize.define('bill', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  { underscored: true });
}
