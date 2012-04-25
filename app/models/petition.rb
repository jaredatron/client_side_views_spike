class Petition < ActiveRecord::Base
  attr_accessible :title, :description

  belongs_to :owner,  :class_name => 'User'
  has_many :updates
  has_many :comments
end
