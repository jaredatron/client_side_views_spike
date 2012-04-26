class Petition < ActiveRecord::Base
  attr_accessible :target, :ask, :description

  belongs_to :owner,  :class_name => 'User'
  has_many :updates
  has_many :comments
end
