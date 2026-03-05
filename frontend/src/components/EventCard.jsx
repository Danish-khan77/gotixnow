import { useNavigate } from "react-router-dom";

function EventCard({ event }) {
  const navigate = useNavigate();

  if (!event) return null;

  return (
    <div
      onClick={() => navigate(`/event/${event._id}`)}
      style={{
        background: "#1e1e2f",
        borderRadius: "15px",
        overflow: "hidden",
        cursor: "pointer",
        transition: "0.3s ease",
        boxShadow: "0 6px 25px rgba(0,0,0,0.5)",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* Image */}
      <img
        src={event.image || "https://via.placeholder.com/400x200"}
        alt={event.title}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
        }}
      />

      {/* Content */}
      <div style={{ padding: "20px", color: "white" }}>
        <h2>{event.title}</h2>
        <p style={{ color: "gray" }}>{event.city}</p>
        <p style={{ fontWeight: "bold", marginTop: "10px" }}>₹{event.price}</p>
      </div>
    </div>
  );
}

export default EventCard;
