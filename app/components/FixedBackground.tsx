export default function FixedBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/background.jpeg')",
          backgroundPosition: "center 60%",
          filter: "blur(4px) brightness(0.9)",
          transform: "scale(1.3)", // prevents blurred edges showing at the border
        }}
      />
      <div className="absolute inset-0 bg-paper/60" />
    </div>
  );
}
