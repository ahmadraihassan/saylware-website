"use client";

const teamMembers = [
  { name: "Sarah Chen", role: "Security Lead", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face" },
  { name: "Marcus Johnson", role: "Support Director", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" },
  { name: "Aisha Patel", role: "Threat Analyst", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face" },
  { name: "David Kim", role: "Operations Manager", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face" },
  { name: "Elena Rodriguez", role: "Compliance Officer", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face" },
  { name: "James Wilson", role: "Senior Engineer", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" },
];

export default function Team() {
  return (
    <section id="team" className="relative py-24 sm:py-32 overflow-hidden bg-white">
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="text-center mb-20">
          <p className="eyebrow mb-4">Take Action</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1c1917]">
            Join Us In Making<br />A Difference
          </h2>
        </div>

        {/* Floating circles layout */}
        <div className="relative h-[500px] sm:h-[600px] flex items-center justify-center">
          {/* Center text */}
          <div className="absolute z-20 text-center">
            <a
              href="#contact"
              className="inline-flex items-center rounded-full px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[var(--signal-security)]/30 mb-4"
              style={{ background: "var(--gradient-security)" }}
            >
              Talk To Them
            </a>
            <a
              href="#services"
              className="block text-sm font-medium text-[#78716c] hover:text-[#1c1917] transition-colors underline underline-offset-4"
            >
              Learn More
            </a>
          </div>

          {/* Floating team circles */}
          {teamMembers.map((member, i) => {
            const positions = [
              "top-[5%] left-[10%]",
              "top-[15%] right-[15%]",
              "top-[40%] left-[5%]",
              "top-[35%] right-[8%]",
              "bottom-[15%] left-[20%]",
              "bottom-[10%] right-[25%]",
            ];
            const sizes = ["w-20 h-20 sm:w-24 sm:h-24", "w-24 h-24 sm:w-32 sm:h-32", "w-16 h-16 sm:w-20 sm:h-20", "w-28 h-28 sm:w-36 sm:h-36", "w-20 h-20 sm:w-28 sm:h-28", "w-16 h-16 sm:w-24 sm:h-24"];
            
            return (
              <div
                key={member.name}
                className={`absolute ${positions[i]} group cursor-pointer animate-float`}
                style={{ animationDelay: `${i * 0.8}s`, animationDuration: `${5 + i}s` }}
              >
                <div className={`relative ${sizes[i]} rounded-full overflow-hidden ring-4 ring-white shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Hover tooltip */}
                  <div className="absolute inset-0 bg-[#1c1917]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-white px-2">
                      <div className="text-xs font-bold">{member.name}</div>
                      <div className="text-[10px] opacity-80">{member.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}