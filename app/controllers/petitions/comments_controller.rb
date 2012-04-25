class Petitions::CommentsController < ApplicationController
  # GET /petition_comments
  # GET /petition_comments.json
  def index
    @petition_comments = PetitionComment.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @petition_comments }
    end
  end

  # GET /petition_comments/1
  # GET /petition_comments/1.json
  def show
    @petition_comment = PetitionComment.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @petition_comment }
    end
  end

  # GET /petition_comments/new
  # GET /petition_comments/new.json
  def new
    @petition_comment = PetitionComment.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @petition_comment }
    end
  end

  # GET /petition_comments/1/edit
  def edit
    @petition_comment = PetitionComment.find(params[:id])
  end

  # POST /petition_comments
  # POST /petition_comments.json
  def create
    @petition_comment = PetitionComment.new(params[:petition_comment])

    respond_to do |format|
      if @petition_comment.save
        format.html { redirect_to @petition_comment, notice: 'Petition comment was successfully created.' }
        format.json { render json: @petition_comment, status: :created, location: @petition_comment }
      else
        format.html { render action: "new" }
        format.json { render json: @petition_comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /petition_comments/1
  # PUT /petition_comments/1.json
  def update
    @petition_comment = PetitionComment.find(params[:id])

    respond_to do |format|
      if @petition_comment.update_attributes(params[:petition_comment])
        format.html { redirect_to @petition_comment, notice: 'Petition comment was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @petition_comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /petition_comments/1
  # DELETE /petition_comments/1.json
  def destroy
    @petition_comment = PetitionComment.find(params[:id])
    @petition_comment.destroy

    respond_to do |format|
      format.html { redirect_to petition_comments_url }
      format.json { head :no_content }
    end
  end
end
