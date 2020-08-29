import React from "react";

export default function Alert({ title, details, color, icon }) {
  return (
    <div className={`card bg-${color} my-2`}>
      <p>
        {icon && <i data-feather={icon} className="float-right opacity-75 ml-2" />}
        <strong>{title}</strong>
        <span className="opacity-75"> {details}</span>
      </p>
    </div>
  );
}
