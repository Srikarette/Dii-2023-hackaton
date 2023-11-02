import React, { useState, useEffect } from "react";
import { fetchNotificationById } from "../functions/fetchNotifications";
const Formedit = ({
  titleOptions,
  handleOnChange,
  handleCancel,
  id,
  form,
  setForm,
  handleSubmitEdit,
}) => {
  useEffect(() => {
    loadData(id);
  }, [id]);

  const loadData = (id) => {
    fetchNotificationById(id)
      .then((res) => {
        if (res) {
          setForm({
            category: res.category,
            lat: res.latitude,
            lng: res.longitude,
          });
        } else {
          console.log("Notification data not found");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form
      className="bg-white shadow-md rounded px-4 py-2"
      onSubmit={handleSubmitEdit}
    >
      <div className="mb-4">
        <label htmlFor="category" className="block text-gray-700 font-semibold">
          Category:
        </label>
        <select
          name="category"
          id="category"
          value={form.category}
          onChange={(e) => handleOnChange(e)}
          className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
        >
          {titleOptions.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-4">
        <label htmlFor="latitude" className="block text-gray-700 font-semibold">
          Latitude:
        </label>
        <input
          type="number"
          name="lat"
          value={form.lat}
          id="latitude"
          onChange={(e) => handleOnChange(e)}
          className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="longitude"
          className="block text-gray-700 font-semibold"
        >
          Longitude:
        </label>
        <input
          type="number"
          value={form.lng}
          name="lng"
          onChange={(e) => handleOnChange(e)}
          id="longitude"
          className="w-full border border-gray-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover-bg-blue-600 focus:outline-none focus:bg-blue-600 m-1"
        >
          Edit
        </button>
        <button
          onClick={handleCancel}
          type="submit"
          className="bg-red-600 text-white font-semibold py-2 px-4 rounded hover-bg-blue-600 focus:outline-none focus:bg-green-400"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Formedit;
