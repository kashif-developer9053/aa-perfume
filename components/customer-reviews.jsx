import { Star } from "lucide-react";

export default function CustomerReviews() {
  const reviews = [
    {
      id: 1,
      name: "Areeba K.",
      role: "Verified Buyer",
      review:
        "The Royal Oud Intense is absolutely divine! The longevity is incredible — I get compliments all day long. Aslam Baig Fragrance has become my go-to for all my fragrance needs.",
      rating: 5,
      location: "Rawalpindi",
      product: "Royal Oud Intense",
    },
    {
      id: 2,
      name: "Hassan M.",
      role: "Verified Buyer",
      review:
        "I've been searching for a trusted perfume seller for months. Finally found one! The fragrance was exactly as described — rich, sophisticated, and long-lasting.",
      rating: 5,
      location: "Islamabad",
      product: "Midnight Noir",
    },
    {
      id: 3,
      name: "Sana A.",
      role: "Verified Buyer",
      review:
        "Ordered the Velvet Rose Elixir as a gift and everyone loved it! Beautiful packaging, authentic fragrance, and amazing service. Highly recommended!",
      rating: 5,
      location: "Bahria Town",
      product: "Velvet Rose Elixir",
    },
    {
      id: 4,
      name: "Nimra Z.",
      role: "Verified Buyer",
      review:
        "The Pink Romance is my signature scent now. It is feminine, elegant, and lasts all day. The packaging was stunning and everything arrived safely. Love it!",
      rating: 5,
      location: "Lahore",
      product: "Pink Romance",
    },
    {
      id: 5,
      name: "Usman R.",
      role: "Verified Buyer",
      review:
        "Exceptional customer service and my order arrived exactly on time. The Enigma Night perfume is perfect for evening wear — mysterious and captivating.",
      rating: 5,
      location: "Rawalpindi",
      product: "Enigma Night",
    },
    {
      id: 6,
      name: "Fatima S.",
      role: "Verified Buyer",
      review:
        "Best place to get luxury perfumes in Pakistan. Real, original fragrances at great prices. The Fresh Citrus Burst is my everyday go-to — refreshing and uplifting!",
      rating: 5,
      location: "Islamabad",
      product: "Fresh Citrus Burst",
    },
  ];

  return (
    <section className="py-20 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#d4af37]/3 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <span
            className="text-xs tracking-[0.3em] text-[#d4af37] uppercase mb-3 block"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Testimonials
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-[#fafafa] mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            What Our <span className="text-[#d4af37] italic">Customers</span> Say
          </h2>
          <div className="mt-4 h-px w-16 bg-[#d4af37] mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-[#111111] border border-[#262626] p-6 transition-all duration-300 hover:border-[#d4af37]/30 hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)]"
              style={{ borderRadius: "8px" }}
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < review.rating ? "fill-[#d4af37] text-[#d4af37]" : "text-[#262626]"}
                  />
                ))}
              </div>

              <p
                className="text-[#a1a1a1] text-sm leading-relaxed mb-6"
                style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic" }}
              >
                "{review.review}"
              </p>

              <div className="h-px bg-[#262626] mb-4" />

              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-[#fafafa] text-sm font-semibold"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {review.name}
                  </p>
                  <p
                    className="text-xs text-[#a1a1a1]"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    {review.role} · {review.location}
                  </p>
                </div>
                <span
                  className="text-[10px] font-bold tracking-wide px-2 py-1 uppercase"
                  style={{
                    fontFamily: "'Montserrat', sans-serif",
                    backgroundColor: "#d4af37",
                    color: "#0a0a0a",
                    borderRadius: "3px",
                    whiteSpace: "nowrap",
                    maxWidth: "100px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {review.product}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
