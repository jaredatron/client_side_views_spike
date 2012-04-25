require 'test_helper'

class PetitionCommentsControllerTest < ActionController::TestCase
  setup do
    @petition_comment = petition_comments(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:petition_comments)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create petition_comment" do
    assert_difference('PetitionComment.count') do
      post :create, petition_comment: {  }
    end

    assert_redirected_to petition_comment_path(assigns(:petition_comment))
  end

  test "should show petition_comment" do
    get :show, id: @petition_comment
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @petition_comment
    assert_response :success
  end

  test "should update petition_comment" do
    put :update, id: @petition_comment, petition_comment: {  }
    assert_redirected_to petition_comment_path(assigns(:petition_comment))
  end

  test "should destroy petition_comment" do
    assert_difference('PetitionComment.count', -1) do
      delete :destroy, id: @petition_comment
    end

    assert_redirected_to petition_comments_path
  end
end
