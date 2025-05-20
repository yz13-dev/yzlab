"use client";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import { createContext, ReactElement, useContext, useState } from "react";
import { Input } from "./input";

type TagInputProps = React.ComponentProps<"input">;

type TagsContextProps = {
  tags?: string[];
  onTagsChange?: (tags: string[]) => void;
};
const TagsContext = createContext<TagsContextProps>({});
const useTags = () => {
  const ctx = useContext(TagsContext);
  if (!ctx) throw new Error("useTags must be used within a TagsContext");
  return ctx;
};

const TagInput = ({ className = "", ...props }: TagInputProps) => {
  const { onTagsChange, tags = [] } = useTags();
  const [value, setValue] = useState("");
  const handleAddTag = (tag: string) => {
    const alreadyExists = tags.includes(tag);
    if (alreadyExists) return;
    setValue("");
    if (onTagsChange) onTagsChange([...tags, tag]);
  };
  const handleRemoveTag = () => {
    const filteredTags = tags.filter((_, i, arr) => {
      const isLast = i === arr.length - 1;
      return !isLast;
    });
    if (onTagsChange) onTagsChange(filteredTags);
  };
  return (
    <Input
      className={cn(
        "w-28 inline h-[26px] px-2 text-xs !border-none !ring-0 !ring-offset-0",
        className,
      )}
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && value) {
          handleAddTag(value);
        }
        if (e.key === "Backspace" && !value) {
          handleRemoveTag();
        }
        if (e.key === "Delete" && !value) {
          handleRemoveTag();
        }
      }}
    />
  );
};

const Tag = ({ children, tag }: { children: React.ReactNode; tag: string }) => {
  const { tags = [], onTagsChange } = useTags();
  const handleRemoveTag = (tag: string) => {
    const filteredTags = tags.filter((t) => t !== tag);
    if (onTagsChange) onTagsChange(filteredTags);
  };
  return (
    <div className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs text-foreground">
      {children}
      <button onClick={() => handleRemoveTag(tag)}>
        <XIcon size={16} />
      </button>
    </div>
  );
};

const TagsList = () => {
  const { tags = [] } = useTags();
  return (
    <>
      {tags.map((tag, index) => (
        <Tag key={`tag-${index}-${tag}`} tag={tag}>
          {tag}
        </Tag>
      ))}
    </>
  );
};

type TagsProps = {
  children?:
    | ReactElement<typeof TagsList | typeof TagInput>
    | ReactElement<typeof TagsList | typeof TagInput>[];
  className?: string;
} & TagsContextProps;

const Tags = ({
  children,
  className = "",
  onTagsChange,
  tags = [],
}: TagsProps) => {
  return (
    <TagsContext.Provider value={{ tags, onTagsChange }}>
      <div className={cn("w-fit flex flex-wrap gap-2", className)}>
        {children}
      </div>
    </TagsContext.Provider>
  );
};

TagsContext.displayName = "TagsContext";
Tags.displayName = "Tags";
TagInput.displayName = "TagInput";
TagsList.displayName = "TagsList";
Tag.displayName = "Tag";

export { Tag, TagInput, Tags, TagsList };
