/* eslint-disable @next/next/no-img-element */
"use client";

import AppLayout from "@/layouts/AppLayout";

const projects = [
  {
    id: 1,
    title: "Boost your conversion rate",
    href: "#",
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "How to use search engine optimization to drive sales",
    href: "#",
    description:
      "Optio cum necessitatibus in. Quaerat esse labore sit modi dolores saepe. Sint facilis dolores aut. Veniam accusamus vel. Repellendus natus quae ducimus eligendi. Id et quia aut.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    category: { title: "SEO", href: "#" },
    author: {
      name: "Brenna Goyette",
      role: "Co-Founder / CEO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "How to use search engine optimization to drive sales",
    href: "#",
    description:
      "Optio cum necessitatibus in. Quaerat esse labore sit modi dolores saepe. Sint facilis dolores aut. Veniam accusamus vel. Repellendus natus quae ducimus eligendi. Id et quia aut.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    category: { title: "SEO", href: "#" },
    author: {
      name: "Brenna Goyette",
      role: "Co-Founder / CEO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "How to use search engine optimization to drive sales",
    href: "#",
    description:
      "Optio cum necessitatibus in. Quaerat esse labore sit modi dolores saepe. Sint facilis dolores aut. Veniam accusamus vel. Repellendus natus quae ducimus eligendi. Id et quia aut.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    category: { title: "SEO", href: "#" },
    author: {
      name: "Brenna Goyette",
      role: "Co-Founder / CEO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "How to use search engine optimization to drive sales",
    href: "#",
    description:
      "Optio cum necessitatibus in. Quaerat esse labore sit modi dolores saepe. Sint facilis dolores aut. Veniam accusamus vel. Repellendus natus quae ducimus eligendi. Id et quia aut.",
    imageUrl:
      "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80",
    date: "Mar 10, 2020",
    datetime: "2020-03-10",
    category: { title: "SEO", href: "#" },
    author: {
      name: "Brenna Goyette",
      role: "Co-Founder / CEO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

const Card = ({
  title,
  description,
  imageUrl,
}: {
  title: string | undefined;
  description: string | undefined;
  imageUrl: string | undefined;
}) => (
  <article className="flex flex-col items-start justify-between border border-gray-200 rounded-xl">
    <div className="relative w-full">
      <img
        alt=""
        src={imageUrl}
        className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
      />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
    </div>
    <div className="max-w-xl p-8">
      <div className="flex items-center gap-x-4 text-xs">
        {/* <time dateTime={.datetime} className="text-gray-500">
          {post.date}
        </time> */}
        <a
          href=""
          className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
        >
          {title}
        </a>
      </div>
      <div className="group relative">
        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <a href="">
            <span className="absolute inset-0" />
            {title}
          </a>
        </h3>
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
          {description}
        </p>
      </div>
      <div className="relative mt-8 flex items-center gap-x-4">
        <img
          alt=""
          src={imageUrl}
          className="h-10 w-10 rounded-full bg-gray-100"
        />
        <div className="text-sm leading-6">
          <p className="font-semibold text-gray-900">
            <a href="/">
              <span className="absolute inset-0" />
              {title}
            </a>
          </p>
          <p className="text-gray-600">{title}</p>
        </div>
      </div>
    </div>
  </article>
);

export default function ProjectsIndex() {
  return (
    <AppLayout title="Projects">
      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {projects.map((project, index) => (
          <Card
            key={index}
            title={project.title}
            description={project.description}
            imageUrl={project.imageUrl}
          />
        ))}
      </div>
    </AppLayout>
  );
}
