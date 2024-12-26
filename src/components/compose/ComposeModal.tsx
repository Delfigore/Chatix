import React, { useState } from "react";
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

interface ComposeModalProps {
  open?: boolean;
  onClose?: () => void;
  onSubmit?: (content: string, media: string[]) => void;
}

const ComposeModal = ({
  open = true,
  onClose = () => {},
  onSubmit = () => {},
}: ComposeModalProps) => {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<string[]>([
    "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=500&auto=format",
  ]);
  const maxLength = 280;

  const handleSubmit = () => {
    onSubmit(content, media);
    setContent("");
    setMedia([]);
    onClose();
  };

  const removeMedia = (index: number) => {
    setMedia(media.filter((_, i) => i !== index));
  };

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
            <span className="text-gray-500">
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
                    alt="Uploaded content"
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
            onClick={() =>
              setMedia([
                ...media,
                "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=500&auto=format",
              ])
            }
            disabled={media.length >= 4}
          >
            <ImagePlus className="h-5 w-5" />
          </Button>

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={content.length === 0 && media.length === 0}
            >
              Post
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ComposeModal;
