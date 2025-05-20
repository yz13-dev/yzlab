"use client";
import React, { useState } from "react";
import { TagInput, Tags, TagsList } from "../../src/components/ui/tags";

const TagsDemo = () => {
  const [tags, setTags] = useState<string[]>([]);
  return (
    <Tags tags={tags} onTagsChange={setTags} className="max-w-sm">
      <TagsList />
      <TagInput placeholder="Tags..." />
    </Tags>
  );
};

export default TagsDemo;
