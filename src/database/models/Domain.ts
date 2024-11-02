import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript'

@Table({
  timestamps: true,
  tableName: 'domains',
  modelName: 'Domain'
})
class Domain extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  declare id: string

  @Column({
    type: DataType.STRING
  })
  declare domain: string

  @CreatedAt
  declare created_at: Date

  @UpdatedAt
  declare updated_at: Date
}

export default Domain
