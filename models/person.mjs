export default function personModel(sequelize, DataTypes) {
  return sequelize.define('person', {
    id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
    },
    billId: {
      references: {
        model: 'bills',
        key: 'id',
      },
      type: DataTypes.INTEGER,
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
