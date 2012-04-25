class User < ActiveRecord::Base
  attr_accessible :name

  has_many :petitions, :foreign_key => 'owner_id'
end
