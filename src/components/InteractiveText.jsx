// src/components/InteractiveText.jsx
export default function InteractiveText({ text, fontSize = "clamp(3.5rem, 9vw, 6.5rem)" }) {
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: fontSize,
        fontWeight: 700,
        lineHeight: 1,
      }}
    >
      {text}
    </span>
  );
}
