import { type FC, useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { api } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";

interface ComposeModalProps {
  open?: boolean;
  onClose?: () => void;
  maxLength?: number;
  maxMedia?: number;
}

const ComposeModal: FC<ComposeModalProps> = ({
  open = true,
  onClose = () => {},
  maxLength = 280,
  maxMedia = 4,
}) => {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (isSubmitting || !content.trim()) return;

    setIsSubmitting(true);
    try {
      await api.messages.create(content.trim(), media[0]);
      setContent("");
      setMedia([]);
      onClose();
      toast({
        description: "Message posted successfully",
      });
    } catch (error) {
      console.error("Error submitting message:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to post message",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const removeMedia = (index: number) => {
    setMedia(media.filter((_, i) => i !== index));
  };

  const addMedia = useCallback(() => {
    if (media.length >= maxMedia) return;

    // For demo purposes, adding a placeholder image
    // In production, this would open a file picker
    setMedia([
      ...media,
      `https://source.unsplash.com/random/800x600?sig=${Date.now()}`,
    ]);
  }, [media, maxMedia]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Compose Message</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What's happening?"
            className="min-h-[120px] resize-none"
            maxLength={maxLength}
          />

          <div className="flex justify-between items-center text-sm">
            <span
              className={`${content.length > maxLength * 0.9 ? "text-red-500" : "text-gray-500"}`}
            >
              {content.length}/{maxLength} characters
            </span>
          </div>

          {media.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {media.map((url, index) => (
                <Card key={index} className="relative group">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => removeMedia(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                  <img
                    src={url}
                    alt={`Uploaded content ${index + 1}`}
                    className="w-full h-[200px] object-cover rounded-lg"
                  />
                </Card>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={addMedia}
            disabled={media.length >= maxMedia || isSubmitting}
          >
            <ImagePlus className="h-5 w-5" />
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={
                isSubmitting || !content.trim() || content.length > maxLength
              }
            >
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ComposeModal;
