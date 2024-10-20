export default function DocsPage() {
  return (
    <div className="container max-w-screen-lg">
      <h1 className="text-4xl font-bold tracking-tighter">Documentation</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        These are description about the packages used in this project.
      </p>

      <Article title="React">
        As suggested in the assignment, I used <CodeBlock text="react" /> for
        the frontend. Along with React, I used{" "}
        <CodeBlock text="react-router-dom" /> for routing. I used the latest
        version of <CodeBlock text="react-dom" />, which includes loaders and
        actions. I used loaders for fetching the posts in the home page and used
        action for signing out the user (just to showcase the usecase of
        actions).
      </Article>

      <Article title="Supabase">
        Also, as suggested in the assignment, I used{" "}
        <CodeBlock text="@supabase/supabase-js" /> for the backend. I used{" "}
        <CodeBlock text="Supabase Auth" /> for authentication. In this project,
        I used the <CodeBlock text="Supabase Auth Provider: Github" /> for
        signing in the users. I also used <CodeBlock text="Supabase Storage" />{" "}
        for storing images that were uploaded during post creation. I used the
        package
        <CodeBlock text="@supabase/auth-ui-react" />,{" "}
        <CodeBlock text="@supabase/auth-ui-shared" /> for creating the signin
        component. This package helped me to easily and quickly setup the auth
        page.
      </Article>

      <Article title="ShadcnUI">
        I chose <CodeBlock text="shadcn" /> for the design system. I particulary
        picked
        <CodeBlock text="Shadcn UI" /> because of its simplicity and ease of
        use. I have used
        <CodeBlock text="Shadcn UI" /> in many personal projects and I am very
        comfortable with it. You can easily setup the theme and customize the
        components as per your need. This obviosly means that I have used{" "}
        <CodeBlock text="tailwindcss" /> for styling the components.
      </Article>

      <Article title="Form Handling">
        I used <CodeBlock text="react-hook-form" /> for handling the forms. In
        this project, I used this package for creating the post form.{" "}
        <CodeBlock text="react-hook-form" />
        has always been my go to package for handling forms. I felt comfortable
        using it in this project. Along with{" "}
        <CodeBlock text="react-hook-form" />, I used <CodeBlock text="zod" />{" "}
        for validation. I chose <CodeBlock text="zod" /> over{" "}
        <CodeBlock text="yup" /> (also a popular choice) because zod is a
        typesafe schema declaration and validation library, not to mention
        it&apos; sipmlicity while doing so.
      </Article>

      <Article title="Novel - HTML Editor">
        <p>
          I used <CodeBlock text="novel" /> for the HTML editor. I used this
          package for creating the post editor. I chose{" "}
          <CodeBlock text="novel" /> because of its simplicity and ease of use.
          Behind the scenes, it uses <CodeBlock text="tiptap" />, which is an
          amazing headless editor. <CodeBlock text="novel" />
          provides integration with <CodeBlock text="Shadcn UI" /> and{" "}
          <CodeBlock text="tailwind" /> too. It provides the starter kit which
          involves basic tooling; however it also provides the flexibility to
          customize the editor as per your need through extensions. To render
          the HTML content, I used <CodeBlock text="@tiptap/html" /> which is
          also a part of the <CodeBlock text="tiptap" /> package. I used this
          package to render the html content in the posts page.
        </p>
        <p className="mt-2">
          Also, one thing about <CodeBlock text="tiptap" /> is that it stores
          the html content in the form of JSON in the database. So, instead of
          type <CodeBlock text="content: text" /> in the database, I set it to{" "}
          <CodeBlock text="content: jsonb" />
        </p>
      </Article>

      <Article title="Icons">
        I used <CodeBlock text="lucide-react" /> for all my icons in this
        project. It contains a large repository of icons. I used this package
        because I have used this in my earlier projects and I did not need to
        get icons from any other sources.
      </Article>

      <Article title="UUID">
        I used <CodeBlock text="uuid" /> for generating the unique id when
        storing the images in the supabase storage. I need to use this package
        to prevent conflict when I uploaded the same image twice in the storage.
      </Article>

      <Article title="Possible enhancements">
        This project is a simple application. So following would be my
        suggestions for enhancements:
        <ol className="list-decimal list-inside mt-2 pl-4 text-sm leading-loose">
          <li>
            Show the user names who liked the post and similar for reposts
          </li>
          <li>
            Add a feature to comment on the posts. This would require creating a
            new table in the database and linking it to the posts table.
          </li>
          <li>
            Add a profile page where the users can see their own posts, edit and
            delete them.
          </li>
          <li>Add Magic Link authentication for authentication.</li>
          <li>Maybe add hastags to a post</li>
          <li>Show Trending posts</li>
        </ol>
      </Article>
    </div>
  );
}

const CodeBlock = ({ text }: { text: string }) => {
  return (
    <pre className="inline bg-muted text-black font-semibold px-2 py-0.5 text-xs box-content">
      <code>{text}</code>
    </pre>
  );
};

const Article = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <article>
      <h2 className="mt-8 text-xl font-semibold tracking-tighter">{title}</h2>
      <p className="mt-1 text-sm text-muted-foreground leading-loose">
        {children}
      </p>
    </article>
  );
};
