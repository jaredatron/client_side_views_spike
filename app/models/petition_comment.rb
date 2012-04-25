class PetitionComment < ActiveRecord::Base
  attr_accessible :content
  belongs_to :author, :class_name => 'User'
  belongs_to :petition
end
