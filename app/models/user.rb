class User < ActiveRecord::Base
  acts_as_authentic

  attr_accessible :name

  has_many :petitions, :foreign_key => 'owner_id'
end

