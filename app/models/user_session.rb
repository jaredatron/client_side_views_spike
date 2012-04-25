class UserSession < Authlogic::Session::Base

  def destroyed?
    @record == nil
  end

end
