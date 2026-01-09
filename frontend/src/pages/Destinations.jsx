import React, { useMemo, useState } from "react";
import { MapPin, Star, Heart, Clock, TrendingUp } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";
import { destinations } from "../utils/destinationsData";
import { useNavigate } from "react-router-dom";

export default function Destinations() {
  const { toggleFavorite, isFavorite } = useFavorites();
  const [activeFilter, setActiveFilter] = useState("All Destinations");
  const navigate = useNavigate();

  const filters = [
    { label: "All Destinations", keywords: [] },
    { label: "Budget Friendly", keywords: ["budget"] },
    { label: "Luxury", keywords: ["luxury"] },
    { label: "Beach", keywords: ["beach"] },
    { label: "Mountains", keywords: ["mountain"] },
    { label: "Cultural", keywords: ["culture", "history", "art", "museum"] },
  ];

  const filtered = useMemo(() => {
    if (activeFilter === "All Destinations") return destinations;
    const f = filters.find((x) => x.label === activeFilter);
    if (!f || !f.keywords.length) return destinations;
    return destinations.filter((d) => {
      const bestFor = (d.bestFor || "").toLowerCase();
      return f.keywords.some((kw) => bestFor.includes(kw));
    });
  }, [activeFilter]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 text-white py-20 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Explore Destinations
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl">
            Discover amazing places around the world, carefully curated for every type of traveler.
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-4 mb-12">
          {filters.map((f) => (
            <FilterButton
              key={f.label}
              label={f.label}
              active={activeFilter === f.label}
              onClick={() => setActiveFilter(f.label)}
            />
          ))}
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {filtered.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
              isFavorite={isFavorite(destination.id)}
              onToggleFavorite={() => toggleFavorite(destination.id)}
              onNavigate={() => navigate(`/destination/${destination.id}`)}
            />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-teal-400 via-teal-500 to-cyan-600 text-white py-20 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Explore?
          </h2>
          <p className="text-xl mb-10 opacity-90">
            Start planning your next adventure with TourEase
          </p>
          <button
            onClick={() => navigate("/plan-trip")}
            className="bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-lg font-semibold transition text-lg shadow-md dark:bg-orange-400 dark:hover:bg-orange-500"
          >
            Plan Your Trip
          </button>
        </div>
      </div>
    </div>
  );
}

function FilterButton({ label, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-semibold transition border ${
        active
          ? "bg-teal-500 text-white border-teal-500"
          : "bg-gray-200 text-gray-700 hover:bg-gray-300 border-transparent dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
      }`}
    >
      {label}
    </button>
  );
}

function DestinationCard({ destination, isFavorite, onToggleFavorite, onNavigate }) {
  return (
    <div
      onClick={onNavigate}
      className="bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden cursor-pointer border border-gray-100 dark:border-slate-800"
    >
      {/* Image */}
      <div
        className="h-48 relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${destination.image})` }}
      >
        <div className="absolute inset-0 bg-black/20 transition" />

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          type="button"
          className="absolute top-4 right-4 bg-white dark:bg-slate-900 rounded-full p-2 shadow-md"
        >
          <Heart
            className={`w-6 h-6 ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-gray-600 dark:text-slate-200"
            }`}
          />
        </button>
      </div>

      <div className="p-6">
        <h3 className="font-bold text-xl mb-2">
          {destination.name}
        </h3>

        <div className="flex items-center mb-4">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span className="ml-2 font-semibold">{destination.rating}</span>
          <span className="text-gray-500 text-sm ml-2">
            ({destination.reviews})
          </span>
        </div>

        <div className="space-y-2 text-sm mb-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-teal-600" />
            Best for: {destination.bestFor}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-teal-600" />
            Best season: {destination.season}
          </div>
          <div className="flex items-center">
            <TrendingUp className="w-4 h-4 mr-2 text-teal-600" />
            Budget: {destination.cost}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate();
          }}
          className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-semibold transition"
        >
          Explore
        </button>
      </div>
    </div>
  );
}
