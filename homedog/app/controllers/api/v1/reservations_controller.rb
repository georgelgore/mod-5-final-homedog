class Api::V1::ReservationsController < ApplicationController
  skip_before_action :authorized, only: [:index, :create, :show, :update]
  def index
  reservations = Reservation.all
  render json: reservations, status: 200
  end

  def create
    reservation = Reservation.new(reservation_params)
    if reservation.save
      host = User.find(reservation.host_id)
      UserMailer.welcome_email(host).deliver_now
      byebug
      render json: reservation, status: 201
    else
      render json: {error: "DID NOT DELETE"}, status: 400
    end
  end

  def update
    @reservation = Reservation.find(params[:id])
    @reservation.update(reservation_params)
    render json: @reservation, status: 200
  end

  def destroy
    # byebug
    reservation = Reservation.find(params[:id])
    if reservation.destroy
      render json: {message:"Zap! reservation deleted", id: reservation.id, pet_owner_id: reservation.pet_owner_id, host_id: reservation.host_id }
    else
      render json: {error: "DID NOT DELETE"}, status: 400
    end
  end

  def show
    @reservation = Reservation.find(params[:id])
    render json: @reservation, status: 200
  end

  private
  def reservation_params
    params.permit(:host_id, :pet_owner_id, :start_date, :end_date, :has_alert)
  end

  def set_reservation
    @reservation = Reservation.find(params[:id])
  end
end
