import { Column, CreatedAt, DataType, Model, Table, UpdatedAt } from 'sequelize-typescript'

@Table({
  timestamps: true,
  tableName: 'posts',
  modelName: 'Post'
})
class Post extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4
  })
  declare id: string

  @Column({
    type: DataType.STRING
  })
  declare title: string

  @Column({
    type: DataType.STRING
  })
  declare content: string

  @Column({
    type: DataType.STRING
  })
  declare image: string

  @Column({
    type: DataType.STRING
  })
  declare original_link: string

  @Column({
    type: DataType.STRING
  })
  declare domain: string

  @Column({
    type: DataType.STRING
  })
  declare favicon: string

  @Column({
    type: DataType.VIRTUAL,
    get() {
      if (this.getDataValue('image').includes('/screenshots')) {
        return process.env.API_URL + this.getDataValue('image')
      } else {
        return this.getDataValue('image')
      }
    }
  })
  declare image_url: string

  @CreatedAt
  declare created_at: Date

  @UpdatedAt
  declare updated_at: Date
}

export default Post
