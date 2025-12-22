import { useState } from 'react';
import { History, Trash2, Clock, ChevronRight, X } from 'lucide-react';
import { HistoryEntry, storage } from '@/lib/storage';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HistoryPanelProps {
  onSelectEntry: (entry: HistoryEntry) => void;
  currentEntryId?: string;
}

export const HistoryPanel = ({ onSelectEntry, currentEntryId }: HistoryPanelProps) => {
  const [entries, setEntries] = useState<HistoryEntry[]>(storage.getHistory());
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    storage.removeEntry(id);
    setEntries(storage.getHistory());
  };

  const handleClearAll = () => {
    storage.clearHistory();
    setEntries([]);
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (entries.length === 0) {
    return (
      <div className="p-4 rounded-2xl bg-card border border-border">
        <div className="flex items-center gap-2 text-muted-foreground">
          <History className="w-4 h-4" />
          <span className="text-sm">No history yet</span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-secondary/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-primary" />
          <span className="font-medium text-foreground">History</span>
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs">
            {entries.length}
          </span>
        </div>
        <ChevronRight
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform",
            isOpen && "rotate-90"
          )}
        />
      </button>

      {/* Entries */}
      <div
        className={cn(
          "transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-[400px]" : "max-h-0"
        )}
      >
        <div className="border-t border-border">
          {/* Clear All Button */}
          <div className="p-2 border-b border-border bg-secondary/30">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearAll}
              className="w-full justify-center text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All History</span>
            </Button>
          </div>

          {/* Entry List */}
          <div className="max-h-[300px] overflow-y-auto">
            {entries.map((entry) => (
              <button
                key={entry.id}
                onClick={() => onSelectEntry(entry)}
                className={cn(
                  "w-full p-3 flex items-center gap-3 hover:bg-secondary/50 transition-colors border-b border-border/50 last:border-0",
                  currentEntryId === entry.id && "bg-primary/5"
                )}
              >
                {/* Thumbnail */}
                <img
                  src={entry.imagePreview}
                  alt="History thumbnail"
                  className="w-12 h-12 rounded-lg object-cover bg-secondary shrink-0"
                />

                {/* Info */}
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-foreground truncate">
                    {entry.sceneAnalysis.environment || 'Scene Analysis'}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    <span>{formatDate(entry.timestamp)}</span>
                    <span>•</span>
                    <span>{entry.objectsDetected.length} objects</span>
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={(e) => handleDelete(entry.id, e)}
                  className="p-1.5 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
