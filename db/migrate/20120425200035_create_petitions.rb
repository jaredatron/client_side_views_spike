class CreatePetitions < ActiveRecord::Migration
  def change

    create_table :users do |t|
      t.string :name
      t.timestamps
    end

    create_table :petitions do |t|
      t.integer :owner_id
      t.string :title
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
