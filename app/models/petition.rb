class Petition < ActiveRecord::Base
  attr_accessible :title, :description

  belongs_to :owner,  :class_name => 'User'
  has_many :updates,  :class_name => 'PetitionUpdate'
  has_many :comments, :class_name => 'PetitionComment'
end
