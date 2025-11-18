// src/components/MemorialMap.tsx
import { useState, useEffect, useRef } from 'react';

interface MemorialLocation {
  name: string;
  address: string;
  description: string;
  visitingHours: string;
  googleMapsEmbedUrl: string;
}

const MEMORIAL_LOCATION: MemorialLocation = {
  name: "Ndumberi Stadium",
  address: "Ndumberi, Kiambu, Kenya",
  description: "A peaceful memorial garden dedicated to the eternal memory of Betty Bayo, where fans and loved ones can reflect and celebrate her life and musical legacy. This sacred space honors her journey and the beautiful music that touched millions of hearts.",
  visitingHours: "Daily: 6:00 AM - 8:00 PM",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.0134080199487!2d36.8037857739732!3d-1.1509134354910648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f3b60ccffffff%3A0xeaf6ed1fd0b69154!2sNdumberi%20Stadium!5e0!3m2!1sen!2ske!4v1763458256485!5m2!1sen!2ske"
};

export default function MemorialMap() {
  const [isVisible, setIsVisible] = useState(false);
  const [showDirections, setShowDirections] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  // Parallax fade-in effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getGoogleMapsLink = () => {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Ndumberi Stadium, Kiambu, Kenya")}`;
  };

  const handleGetDirections = () => {
    setShowDirections(true);
  };

  return (
    <section 
      id="memorial-map" 
      ref={mapRef}
      className={`section-padding bg-base-100 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="section-title text-base-content mb-4">Visit Her Memorial</h2>
          <p className="text-base-content/80 text-lg max-w-2xl mx-auto">
            A sacred space where we honor Betty's memory and celebrate the eternal light she brought into our lives
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Container */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-2xl border border-base-300">
              <div className="card-body p-0">
                <div className="relative h-96 md:h-[500px] rounded-t-2xl overflow-hidden">
                  {/* Google Maps Embed */}
                  <iframe
                    src={MEMORIAL_LOCATION.googleMapsEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="rounded-t-2xl"
                    title="Betty Bayo Memorial Location - Ndumberi Stadium"
                  />
                  
                  {/* Candle Marker Overlay */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="relative group">
                      <div className="absolute inset-0 animate-ping rounded-full bg-warning opacity-20 group-hover:opacity-30 transition-opacity"></div>
                      <div className="relative text-4xl filter drop-shadow-lg soft-glow-animation">
                        🕯️
                      </div>
                    </div>
                  </div>

                  {/* Map Overlay Gradient */}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-base-100/20 to-transparent rounded-t-2xl"></div>
                </div>

                {/* Map Controls */}
                <div className="card-actions justify-center p-4 bg-base-200 rounded-b-2xl">
                  <a
                    href={getGoogleMapsLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-primary"
                  >
                    <span className="text-lg">🗺️</span>
                    Open in Google Maps
                  </a>
                  
                  <button
                    onClick={handleGetDirections}
                    className="btn btn-primary"
                  >
                    <span className="text-lg">🧭</span>
                    Get Directions
                  </button>
                </div>
              </div>
            </div>

            {/* Directions Info */}
            {showDirections && (
              <div className="card bg-base-100 shadow-lg border border-base-300 mt-6">
                <div className="card-body">
                  <h3 className="card-title text-base-content mb-4">
                    <span className="text-lg">🧭</span>
                    How to Get There
                  </h3>
                  <div className="space-y-3 text-base-content/80">
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-bold text-lg">1.</span>
                      <p>Click "Open in Google Maps" above to launch navigation</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-bold text-lg">2.</span>
                      <p>Allow location access for turn-by-turn directions</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-primary font-bold text-lg">3.</span>
                      <p>Follow the route to Ndumberi Stadium in Kiambu</p>
                    </div>
                    <div className="alert alert-warning mt-4">
                      <span>💡</span>
                      <span className="text-sm">
                        <strong>Tip:</strong> The memorial is located within the peaceful grounds of Ndumberi Stadium
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Location Info Card */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-2xl border border-base-300 sticky top-24">
              <div className="card-body">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl text-warning">🕯️</div>
                  <div>
                    <h3 className="card-title text-base-content">{MEMORIAL_LOCATION.name}</h3>
                    <p className="text-base-content/60 text-sm">Betty Bayo Memorial Garden</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-base-content/80 text-sm mb-6 leading-relaxed">
                  {MEMORIAL_LOCATION.description}
                </p>

                {/* Visiting Hours */}
                <div className="bg-base-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="text-warning text-lg">🕒</div>
                    <div>
                      <p className="font-semibold text-base-content text-sm">Visiting Hours</p>
                      <p className="text-base-content/80 text-sm">{MEMORIAL_LOCATION.visitingHours}</p>
                      <p className="text-base-content/60 text-xs mt-1">All are welcome to visit and reflect</p>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="bg-base-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="text-warning text-lg">📍</div>
                    <div>
                      <p className="font-semibold text-base-content text-sm">Location</p>
                      <p className="text-base-content/80 text-sm">{MEMORIAL_LOCATION.address}</p>
                      <p className="text-base-content/60 text-xs mt-1">Peaceful stadium grounds</p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <p className="font-semibold text-base-content text-sm mb-3">Memorial Features:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-2 text-base-content/80">
                      <span>🌿</span> Garden Setting
                    </div>
                    <div className="flex items-center gap-2 text-base-content/80">
                      <span>💺</span> Seating Areas
                    </div>
                    <div className="flex items-center gap-2 text-base-content/80">
                      <span>🎵</span> Musical Tributes
                    </div>
                    <div className="flex items-center gap-2 text-base-content/80">
                      <span>🕊️</span> Peaceful Atmosphere
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <a
                    href={getGoogleMapsLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary w-full"
                  >
                    <span className="text-lg">🗺️</span>
                    Open in Google Maps
                  </a>
                  
                  <button
                    onClick={handleGetDirections}
                    className="btn btn-outline btn-primary w-full"
                  >
                    <span className="text-lg">🧭</span>
                    Get Directions Help
                  </button>
                </div>

                {/* Prayer Note */}
                <div className="text-center mt-4 pt-4 border-t border-base-300">
                  <p className="text-base-content/60 text-xs italic">
                    "May her soul rest in eternal peace and her music live forever in our hearts"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-all duration-300">
            <div className="card-body text-center">
              <div className="text-3xl text-primary mb-3">📍</div>
              <h4 className="card-title text-base-content justify-center mb-2">Peaceful Location</h4>
              <p className="text-base-content/80 text-sm">Ndumberi Stadium provides a serene environment for quiet reflection and remembrance</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-all duration-300">
            <div className="card-body text-center">
              <div className="text-3xl text-success mb-3">🌿</div>
              <h4 className="card-title text-base-content justify-center mb-2">Natural Setting</h4>
              <p className="text-base-content/80 text-sm">Surrounded by nature in Kiambu county, creating the perfect atmosphere for honoring Betty's memory</p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-all duration-300">
            <div className="card-body text-center">
              <div className="text-3xl text-secondary mb-3">🎵</div>
              <h4 className="card-title text-base-content justify-center mb-2">Musical Legacy</h4>
              <p className="text-base-content/80 text-sm">A space where her music continues to inspire and bring comfort to all who visit</p>
            </div>
          </div>
        </div>

        {/* Memorial Message */}
        <div className="card bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mt-8">
          <div className="card-body text-center">
            <p className="text-base-content text-lg italic font-light">
              "Though she is no longer with us in body, Betty's spirit lives on through her music and the memories she created. 
              This memorial stands as a testament to the joy and inspiration she brought to millions."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}