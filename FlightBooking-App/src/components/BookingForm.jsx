import { useState } from "react";
import Frame from "../assets/icons/Frame.svg";
import Vector1 from "../assets/icons/Vector1.svg";
import Vector3 from "../assets/icons/Vector3.svg";
import { useDispatch, useSelector } from "react-redux";
import { BOOKING_ACTION_TYPES } from "../features/booking/bookingReducer";
export default function BookingForm() {
  const [bookingForm, setBookingForm] = useState({
    destination_from: "",
    destination_to: "",
    journey_date: "",
    no_of_guests: "",
    ticketClass: "",
  });

  const noOfBookings = useSelector((state) => state.length);
  const dispatch = useDispatch();

  const handleFormChange = (event) => {
    setBookingForm({
      ...bookingForm,
      [event.target.name]: event.target.value,
    });
  };

  const resetForm = () => {
    setBookingForm({
      destination_from: "",
      destination_to: "",
      journey_date: "",
      no_of_guests: "",
      ticketClass: "",
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (
      !Object.entries(bookingForm).every(
        ([key, value]) => value !== null && value !== undefined && value !== ""
      )
    ) {
      return;
    }
    dispatch({
      type: BOOKING_ACTION_TYPES.ADD_BOOKING,
      payload: {
        ...bookingForm,
        id: noOfBookings + 1,
      },
    });
    resetForm();
  };
  return (
    <form className="first-hero lws-inputform" onSubmit={handleFormSubmit}>
      {/* From */}
      <div className="des-from">
        <p>Destination From</p>
        <div className="flex flex-row">
          <img src={Frame} alt="" />
          <select
            className="outline-none px-2 py-2 w-full"
            name="destination_from"
            id="lws-from"
            required=""
            value={bookingForm.destination_from}
            onChange={handleFormChange}
          >
            <option value="" hidden="">
              Please Select
            </option>
            <option>Dhaka</option>
            <option>Sylhet</option>
            <option>Saidpur</option>
            <option>Cox's Bazar</option>
          </select>
        </div>
      </div>
      {/* To */}
      <div className="des-from">
        <p>Destination To</p>
        <div className="flex flex-row">
          <img src={Frame} alt="" />
          <select
            className="outline-none px-2 py-2 w-full"
            name="destination_to"
            id="lws-to"
            required=""
            value={bookingForm.destination_to}
            onChange={handleFormChange}
          >
            <option value="" hidden="">
              Please Select
            </option>
            <option>Dhaka</option>
            <option>Sylhet</option>
            <option>Saidpur</option>
            <option>Cox's Bazar</option>
          </select>
        </div>
      </div>
      {/* Date */}
      <div className="des-from">
        <p>Journey Date</p>
        <input
          type="date"
          className="outline-none px-2 py-2 w-full date"
          name="journey_date"
          id="lws-date"
          required=""
          value={bookingForm.journey_date}
          onChange={handleFormChange}
        />
      </div>
      {/* Guests */}
      <div className="des-from">
        <p>Guests</p>
        <div className="flex flex-row">
          <img src={Vector1} alt="" />
          <select
            className="outline-none px-2 py-2 w-full"
            name="no_of_guests"
            id="lws-guests"
            required=""
            value={bookingForm.no_of_guests}
            onChange={handleFormChange}
          >
            <option value="" hidden="">
              Please Select
            </option>
            <option value={1}>1 Person</option>
            <option value={2}>2 Persons</option>
            <option value={3}>3 Persons</option>
            <option value={4}>4 Persons</option>
          </select>
        </div>
      </div>
      {/* Class */}
      <div className="des-from !border-r-0">
        <p>Class</p>
        <div className="flex flex-row">
          <img src={Vector3} alt="" />
          <select
            className="outline-none px-2 py-2 w-full"
            name="ticketClass"
            id="lws-ticketClass"
            required=""
            value={bookingForm.ticketClass}
            onChange={handleFormChange}
          >
            <option value="" hidden="">
              Please Select
            </option>
            <option>Business</option>
            <option>Economy</option>
          </select>
        </div>
      </div>
      <button
        className="addCity"
        type="submit"
        id="lws-addCity"
        disabled={noOfBookings === 3}
      >
        <svg
          width="15px"
          height="15px"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        <span className="text-sm">Book</span>
      </button>
    </form>
  );
}
