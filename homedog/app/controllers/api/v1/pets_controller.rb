class Api::V1::PetsController < ApplicationController
  skip_before_action :authorized, only: [:index, :create]
  def index
  pets = Pet.all
  render json: pets, status: 200
  end

  def create
    pet = Pet.create(pet_params)
    render json: pet, status: 201
  end

  def update
    @pet.update(pet_params)
    render json: @pet, status: 200
  end

  def destroy
    pet = Pet.find(params[:id])
    if pet.destroy
      render json: {message:"Zap! pet deleted", pet: pet}
    else
      render json: {error: "DID NOT DELETE"}, status: 400
    end
  end

  def show
    render json: @pet, status: 200
  end

  private
  def pet_params
    params.permit(:name, :pet_owner_id, :description, :img)
  end

  def set_pet
    @pet = Pet.find(params[:id])
  end
end
