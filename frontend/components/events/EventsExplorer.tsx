import React, { useEffect, useState } from "react";
import { CreatedEvent, CategoryType } from "@/types/event";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";

export const EventsExplorer: React.FC = () => {
  const [events, setEvents] = useState<CreatedEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const baseUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const params = new URLSearchParams();
      if (categoryFilter !== "ALL") params.append("category", categoryFilter);
      if (search.trim()) params.append("search", search.trim());

      const res = await fetch(`${baseUrl}/api/events?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        setEvents(data.data);
      }
    } catch (err) {
      console.error("Failed to load events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [categoryFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEvents();
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div className="inline-flex bg-zinc-900 p-0.5 rounded-md border border-zinc-800 text-xs self-start">
          {["ALL", "PLANNER", "PERFORMER", "CREW"].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${categoryFilter === cat
                ? "bg-zinc-800 text-zinc-100 shadow-xs"
                : "text-zinc-500 hover:text-zinc-300"
                }`}
            >
              {cat === "ALL" ? "All" : cat.charAt(0) + cat.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <form onSubmit={handleSearchSubmit} className="flex items-center gap-1.5">
          <div className="relative w-full sm:w-56">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-zinc-500" />
            <Input
              placeholder="Search title or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-8 h-8 text-xs bg-zinc-950/60"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={fetchEvents}
            disabled={loading}
            className="h-8 px-2.5 text-xs"
          >
            <RefreshCw
              className={`h-3.5 w-3.5 ${loading ? "animate-spin text-zinc-400" : ""}`}
            />
          </Button>
        </form>
      </div>

      {/* List */}
      {loading && events.length === 0 ? (
        <div className="p-8 text-center rounded-lg border border-zinc-850 bg-zinc-950/30 text-xs text-zinc-500">
          Loading events...
        </div>
      ) : events.length === 0 ? (
        <div className="p-8 text-center rounded-lg border border-dashed border-zinc-850 bg-zinc-950/30 text-xs text-zinc-500">
          No events found. Create your first event using the form.
        </div>
      ) : (
        <div className="rounded-lg border border-zinc-850 bg-zinc-950/40 divide-y divide-zinc-850/60">
          {events.map((event) => {
            const isExpanded = expandedId === event._id;

            return (
              <div key={event._id} className="p-3.5 px-4 transition-colors hover:bg-zinc-900/30">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold text-zinc-100">
                        {event.name}
                      </span>
                      <Badge variant="planner" className="font-mono text-[10px] py-0 px-1.5 uppercase">
                        {event.category}
                      </Badge>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 text-[11px] text-zinc-500">
                      <span>{event.eventType}</span>
                      <span>•</span>
                      <span>{event.location} {event.venue ? `(${event.venue})` : ""}</span>
                      <span>•</span>
                      <span className="font-mono">{new Date(event.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setExpandedId(isExpanded ? null : event._id)}
                    className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-zinc-200 self-end sm:self-center cursor-pointer"
                  >
                    <span>{isExpanded ? "Hide" : "Payload"}</span>
                    {isExpanded ? (
                      <ChevronUp className="h-3.5 w-3.5" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-zinc-850/80">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 block mb-1.5">
                      Subdocument Payload:
                    </span>
                    <pre className="p-2.5 rounded bg-zinc-950 border border-zinc-850 font-mono text-[11px] text-zinc-300 overflow-x-auto">
                      {JSON.stringify(event.details, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
