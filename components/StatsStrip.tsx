import ScrollReveal from "./ScrollReveal";

export default function StatsStrip() {
  const stats = [
    { number: "700m", label: "To Magellan's Cross" },
    { number: "750m", label: "To Basilica del Santo Niño" },
    { number: "24/7", label: "Front Desk Service" },
    { number: "2", label: "Room Types Available" },
  ];

  return (
    <div className="bg-primary py-7" aria-label="Key Facts">
      <div className="max-w-[1300px] mx-auto px-6 md:px-[40px] grid grid-cols-2 md:grid-cols-4 gap-0 text-center">
        {stats.map((stat, index) => (
          <ScrollReveal
            key={index}
            delay={index * 0.1}
            className={`py-2 px-5 ${
              index === 1 ? "border-none md:border-r" : index !== 3 ? "border-r border-white/10" : ""
            }`}
          >
            <span className="font-heading text-[2rem] text-accent block leading-none mb-1">
              {stat.number}
            </span>
            <span className="font-label text-[0.6rem] tracking-[0.2em] uppercase text-white/50">
              {stat.label}
            </span>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
