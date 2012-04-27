class Petition < ActiveRecord::Base
  attr_accessible :target, :ask, :stub, :description

  belongs_to :owner,  :class_name => 'User'
  has_many :updates
  has_many :comments

  before_validation :set_title
  before_validation :set_stub

  def set_title
    self.title ||= "Ask #{target} to #{ask}"
  end

  def set_stub
    self.stub ||= self.title.gsub(/\s+/,'-')
  end

  def to_param
    stub
  end

  def as_json options={}
    options[:methods] ||= [:title, :to_param]
    super(options)
  end

end
