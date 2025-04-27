import React, { useState } from "react";
import { FiX } from "react-icons/fi";
import axios from "axios";

const PostCreator = ({ onClose }) => {
  const [postType, setPostType] = useState("offer"); // "offer" or "request"
  const [type, setType] = useState("medical");
  const [description, setDescription] = useState("");
  const [availability, setAvailability] = useState("");
  const [range, setRange] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");

      const payload = {
        type,
        description,
        location: {
          type: "Point",
          coordinates: [parseFloat(longitude), parseFloat(latitude)],
        },
      };

      if (postType === "offer") {
        payload.availability = availability;
        payload.range = parseFloat(range);
      }

      const url =
        postType === "offer"
          ? "http://localhost:8000/api/offers"
          : "http://localhost:8000/api/requests";

      await axios.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      onClose();
    } catch (err) {
      console.error("Error posting:", err.response?.data || err.message);
    }
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box w-full max-w-lg">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">
            New {postType === "offer" ? "Help Offer" : "Help Request"}
          </h3>
          <button className="btn btn-sm btn-circle btn-ghost" onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="tabs tabs-boxed mb-4">
          <button
            className={`tab ${postType === "offer" ? "tab-active" : ""}`}
            onClick={() => setPostType("offer")}
          >
            Help Offer
          </button>
          <button
            className={`tab ${postType === "request" ? "tab-active" : ""}`}
            onClick={() => setPostType("request")}
          >
            Help Request
          </button>
        </div>

        {/* Type */}
        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Type</span>
          </label>
          <select
            className="select select-bordered"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="medical">Medical</option>
            <option value="food">Food</option>
            <option value="transport">Transport</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Availability & Range for Offers */}
        {postType === "offer" && (
          <>
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Availability</span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                placeholder="e.g. Weekends, 9 AM - 5 PM"
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
              />
            </div>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Range (in km)</span>
              </label>
              <input
                type="number"
                className="input input-bordered"
                placeholder="e.g. 10"
                value={range}
                onChange={(e) => setRange(e.target.value)}
              />
            </div>
          </>
        )}

        {/* Description */}
        <div className="form-control mb-3">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            placeholder="Describe your need or help offer..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Location */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Latitude</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              placeholder="e.g. 37.7749"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Longitude</span>
            </label>
            <input
              type="number"
              className="input input-bordered"
              placeholder="e.g. -122.4194"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="modal-action">
          <button className="btn" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Post
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default PostCreator;
