class Petition::Update < ActiveRecord::Base
  attr_accessible :title, :description
  belongs_to :petition
end
