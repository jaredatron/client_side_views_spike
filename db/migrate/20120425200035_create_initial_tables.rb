class CreateInitialTables < ActiveRecord::Migration
  def change

    create_table :users do |t|
      t.string :name
      t.string :email
      t.string :crypted_password
      t.string :password_salt
      t.string :persistence_token
      t.timestamps
    end

    create_table :sessions do |t|
      t.string :session_id, :null => false
      t.text :data
      t.timestamps
    end

    add_index :sessions, :session_id
    add_index :sessions, :updated_at

    create_table :petitions do |t|
      t.integer :owner_id
      t.string :title
      t.string :target
      t.string :ask
      t.string :stub
      t.text :description
      t.timestamps
    end

    create_table :petition_comments do |t|
      t.integer :petition_id
      t.integer :author_id
      t.text :content
      t.timestamps
    end

    create_table :petition_updates do |t|
      t.integer :petition_id
      t.string :subject
      t.text :body
      t.timestamps
    end

  end
end
