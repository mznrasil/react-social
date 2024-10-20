import { type JSONContent } from "novel";
import { useMemo } from "react";
import { generateHTML } from "@tiptap/html";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import Heading from "@tiptap/extension-heading";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import BlockQuote from "@tiptap/extension-blockquote";
import Code from "@tiptap/extension-code";
import TextStyle from "@tiptap/extension-text-style";
import CodeBlock from "@tiptap/extension-code-block";

interface RenderArticleProps {
  json: JSONContent | null;
}

export function RenderArticle({ json }: RenderArticleProps) {
  const output = useMemo(() => {
    if (!json) {
      return "";
    }

    return generateHTML(json, [
      Document,
      Paragraph,
      Text,
      Link,
      Underline,
      Heading,
      ListItem,
      BulletList,
      BlockQuote,
      Code,
      TextStyle,
      CodeBlock,
      OrderedList,
    ]);
  }, [json]);

  return (
    <div
      className="prose sm:prose-sm dark:prose-invert prose-li:marker:text-primary"
      dangerouslySetInnerHTML={{ __html: output }}
    />
  );
}
